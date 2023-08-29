import TopicService from "../../services/web/topic.service.js";
import { createError, createResponse } from "../../utils/helper.js";

const topicLists = async (req, res, next) => {
  try {
    let response = await TopicService.findAll(req);
    response.message = `Topics fetched successfully`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};
const topicsAsOptions = async (req, res, next) => {
  try {
    let response = await TopicService.fetchAsOptions(req);
    response.message = `Options fetched successfully`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const TopicController = {
  topicLists,topicsAsOptions
};

export default TopicController;
