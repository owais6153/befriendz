import GroupService from "../../services/web/group.service.js";
import PostService from "../../services/web/post.service.js";
import { createError, createResponse } from "../../utils/helper.js";

const addGroup = async (req, res, next) => {
  try {
    let response = await GroupService.addGroup(req);
    response.message = `Group Inserted`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const viewGroup = async (req, res, next) => {
  try {
    let fetchGroup =  await GroupService.fetchByID(req);
    let fetchPosts = await PostService.fetchByGroup(req);    
    const response = {message: `Group Fetched`, data: { ...fetchGroup?.data, ...fetchPosts?.data}};

    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const searchGroups = async (req, res, next) => {
  try {
    const response =  await GroupService.searchGroups(req);
    response.message= `Group Fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const groupAsOptions = async (req, res, next) => {
  try {
    let response = await GroupService.fetchAsOptions(req);
    response.message = `Group Fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const joinGroup = async (req, res, next) => {
  try {
    let response = await GroupService.joinGroup(req);
    response.message = `Group Joined`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const leaveGroup = async (req, res, next) => {
  try {
    let response = await GroupService.leaveGroup(req);
    response.message = `Group Leaved`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const fetchGroupPosts = async (req, res, next) => {
  try {
    const response = await PostService.fetchByGroup(req);    
    response.message = `Group Joined`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const fetchGroups = async (req, res, next) => {
  try {
    const response = await GroupService.fetchRelatedGroups(req);    
    response.message = `Group Joined`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const pinGroup = async (req, res, next) => {
  try {
    const response = await GroupService.pinGroup(req);    
    response.message = `Action Performed`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const GroupController = {
  addGroup,
  viewGroup,
  groupAsOptions,
  joinGroup,
  leaveGroup,
  fetchGroupPosts,
  fetchGroups,
  searchGroups,
  pinGroup
};

export default GroupController;