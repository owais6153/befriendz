import CommentService from "../../services/web/comment.service.js";
import { createError, createResponse } from "../../utils/helper.js";

const addComment = async (req, res, next) => {
  try {
    let response = await CommentService.addComment(req);
    response.message = `Comment Inserted`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const likeComment = async (req, res, next) => {
  try {
    let response = await CommentService.addLike(req);
    response.message = `Comment Liked`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};
const CommentController = {
  addComment,likeComment
};

export default CommentController;
