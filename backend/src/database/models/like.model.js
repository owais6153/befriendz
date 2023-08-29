import mongoose from "mongoose";
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comments',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    type: {
      type: String,
      enum: ['post', 'comment'],
      required: true,
    },
  },
  { timestamps: true }
);

const LikeModel = mongoose.model("likes", likeSchema);
export default LikeModel;
