import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setMessage, resetFormErrorsAction } from "redux/actions/commonActions";
import { newNotificationAction } from "redux/actions/notificationAction";
import { SOCKET_EVENTS } from "constants/socket.constant";
import { SocketContext } from "context/socket.context";

const BaseLayout = ({
  children,
  common,
  setMessage,
  resetErrors,
  auth,
  newNotification,
}) => {
  const location = useLocation();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (common.message !== null) {
      toast[common.message.type](common.message.message);
      setMessage(null);
    }
  }, [common, setMessage]);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });

    if (location) resetErrors({});
  }, [location]);

  useEffect(() => {
    if (auth.isLoggedIn && auth.user?.token && socket?.on) {
      const handleNewNotification = (data) => {
        newNotification(data);
      };
      socket.on(SOCKET_EVENTS.NEW_NOTIFICATION, handleNewNotification);
      return () => {
        // Unsubscribe from the event when component unmounts
        socket.off(SOCKET_EVENTS.NEW_NOTIFICATION, handleNewNotification);
      };
    }
  }, [auth.isLoggedIn, auth.user?.token, socket]);

  return (
    <>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
const mapStateToProps = (state) => ({
  common: state.common,
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  setMessage: (data) => dispatch(setMessage(data)),
  resetErrors: (data) => dispatch(resetFormErrorsAction(data)),
  newNotification: (data) => dispatch(newNotificationAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);
