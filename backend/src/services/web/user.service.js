import UserModel from "../../database/models/user.model.js";
import UserSettingModel from "../../database/models/userSetting.model.js";
import UserUpdateProfileDto from "../../dto/userUpdateProfile.dto.js";
import UserDto from "../../dto/user.dto.js";
import mongoose from "mongoose";
import FriendsService from './freinds.service.js'
import bcrypt from "bcryptjs";
import { APP_CONSTANT } from "../../utils/constants/app.js";
import { config } from "dotenv";
import { IMAGES } from "../../utils/constants/images.js";
import { FILE_URL } from "../../utils/constants/file.js";
import ChatService from "./chat.service.js";
config();

const updateUser = async (req, res, next) => {
  const { currentUser } = req;
  const data = UserUpdateProfileDto(req.body);
  const user = await UserModel.findById(
        currentUser
    );
    if(data.email || data.username){
        if(data.email && data.email != user.email){
        const emailExist = await UserModel.findOne({ email: data.email });
        if (emailExist) {
            const error = new Error(`Email already exist`);
            error.statusCode = 400;
            throw error;
        }
    }
    if(data.username && data.username != user.username){
        const usernameExist = await UserModel.findOne({ username: data.username });
        if (usernameExist) {
            const error = new Error(`Username already exist`);
            error.statusCode = 400;
            throw error;
        }
    }
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    currentUser,
    data,
    { new: true, populate: { path: "interests" } }
  );
  
  return { data: { user: UserDto(updatedUser), friendStatus: false } };
};

const fetchUser = async (req, res, next) => {
  const { currentUser } = req;
  const username = req.params.username;
  let friendStatus = false;
  let chatRoom = false;
  const query = username ? { username } : { _id: currentUser };
  const user = await UserModel.findOne(query).populate('interests').exec();

  if (!user) {
      const error = new Error(`User not found`);
      error.statusCode = 404;
      throw error;
  }

  // Check if is freind, or has friend request by current user
  if(username && user){
    req.user = user;
    req.params.user = user;
    friendStatus = await FriendsService.getFriendStatus(req);
    friendStatus = friendStatus?.data?.friendStatus;    
    chatRoom = await ChatService.fetchUserChatRoom(req);
    if(chatRoom.data.length === 0){
      chatRoom = false
    }
    else{
      chatRoom = chatRoom.data[0];
    }
  }
  
  return { data: { user: UserDto(user), friendStatus, chatRoom } };
}

const fetchUserInterestsIdsAsArray = async (req, res, next) => {
  const { currentUser } = req;
  const user = await UserModel.findOne({_id: currentUser})
  .select('interests');
  if (!user) {
    const error = new Error(`User not found`);
    error.statusCode = 404;
    throw error;
  } 
  const topicIds = user.interests.map((topic) => mongoose.Types.ObjectId(topic.toString()));
  return { data: { topicIds, } };
}
const fetchUserPinnedGroupsIdsAsArray = async (req, res, next) => {
  const { currentUser } = req;
  const user = await UserModel.findOne({_id: currentUser})
  .select('pinnedGroups');
  if (!user) {
    const error = new Error(`User not found`);
    error.statusCode = 404;
    throw error;
  } 
  const pinnedGroupIds = user.pinnedGroups.map((group) => mongoose.Types.ObjectId(group.toString()));
  return { data: { pinnedGroupIds, } };
}

const updatePassword = async (req, res, next) => {
  const { currentUser } = req;
  const { password, new_password, confirm_password } = req.body;
  const user = await UserModel.findOne({_id: currentUser})
  if(!user){
    const error = new Error("User not found!");
    error.statusCode = 404;
    throw error;
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    const error = new Error("Wrong Password!");
    error.statusCode = 400;
    throw error;
  }
  
  const hashedPassword = await bcrypt.hash(new_password, 18);

  const updateUser = await UserModel.findByIdAndUpdate(currentUser, {
    password: hashedPassword,
  });  
}

const updateUserSettings = async (req, res, next) => {
  const { currentUser } = req;
  const { key, value } = req.body;
  var setting = await UserSettingModel().find({
    user: mongoose.Types.ObjectId(currentUser),
    key,
  });

  if(!setting){
    setting = await UserSettingModel().create({
      user: mongoose.Types.ObjectId(currentUser),
      key,
    });
  }
  else{
    await UserSettingModel().findByIdAndUpdate(setting._id, {
      key,
      value
    }, { new: true});
  }

  return {data: {setting}};
}

const searchUsers = async (req, res, next) => {
  const page = req.query.page || 1;
  const {term} = req.query;
  const limit = req.query.limit || APP_CONSTANT.FRIEND_REQUESTS_LIMIT;
  const users = await UserModel.aggregate([
    { $match: {  $or: [
      {title: { $regex:new RegExp(term, "i") }},
      {username: { $regex:new RegExp(term, "i") }},
      {email: { $regex:new RegExp(term, "i") }},
      {first_name: { $regex:new RegExp(term, "i") }},
      {last_name: { $regex:new RegExp(term, "i") }},
      {business_name: { $regex:new RegExp(term, "i") }},
      {occupation: { $regex:new RegExp(term, "i") }},
    ] } },
    {
      $facet: {
        data: [
          { $skip: (page - 1) *  limit},
          { $limit: limit },
          { $project: { 
            '_id': 1,
            'username': 1,
            'first_name': 1,
            'last_name': 1,
            'type': 1,
            'business_name': 1,
            'business_type': 1,
            'email': 1,
            'profileImage': {
              $cond: {
                if: { $eq: ['$profileImage', null] },
                then: IMAGES.AVATAR,
                else: { $concat: [FILE_URL.UPLOADS, '$profileImage'] },
              }
            },
            createdAt: 1 
          } }
        ],
        total: [{ $count: 'total' }]
      }
    }  
  ])
  return {data: {users}};
}
const UserService = {
  updateUser,
  fetchUser,
  fetchUserInterestsIdsAsArray,
  updatePassword,
  updateUserSettings,
  searchUsers,
  fetchUserPinnedGroupsIdsAsArray
};
export default UserService;
