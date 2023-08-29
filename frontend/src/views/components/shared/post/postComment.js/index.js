import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import {  useNavigate } from "react-router-dom";
import PostService from "services/post.service"
import Input from "../../form-elements/input";
import { displayErrorsAction } from "redux/actions/commonActions";
import EmojiPicker from "emoji-picker-react";

const PostComment = ({post, auth, common, displayError, action, parentComment}) => {
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null);


  
  const navigate = useNavigate();


  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const handleEmoji = (e) => {
    setCommentInput(commentInput + e.emoji);
    inputRef.current.focus();
  };
  const handleCommentChange =(e) => {
    setCommentInput(e.target.value);
  };
  

  const submitHandler = async (e) => {
    e.preventDefault()
    if(commentInput?.length > 0 && !loading){
      setLoading(true)
     await PostService.addComment(auth.user.token, post, {content :commentInput,  parentComment: parentComment || null}).then((response)=>{
        setCommentInput("")
        inputRef.current.focus();
        if(action) action(response)
        else navigate(`/${post}`)

     },
      (err) => {
          displayError(err)
      }
     ).catch(()=>{})
     setLoading(false)
    }
  };

  return (
    <div>

      <div className="flex">
        <div className="min-w-[50px] flex justify-center items-center">
          <img
            className="h-[40px] w-[40px] rounded-full"
            src={
              auth?.user?.profileImage
            }
            alt={
              auth?.user?.username
            }
          />
        </div>
        <div className="w-full px-[10px] relative font-medium">
          <div className="absolute bottom-10 right-5 z-40">
            {showEmojiPicker && (
              <EmojiPicker
                className=""
                height={400}
                onEmojiClick={handleEmoji}
              />
            )}
          </div>
          <form className="" onSubmit={submitHandler} autoComplete="off">
            {parentComment ? 
            <Input type="hidden" 
              name="parentComment" value={parentComment} 
            />
            : null }
            <input
              className={`font-medium bg-white border border-[#C5D0E6] min-h-[44px] w-full px-[15px] rounded-full focus:outline-none text-[14px] font-openSans_regular ${loading ? 'opacity-25' : ''}`}
              disabled={loading}
              ref={inputRef}
              value={commentInput}
              onChange={handleCommentChange}
              placeholder="Type your comments here..."               
            />


          </form>
          <button
              onClick={(e) => {
                e.preventDefault()
                setShowEmojiPicker(!showEmojiPicker);
              }}
              className=" absolute right-0  w-12  text-gray-400 hover:text-gray-600"
              style={{top: '10px'}}
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
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  common: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  displayError: (data) => dispatch(displayErrorsAction(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)((PostComment));