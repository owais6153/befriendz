import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema(
  {
    room: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat_rooms",
    },
    to: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",        
        require: true,
    },
    from: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",        
        require: true,
    },
    message:
    {
        type: String,
        require: true,
    }
  },
  { timestamps: true }
);

const ChatMessageModel = mongoose.model("chat_messages", chatMessageSchema);
export default ChatMessageModel;
