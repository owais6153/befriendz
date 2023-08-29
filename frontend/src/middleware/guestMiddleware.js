import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { USER_STATUS } from "../constants/user.constant";

const GuestMiddleware = (Component, shouldHaveToken = false) => {
  const GuestComponent = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (props.auth.isLoggedIn) {
        if (!props.auth.user.isVerified) {
          navigate("/verify-email", { replace: true });
        } else if (props.auth.user.status === USER_STATUS.PROFILE_PENDING) {
          navigate("/complete-profile", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
      else if(shouldHaveToken){
        if (!props.auth.user || !props.auth.user.token) {          
          navigate("/home", { replace: true });
        }
      }
    }, []);

    if (!props.auth.isLoggedIn) {
      return <Component {...props} />;
    }

    return null;
  };

  const mapStateToProps = (state) => ({
    auth: state.auth,
  });

  return connect(mapStateToProps)(GuestComponent);
};

export default GuestMiddleware;
