import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      default: null,
    },
    coverImage: {
      type: String,
      default: null,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topics",
      },
    ],
    sharedPost: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts", 
        default: null,
    },
    author: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",        
        require: true,
    },
    group: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groups",
        default: null,
    },
    fileType: {
      type: mongoose.Schema.Types.String,
      default: null
    }
  },
  { timestamps: true }
);

postSchema.virtual('likeCount', {
  ref: 'likes',
  localField: '_id',
  foreignField: 'post',
  justOne: false,
  count: true,
});

postSchema.virtual('viewCount', {
  ref: 'views',
  localField: '_id',
  foreignField: 'post',
  justOne: false,
  count: true,
});


const PostModel = mongoose.model("posts", postSchema);
export default PostModel;
