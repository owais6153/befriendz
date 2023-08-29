import express from "express";
import DashboardController from "../controllers/web/dashboard.controller.js";
import WebAuthMiddleware from "../middlewares/web-auth.js";

const DashboardRouter = express.Router();
DashboardRouter.get("/", WebAuthMiddleware, DashboardController.newsfeed); 
DashboardRouter.get("/friends", WebAuthMiddleware, DashboardController.friends); 
DashboardRouter.get("/friends/posts", WebAuthMiddleware, DashboardController.friendsNewsfeed); 
DashboardRouter.get("/user", WebAuthMiddleware, DashboardController.profile);
DashboardRouter.get("/user/:username", WebAuthMiddleware, DashboardController.profile);
DashboardRouter.get("/all-groups", DashboardController.groups);
DashboardRouter.get("/all-webinars", WebAuthMiddleware, DashboardController.webinars);
DashboardRouter.get("/all-trainings", WebAuthMiddleware, DashboardController.trainings);

export default DashboardRouter;
