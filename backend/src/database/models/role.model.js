import mongoose from "mongoose";
import {  ROLE_TYPE } from "../../utils/constants/role.js";
const Schema = mongoose.Schema;

const rollSchema = new Schema(
  {
    rolesType: {
      type: String,
      require: true,
      enum: [ROLE_TYPE.normaluser, ROLE_TYPE.superadmin],
      default: ROLE_TYPE.normaluser,
    },
  },
  { timestamps: true }
);

const RollModel = mongoose.model("roles", rollSchema);
export default RollModel;
