import { Images } from "config/images";
import { useState } from "react";
import { connect } from "react-redux";
import { USER_TYPE } from "constants/user.constant";
import PostComment from "views/components/shared/post/postComment.js";
import PostService from "services/post.service";

const { undoIcon, inActiveLikeIcon, moreOptionsIcon } = Images;


const Comment = ({auth, comment}) => {
  const [loading, setLoading] = useState(false);
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(comment.isLikedByCurrentUser || false)
  const [likeCount, setLikeCount] = useState( comment.likeCount || 0)
  const [comments, setComments] = useState(comment.comments || [])
  const addComment = (response) => {
    setComments(prev => [ ...prev, response.data.data.comment])
  }
  const [reply, setReply] = useState(false)

  const likeThisComment = async (e) => {
    e.preventDefault();
    if(!loading){
      setLoading(true)
      await PostService.likeComment(auth.user.token, comment.post, comment._id, ).then((response)=>{
        setIsLikedByCurrentUser(response.data.data.isLikedByCurrentUser)
        if(response.data.data.isLikedByCurrentUser) setLikeCount((prev)=>parseInt(prev) + 1)
        else setLikeCount((prev)=>parseInt(prev) - 1)
      }).catch(()=>{
      })
      setLoading(false);
    }
  }
  return (          
    <li className={loading? 'opacity-25': ''}>
      <div className="relative pb-8">
          {/* {comment.isChild  ? <span
            className="absolute top-4 left-5 -ml-px h-full w-0.5 bg-opacity-30 bg-[#C5D0E6]"
            aria-hidden="true"
          /> : null } */}
        <div className="relative flex md:space-x-3">
          <div className="md:min-w-[50px] min-w-[30px]">
            <img
              className="w-10 h-10 rounded-full"
              src={comment.user.profileImage}
              alt={comment.user.username}
              title={comment.user.username}
            />
          </div>
          <div className="flex flex-wrap min-w-0 flex-1 justify-between space-x-4 py-1.5">
            <div className="w-full px-[10px]">
              <div className="text-wrap bg-[#F5F5F5] border w-full p-[15px] rounded-2xl text-[14px] font-openSans_regular">
                <div className="text-[#515165] font-openSans_regular flex w-full flex-wrap">
                  <span className="font-openSans_bold ">
                    {comment.user?.type === USER_TYPE?.PERSONAL
                    ? `${comment.user?.first_name} ${comment.user?.last_name}`
                    : comment.user?.business_name}
                  </span>
                  <span className="ml-3">{comment.createdAt}</span>
                </div>
                <div className="mt-[10px]">
                  {comment.content}
                </div>
              </div>
            </div>
            <div className="mt-[15px]  w-full">
            <div className=" flex  flex-wrap space-x-5  w-full ">
              <span className="cursor-pointer flex text-[14px] " onClick={likeThisComment}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {!isLikedByCurrentUser ? 
                                  <path
                    d="M10.2334 19.2917L12.8167 21.2917C13.1501 21.625 13.9001 21.7917 14.4001 21.7917H17.5667C18.5667 21.7917 19.6501 21.0417 19.9001 20.0417L21.9001 13.9583C22.3167 12.7917 21.5667 11.7917 20.3167 11.7917H16.9834C16.4834 11.7917 16.0667 11.375 16.1501 10.7917L16.5667 8.12501C16.7334 7.37501 16.2334 6.54168 15.4834 6.29168C14.8167 6.04168 13.9834 6.37501 13.6501 6.87501L10.2334 11.9583"
                    stroke="#515165"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  : 
                  <path
                    d="M10.2334 19.2917L12.8167 21.2917C13.1501 21.625 13.9001 21.7917 14.4001 21.7917H17.5667C18.5667 21.7917 19.6501 21.0417 19.9001 20.0417L21.9001 13.9583C22.3167 12.7917 21.5667 11.7917 20.3167 11.7917H16.9834C16.4834 11.7917 16.0667 11.375 16.1501 10.7917L16.5667 8.12501C16.7334 7.37501 16.2334 6.54168 15.4834 6.29168C14.8167 6.04168 13.9834 6.37501 13.6501 6.87501L10.2334 11.9583"
                    fill="#0493A3"                  
                  />
                  }
                  <path                 
                    d="M5.9834 19.2917V11.125C5.9834 9.95832 6.4834 9.54166 7.65007 9.54166H8.4834C9.65006 9.54166 10.1501 9.95832 10.1501 11.125V19.2917C10.1501 20.4583 9.65006 20.875 8.4834 20.875H7.65007C6.4834 20.875 5.9834 20.4583 5.9834 19.2917Z"
                    stroke={isLikedByCurrentUser ? "#0493A3" : "#515165"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg> {likeCount > 0 ? <span className="inline-block mt-1">{likeCount}</span> : null}
              </span>
              {!comment.isChild ? <span className="cursor-pointer" onClick={()=>{setReply(!reply)}}>
                <img src={undoIcon.default} alt='Reply to comment'/>
              </span> : null}
              {/* <span className="cursor-pointer">
                <img src={moreOptionsIcon.default} />
              </span> */}
            </div>
            {comments && comments?.length > 0 ? 
              <div className="p-[15px]">
                <ul  className="-mb-8">
                  {comments.map((child_comment, index) => (
                    <Comment auth={auth} key={ child_comment._id} comment={child_comment}/>
                  ))}
                </ul>
              </div>
            :null}
              {reply && !comment.isChild ? <div className="mt-4 px-[15px]"><PostComment action={addComment} post={comment.post} parentComment={comment._id}/></div> : null}</div>
          </div>
        </div>
      </div>
    </li>
  )
}



const Comments = ({auth, postDetails}) => {
  const [comments, setComments] = useState(postDetails.comments || [])
  const addComment = (response) => {
    setComments(prev => [response.data.data.comment, ...prev])
  }
  return (
    <div>      
      <div className="p-[15px]">
        <PostComment post={postDetails._id} action={addComment}/>
      </div>
      {comments && comments?.length > 0 ? 
      <div className="p-[15px]">
        <ul  className="-mb-8">
          {comments.map((comment, index) => (
            <Comment auth={auth} key={ comment._id} comment={comment}/>
          ))}
        </ul>
      </div>
      :null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)((Comments));