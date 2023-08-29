import axios from "axios";
import { apiUrl } from "../shared/helper";

const API_URL = apiUrl("webinars");

const addWebinar = (token = null, data) => {
  return axios.post(`${API_URL}/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`, 
      'content-type': 'multipart/form-data',
     },
  });
};

const viewWebinar = (token = null, webinarid) => {
  return axios.get(`${API_URL}/${webinarid}`,  {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const searchWebinars = (token = null, term, page = 1) => {
  return axios.get(`${API_URL}/search?term=${term}&page=${page}`, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const WebinarService = { addWebinar, viewWebinar, searchWebinars };

export default WebinarService;