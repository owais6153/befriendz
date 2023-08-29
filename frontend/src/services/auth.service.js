import axios from "axios";
import { apiUrl } from "../shared/helper";

const API_URL = apiUrl("auth");

/*
 ** Basic Auth
 */
const register = (data) => {
  return axios.post(API_URL + "/register", data);
};
const login = ({ email, password }) => {
  return axios.post(API_URL + "/sign-in", {
    email,
    password,
  });
};
/*
 ** OTP verification
 */
const verifyOTP = (otp, token) => {
  return axios.post(
    API_URL + "/verify-email",
    {
      otp,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const resendOTP = (token) => {
  return axios.get(API_URL + "/resend-otp", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/*
 ** Create Password
 */
const createPassword = ({ password, confirm_password }, token) => {
  return axios.post(
    API_URL + "/create-password",
    {
      password,
      confirm_password,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

/*
 ** Complete Profile
 */
const completeProfile = (data, token) => {
  return axios.post(API_URL + "/complete-profile", data, {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    },
  });
};

/*
 ** Recover Password
 */
const recoverPassword = (data) => {
  return axios.post(API_URL + "/recover-password", data);
};

const AuthService = {
  register,
  login,
  verifyOTP,
  resendOTP,
  createPassword,
  completeProfile,
  recoverPassword,
};
export default AuthService;
