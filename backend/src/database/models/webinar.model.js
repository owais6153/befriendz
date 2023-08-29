import mongoose from "mongoose";
const Schema = mongoose.Schema;

const webinarSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    coverImage: {
      type: String,
      require: true,
    },
    about: {
      type: String,
      require: true,
    },
    price: {
        type: Schema.Types.Decimal128,
        require: false,
        default: null
    },
    type: {
        type: String,
        enum: ['on-site', 'virtual'],
        require: true,
    },
    date: {
      type: Object,
      default: null,
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

const WebinarModel = mongoose.model("webinars", webinarSchema);
export default WebinarModel;
