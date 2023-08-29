import { config } from "dotenv";
import mongoose from "mongoose";
import CommentModel from "../../database/models/comment.model.js";
import PostModel from "../../database/models/post.model.js";
import LikeModel from "../../database/models/like.model.js";
import CommentDto from "../../dto/comment.dto.js";
import NotificationServices from "./notification.service.js";
config()

const addComment = async (req, res, next) => {
  const { currentUser } = req;
  const postid = req.params.postid;
  const { content, parentComment  } = req.body;
  const post = await PostModel.findById(postid);
  if (!post) {
    const error = new Error("Post Not found!");
    error.statusCode = 404;
    throw error;
  }

  var parComment = false;
  if(parentComment){
    parComment= await  CommentModel.findById(parentComment)
    if(!parComment){
      const error = new Error("Parent Comment Not found!");
      error.statusCode = 404;
      throw error;
    }
  }

  const comment = await CommentModel.create({
    content,
    parentComment: parentComment || null,
    user: mongoose.Types.ObjectId(currentUser),
    post: mongoose.Types.ObjectId(postid)
  });  
  const populatedComment = await CommentModel.populate(comment, { path: 'user' });

  var already_sent;
  if(currentUser.toString() !== post.author.toString()){ // User is not commented on its own post
    NotificationServices.newNotification({
      user: post.author,
      is_seen: false,
      by: currentUser,
      type: 'comments',
      action: `/posts/${post._id}`,
      post: post._id,
      comment: comment._id,
    })
    already_sent =  post.author.toString();
  }
  
  // If this is a reply to comment
  // if notification is not already sent
  // Not replying to own comment
  if(parComment && parComment.user.toString() !== already_sent && currentUser.toString() !== parComment.user.toString()){
      NotificationServices.newNotification({
        user: parComment.user,
        is_seen: false,
        by: currentUser,
        type: 'comments',
        action: `/posts/${post._id}`,
        post: post._id,
        comment: comment._id,
        parentComment: parentComment || null,
      })
    }

  return {data: {comment :CommentDto(populatedComment)}}
};

const addLike = async (req, res, next) => {
  const { currentUser } = req;
  const postid = req.params.postid;
  const commentid = req.params.commentid;

  const post = await PostModel.findById(postid);
  if (!post) {
    const error = new Error("Post Not found!");
    error.statusCode = 404;
    throw error;
  }

  const comment = await CommentModel.findById(commentid);

  if (!comment) {
    const error = new Error("Post Not found!");
    error.statusCode = 404;
    throw error;
  }

  const prevlike = await LikeModel.findOne({
    user: mongoose.Types.ObjectId(currentUser),
    comment: mongoose.Types.ObjectId(commentid),
  });
  var isLikedByCurrentUser = null;
  if(!prevlike) {
    await LikeModel.create({
      user: mongoose.Types.ObjectId(currentUser),
      comment: mongoose.Types.ObjectId(commentid),
      type: 'comment'
    });
    isLikedByCurrentUser = true;
  }
  else{
    await LikeModel.findByIdAndDelete(prevlike._id);
    isLikedByCurrentUser = false;
  }
  if(isLikedByCurrentUser === true && comment.user.toString() !== currentUser.toString()){
    await NotificationServices.newNotification({
        user: comment.user,
        comment: commentid,
        is_seen: false,
        by: currentUser,
        type: 'reaction',
        action: `/posts/${post._id}`,
    });
  }
  return {data: {isLikedByCurrentUser}}
};

const CommentService = {
  addComment,addLike
};
export default CommentService;
