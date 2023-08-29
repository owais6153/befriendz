import axios from "axios";
import { apiUrl } from "../shared/helper";

const API_URL = apiUrl("posts");

const fetchReleventPosts = (token = null, page = 1) => {
  return axios.get(API_URL + '?page=' + page, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const fetchFreindsPosts = (token = null, page = 1) => {
  return axios.get(API_URL + '/friends?page=' + page, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};


const addPost = (token = null, data) => {
  return axios.post(`${API_URL}/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`, 
      'content-type': 'multipart/form-data',
     },
  });
};

const viewPost = (token = null, postid) => {
  return axios.get(`${API_URL}/${postid}`,  {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const likePost = (token = null, postid) => {
  return axios.put(`${API_URL}/${postid}/like`, {}, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const sharePost = (token = null, postid) => {
  return axios.post(`${API_URL}/${postid}/share`, {}, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const addComment = (token = null, postid, data) => {
  return axios.post(`${API_URL}/${postid}/comment/add`, data, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const likeComment = (token = null, postid, commentid) => {
  return axios.put(`${API_URL}/${postid}/comment/${commentid}/like`, {}, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const PostService = { addPost, viewPost, likePost, sharePost, addComment, likeComment, fetchReleventPosts, fetchFreindsPosts };

export default PostService;
