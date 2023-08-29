import SubscriptionService from "../../services/web/subscription.service.js";
import { createError, createResponse } from "../../utils/helper.js";

const fetchSubscriptions = async (req, res, next) => {
  try {
    const response = await SubscriptionService.getSubscriptions();
    response.message = `Subscription fetched`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const SubscriptionController = {
    fetchSubscriptions,
};

export default SubscriptionController;
