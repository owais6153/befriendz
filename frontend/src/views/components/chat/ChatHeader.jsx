import React from "react";
import { connect } from "react-redux";
import { Images } from "../../../config/images";
import { USER_TYPE } from "constants/user.constant";
import { closeChatAction } from "redux/actions/chatAction";

const ChatHeader = (props) => {
  const { setIsOpen, isOpen, user, closeChat } = props;
  const { callIcon, videoIcon, minimizeIcon, expandIcon } = Images;

  return (
    <>
      <div className="flex sm:items-center justify-between py-1 ">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <img
              src={user?.profileImage}
              alt={user?.username}
              className="w-10  h-10 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className=" mt-1 flex items-center">
              <span className="text-gray-700 mr-2 text-sm font-semibold">
                {user?.type === USER_TYPE?.PERSONAL
                  ? `${user?.first_name} ${user?.last_name}`
                  : user?.business_name}
              </span>
            </div>
            {/* <span className="text-xs text-c_30B52D">Online</span> */}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg h-6 w-8 "
          >
            <img src={callIcon.default} />
          </button> */}
          {/* <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg h-6 w-8 "
          >
            <img src={videoIcon.default} />
          </button> */}

          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="inline-flex items-center justify-center rounded-lg h-6 w-8 "
          >
            <img
              src={minimizeIcon.default}
              style={!isOpen ? { transform: "rotate(180deg)" } : null}
            />
          </button>
          <button
            type="button"
            onClick={() => {
              closeChat({ user });
            }}
            className="inline-flex items-center justify-center rounded-lg h-6 w-8 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  chat: state.chat,
});
const mapDispatchToProps = (dispatch) => ({
  closeChat: (data) => dispatch(closeChatAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
