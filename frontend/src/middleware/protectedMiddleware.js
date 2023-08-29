import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { USER_STATUS } from "../constants/user.constant";

const ProtectedMiddleware = (Component) => {
  const ProtectedComponent = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!props.auth.isLoggedIn || !props.auth.user) {
        navigate("/home", { replace: true });
      } else if (!props.auth.user.isVerified) {
        navigate("/verify-email", { replace: true });
      } else if (props.auth.user.status === USER_STATUS.PROFILE_PENDING) {
        navigate("/complete-profile", { replace: true });
      }
    }, []);
    if (
      props.auth.isLoggedIn &&
      props.auth.user.isVerified &&
      props.auth.user.status === USER_STATUS.COMPLETED
    ) {
      return <Component {...props} />;
    }
    return null;
  };

  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  return connect(mapStateToProps)(ProtectedComponent);
};

export default ProtectedMiddleware;
