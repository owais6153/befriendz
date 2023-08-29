import mongoose from "mongoose";
const Schema = mongoose.Schema;

const quotaSchema = new Schema(
  {
    user_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    email_quota: {
      type: String,
      default: null,
    },
    sms_quota: {
      type: String,
      default: null,
    },
    phone_quota: {
      type: String,
      default: null,
    },
    video_quota: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const QuotaModel = mongoose.model("quotas", quotaSchema);
export default QuotaModel;
