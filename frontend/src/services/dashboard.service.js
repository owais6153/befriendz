import axios from "axios";
import { apiUrl } from "../shared/helper";

const API_URL = apiUrl();


const friends = (token) => {
  const url = `friends`;
  return axios.get(
   API_URL + url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const newsfeed = (token) => {
  const url = ``;
  return axios.get(
   API_URL + url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const friendsNewsfeed = (token) => {
  const url = `friends/posts`;
  return axios.get(
   API_URL + url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const groups = (token) => {
  const url = `all-groups`;
  return axios.get(
   API_URL + url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const webinars = (token) => {
  const url = `all-webinars`;
  return axios.get(
   API_URL + url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const trainings = (token) => {
  const url = `all-trainings`;
  return axios.get(
   API_URL + url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const subscriptions = (token) => {
  const url = `subscriptions`;
  return axios.get(
   API_URL + url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


const DashboardService = { 
  friends,
  newsfeed,
  groups,
  webinars,
  friendsNewsfeed,
  trainings,
  subscriptions,
 };
export default DashboardService;
