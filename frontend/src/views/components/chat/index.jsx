import React from "react";
import { connect } from "react-redux";
import ChatBox from "./ChatBox";

const Chat = ({ chat }) => {
  const isMobile = /Mobile/.test(navigator.userAgent);

  return (
    <>
      <div className={`fixed bottom-1 z-100 right-1`}>
        <div className="relative flex flex-row gap-1 items-end">
          {/* to restrict 1 chatbox in mobile screen */}
          {chat.activeChats
            .slice(0, isMobile ? 1 : chat.activeChats.length)
            .map((item, index) => (
              <ChatBox key={item?._id || index} item={item} />
            ))}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  chat: state.chat,
});

export default connect(mapStateToProps)(Chat);
