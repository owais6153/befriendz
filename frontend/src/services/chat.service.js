import axios from "axios";
import { apiUrl } from "../shared/helper";

const API_URL = apiUrl("chat");


const newMessage = (token, data, userid) => {
  const url = `/new/${userid}`;
  return axios.post(
   API_URL + url, data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const ChatService = { 
  newMessage,
 };
export default ChatService;