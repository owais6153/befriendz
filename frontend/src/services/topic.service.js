import axios from "axios";
import { apiUrl } from "../shared/helper";

const API_URL = apiUrl("topics");

const listAll = (token = null) => {
  return axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
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

const TopicService = { listAll, options };

export default TopicService;
