import { createError, createResponse } from "../../utils/helper.js";
import WebinarService from "../../services/web/webinar.service.js";

const addWebinar = async (req, res, next) => {
  try {
    let response = await WebinarService.addWebinar(req);
    response.message = `Webinar Inserted`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const viewWebinar = async (req, res, next) => {
  try {
    let response =  await WebinarService.fetchByID(req);
    response.message = `Webinar Fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};
const fetchWebinars = async (req, res, next) => {
  try {
    let response =  await WebinarService.fetchRelatedWebinars(req);
    response.message = `Webinar Fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const searchWebinars = async (req, res, next) => {
  try {
    let response =  await WebinarService.searchWebinars(req);
    response.message = `Webinar Fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const WebinarController = {
  addWebinar,
  viewWebinar,
  fetchWebinars,
  searchWebinars
};

export default WebinarController;
