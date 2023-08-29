import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_STATUS } from "../constants/user.constant";

const UnverifiedMiddleware = (Component) => {
  const UnverifiedComponent = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!props.auth.isLoggedIn || !props.auth.user) {
        navigate("/home", { replace: true });
      } else if (!props.auth.user.status === USER_STATUS.PROFILE_PENDING) {
        navigate("/complete-profile", { replace: true });
      } else if (props.auth.user.isVerified) {
        navigate("/", { replace: true });
      }
    }, []);
    if (props.auth.isLoggedIn && !props.auth.user.isVerified) {
      return <Component {...props} />;
    }
    return null;
  };

  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  return connect(mapStateToProps)(UnverifiedComponent);
};

export default UnverifiedMiddleware;
