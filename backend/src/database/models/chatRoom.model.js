import mongoose from "mongoose";
const Schema = mongoose.Schema;

const charRoomSchema = new Schema(
  {
    title: {
        type: String,
        default: null,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
    },
    type: {
      type: String,
      enum: ['one-to-one', 'group'],
      default: 'one-to-one',
      require: true,
    }
  },
  { timestamps: true }
);

const ChatRoomModel = mongoose.model("chat_rooms", charRoomSchema);
export default ChatRoomModel;
