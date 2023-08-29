import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatRoomMembersSchema = new Schema(
  {
    room: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat_rooms",
    },
    user: {      
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
    }
  },
  { timestamps: true }
);

const ChatRoomMemberModel = mongoose.model("chat_room_members", chatRoomMembersSchema);
export default ChatRoomMemberModel;
