import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { USER_STATUS } from "../constants/user.constant";

const ProfilePendingMiddleware = (Component) => {
  const PendingProfileComponent = (props) => {
    const navigate = useNavigate();
    const [willRedirect, setWillRedirect] = useState(true)
    useEffect(() => {
      if (!props.auth.isLoggedIn || !props.auth.user) {
        navigate("/home", { replace: true });
      } else if (!props.auth.user.isVerified) {
        navigate("/verify-email", { replace: true });
      } else if (props.auth.user.status !== USER_STATUS.PROFILE_PENDING) {
        navigate("/", { replace: true });
      }
      else{
        setWillRedirect(false);
      }
    }, []);
    if (
      props.auth.isLoggedIn &&
      props.auth.user.isVerified &&
      (props.auth.user.status === USER_STATUS.PROFILE_PENDING ||
        props.auth.user.status === USER_STATUS.COMPLETED) && !willRedirect
    ) {
      return <Component {...props} />;
    }
    return null;
  };

  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  return connect(mapStateToProps)(PendingProfileComponent);
};

export default ProfilePendingMiddleware;
