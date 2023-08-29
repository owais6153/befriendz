import { types as t } from "../types";

const openChatAction = (data) => (dispatch) => {
    dispatch({
        type: t.SET_ACTIVE_CHAT,
        payload: data,
    })
};
const closeChatAction = (data) => (dispatch) => {
    dispatch({
        type: t.CLOSE_ACTIVE_CHAT,
        payload: data,
    })
}
const addMessageToChatAction = (data) => (dispatch) => {
    dispatch({
        type: t.ADD_MESSAGE_TO_CHAT,
        payload: data,
    })
};
const newChatAction = (data) => (dispatch) => {
    dispatch({
        type: t.NEW_CHAT,
        payload: data,
    })
};

export {
  openChatAction,
  closeChatAction,
  newChatAction,
  addMessageToChatAction
};
