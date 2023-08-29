import express from "express";
import UserController from "../controllers/web/user.controller.js";
import FriendsController from "../controllers/web/friends.controller.js";
import { update_profile_validation, update_password_validation } from "./validation/user.route.validation.js";
import { FILE_CONSTANT } from "../utils/constants/file.js";
import { uploadFile, fileHandling } from "../utils/file.upload.js";

const UserRouter = express.Router();

UserRouter.get('/search', UserController.searchUsers);
UserRouter.put("/:user/send-friend-request", FriendsController.sendFriendRequest);
UserRouter.put("/:user/unfriend", FriendsController.unfriend);
UserRouter.put("/:freindrequest/cancel", FriendsController.cancelFriendRequest);
UserRouter.put("/:freindrequest/reject", FriendsController.rejectFriendRequest);
UserRouter.put("/:freindrequest/accept", FriendsController.acceptFriendRequest);
UserRouter.post('/update-password', update_password_validation, UserController.updatePassword);
UserRouter.post("/update-profile",  (req, res, next) => {
    // File Size And Ext Configration for each routes
    const upload =  uploadFile(FILE_CONSTANT.SIZE['10MB'], FILE_CONSTANT.EXT.IMAGE,  false);
    upload.fields([
      {
        name: 'profileImage', maxCount: 1,
      }
    ])(req, res, err => {
      console.log(req.body)
      // Hnadle error if any else append url to req.body
      fileHandling(req, res, err, next)
    })    
  }, update_profile_validation, UserController.updateProfile);
UserRouter.get('/my-friends', FriendsController.fetchMyFriends)
UserRouter.get('/friend-requests', FriendsController.fetchFriendRequests)
UserRouter.get("/posts", UserController.fetchPostsByUser);
UserRouter.get("/:username/posts", UserController.fetchPostsByUser);

export default UserRouter;
