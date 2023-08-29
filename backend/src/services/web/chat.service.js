import { config } from "dotenv";
import mongoose from "mongoose";
import ChatMessageModel from "../../database/models/chatMessage.model.js";
import ChatRoomMemberModel from "../../database/models/chatRoomMembers.model.js";
import ChatRoomModel from "../../database/models/chatRoom.model.js";
import { APP_CONSTANT } from "../../utils/constants/app.js";
import {SOCKET_EVENTS} from "../../utils/constants/events.js"
import { to } from "../../config/socket.js";
import ChatRoomDto from "../../dto/chatRoom.dto.js";
import ChatMessageDto from "../../dto/chatMessage.dto.js";
import UserModel from "../../database/models/user.model.js";


const fetchUserChatRoom = async (req, res, next) => {
    const { currentUser } = req;
    const {user, type = 'one-to-one'} = req.params;
    const limit = req.query.limit || APP_CONSTANT.CHAT_MESSAGE_LIMIT;
    const chatRoom = await ChatRoomModel.aggregate([
        {
            $lookup: {
            from: "chat_room_members",
            localField: "_id",
            foreignField: "room",
            as: "members"
            }
        },
        {
            $lookup: {
            from: "chat_messages",
            localField: "_id",
            foreignField: "room",
            as: "messages",
            pipeline: [
                { $sort: { createdAt: -1 } }
            ]
            }
        },
        {
            $match: {
            $and: [
                { "members.user": mongoose.Types.ObjectId(currentUser) },
                { "members.user": mongoose.Types.ObjectId(user) },
                { "members": { $size: 2 } },
                { "type": type }
            ]
            }
        },
        {
            $project: {
            _id: 1,
            messages: 1,
            messageCount: { $size: "$messages" }
            }
        },
        {
            $project: {
                _id: 1,
                messages: { $slice: ["$messages", limit] },
                messageCount: 1
            }
        }
    ]).exec();

    const userInfo = await UserModel.findOne({_id: user});
    return {data: chatRoom.map(item => (ChatRoomDto(item, [], userInfo))) || []}
}

const newMessage= async (req, res, next) => {
    const { currentUser } = req;
    const {user} = req.params;
    const { message } = req.body;

    var chatRoom = await fetchUserChatRoom(req, res, next)

    if (chatRoom.data.length === 0) {
        chatRoom = await ChatRoomModel.create({
            author: mongoose.Types.ObjectId(currentUser),
        })

        const mem1 = await ChatRoomMemberModel.create({
            room: chatRoom._id,
            user: mongoose.Types.ObjectId(currentUser),
        })
        const mem2 = await ChatRoomMemberModel.create({
            room: chatRoom._id,
            user: mongoose.Types.ObjectId(user),
        })
    }
    else{        
        chatRoom = chatRoom.data[0];
    }
    const msg = await ChatMessageModel.create({
        room: chatRoom._id,
        to: mongoose.Types.ObjectId(user),
        from: mongoose.Types.ObjectId(currentUser),
        message: message,
    })
    
    const userInfo = await UserModel.findOne({_id: user});
    

    await to(user, `${SOCKET_EVENTS.NEW_MESSAGE}${chatRoom._id}`, {msg: ChatMessageDto(msg), room: chatRoom}); //To specific chat
    await to(user, `${SOCKET_EVENTS.NEW_MESSAGE}`, {msg: ChatMessageDto(msg), room: ChatRoomDto(chatRoom, [], userInfo)}); //For notification

    return {data: {room: chatRoom, msg: ChatMessageDto(msg)}}

}

const fetchMessages= async (req, res, next) => {    
    const {roomid} = req.params;
    const page = req.query.page || 1;
    const limit = req.query.limit || APP_CONSTANT.CHAT_MESSAGE_LIMIT;

    const [result] = ChatMessageModel.aggregate([
        {match: {
            room: mongoose.Types.ObjectId(roomid)
        }},    
        { $sort: { createdAt: -1 } },
        {
            $facet: {
                data: [
                    { $skip: (page - 1) * limit },
                    { $limit: limit },
                ],
                total: [{ $count: 'total' }]
            }
        }
    ])
    return { data: {messages: result.data || [], totalMessages: result.total  || 0}  };
}

const ChatService = {
  newMessage,
  fetchUserChatRoom,
  fetchMessages
};
export default ChatService;
