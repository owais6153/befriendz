import otpModel from "../../database/models/otp.model.js";
import emailServices from "../web/email.service.js";
import userModel from "../../database/models/user.model.js";
import mongoose from "mongoose";
import { STATUS_CODE } from "../../utils/status.code.js";
// For deleting otp we will create a cron which will run at night and will clear all expired otps

const generateOtp = async (emailService, email, isAccountCreated = false) => {
  const randomOtp = Math.floor(100000 + Math.random() * 9000); // 6 decimal
  let emailExist = await userModel.findOne({
    email: email,
  });
  if (!emailExist) {
    const error = new Error(`User with this email doesn't exist`);
    error.statusCode = STATUS_CODE.conflict;
    throw error;
  }
  const response = await otpModel.create({
    otpCode: randomOtp,
    userId: mongoose.Types.ObjectId(emailExist?._id),
    creationTime: Date.now(),
  });
  if (!response) {
    const error = new Error(`Failed to generate otp`);
    error.statusCode = 422;
    throw error;
  }
  if (emailService) {
    const result = await emailServices.sendMail(
      `OTP Secure Code`,
      `Your otp code is ${randomOtp}`,
      email, 
      isAccountCreated
    );
    if (!result) {
      await otpModel.findByIdAndDelete(response._id);
      const error = new Error(`${isAccountCreated ? 'Account created! ': ''}Failed to send email`);
      error.statusCode = STATUS_CODE.conflict;
      throw error;
    }
  }
  return { data: { code: randomOtp } };
};

const generateTestOtp = async (emailService, email) => {
  const randomOtp = "0000";
  let userWithEmailExist = {};
  let emailExist = await userModel.findOne({
    email: email,
  });
  if (!emailExist) {
    userWithEmailExist = await userModel.findOne({
      email: email,
    });
    if (!userWithEmailExist) {
      const error = new Error(`User with this email doesn't exist`);
      error.statusCode = 500;
      throw error;
    }
  }

  const response = await otpModel.create({
    otpCode: randomOtp,
    userId: mongoose.Types.ObjectId(emailExist?._id),
    creationTime: Date.now(),
  });
  if (!response) {
    const error = new Error(`Failed to generate otp`);
    error.statusCode = 500;
    throw error;
  }
  return { data: { otp: response.otpCode } };
};

const verifyOtp = async (otpCode, userId) => {
  let otpExist = {};
  otpExist = await otpModel
    .findOne({ otpCode }, {}, { sort: { createdAt: -1 } })
    .populate("userId")
    .exec();
  if (!otpExist) {
    const error = new Error(`otp is invalid.`);
    error.statusCode = 400;
    throw error;
  }
  if (otpExist.isUsed) {
    const error = new Error(`otp is used already.`);
    error.statusCode = 400;
    throw error;
  }
  if (otpExist?.userId?._id != userId) {
    const error = new Error(`This otp code doesn't belong to this account`);
    error.statusCode = 400;
    throw error;
  }
  // 60,000 miliseconds = 60secs, hence otp expires after 2hrs
  if (
    otpExist.isExpired &&
    Date.now() > Number(otpExist.creationTime) + 60000 * 120
  ) {
    await otpModel.findOneAndUpdate({ otpCode }, { isExpired: true });
    const error = new Error(`otp is expired already.`);
    error.statusCode = 400;
    throw error;
  }

  return await otpModel.findOneAndUpdate(
    { otpCode },
    { isUsed: true, isExpired: true }
  );
};

const OtpServices = {
  generateOtp,
  verifyOtp,
  generateTestOtp,
};
export default OtpServices;
