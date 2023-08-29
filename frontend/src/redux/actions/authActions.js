import { types as t } from "../types";
import AuthService from "../../services/auth.service";
import {
  formLoaderAction,
  displayErrorsAction,
  displayMessageAction,
} from "./commonActions";

/*
 ** Basic Auth
 */
const loginAction = (data) => (dispatch) => {
  dispatch(formLoaderAction(1));

  return AuthService.login(data).then(
    (response) => {
      dispatch({
        type: t.LOGIN_SUCCESS,
        payload: {
          token: response.data.data.token,
          ...response.data.data.user,
        },
      });
      dispatch(formLoaderAction(0));
      dispatch(displayMessageAction("Login Successfuly"));
      return Promise.resolve();
    },
    (error) => {
      dispatch(displayErrorsAction(error, t.LOGIN_FAIL));
      dispatch(formLoaderAction(0));
      return Promise.reject();
    }
  );
};

const logoutAction = () => (dispatch) => {
  dispatch({
    type: t.LOGOUT,
  });
  dispatch(displayMessageAction("Logout Successful."));
};

const registerAction = (data) => (dispatch) => {
  dispatch(formLoaderAction(1));
  return AuthService.register(data).then(
    (response) => {
      dispatch({
        type: t.REGISTER_SUCCESS,
        payload: {
          token: response.data.data.token,
          ...response.data.data.user,
        },
      });
      dispatch(formLoaderAction(0));
      return Promise.resolve();
    },
    (error) => {
      dispatch(displayErrorsAction(error, t.REGISTER_FAIL));
      dispatch(formLoaderAction(0));
      return Promise.reject();
    }
  );
};

/*
 ** OTP verification
 */
const verifyOTPAction = (data) => (dispatch, getState) => {
  dispatch(formLoaderAction(1));

  return AuthService.verifyOTP(data, getState().auth.user?.token).then(
    (response) => {
      dispatch({
        type: t.OTP_VERIFIED,
        payload: response.data.data.user,
      });
      dispatch(formLoaderAction(0));
      return Promise.resolve();
    },
    (error) => {
      dispatch(displayErrorsAction(error, t.OTP_FAILED));
      dispatch(formLoaderAction(0));
      return Promise.reject();
    }
  );
};
const resendOTPService = () => (dispatch, getState) => {
  dispatch(formLoaderAction(1));
  return AuthService.resendOTP(getState().auth.user?.token).then(
    (response) => {
      dispatch(formLoaderAction(0));
      dispatch(displayMessageAction(response.data.message));
      return Promise.resolve();
    },
    (error) => {
      dispatch(displayErrorsAction(error));
      dispatch(formLoaderAction(0));
      return Promise.reject();
    }
  );
};

/*
 ** Create Password
 */
const createPasswordAction = (data) => (dispatch, getState) => {
  dispatch(formLoaderAction(1));

  return AuthService.createPassword(data, getState().auth.user?.token).then(
    (response) => {
      dispatch(formLoaderAction(0));

      const isLoggedIn = getState().auth.user?.isLoggedIn;

      if (isLoggedIn === false) {
        dispatch({
          type: t.LOGOUT,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch(displayErrorsAction(error));
      dispatch(formLoaderAction(0));
      return Promise.reject();
    }
  );
};

/*
 ** Complete Profile
 */
const completeProfileAction = (data) => (dispatch, getState) => {
  dispatch(formLoaderAction(1));

  return AuthService.completeProfile(data, getState().auth.user?.token).then(
    (response) => {
      dispatch(formLoaderAction(0));
      dispatch({
        type: t.PROFILE_COMPLETED,
        payload: response.data.data.user,
      });
      dispatch(displayMessageAction(response.data.message));
      return Promise.resolve();
    },
    (error) => {
      dispatch(displayErrorsAction(error));
      dispatch(formLoaderAction(0));
      return Promise.reject();
    }
  );
};

/*
 ** Recover Password
 */
const recoverPasswordAction = (data) => (dispatch, getState) => {
  dispatch(formLoaderAction(1));
  return AuthService.recoverPassword(data).then(
    (response) => {
      dispatch(formLoaderAction(0));
      dispatch({
        type: t.RECOVER_PASSWORD,
        payload: {
          token: response.data.data.token,
          ...response.data.data.user,
        },
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch(displayErrorsAction(error));
      dispatch(formLoaderAction(0));
      return Promise.reject();
    }
  );
};

export {
  registerAction,
  createPasswordAction,
  loginAction,
  verifyOTPAction,
  logoutAction,
  completeProfileAction,
  recoverPasswordAction,
  resendOTPService,
};
