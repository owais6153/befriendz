import { config } from "dotenv";
import mongoose from "mongoose";
import UserModel from "../../database/models/user.model.js";
import PostModel from "../../database/models/post.model.js";
import LikeModel from "../../database/models/like.model.js";
import ViewModel from "../../database/models/view.model.js";
import PostDto from "../../dto/post.dto.js";
import GroupService from "./group.service.js";
import FriendsService from "./freinds.service.js";
import UserService from "./user.service.js";
import { APP_CONSTANT } from "../../utils/constants/app.js";
import NotificationServices from "./notification.service.js";
config();

const lookupsQuery = (currentUser) => (
  [
    { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
    { $unwind: '$author' },
    { $lookup: { from: 'topics', localField: 'tags', foreignField: '_id', as: 'tags' } },
    { $lookup: { from: 'groups', localField: 'group', foreignField: '_id', as: 'group' } },
    {
      $unwind: {
        path: '$group',
        preserveNullAndEmptyArrays: true,
      },
    },
    // Post Stats
    {
      $lookup: {
        from: 'likes',
        localField: '_id',
        foreignField: 'post',
        as: 'likeCount',
      },
    },
    {
      $addFields: {
        likeCount: { $size: '$likeCount' },
      },
    },
    {
      $lookup: {
        from: 'views',
        localField: '_id',
        foreignField: 'post',
        as: 'viewCount',
      },
    },
    {
      $addFields: {
        viewCount: { $size: '$viewCount' },
      },
    },
    {
      $lookup: {
        from: 'likes',
        let: { postId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$post', '$$postId'] },
                  { $eq: ['$user', mongoose.Types.ObjectId(currentUser)] },
                ],
              },
            },
          },
        ],
        as: 'isLikedByCurrentUser',
      },
    },
    {
      $addFields: {
        isLikedByCurrentUser: {
          $cond: [{ $eq: [{ $size: '$isLikedByCurrentUser' }, 0] }, false, true],
        },
      },
    },
     // Shared Post Details
    {
      $lookup: {
        from: 'posts',
        localField: 'sharedPost',
        foreignField: '_id',
        as: 'sharedPost',
      },
    },
    {
      $unwind: {
        path: '$sharedPost',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'topics',
        localField: 'sharedPost.tags',
        foreignField: '_id',
        as: 'sharedPost.tags',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'sharedPost.author',
        foreignField: '_id',
        as: 'sharedPost.author',
      },
    },
    {
      $unwind: {
        path: '$sharedPost.author',
        preserveNullAndEmptyArrays: true,
      },
    },
    { $lookup: { from: 'groups', localField: 'sharedPost.group', foreignField: '_id', as: 'sharedPost.group' } },
    {
      $unwind: {
        path: '$sharedPost.group',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Shared Post Stats
    {
      $lookup: {
        from: 'likes',
        localField: 'sharedPost._id',
        foreignField: 'post',
        as: 'sharedPost.likeCount',
      },
    },
    {
      $addFields: {
        'sharedPost.likeCount': { $size: '$sharedPost.likeCount' },
      },
    },
    {
      $lookup: {
        from: 'views',
        localField: 'sharedPost._id',
        foreignField: 'post',
        as: 'sharedPost.viewCount',
      },
    },
    {
      $addFields: {
        'sharedPost.viewCount': { $size: '$sharedPost.viewCount' },
      },
    },
    // Additional fields for sharedPost
    {
      $addFields: {
        'sharedPost.title': '$sharedPost.title',
        'sharedPost.content': '$sharedPost.content',
        'sharedPost.coverImage': '$sharedPost.coverImage',
      },
    },
    {
      $addFields: {
        'sharedPost.createdAt': '$sharedPost.createdAt',
        'sharedPost.updatedAt': '$sharedPost.updatedAt',
      },
    },
    {
      $lookup: {
        from: 'likes',
        let: { postId: '$sharedPost._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$post', '$$postId'] },
                  { $eq: ['$user', mongoose.Types.ObjectId(currentUser)] },
                ],
              },
            },
          },
        ],
        as: 'sharedPost.isLikedByCurrentUser',
      },
    },
    {
      $addFields: {
        'sharedPost.isLikedByCurrentUser': {
          $cond: [{ $eq: [{ $size: '$sharedPost.isLikedByCurrentUser' }, 0] }, false, true],
        },
      },
    },

    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'sharedPost',
        as: 'shareCount',
      },
    },
    {
      $addFields: {
        shareCount: { $size: '$shareCount' },
      },
    },
    {
      $lookup: {
        from: 'posts',
        localField: 'sharedPost._id',
        foreignField: 'sharedPost',
        as: 'sharedPost.shareCount',
      },
    },
    {
      $addFields: {
        'sharedPost.shareCount': { $size: '$sharedPost.shareCount' },
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'post',
        as: 'commentCount',
      },
    },
    {
      $addFields: {
        commentCount: { $size: '$commentCount' },
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: 'sharedPost._id',
        foreignField: 'post',
        as: 'sharedPost.commentCount',
      },
    },
    {
      $addFields: {
        'sharedPost.commentCount': { $size: '$sharedPost.commentCount' },
      },
    },
  ]
)

const commentsLookupsQuery = (currentUser, isFromPost = true, recurringCount = 1) => {

  const match = isFromPost ? 
    [
      {
        $match: {
          $expr: { $eq: ['$post', '$$postId']  } ,
        }
      },
      {
        $match: {
          $expr:  { $eq: ['$parentComment', null]} ,
        }
      }
    ] : [
      {
        $match: {
          $expr: { $eq: ['$parentComment', '$$postId'] },
        }
      }
    ] ;
  if(recurringCount < 3) 
  return (  [ {
    $lookup: {
      from: 'comments',
      let: { postId: '$_id' },
      pipeline: [
        ...match,
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'comment',
            as: 'likeCount',
          },
        },
        {
          $addFields: {
            likeCount: { $size: '$likeCount' },
          },
        },
        {
          $lookup: {
            from: 'likes',
            let: { commentId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$comment', '$$commentId'] },
                      { $eq: ['$user', mongoose.Types.ObjectId(currentUser)] },
                    ],
                  },
                },
              },
            ],
            as: 'isLikedByCurrentUser',
          },
        },
        {
          $addFields: {
            isLikedByCurrentUser: {
              $cond: [{ $eq: [{ $size: '$isLikedByCurrentUser' }, 0] }, false, true],
            },
          },
        },
        {
          $sort: { createdAt: recurringCount === 1 ?  -1 : 1 } 
        },
        ...commentsLookupsQuery(currentUser, false, recurringCount + 1)
      ],
      as: 'comments' ,
    },
  }])
  else return []
}

const addPost = async (req, res, next) => {
  const { currentUser } = req;
  const { title, content, coverImage, tags , groupid, filetype} = req.body;
  var parsedTags = tags ? tags.split(",") : []
  const post = await PostModel.create(
    {
        title,
        content,
        tags: parsedTags,
        coverImage: coverImage ? coverImage : null,  
        group: groupid ? mongoose.Types.ObjectId(groupid) : null,  
        author: mongoose.Types.ObjectId(currentUser),
        fileType: filetype
    }
  );
  return {data: {post: {_id: post._id}}}
};

const fetchByID = async (req, res, next) => {
  const { currentUser } = req;
  const postid = req.params.postid;
  
  // Fetch Post
  const post = await PostModel.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(postid) } },
    ...lookupsQuery(currentUser),
    ...commentsLookupsQuery(currentUser),
    { $limit: 1 },
  ]);

  if (post.length === 0) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    throw error;
  }

  const singlePost = post[0];
  // Fetch author relation with current user
  let friendStatus = false;
  req.user = singlePost.author;
  friendStatus = await FriendsService.getFriendStatus(req);
  friendStatus = friendStatus?.data?.friendStatus;

  // Fetch related posts
  var relatedPosts = await PostModel.find(
    {
      author:  mongoose.Types.ObjectId(singlePost.author._id),
       _id: { $ne: mongoose.Types.ObjectId(singlePost._id) },
       sharedPost: null,
    }
  ).populate('tags')
  .sort({ createdAt: -1 })
  .limit(3).exec();
  if(relatedPosts?.length > 0){
    relatedPosts = relatedPosts.map(item => PostDto(item, false, false))
  }

  // Add view to the post
  await addView(currentUser, singlePost._id)

  return {data: {post: PostDto(singlePost, friendStatus), relatedPosts}}
};

const fetchByUser = async (req, res, next) => {
  const { currentUser } = req;
  const {  username } = req.params;

  var user_id;
  if(username){
    var res = await UserModel.find({username});
    if(res.length > 0){
      user_id = res[0]._id
    }
    else{
      const error = new Error("Username Not found!");
      error.statusCode = 404;
      throw error;
    }
  }


  const page = req.query.page || 1;
  const limit = req.query.limit || APP_CONSTANT.POST_LIMIT;
  const [result] = await PostModel.aggregate([
    { $match: {  author: mongoose.Types.ObjectId(user_id || currentUser) } },
    { $sort: { createdAt: -1 } },
    {
      $facet: {
        data: [
          { $skip: (page - 1) * limit },
          { $limit: limit },
          ...lookupsQuery(currentUser),
        ],
        total: [{ $count: 'total' }]
      }
    }
  ]);
  if(result.data?.length > 0){
    result.data = result.data.map(item => PostDto(item, false))
  }
  return { data: {posts: result.data || [], totalPosts: result.total  || 0}  };
};

const fetchByGroup = async (req, res, next) => {
  const { currentUser } = req;
  const { groupid } = req.params;
  const page = req.query.page || 1;
  const limit = req.query.limit || APP_CONSTANT.POST_LIMIT;
  const [result] = await PostModel.aggregate([
    { $match: {  group: mongoose.Types.ObjectId(groupid) } },
    { $sort: { createdAt: -1 } },
    {
      $facet: {
        data: [
          { $skip: (page - 1) * limit },
          { $limit: limit },
          ...lookupsQuery(currentUser),
        ],
        total: [{ $count: 'total' }]
      }
    }
  ]);
  if(result.data?.length > 0){
    result.data = result.data.map(item => PostDto(item, false))
  }
  return { data: {posts: result.data || [], totalPosts: result.total  || 0}  };
};


const fetchReleventPosts =  async (req, res, next) => {
  const { currentUser } = req;
  const page = req.query.page || 1;
  const limit = req.query.limit || APP_CONSTANT.POST_LIMIT;

  const  topicIds = await UserService.fetchUserInterestsIdsAsArray(req);
  let friendIDs = await FriendsService.fetchAllFriendsIDsAsArray(req);
  let groupIDs = await GroupService.fetchAllJoinedGroupIDsAsArray(req);
  friendIDs.data.friendIds.push(mongoose.Types.ObjectId(currentUser))
  const [result] = await PostModel.aggregate([
    { $match: 
      { $or: 
          [
            {author: { $in: friendIDs?.data?.friendIds || [] }},
            {tags: {$in: topicIds?.data?.topicIds || []}},
            {group: {$in: groupIDs?.data?.groupIDs || []}}
          ]
      },
    },
    { $sort: { createdAt: -1 }, },
    {
      $facet: {
        data: [
          { $skip: (page - 1) * limit },
          { $limit: limit },    
          ...lookupsQuery(currentUser),
        ],
        total: [{ $count: 'total' }]
      }
    }
  ]);
  if(result.data?.length > 0){
    result.data = result.data.map(item => PostDto(item, false))
  }
  return { data: {posts: result.data || [], totalPosts: result.total  || 0}  };
};

const fetchFriendsPosts =  async (req, res, next) => {
  const { currentUser } = req;
  const page = req.query.page || 1;
  const limit = req.query.limit || APP_CONSTANT.POST_LIMIT;
  let friendIDs = await FriendsService.fetchAllFriendsIDsAsArray(req);
  const [result] = await PostModel.aggregate([
    { $match: { author: { $in: friendIDs.data.friendIds } },},
    { $sort: { createdAt: -1 }, },
    {
      $facet: {
        data: [
          { $skip: (page - 1) * limit },
          { $limit: limit },
          ...lookupsQuery(currentUser),
        ],
        total: [{ $count: 'total' }]
      }
    }
  ]);
  if(result.data?.length > 0){
    result.data = result.data.map(item => PostDto(item, false))
  }
  return { data: {posts: result.data || [], totalPosts: result.total  || 0}  };
};

const likePost = async (req, res, next) => {
  const { currentUser } = req;
  const postid = req.params.postid;
  const post = await PostModel.findById(postid);
  if (!post) {
    const error = new Error("Post Not found!");
    error.statusCode = 404;
    throw error;
  }
  
  const prevlike = await LikeModel.findOne({
    user: mongoose.Types.ObjectId(currentUser),
    post: mongoose.Types.ObjectId(post._id),
  });
  var isLikedByCurrentUser = null;
  if(!prevlike) {
    await LikeModel.create({
      user: mongoose.Types.ObjectId(currentUser),
      post: mongoose.Types.ObjectId(post._id),
      type: 'post'
    });
    isLikedByCurrentUser = true;
  }
  else{
    await LikeModel.findByIdAndDelete(prevlike._id);
    isLikedByCurrentUser = false;
  }
  if(isLikedByCurrentUser === true && post.author.toString() !== currentUser.toString()){
    await NotificationServices.newNotification({
        user: post.author,
        is_seen: false,
        by: currentUser,
        type: 'reaction',
        action: `/posts/${post._id}`,
        post: post._id,
    });
  }
  return {data: {isLikedByCurrentUser}}
};

const addView = async (user, post) => {  
  const prevView = await ViewModel.findOne({
    user: mongoose.Types.ObjectId(user),
    post: mongoose.Types.ObjectId(post),
  });
  if(!prevView){
    await ViewModel.create({
        user: mongoose.Types.ObjectId(user),
        post: mongoose.Types.ObjectId(post),
        type: 'post'
    });
  }
}

const sharePost = async(req, res, next) => {
  const { currentUser } = req;
  const postid = req.params.postid;
  const post = await PostModel.findById(postid);
  if (!post) {
    const error = new Error("Post Not found!");
    error.statusCode = 404;
    throw error;
  }
  const sharedPost = await PostModel.create(
    {
        title: post.title,
        sharedPost: post._id,
        author: mongoose.Types.ObjectId(currentUser)
    }
  );
  return {data: {sharedPost: PostDto(sharedPost)}}
};

const PostService = {
  addPost,
  fetchByID,
  fetchByUser,
  fetchByGroup,
  fetchReleventPosts,
  fetchFriendsPosts,
  likePost,
  sharePost
};
export default PostService;
