import { config } from "dotenv";
import NotificationModel from "../../database/models/notification.model.js";
import { SOCKET_EVENTS } from "../../utils/constants/events.js";
import { to } from "../../config/socket.js";
import NotificationDto from "../../dto/notification.dto.js";
config();


const newNotification = async (data) => {
  const notification = await NotificationModel.create(data);
  const populateNotification = await NotificationModel.populate(notification, [
    {path: "comment"},
    {path: "parentComment"},
    {path: "post"},
    {path: "user"},
    {path: "by"}
  ])
  
  await to(data.user.toString(), SOCKET_EVENTS.NEW_NOTIFICATION, NotificationDto(notification));
  return {data: {notification: NotificationDto(notification)}}
};

const NotificationServices = {
  newNotification,
};
export default NotificationServices;
