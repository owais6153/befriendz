import { config } from "dotenv";
import mongoose from "mongoose";
import WebinarModel from "../../database/models/webinar.model.js";
import MemberModel from "../../database/models/members.model.js";
import { APP_CONSTANT } from "../../utils/constants/app.js";
import AuthorDto from "../../dto/author.dto.js"
import WebinarDto from "../../dto/webinar.dto.js";
import UserService from "./user.service.js";
import WebinarListDto from "../../dto/webinarList.dto.js";

config();

const addWebinar = async (req, res, next) => {
  const { currentUser } = req;
  const { title, about, coverImage, price,  tags, type, day, month, year, time } = req.body;
  var parsedTags = tags ? tags.split(",") : []
  const webinar = await WebinarModel.create(
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
    webinar:  mongoose.Types.ObjectId(webinar._id),
    user: currentUser,
    type: 'webinar',
    member_type: 'moderator'
  });
  return {data: {webinar: {_id: webinar._id}}}
};

const fetchWebinarMembers = async (req, res, next) => {
  const webinarid = req.params.webinarid;
  const member_type = req.params.type || 'moderator';
  const page = req.query.page || 1;
  const limit = req.query.limit || APP_CONSTANT.MEMBERS_LIMIT;

  const [result] = await MemberModel.aggregate([
    { 
      $match: {
        webinar: mongoose.Types.ObjectId(webinarid),
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
  const webinarid = req.params.webinarid;
  const { currentUser } = req;
  const result = await WebinarModel.aggregate([
    { $match: {  _id: mongoose.Types.ObjectId(webinarid) } },
    { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
    { $unwind: '$author' },
    { $lookup: { from: 'topics', localField: 'tags', foreignField: '_id', as: 'tags' } },
    {
      $lookup: {
        from: 'members',
        let: { webinarid: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$group', '$$webinarid'] },
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

  const moderators = await fetchWebinarMembers(req);
  return {data: {webinar: WebinarDto(result[0]), moderators: moderators.data}}
};
const fetchRelatedWebinars = async (req, res, next) => {
  const  topicIds = await UserService.fetchUserInterestsIdsAsArray(req);
  const limit = req.query.limit || APP_CONSTANT.GROUPS_LIMIT;
  const page = req.query.page || 1;
  
  const [result] = await WebinarModel.aggregate([
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
    result.data = result.data.map(item => WebinarListDto(item))
  }
  return { data: {webinars: result.data || [], totalWebinars: result.total  || 0}  };
};

const searchWebinars = async (req, res, next) => {
  const limit = req.query.limit || APP_CONSTANT.GROUPS_LIMIT;
  const page = req.query.page || 1;
  const {term} = req.query;
  
  const [result] = await WebinarModel.aggregate([
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
    result.data = result.data.map(item => WebinarListDto(item))
  }
  return { data: {webinars: result.data || [], totalWebinars: result.total  || 0}  };
};

const WebinarService = {
  addWebinar,
  fetchByID,
  fetchRelatedWebinars,
  searchWebinars
};
export default WebinarService;
