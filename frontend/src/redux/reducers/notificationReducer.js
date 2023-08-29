import { types as t } from "redux/types";

const defaultState = {
  notifications: [],
  totalNotifications: [{total: 0}],
  totalUnseen: [{total: 0}],
};

const notificationReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case t.ADD_NOTIFICATIONS:
      return payload
    case t.NEW_NOTIFICATION:
      if(!state.notifications.find((item) => item._id === payload._id))
      return {
        ...state,
        notifications: [payload, ...state.notifications],
        totalNotifications: state.totalNotifications[0].total > 0 ? [{ total: parseInt(state.totalNotifications[0].total) + 1 }] : [{ total: 1 }],
        totalUnseen: state.totalUnseen[0].total > 0 ? [{ total: parseInt(state.totalUnseen[0].total) + 1 }] : [{ total: 1 }],
      };
      else return state
    default:
      return state;
  }
};

export default notificationReducer;