import { createError, createResponse } from "../../utils/helper.js";
import TrainingService from "../../services/web/training.service.js";

const addTraining = async (req, res, next) => {
  try {
    let response = await TrainingService.addTraining(req);
    response.message = `Training Inserted`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const viewTraining = async (req, res, next) => {
  try {
    let response =  await TrainingService.fetchByID(req);
    response.message = `Training Fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};
const fetchTrainings = async (req, res, next) => {
  try {
    let response =  await TrainingService.fetchRelatedTrainings(req);
    response.message = `Training Fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const searchTrainings = async (req, res, next) => {
  try {
    let response =  await TrainingService.searchTrainings(req);
    response.message = `Training Fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const TrainingController = {
  addTraining,
  viewTraining,
  fetchTrainings,
  searchTrainings
};

export default TrainingController;
