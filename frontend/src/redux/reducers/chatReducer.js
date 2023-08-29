import { types as t } from "../types";
const initialState = {
  activeChats: [],
};

const chatReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    // Active Chats
    case t.SET_ACTIVE_CHAT:
      const hasChat = state.activeChats.some(obj => obj.user._id === payload?.user?._id);
      if(!hasChat)
      return {
        ...state,
        activeChats: [ payload, ...state.activeChats],
      }
      else return state
    case t.CLOSE_ACTIVE_CHAT:
      return {
        ...state,
        activeChats: state.activeChats.filter((item)=>(payload?.user?._id !== item.user._id)),
      }
    case t.ADD_MESSAGE_TO_CHAT:
      return {
        ...state,
        activeChats: state.activeChats.map((item) => {
          if (payload.room === item?._id) {
            return {
              ...item,
              messages: [payload, ...item.messages],
            };
          }
          return item;
        }),
      };
    case t.NEW_CHAT:
      return {
        ...state,
        activeChats: [...state.activeChats, payload]
      };
    default:
      return state;
  }
};

export default chatReducer;
