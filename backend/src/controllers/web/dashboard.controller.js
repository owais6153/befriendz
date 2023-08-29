import FriendsService from "../../services/web/freinds.service.js";
import UserService from "../../services/web/user.service.js";
import GroupService from "../../services/web/group.service.js";
import PostService from "../../services/web/post.service.js";
import { createError, createResponse } from "../../utils/helper.js";
import WebinarService from "../../services/web/webinar.service.js";
import TrainingService from "../../services/web/training.service.js";

const newsfeed = async (req, res, next) => {
  try {
    let friendRequests = await FriendsService.fetchFriendRequests(req);
    let fetchNewsFeed = await PostService.fetchReleventPosts(req);
    let pinnedGroups = await GroupService.fetchPinnedGroups(req);
    let response = {data: {...friendRequests.data, ...fetchNewsFeed.data, ...pinnedGroups.data }, message: `Friends Fetched`};
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};
const friendsNewsfeed = async (req, res, next) => {
  try {
    let friendRequests = await FriendsService.fetchFriendRequests(req);
    let fetchNewsFeed = await PostService.fetchFriendsPosts(req);
    let pinnedGroups = await GroupService.fetchPinnedGroups(req);
    let response = {data: {...friendRequests.data, ...fetchNewsFeed.data, ...pinnedGroups.data  }, message: `Friends Fetched`};
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const friends = async (req, res, next) => {
  try {
    let friendRequests = await FriendsService.fetchFriendRequests(req);
    let fetchFriends = await FriendsService.fetchFriends(req);
    let response = {data: {friendRequests: friendRequests.data, friends: fetchFriends.data}};
    response.message = `Friends Fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const profile = async (req, res, next) => {
  try {
    let fetchUser = await UserService.fetchUser(req);
    let fetchFriends = await FriendsService.fetchFriends(req);    
    let fetchPosts = await PostService.fetchByUser(req);    
    const response = {message: `Profile Fetched`, data: { ...fetchUser?.data, ...fetchFriends?.data, ...fetchPosts.data}};
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const groups = async (req, res, next) => {
  try {
    const fetchRelatedGroups = await GroupService.fetchRelatedGroups(req);
    const fetchFastestGrowingGroups = await GroupService.fetchFastestGrowingGroups(req);
    const fetchPopularGroups = await GroupService.fetchPopularGroups(req);
    const fetchNewlyLaunched = await GroupService.fetchNewlyLaunched(req);
    const response = {message: `Groups Fetched`, data: { ...fetchRelatedGroups?.data, ...fetchFastestGrowingGroups?.data, ...fetchPopularGroups?.data, ...fetchNewlyLaunched?.data}};
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const webinars = async (req, res, next) => {
  try {
    const fetchRelatedGroups = await WebinarService.fetchRelatedWebinars(req);
    const response = {message: `Webinars Fetched`, data: { ...fetchRelatedGroups?.data}};
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};
const trainings = async (req, res, next) => {
  try {
    const fetchRelatedGroups = await TrainingService.fetchRelatedTrainings(req);
    const response = {message: `Webinars Fetched`, data: { ...fetchRelatedGroups?.data}};
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};


const DashboardController = {
  newsfeed,
  friends,
  profile,
  friendsNewsfeed,
  groups,
  trainings,
  webinars
};

export default DashboardController;
