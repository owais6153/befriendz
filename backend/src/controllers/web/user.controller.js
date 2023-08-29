import UserService from "../../services/web/user.service.js";
import { createError, createResponse } from "../../utils/helper.js";
import PostService from "../../services/web/post.service.js";

const updateProfile = async (req, res, next) => {
  try {
    let response = await UserService.updateUser(req);
    response.message = `Profile Updated`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};


const fetchPostsByUser = async (req, res, next) => {
  try {
    const response = await PostService.fetchByUser(req);
    response.message = `Posts fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    await UserService.updatePassword(req);
    createResponse(res, {message: `User Password Updated`});
  } catch (e) {
    createError(res, e, next);
  }
};
const searchUsers = async (req, res, next) => {
  try {
    const response = await UserService.searchUsers(req);
    response.message = `User fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const UserController = {
  updateProfile,
  fetchPostsByUser,
  updatePassword,
  searchUsers
};

export default UserController;
