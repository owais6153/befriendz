import { types as t } from "../types";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // Register
    case t.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case t.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    // Login
    case t.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case t.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    // Logout
    case t.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    // OTP Verification
    case t.OTP_VERIFIED:
      return {
        ...state,
        user: {
          token: state.user.token,
          ...payload,
        },
      };
    case t.OTP_FAILED:
      return state;
    case t.PROFILE_COMPLETED:
      return {
        ...state,
        user: {
          token: state.user.token,
          ...payload,
        },
      };
    // Recover Password 
    case t.RECOVER_PASSWORD:
      return {
        ...state,
        isLoggedIn: false,
        user:payload        
      }
    
    // USER
      case t.UPDATE_PROFILE:
        return {
          ...state,
          user: {
            token: state.user.token,
            ...payload,
          },     
        } 

    // DEFAULT
    default:
      return state;
  }
};

export default authReducer;
