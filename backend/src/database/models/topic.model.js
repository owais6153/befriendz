import mongoose from "mongoose";
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

const TopicModel = mongoose.model("topics", topicSchema);
export default TopicModel;
