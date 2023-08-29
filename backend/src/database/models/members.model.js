import mongoose from "mongoose";
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    group: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groups",
    },
    webinar: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "webinars",
    },
    user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",        
        require: true,
    },
    type: {
      type: String,
      enum: ['group', 'webinar', 'training'],
      required: true,
    },
    member_type: {
      type: String,
      enum: ['admin', 'member', 'moderator'],
      required: true,
      default: 'member'
    },
  },
  { timestamps: true }
);

const MemberModel = mongoose.model("members", memberSchema);
export default MemberModel;
