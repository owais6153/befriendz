import express from "express";
import WebinarController from "../controllers/web/webinar.controller.js";
import { add_webinar_validation } from "./validation/webinar.route.validation.js";
import { FILE_CONSTANT } from "../utils/constants/file.js";
import { uploadFile, fileHandling } from "../utils/file.upload.js";

const WebinarRouter = express.Router();

WebinarRouter.get('/', WebinarController.fetchWebinars)
WebinarRouter.get('/search', WebinarController.searchWebinars)
WebinarRouter.post("/add",   
    (req, res, next) => {    
    // File Size And Ext Configration for each route
    const upload =  uploadFile(FILE_CONSTANT.SIZE['10MB'], FILE_CONSTANT.EXT.IMAGE,  false);
    upload.fields([
      {
        name: 'coverImage', maxCount: 1,
      }
    ])(req, res, err => {
      fileHandling(req, res, err, next)
    })    
}, add_webinar_validation,  WebinarController.addWebinar);
WebinarRouter.get("/:webinarid",  WebinarController.viewWebinar);

export default WebinarRouter;
