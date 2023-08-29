import mongoose from "mongoose";
import { FRIEND_STATUS } from "../../utils/constants/user.js";
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      require: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      require: true,
    },
    status: {
      type: String,
      enum: [FRIEND_STATUS.pending, FRIEND_STATUS.accepted, FRIEND_STATUS.rejected, FRIEND_STATUS.cancelled, FRIEND_STATUS.not_friend],
      default: FRIEND_STATUS.pending,
      require: true,
    }
  },
  { timestamps: true }
);

const FriendRequestModel = mongoose.model("friend_requests", friendRequestSchema);
export default FriendRequestModel;
