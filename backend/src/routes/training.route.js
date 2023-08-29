import express from "express";
import TrainingController from "../controllers/web/training.controller.js";
import { add_training_validation } from "./validation/training.route.validation.js";
import { FILE_CONSTANT } from "../utils/constants/file.js";
import { uploadFile, fileHandling } from "../utils/file.upload.js";

const TrainingRouter = express.Router();

TrainingRouter.get('/', TrainingController.fetchTrainings)
TrainingRouter.get('/search', TrainingController.searchTrainings)
TrainingRouter.post("/add",   
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
}, add_training_validation,  TrainingController.addTraining);
TrainingRouter.get("/:trainingid",  TrainingController.viewTraining);

export default TrainingRouter;
