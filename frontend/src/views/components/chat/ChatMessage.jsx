import React from "react";
import { connect } from "react-redux";

const ChatMessage = (props) => {
  const { user, message, auth } = props;

  if (message?.to === auth.user._id) {
    return (
      <div className="col-start-1 col-end-10 p-3">
        <div className="flex flex-row items-center">
          <img
            src={user.profileImage}
            alt={user.username}
            className="w-10  h-10 rounded-full"
          />
          <div className="relative ml-3 z-0 text-sm bg-[#FFE1E1] text-[#FD6769] font-openSans_semiBold py-2 px-4 rounded-md rounded-tl-none">
            {/* {audio ? <AudioChatPlayer /> : <div>{text}</div>} */}
            <div>{message.message}</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="col-start-4 col-end-13 p-3">
      <div className="flex items-center justify-start flex-row-reverse">
        <img
          src={auth.user.profileImage}
          alt={auth.user.username}
          className="w-10  h-10 rounded-full"
        />
        <div className="relative mr-3 z-0 text-sm bg-[#FD6769] text-white py-2 px-4 rounded-md rounded-tr-none font-openSans_regular">
          {/* {audio ? <AudioChatPlayer /> : <div>{text}</div>} */}
          <div>{message.message}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ChatMessage);
