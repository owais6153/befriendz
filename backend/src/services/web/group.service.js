import { config } from "dotenv";
import mongoose from "mongoose";
import GroupModel from "../../database/models/group.model.js";
import GroupDto from "../../dto/group.dto.js"
import UserService from "./user.service.js";
import MemberModel from "../../database/models/members.model.js"
import AuthorDto from "../../dto/author.dto.js";
import { APP_CONSTANT } from "../../utils/constants/app.js";
import GroupListDto from "../../dto/groupList.dto.js";
import UserModel from "../../database/models/user.model.js";
config();

const addGroup = async (req, res, next) => {
  const { currentUser } = req;
  const { title, about, coverImage, bannerImage,  tags } = req.body;
  var parsedTags = tags ? tags.split(",") : []
  const group = await GroupModel.create(
    {
        title,
        about,
        tags: parsedTags,
        coverImage: coverImage ? coverImage : null,
        bannerImage: bannerImage ? bannerImage : null,
        author: mongoose.Types.ObjectId(currentUser)
    }
  );

  const join = await MemberModel.create({
    group:  mongoose.Types.ObjectId(group._id),
    user: currentUser,
    type: 'group',
    member_type: 'admin'
  });
  return {data: {group: {_id: group._id}}}
};

const pinGroup = async (req, res, next) => {
  const { currentUser } = req;
  const groupid = req.params.groupid;

  const hasPinned = await UserModel.findOne({ pinnedGroups: { $in: [mongoose.Types.ObjectId(groupid)] }, _id: currentUser });
  let user;

  if (!hasPinned) {
    user = await UserModel.findByIdAndUpdate(
      currentUser,
      { $push: { pinnedGroups: mongoose.Types.ObjectId(groupid) } },
      { new: true, populate: { path: "pinnedGroups" } }
    );
  } else {
    user = await UserModel.findByIdAndUpdate(
      currentUser,
      { $pull: { pinnedGroups: mongoose.Types.ObjectId(groupid) } },
      { new: true, populate: { path: "pinnedGroups" } }
    );
  }

  return { data: { hasPinned: !hasPinned } };
};

const fetchAllJoinedGroupIDsAsArray = async (req, res, next) => {
  const {currentUser} = req;
  const joinedGroups = await MemberModel.find({
    user: currentUser
  }).select('group').lean();

  const groupIDs = joinedGroups.reduce((ids, req) => {
    
      ids.push( mongoose.Types.ObjectId(req.group));

    return ids;
  }, []);

  return { data: {groupIDs }  };
}

const fetchGroupMmebers = async (req, res, next) => {
  const groupid = req.params.groupid;
  const member_type = req.params.type || 'admin';
  const page = req.query.page || 1;
  const limit = req.query.limit || APP_CONSTANT.MEMBERS_LIMIT;

  const [result] = await MemberModel.aggregate([
    { 
      $match: {
        group: mongoose.Types.ObjectId(groupid),
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
  const groupid = req.params.groupid;
  const { currentUser } = req;
  const result = await GroupModel.aggregate([
    { $match: {  _id: mongoose.Types.ObjectId(groupid) } },
    { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
    { $unwind: '$author' },
    { $lookup: { from: 'topics', localField: 'tags', foreignField: '_id', as: 'tags' } },
    {
      $lookup: {
        from: 'members',
        let: { groupid: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$group', '$$groupid'] },
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
    const error = new Error('Group not found');
    error.statusCode = 404;
    throw error;
  }  

  const hasPinned = await UserModel.findOne({ pinnedGroups: { $in: [mongoose.Types.ObjectId(groupid)] }, _id: currentUser });
  const admins = await fetchGroupMmebers(req);
  return {data: {group: GroupDto(result[0]), admins: admins.data, hasPinned: !!hasPinned}}
};

const fetchAsOptions = async (req, res, next) => {
  const { currentUser } = req;
  const search = req.query.search;
  
  const groupIDs = await fetchAllJoinedGroupIDsAsArray(req)

  const query = search ? {
     title: { $regex: new RegExp(search, "i") },     
  } : {}

  const resp = await GroupModel.find({
    ...query,
    _id: {$in: groupIDs?.data?.groupIDs || []}
    
  });
  const data = { results: resp.map((item, index) => ({
      value: item._id,
      label: item.title
    }))
  };
  return { data: { options: data } };
};

const joinGroup = async (req, res, next) => {
  const { currentUser } = req;
  const groupid = req.params.groupid;
  const isJoined = await MemberModel.findOne({
    group: mongoose.Types.ObjectId(groupid),
    user: currentUser
  })
  
  if(isJoined){
    const error = new Error('Already joined');
    error.statusCode = 404;
    throw error;
  }

  const join = await MemberModel.create({
    group:  mongoose.Types.ObjectId(groupid),
    user: currentUser,
    type: 'group',
    member_type: 'member'
  });

  return {data: {join}}
};

const leaveGroup = async (req, res, next) => {
  const { currentUser } = req;
  const groupid = req.params.groupid;
  const isJoined = await MemberModel.findOne({
    group: mongoose.Types.ObjectId(groupid),
    user: currentUser
  })
  if(!isJoined){
    const error = new Error('You are not member of this group');
    error.statusCode = 404;
    throw error;
  }
  const join = await MemberModel.findByIdAndDelete(isJoined._id)

  return {data: {join}}
};

const fetchRelatedGroups = async (req, res, next) => {
  // const { currentUser } = req;
  // const  topicIds = await UserService.fetchUserInterestsIdsAsArray(req);
  const limit = req.query.limit || APP_CONSTANT.GROUPS_LIMIT;
  const page = req.query.page || 1;
  
  const [result] = await GroupModel.aggregate([
    // { $match: { tags: {$in: topicIds?.data?.topicIds || []} } },
    { $lookup: { from: 'members', localField: '_id', foreignField: 'group', as: 'members' } },
    { $addFields: { memberCount: { $size: '$members' } } },
    // { $match: { 'members.user': { $ne: mongoose.Types.ObjectId(currentUser) } } },
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
    result.data = result.data.map(item => GroupListDto(item))
  }
  return { data: {groups: result.data || [], totalGroups: result.total  || 0}  };
};

const searchGroups = async (req, res, next) => {
  const { currentUser } = req;
  const {term} = req.query;
  const limit = req.query.limit || APP_CONSTANT.GROUPS_LIMIT;
  const page = req.query.page || 1;
  
  const [result] = await GroupModel.aggregate([
    { $match: { title: { $regex:new RegExp(term, "i") }} },
    { $lookup: { from: 'members', localField: '_id', foreignField: 'group', as: 'members' } },
    { $addFields: { memberCount: { $size: '$members' } } },
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
    result.data = result.data.map(item => GroupListDto(item))
  }
  return { data: {groups: result.data || [], totalGroups: result.total  || 0}  };
};

const fetchFastestGrowingGroups = async (req, res, next) => {
  const limit = req.query.limit || APP_CONSTANT.OTHER_GROUPS_LIMIT;
  const page = req.query.page || 1;
  const [result] = await GroupModel.aggregate([
    { $lookup: { from: 'members', localField: '_id', foreignField: 'group', as: 'members' } },
    { $addFields: { memberCount: { $size: '$members' } } },
    { $addFields: { growthRate: { $divide: ['$memberCount', { $divide: ['$timeElapsed', 1000 * 60 * 60 * 24] }] } } },
    { $lookup: { from: 'posts', localField: '_id', foreignField: 'group', as: 'posts' } },
    { $addFields: { postCount: { $size: '$posts' } } },
    { $sort: { growthRate: -1, memberCount: -1, createdAt: -1, postCount: -1,} },
    { $limit: APP_CONSTANT.OTHER_GROUPS_TOP_LIST_LIMIT },
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
    result.data = result.data.map(item => GroupListDto(item))
  }
  return { data: {fastestGrowingGroups: result.data || [], totalFastestGrowingGroups: result.total  || 0}  };
}

const fetchPopularGroups = async (req, res, next) => {
  const limit = req.query.limit || APP_CONSTANT.OTHER_GROUPS_LIMIT;
  const page = req.query.page || 1;
  const [result] = await GroupModel.aggregate([
    { $lookup: { from: 'members', localField: '_id', foreignField: 'group', as: 'members' } },
    { $addFields: { memberCount: { $size: '$members' } } },
    { $addFields: { growthRate: { $divide: ['$memberCount', { $divide: ['$timeElapsed', 1000 * 60 * 60 * 24] }] } } },
    { $lookup: { from: 'posts', localField: '_id', foreignField: 'group', as: 'posts' } },
    { $addFields: { postCount: { $size: '$posts' } } },
    { $sort: { memberCount: -1, postCount: -1, growthRate: -1, createdAt: -1, } },
    { $limit: APP_CONSTANT.OTHER_GROUPS_TOP_LIST_LIMIT },
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
    result.data = result.data.map(item => GroupListDto(item))
  }
  return { data: {popularGroups: result.data || [], totalPopularGroups: result.total  || 0}  };
}
const fetchNewlyLaunched = async (req, res, next) => {
  const limit = req.query.limit || APP_CONSTANT.OTHER_GROUPS_LIMIT;
  const page = req.query.page || 1;
  const [result] = await GroupModel.aggregate([
    { $lookup: { from: 'members', localField: '_id', foreignField: 'group', as: 'members' } },
    { $sort: {  createdAt: -1 } },
    { $limit: APP_CONSTANT.OTHER_GROUPS_TOP_LIST_LIMIT },
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
    result.data = result.data.map(item => GroupListDto(item))
  }
  return { data: {newlyLaunchedGroups: result.data || [], totalNewlyLaunchedGroups: result.total  || 0}  };
}

const fetchPinnedGroups = async (req, res, next) => {
  
  const  pinnedGroupIds = await UserService.fetchUserPinnedGroupsIdsAsArray(req);
  var pinnedGroups = await GroupModel.find({
    _id: {$in: pinnedGroupIds?.data?.pinnedGroupIds || []}
  })
  if(pinnedGroups.length > 0){
    pinnedGroups = pinnedGroups.map(item => GroupListDto(item))
  }
  
  return { data: {pinnedGroups}  };
}

const GroupService = {
  addGroup,
  fetchByID,
  fetchAsOptions,
  fetchAllJoinedGroupIDsAsArray,
  leaveGroup,
  joinGroup,
  fetchRelatedGroups,
  fetchPopularGroups,
  fetchFastestGrowingGroups,
  fetchNewlyLaunched,
  pinGroup,
  searchGroups,
  fetchPinnedGroups
};
export default GroupService;
