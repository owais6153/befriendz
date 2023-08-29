import express from "express";
import ChatController from "../controllers/web/chat.controller.js";

const ChatRouter = express.Router();
ChatRouter.post("/new/:user", ChatController.newMessage); 

export default ChatRouter;