import { config } from "dotenv";
import mongoose from "mongoose";
import TrainingModel from "../../database/models/training.model.js";
import MemberModel from "../../database/models/members.model.js";
import { APP_CONSTANT } from "../../utils/constants/app.js";
import AuthorDto from "../../dto/author.dto.js"
import TrainingDto from "../../dto/training.dto.js";
import UserService from "./user.service.js";
import TrainingListDto from "../../dto/trainingList.dto.js";

config();

const addTraining = async (req, res, next) => {
  const { currentUser } = req;
  const { title, about, coverImage, price,  tags, type, day, month, year, time } = req.body;
  var parsedTags = tags ? tags.split(",") : []
  const training = await TrainingModel.create(
    {
        title,
        coverImage: coverImage ? coverImage : null,
        about,
        date: {
          day,
          month,
          year,
          time
        },
        price,
        type,
        tags: parsedTags,
        author: mongoose.Types.ObjectId(currentUser)
    }
  );

  const join = await MemberModel.create({
    training:  mongoose.Types.ObjectId(training._id),
    user: currentUser,
    type: 'training',
    member_type: 'moderator'
  });
  return {data: {training: {_id: training._id}}}
};

const fetchTrainingMembers = async (req, res, next) => {
  const trainingid = req.params.trainingid;
  const member_type = req.params.type || 'moderator';
  const page = req.query.page || 1;
  const limit = req.query.limit || APP_CONSTANT.MEMBERS_LIMIT;

  const [result] = await MemberModel.aggregate([
    { 
      $match: {
        training: mongoose.Types.ObjectId(trainingid),
        member_type
      }
    },
    { $sort: { createdAt: -1 }, },
    {
      $facet: {
        data: [
          { $skip: (page - 1) * limit },
          { $limit: limit },
          { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
          { $unwind: '$user' },
        ],
        total: [{ $count: 'total' }]
      }
    }
  ]);


  if(result.data?.length > 0){
    result.data = result.data?.map(item => ({_id: item._id,  user: AuthorDto(item.user)}))
  }  

  return {data: {members: result.data || [], totalMembers: result.total  || 0}}
};

const fetchByID = async (req, res, next) => {
  const trainingid = req.params.trainingid;
  const { currentUser } = req;
  const result = await TrainingModel.aggregate([
    { $match: {  _id: mongoose.Types.ObjectId(trainingid) } },
    { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
    { $unwind: '$author' },
    { $lookup: { from: 'topics', localField: 'tags', foreignField: '_id', as: 'tags' } },
    {
      $lookup: {
        from: 'members',
        let: { trainingid: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$group', '$$trainingid'] },
                  { $eq: ['$user', mongoose.Types.ObjectId(currentUser)] },
                ],
              },
            },
          },
        ],
        as: 'isJoinedByCurrentUser',
      },
    },
    {
      $addFields: {
        isJoinedByCurrentUser: {
          $cond: [{ $eq: [{ $size: '$isJoinedByCurrentUser' }, 0] }, false, true],
        },
      },
    },
    { $limit: 1 },
  ]);

  if(result.length === 0){
    const error = new Error('Wrbinar not found');
    error.statusCode = 404;
    throw error;
  }  

  const moderators = await fetchTrainingMembers(req);
  return {data: {training: TrainingDto(result[0]), moderators: moderators.data}}
};
const fetchRelatedTrainings = async (req, res, next) => {
  const  topicIds = await UserService.fetchUserInterestsIdsAsArray(req);
  const limit = req.query.limit || APP_CONSTANT.GROUPS_LIMIT;
  const page = req.query.page || 1;
  
  const [result] = await TrainingModel.aggregate([
    { $match: { tags: {$in: topicIds?.data?.topicIds || []} } },
    { $lookup: { from: 'members', localField: '_id', foreignField: 'group', as: 'members' } },
    { $lookup: { from: 'topics', localField: 'tags', foreignField: '_id', as: 'tags' } },
    { $addFields: { memberCount: { $size: '$members' } } },
    { $sort: { createdAt: -1 }, },
    {
      $facet: {
        data: [
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ],
        total: [{ $count: 'total' }],
      },
    },
  ]);
  if(result.data?.length > 0){
    result.data = result.data.map(item => TrainingListDto(item))
  }
  return { data: {trainings: result.data || [], totalTrainings: result.total  || 0}  };
};

const searchTrainings = async (req, res, next) => {
  const limit = req.query.limit || APP_CONSTANT.GROUPS_LIMIT;
  const page = req.query.page || 1;
  const {term} = req.query;
  
  const [result] = await TrainingModel.aggregate([
    { $match: { title: { $regex:new RegExp(term, "i") }} },
    { $lookup: { from: 'members', localField: '_id', foreignField: 'group', as: 'members' } },
    { $lookup: { from: 'topics', localField: 'tags', foreignField: '_id', as: 'tags' } },
    { $addFields: { memberCount: { $size: '$members' } } },
    { $sort: { createdAt: -1 }, },
    {
      $facet: {
        data: [
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ],
        total: [{ $count: 'total' }],
      },
    },
  ]);
  if(result.data?.length > 0){
    result.data = result.data.map(item => TrainingListDto(item))
  }
  return { data: {trainings: result.data || [], totalTrainings: result.total  || 0}  };
};

const TrainingService = {
  addTraining,
  fetchByID,
  fetchRelatedTrainings,
  searchTrainings
};
export default TrainingService;
