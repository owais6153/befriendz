import mongoose from "mongoose";
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    coverImage: {
      type: String,
      require: true,
    },
    bannerImage: {
      type: String,
      require: true,
    },
    about: {
      type: String,
      require: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topics",
      },
    ],
    author: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",        
        require: true,
    },
  },
  { timestamps: true }
);

const GroupModel = mongoose.model("groups", groupSchema);
export default GroupModel;
