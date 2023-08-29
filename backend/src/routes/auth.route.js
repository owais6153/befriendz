import express from "express";
import webAuthController from "../controllers/web/auth.controller.js";
import WebAuthMiddleware from "../middlewares/web-auth.js";
import {
  register_validation,
  create_password_validation,
  sign_in_validation,
  verify_otp_validation,
  complete_profile_validation,
  recover_password_validation
} from "./validation/auth.route.validation.js";
import { FILE_CONSTANT } from "../utils/constants/file.js";
import { uploadFile, fileHandling } from "../utils/file.upload.js";


const AuthRouter = express.Router();

AuthRouter.post("/sign-in", sign_in_validation, webAuthController.signinUser);

AuthRouter.post(
  "/register",
  register_validation,
  webAuthController.registerUser
);

AuthRouter.post(
  "/verify-email",
  verify_otp_validation,
  WebAuthMiddleware,
  webAuthController.verifyEmail
);

AuthRouter.post(
  "/create-password",
  create_password_validation,
  WebAuthMiddleware,
  webAuthController.createPassword
);

AuthRouter.post(
  "/complete-profile",
  WebAuthMiddleware,
  (req, res, next) => {    
    // File Size And Ext Configration for each route
    const upload =  uploadFile(FILE_CONSTANT.SIZE['10MB'], FILE_CONSTANT.EXT.IMAGE,  false);
    upload.fields([
      {
        name: 'profileImage', maxCount: 1,
      }, {
        name: 'image1', maxCount: 1,
      }, {
        name: 'image2', maxCount: 1,
      }, {
        name: 'image3', maxCount: 1,
      }
    ])(req, res, err => {
      console.log(req.body)
      // Hnadle error if any else append url to req.body
      fileHandling(req, res, err, next)
    })    
  },
  complete_profile_validation, 
  webAuthController.completeProfile
);

AuthRouter.post( 
  "/recover-password",
  recover_password_validation,
  webAuthController.recoverPassword
);

AuthRouter.get(
  "/resend-otp",
  WebAuthMiddleware,
  webAuthController.resendOTP
);

export default AuthRouter;
