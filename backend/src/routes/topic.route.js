import express from "express";
import TopicController from "../controllers/web/topic.controller.js";

const TopicRouter = express.Router();

TopicRouter.get("/", TopicController.topicLists);
TopicRouter.get("/options", TopicController.topicsAsOptions);

export default TopicRouter;
