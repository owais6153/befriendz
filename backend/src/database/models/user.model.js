import mongoose from "mongoose";
import { USER_STATUS, USER_TYPE } from "../../utils/constants/user.js";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      default: null,
    },
    last_name: {
      type: String,
      default: null,
    },
    business_name: {
      type: String,
      default: null,
    },
    business_type: {
      type: String,
      default: null,
    },
    business_address: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    profileImage: {
      type: String,
      require: false,
      default: null,
    },
    images: [
      {
        type: String,
        require: false,
        default: null,
      },
    ],
    gender: {
      type: String,
      default: null,
    },
    occupation: {
      type: String,
      default: null,
    },
    about: {
      type: String,
      default: null,
    },
    dob: {
      type: Object,
      default: null,
    },
    status: {
      type: String,
      require: true,
      enum: [USER_STATUS.notVerifiedEmail, USER_STATUS.profilePending, USER_STATUS.completed],
      default: USER_STATUS.notVerifiedEmail,
    },
    type: {
      type: String,
      require: true,
      enum: [USER_TYPE.personal, USER_TYPE.business],
      default: USER_TYPE.personal,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      default: null,
      require: true,
    },
    interests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topics",
      },
    ],
    role_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
      },
    ],
    pinnedGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groups",
      },
    ]
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
