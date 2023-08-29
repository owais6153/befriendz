import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { socketUrl } from "shared/helper";

export const SocketContext = createContext({
  socket: false,
});

const Socket = ({ children, auth }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = auth.user?.token;
    if (token) {
      const newSocket = io(socketUrl(), {
        query: {
          token,
        },
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
};
const mapStateToProps = (state) =>({
    auth: state.auth
})
export const SocketProvider = connect(mapStateToProps)(Socket);