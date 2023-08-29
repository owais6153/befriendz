import express from "express";
import SubscriptionController from "../controllers/web/subscription.controller.js";

const TopicRouter = express.Router();

TopicRouter.get("/", SubscriptionController.fetchSubscriptions);

export default TopicRouter;
