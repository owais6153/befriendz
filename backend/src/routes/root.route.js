import express from "express";
import TopicRouter from "./topic.route.js";
import AuthRouter from "./auth.route.js";
import UserRouter from "./user.route.js";
import DashboardRouter from "./dashboard.route.js";
import PostRouter from "./post.route.js";
import SubscriptionRouter from "./subscription.route.js";
import GroupRouter from "./group.route.js";
import WebinarRouter from "./webinar.route.js";
import TrainingRouter from "./training.route.js";
import ChatRouter from "./chat.route.js";
import WebAuthMiddleware from "../middlewares/web-auth.js";

const rootRouter = express.Router();

rootRouter.use("/auth", AuthRouter);
rootRouter.use("/topics", WebAuthMiddleware, TopicRouter);
rootRouter.use("/user", WebAuthMiddleware, UserRouter);
rootRouter.use("/posts", WebAuthMiddleware, PostRouter);
rootRouter.use("/subscriptions", SubscriptionRouter);
rootRouter.use("/groups", GroupRouter);
rootRouter.use("/webinars", WebAuthMiddleware, WebinarRouter);
rootRouter.use("/trainings", WebAuthMiddleware, TrainingRouter);
rootRouter.use("/chat", WebAuthMiddleware, ChatRouter);
rootRouter.use("/", DashboardRouter); //Dashboard Pages

export default rootRouter;
