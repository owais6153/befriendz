import axios from "axios";
import { apiUrl } from "../shared/helper";

const API_URL = apiUrl("user");

// Update Profile
const updateProfile = (data, token) => {
  return axios.post(
    API_URL + "/update-profile",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const updatePassword = (data, token) => {
  return axios.post(
    API_URL + "/update-password",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Fetch Profile
const getProfile = (token, username = null) => {
  //If has usrename then fetch profile by username else fetch current user profile
  const url = username !== null ? `/${username}` : '' 

  return axios.get(
   API_URL + url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const fetchUserPosts = (token = null, username = null, page = 1) => {
  const url = username !== null ? `/${username}` : '' 
  
  return axios.get(API_URL +  url + `/posts?page=${page}`, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};


const sendMessage = (token = null, data, user) => {
  const url =  `/${user}/message`; 
  
  return axios.post(API_URL +  url, data, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const UserService = { 
  updateProfile,
  updatePassword,
  getProfile,
  fetchUserPosts,
  sendMessage
 };
 
export default UserService;
