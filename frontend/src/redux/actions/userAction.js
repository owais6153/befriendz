import { types as t } from "../types";
import UserService from "services/user.service";
import {
  formLoaderAction,
  displayErrorsAction,
  displayMessageAction,
} from "./commonActions";

// Update Profile

const updateProfileAction = (data) => (dispatch, getState) => {
  dispatch(formLoaderAction(1));

  return UserService.updateProfile(data, getState().auth.user?.token).then(
    (response) => {
      dispatch({
        type: t.UPDATE_PROFILE,
        payload: response.data.data.user,
      });
      dispatch(formLoaderAction(0));
      dispatch(displayMessageAction("Profile Updated"));
      return Promise.resolve();
    },
    (error) => {
      dispatch(displayErrorsAction(error));
      dispatch(formLoaderAction(0));
      return Promise.reject();
    }
  );
};

const updatePasswordAction = (data) => (dispatch, getState) => {
  dispatch(formLoaderAction(1));

  return UserService.updatePassword(data, getState().auth.user?.token).then(
    (response) => {
      dispatch(formLoaderAction(0));
      dispatch(displayMessageAction("Password Updated"));
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
  updateProfileAction,
  updatePasswordAction
};
