import axios from "axios";
import { apiUrl } from "../shared/helper";

const API_URL = apiUrl("user");

// Send Friend Request
const sendFriendReuest = (token, user) => {
  const url = `/${user}/send-friend-request`;
  return axios.put(
   API_URL + url,
   {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


const cancelFriendRequest = (token, request_id) => {
  const url = `/${request_id}/cancel`;
  return axios.put(
   API_URL + url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const rejectFriendRequest = (token, request_id) => {
  const url = `/${request_id}/reject`;
  return axios.put(
   API_URL + url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const acceptFriendRequest = (token, request_id) => {
  const url = `/${request_id}/accept`;
  return axios.put(
   API_URL + url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const unfriendUser = (token, user) => {
  const url = `/${user}/unfriend`;
  return axios.put(
   API_URL + url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const fetchFriends = (token, page = 1) =>{
  const url = `/my-friends?page=${page}`;
  return axios.get(
   API_URL + url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const fetchFriendRequests = (token, page = 1) =>{
  const url = `/friend-requests?page=${page}`;
  return axios.get(
   API_URL + url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}


const FriendsService = { 
  sendFriendReuest,
  rejectFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  unfriendUser,
  fetchFriends,
  fetchFriendRequests
 };
export default FriendsService;
