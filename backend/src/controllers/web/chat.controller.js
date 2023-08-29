import { createError, createResponse } from "../../utils/helper.js";
import ChatService from "../../services/web/chat.service.js";

const newMessage = async (req, res, next) => {
  try {
    let response = await ChatService.newMessage(req);
    response.message = `Message Inserted`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const ChatController = {
  newMessage,
};

export default ChatController;
