import { Images } from "config/images";
import React, { useEffect, useRef, useState, useContext } from "react";
import { connect } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatService from "services/chat.service";
import { toast } from "react-toastify";
import { SocketContext } from "context/socket.context";
import { SOCKET_EVENTS } from "constants/socket.constant";
import {
  addMessageToChatAction,
  newChatAction,
  closeChatAction,
} from "redux/actions/chatAction";

const ChatBox = ({ item, auth, addMessageToChat, newChat, closeChat }) => {
  const { sendIcon, voiceIcon } = Images;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const divRef = useRef(null);
  const scrollDown = () => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  };

  useEffect(() => {
    if (item && item.messages) {
      const reversedArray = item.messages.slice().reverse();
      setMessages((prev) => reversedArray);
    }
  }, [item, item.messages]);

  useEffect(() => {
    if (messages?.length > 0 && isOpen) {
      scrollDown();
    }
  }, [messages, isOpen]);

  const handleEmoji = (e) => {
    setChatInput(chatInput + e.emoji);
  };
  const handleChange = (e) => {
    setChatInput(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatInput?.length > 0) {
      ChatService.newMessage(
        auth.user.token,
        { message: chatInput },
        item.user._id
      )
        .then((response) => {
          setChatInput("");
          if (item?._id) {
            addMessageToChat(response.data.data?.msg);
          } else {
            closeChat({ user: item?.user });
            newChat({
              ...response.data?.data?.room,
              user: item?.user,
              messages: [response.data.data?.msg],
            });
          }
        })
        .catch((e) => {
          toast.error("Some thing went wrong");
        });
    }
  };

  const { socket } = useContext(SocketContext);
  useEffect(() => {
    if (socket?.on) {
      const newMessageRecieved = (data) => {
        addMessageToChat(data.msg);
        if (!isOpen) {
          setIsOpen(true);
        }
      };

      socket.on(`${SOCKET_EVENTS.NEW_MESSAGE}${item?._id}`, newMessageRecieved);
      return () => {
        socket.off(
          `${SOCKET_EVENTS.NEW_MESSAGE}${item?._id}`,
          newMessageRecieved
        );
      };
    }
  }, [socket, item]);

  return (
    <>
      <div className={` z-100 group flex justify-center`}>
        <div
          className={`flex ${
            isOpen ? "h-[500px] isOpen" : "isClosed"
          }  md:w-[450px] w-11/12 antialiased text-gray-800`}
        >
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col flex-auto h-full p-3">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white h-full p-4 shadow-sm border-2 border-[#f7f7f7]">
                <div>
                  <ChatHeader
                    user={item.user}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                  />
                </div>
                {isOpen ? (
                  <>
                    <div
                      className="flex flex-col h-full overflow-x-auto mb-4 "
                      ref={divRef}
                    >
                      <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                          {messages.map((msg) => (
                            <ChatMessage user={item.user} message={msg} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-2">
                      <div className="flex-grow ml-4">
                        <div className="relative w-full">
                          <div className="absolute flex items-center w-12 left-2 top-1 h-full">
                            <div className="relative  flex-row">
                              <button
                                onClick={() => {
                                  setShowEmojiPicker(!showEmojiPicker);
                                }}
                                className="   w-12  text-gray-400 hover:text-gray-600"
                              >
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </button>
                              <div className="absolute bottom-10 left-0">
                                {showEmojiPicker && (
                                  <EmojiPicker
                                    className=" absolute top-0 z-100"
                                    height={400}
                                    onEmojiClick={handleEmoji}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                          <form onSubmit={handleSendMessage}>
                            <input
                              type="text"
                              placeholder="Type here your message..."
                              value={chatInput}
                              onChange={handleChange}
                              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 px-10 h-10 text-[#858EAD] font-openSans_regular text-[12px]"
                            />
                          </form>
                          <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                            <img src={voiceIcon.default} className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={handleSendMessage}
                          className="flex items-center justify-center rounded-xl text-white px-1 py-1 flex-shrink-0"
                        >
                          <img src={sendIcon.default} className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  common: state.common,
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  addMessageToChat: (data) => dispatch(addMessageToChatAction(data)),
  newChat: (data) => dispatch(newChatAction(data)),
  closeChat: (data) => dispatch(closeChatAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
