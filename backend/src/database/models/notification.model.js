import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    comment: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comments',
    },
    post: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
    },
    user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",        
        require: true,
    },
    by: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",    
    },
    type: {
      type: String,
      enum: ['reaction', 'comments', 'mention'],
      required: true,
    },
    is_seen: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
    },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("notifications", notificationSchema);
export default NotificationModel;
