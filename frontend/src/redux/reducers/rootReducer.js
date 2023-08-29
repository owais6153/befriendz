import { combineReducers } from "redux";
import authReducer from "./authReducer";
import notificationReducer from "./notificationReducer";
import commonReducer from "./commonReducer";
import chatReducer from "./chatReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  chat: chatReducer,
  notification: notificationReducer,
});

export default rootReducer;
