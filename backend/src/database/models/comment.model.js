import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    content: {
      type: String,
      required: true,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comments',
      default: null,
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comments", commentSchema);
export default CommentModel;
