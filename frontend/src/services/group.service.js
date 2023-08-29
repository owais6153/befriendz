import axios from "axios";
import { apiUrl } from "../shared/helper";

const API_URL = apiUrl("groups");

const fetchReleventGroups = (token = null,  page = 1) => {
  return axios.get(`${API_URL}?page=${page}`, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const searchGroups = (token = null, term, page = 1) => {
  return axios.get(`${API_URL}/search?term=${term}&page=${page}`, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const pinGroup = (token = null, groupid) => {
  return axios.put(`${API_URL}/${groupid}/pin`, {}, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const addGroup = (token = null, data) => {
  return axios.post(`${API_URL}/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`, 
      'content-type': 'multipart/form-data',
     },
  });
};

const viewGroup = (token = null, groupid) => {
  return axios.get(`${API_URL}/${groupid}`,  {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const joinGroup = (token = null, groupid) => {
  return axios.put(`${API_URL}/${groupid}/join`, {}, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const leaveGroup = (token = null, groupid) => {
  return axios.put(`${API_URL}/${groupid}/leave`, {}, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const fetchGroupPosts = (token = null, groupid, page = 1) => {
  return axios.get(`${API_URL}/${groupid}/posts?page=${page}`, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const options = (token = null, search = false, loadedOptions = false) => {

  const url = new URL(`${API_URL}/options?`);
  const params = new URLSearchParams(url.search);
  if(search)
  params.set("search", search);
  if(loadedOptions)
  params.set("offset", loadedOptions.length);


  return axios.get(url + params.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const GroupService = { addGroup, viewGroup, options, joinGroup, leaveGroup, fetchGroupPosts, fetchReleventGroups, searchGroups, pinGroup };

export default GroupService;
