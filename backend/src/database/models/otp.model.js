import mongoose from "mongoose";
const Schema = mongoose.Schema;

const otpSchema = new Schema(
  {
    otpCode: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    creationTime: {
      type: Number,
      require: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OtpModel = mongoose.model("otp", otpSchema);
export default OtpModel;
