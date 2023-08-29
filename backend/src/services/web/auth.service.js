import userModel from "../../database/models/user.model.js";
import otpService from "../web/otp.service.js";
import UserCompleteProfileDto from "../../dto/userCompleteProfile.dto.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { USER_STATUS, USER_TYPE } from "../../utils/constants/user.js";
import { config } from "dotenv";
config();
// import s3 from "../utils/s3.js";

const signinUser = async (req) => {
  const { email, password } = req.body;

  const userDetail = await userModel.findOne({ email });
  if (!userDetail) {
    const error = new Error(`Invalid email address`);
    error.statusCode = 400;
    throw error;
  }

  const isEqual = bcrypt.compare(password, userDetail.password);
  if (!isEqual) {
    const error = new Error("Wrong Password!");
    error.statusCode = 402;
    throw error;
  }
  const token = jwt.sign(
    {
      email: userDetail.email,
      userId: userDetail._id.toString(),
    },
    process.env.JWT_SECRET, // this for our secuerity mechanism it's a private key for signing in
    { expiresIn: "100d" }
  ); // here token expires in 100days

  return { data: { token: token, user: userDetail } };
};
const registerUser = async (req) => {
  const {
    first_name,
    last_name,
    email,
    username,
    business_name,
    business_type,
    type,
  } = req.body;

  const emailExist = await userModel.findOne({ email });
  if (emailExist) {
    const error = new Error(`Email already exist`);
    error.statusCode = 400;
    throw error;
  }
  const usernameExist = await userModel.findOne({ username });
  if (usernameExist) {
    const error = new Error(`Username already exist`);
    error.statusCode = 400;
    throw error;
  }
  const createdUser = await userModel.create(
    type === USER_TYPE.personal
      ? {
          first_name,
          last_name,
          username,
          email,
          type,
        }
      : {
          business_name,
          business_type,
          username,
          email,
          type,
        }
  );
  const token = jwt.sign(
    {
      email: createdUser.email,
      userId: createdUser._id.toString(),
    },
    process.env.JWT_SECRET, // this for our secuerity mechanism it's a private key for signing in
    { expiresIn: "100d" }
  ); // here token expires in 100days

  const code = await otpService.generateOtp(true, createdUser.email, true);

  return { data: { user: createdUser, token: token } };
};
const verifyEmail = async (req) => {
  const { otp } = req.body;
  const { currentUser } = req;
  const verifyCode = await otpService.verifyOtp(otp, currentUser);
  const user = await userModel.findByIdAndUpdate(
    currentUser,
    {
      status: USER_STATUS.profilePending,
      isVerified: true,
    },
    { new: true }
  );
  return { data: { user } };
};
const resendOTP = async (req) => {
  const { currentUser } = req;
  const user = await userModel.findById(currentUser);
  if (!user) {
    const error = new Error(`Invalid user token`);
    error.statusCode = 400;
    throw error;
  }  
  const code = await otpService.generateOtp(true, user.email);
  return true;
};

const createPassword = async (req) => {
  const { currentUser } = req;
  const { password, confirm_password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 18);

  const user = await userModel.findByIdAndUpdate(currentUser, {
    password: hashedPassword,
  });
};

const completeProfile = async (req) => {
  const { currentUser } = req;
  const data = UserCompleteProfileDto(req.body);

  const user = await userModel.findByIdAndUpdate(
    currentUser,
    {
      ...data,
      status: USER_STATUS.completed,
    },
    { new: true, populate: { path: "interests" } }
  );
  return { data: { user } };
};


const recoverPassword = async (req) => {
  const {email} = req.body;
  const emailExist = await userModel.findOne({ email });
  if (!emailExist) {
    const error = new Error(`Invalid Email`);
    error.statusCode = 400;
    throw error;
  }
  const token = jwt.sign(
    {
      email: emailExist.email,
      userId: emailExist._id.toString(),
    },
    process.env.JWT_SECRET, // this for our secuerity mechanism it's a private key for signing in
    { expiresIn: "100d" }
  ); // here token expires in 100days
  const code = await otpService.generateOtp(true, emailExist.email);

  return { data: { user: {email}, token } };
};

const AuthService = {
  registerUser,
  signinUser,
  verifyEmail,
  createPassword,
  completeProfile,
  recoverPassword,
  resendOTP
};
export default AuthService;
