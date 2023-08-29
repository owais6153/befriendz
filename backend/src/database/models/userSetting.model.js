import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSettingSchema = new Schema({
  key: {
    type: String,
    require: true,
  },
  value:{    
    type: Schema.Types.Mixed,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  }
});

const UserSettingModel = mongoose.model("user_settings", userSettingSchema);
export default UserSettingModel;
