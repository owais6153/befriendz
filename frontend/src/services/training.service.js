import axios from "axios";
import { apiUrl } from "../shared/helper";

const API_URL = apiUrl("trainings");

const addTraining = (token = null, data) => {
  return axios.post(`${API_URL}/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`, 
      'content-type': 'multipart/form-data',
     },
  });
};

const viewTraining = (token = null, webinarid) => {
  return axios.get(`${API_URL}/${webinarid}`,  {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const searchTrainings = (token = null, term, page = 1) => {
  return axios.get(`${API_URL}/search?term=${term}&page=${page}`, {
    headers: { 
      Authorization: `Bearer ${token}`, 
    }
  });
};

const TrainingService = { addTraining, viewTraining, searchTrainings };

export default TrainingService;