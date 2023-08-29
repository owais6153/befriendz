import { AccessToken } from 'twilio';
import { createError, createResponse } from "../../utils/helper.js";

const generateToken = (req, res) => {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const serviceSid = process.env.TWILIO_CONVERSATION_SID;
      const { currentUser } = req;

      const token = new AccessToken(accountSid, apiKey, apiSecret);
      token.identity = currentUser;

      const grant = new AccessToken.ConversationsGrant({ serviceSid });
      token.addGrant(grant);

      return {data: {token: token.toJwt() }}

    } catch (e) {
      throw new Error(e)
    }
};

const TwilioChatService = {
  generateToken,
};
export default TwilioChatService;
