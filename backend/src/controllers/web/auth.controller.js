import authService from "../../services/web/auth.service.js";
import UserDto from "../../dto/user.dto.js";
import { createError, createResponse } from "../../utils/helper.js";

const registerUser = async (req, res, next) => {
  try {
    let response = await authService.registerUser(req);
    response.data.user = UserDto(response.data.user);
    response.message = `User has been registered`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const signinUser = async (req, res, next) => {
  try {
    let response = await authService.signinUser(req);
    response.data.user = UserDto(response.data.user);
    response.message = `Logged in successfully`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    let response = await authService.verifyEmail(req);
    response.data.user = UserDto(response.data.user);
    response.message = `Email Verified Successfuly`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};
const createPassword = async (req, res, next) => {
  try {
    await authService.createPassword(req);
    createResponse(res, { message: `Password Created Successfuly` });
  } catch (e) {
    createError(res, e, next);
  }
};
const completeProfile = async (req, res, next) => {
  try {
    let response = await authService.completeProfile(req);
    response.data.user = UserDto(response.data.user);
    response.message = `Profile Completed Successfuly`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};
const recoverPassword = async (req, res, next) => {
  try {
    let response = await authService.recoverPassword(req);
    response.message = `Otp sent to email`;
    createResponse(res, response);
  } catch (e) {
    createError(res, e, next);
  }
};

const resendOTP = async (req, res, next) => {
  try {
    await authService.resendOTP(req);
    createResponse(res, { message: `Otp sent to email` });
  } catch (e) {
    createError(res, e, next);
  }
};

const AuthController = {
  registerUser,
  signinUser,
  verifyEmail,
  createPassword,
  completeProfile,
  recoverPassword,
  resendOTP
};

export default AuthController;
