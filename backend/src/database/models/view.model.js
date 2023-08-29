import mongoose from "mongoose";
const Schema = mongoose.Schema;

const viewSchema = new Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },

  },
  { timestamps: true }
);

const ViewModel = mongoose.model("views", viewSchema);
export default ViewModel;
