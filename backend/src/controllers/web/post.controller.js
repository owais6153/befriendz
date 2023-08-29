import PostService from "../../services/web/post.service.js";
import { createError, createResponse } from "../../utils/helper.js";

const addPost = async (req, res, next) => {
  try {
    let response = await PostService.addPost(req);
    response.message = `Post Inserted`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};
const viewPost = async (req, res, next) => {
  try {
    let response = await PostService.fetchByID(req);
    response.message = `Post Fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};
const likePost = async (req, res, next) => {
  try {
    let response = await PostService.likePost(req);
    response.message = `Action performed`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};
const sharePost = async (req, res, next) => {
  try {
    let response = await PostService.sharePost(req);
    response.message = `Action performed`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};
const fetchReleventPosts = async (req, res, next) => {
  try {
    let response = await PostService.fetchReleventPosts(req);
    response.message = `Action performed`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const fetchFriendsPosts = async (req, res, next) => {
  try {
    let response = await PostService.fetchFriendsPosts(req);
    response.message = `Action performed`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};


const PostController = {
  addPost,
  likePost,
  viewPost,
  sharePost,
  fetchReleventPosts,
  fetchFriendsPosts
};

export default PostController;
