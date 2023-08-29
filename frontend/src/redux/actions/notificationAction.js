import { types as t } from "../types";

const newNotificationAction = (data) => (dispatch) => {
  dispatch({
    type: t.NEW_NOTIFICATION,
    payload: data,
  });
};

export {
  newNotificationAction,
};
