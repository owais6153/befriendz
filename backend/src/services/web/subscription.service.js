import { config } from "dotenv";
import mongoose from "mongoose";
import SubscriptionModel from "../../database/models/subscription.model.js";

import PostDto from "../../dto/post.dto.js";
import { APP_CONSTANT } from "../../utils/constants/app.js";
config();

const getSubscriptions = async (req, res, next) => {
  // Fetch Subsriptions
  const subscriptions = await SubscriptionModel.find({});

  const separatedData = {};

  subscriptions.forEach((obj) => {
    const key = obj.subscriptionType;
    if (!separatedData[key]) {
      separatedData[key] = [];
    }
    separatedData[key].push(obj);
  });
  const resData = Object.keys(separatedData).map((key) => ({
    subscriptionType: key,
    subsriptionData: separatedData[key].reduce((acc, obj) => {
      const { category, price } = obj;
      if (!acc[category]) {
        acc[category] = {
          category,
          price,
          packageItems: [],
        };
      }
      const temp = {
        _id: obj._id,
        subscriptionType: obj.subscriptionType,
        category: obj.category,
        price: obj.price,
        name: obj.name,
        description: obj.description,
        createdAt: obj.createdAt,
        updatedAt: obj.updatedAt,
        checked: false
      }
    //   temp.checked = "sa";
      console.log(temp);
      acc[category].packageItems.push(temp);
      return acc;
    }, {}),
  }));
  return { data: { subsriptions: resData } };
};

const SubscriptionService = {
  getSubscriptions,
};
export default SubscriptionService;
