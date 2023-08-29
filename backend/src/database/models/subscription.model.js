import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { SUBSCRIPTION_TYPE } from "../../utils/constants/subscription.js";

const subscriptionSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    description: {
      type: String,
    },
    price: {
      type: Schema.Types.Number,
      require: true,
      default: 0,
    },
    category: {
      type: String,
      default: null,
    },
    subscriptionType: {
      type: String,
      require: true,
      enum: [SUBSCRIPTION_TYPE.monthly, SUBSCRIPTION_TYPE.addOnes],
      default: SUBSCRIPTION_TYPE.monthly,
    },
  },
  { timestamps: true }
);

const SubscriptionModel = mongoose.model("subscriptions", subscriptionSchema);
export default SubscriptionModel;
