import express from "express";
import GroupController from "../controllers/web/group.controller.js";
import { add_group_validation } from "./validation/group.route.validation.js";
import { FILE_CONSTANT } from "../utils/constants/file.js";
import { uploadFile, fileHandling } from "../utils/file.upload.js";
import WebAuthMiddleware from "../middlewares/web-auth.js";

const GroupRouter = express.Router();

GroupRouter.get("/", WebAuthMiddleware,  GroupController.fetchGroups);
GroupRouter.get("/search",  GroupController.searchGroups);
GroupRouter.post("/add", WebAuthMiddleware,
    (req, res, next) => {    
    // File Size And Ext Configration for each route
    const upload =  uploadFile(FILE_CONSTANT.SIZE['10MB'], FILE_CONSTANT.EXT.IMAGE,  false);
    upload.fields([
      {
        name: 'coverImage', maxCount: 1,
      },
      {
        name: 'bannerImage', maxCount: 1,
      },
    ])(req, res, err => {
      fileHandling(req, res, err, next)
    })    
}, add_group_validation,  GroupController.addGroup);
GroupRouter.get("/options", WebAuthMiddleware, GroupController.groupAsOptions);
GroupRouter.get("/:groupid",  GroupController.viewGroup);
GroupRouter.put("/:groupid/pin", WebAuthMiddleware,  GroupController.pinGroup);
GroupRouter.put("/:groupid/join", WebAuthMiddleware,  GroupController.joinGroup);
GroupRouter.put("/:groupid/leave", WebAuthMiddleware,  GroupController.leaveGroup);
GroupRouter.get("/:groupid/posts", WebAuthMiddleware,  GroupController.fetchGroupPosts);


export default GroupRouter;
