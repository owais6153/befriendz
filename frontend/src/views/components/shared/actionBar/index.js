import { useState } from "react";
import { connect } from "react-redux";
import PostService from "services/post.service";
import {  toast } from "react-toastify";

const ActionBar = ({postDetails, auth}) => {

  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(postDetails.isLikedByCurrentUser)
  const [likeCount, setLikeCount] = useState( postDetails.likeCount )
  const [shareCount, setShareCount] = useState( postDetails.shareCount )
  const [commentCount, setCommentCount] = useState( postDetails.commentCount )
  const [loading, setLoading] = useState(false);

  const likeThisPost = async (e) => {
    e.preventDefault();
    if(!loading){
      setLoading(true)
      await PostService.likePost(auth.user.token, postDetails._id).then((response)=>{
        setIsLikedByCurrentUser(response.data.data.isLikedByCurrentUser)
        if(response.data.data.isLikedByCurrentUser) setLikeCount((prev)=>parseInt(prev) + 1)
        else setLikeCount((prev)=>parseInt(prev) - 1)
      }).catch(()=>{
      })
      setLoading(false);
    }
  }

  const shareThisPost = async (e) => {
    e.preventDefault();
    if(!loading){
      setLoading(true)
      await PostService.sharePost(auth.user.token, postDetails._id).then((response)=>{
         setShareCount((prev)=>parseInt(prev) + 1)
         toast.success('Post Shared')
      }).catch(()=>{
      })
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="rounded-2xl bg-white flex items-center flex-col space-y-3 py-3 px-2">
        {[
          {
            label:!isLikedByCurrentUser ? "Like Post" : "You've liked this post",
            icon: (
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="28" height="28" rx="6" fill="#F5F5F5" />
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
              </svg>
            ),
            onClick: (e)=>{likeThisPost(e)}
          },
          {
            label: commentCount + ` Comment${commentCount > 1 ? 's' : ''}`,
            icon: (
              <svg
                width="28"
                height="26"
                viewBox="0 0 28 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="28" height="26" rx="6" fill="#F5F5F5" />
                <path
                  d="M11.0832 18.8333H10.6665C7.33317 18.8333 5.6665 18 5.6665 13.8333V9.66666C5.6665 6.33332 7.33317 4.66666 10.6665 4.66666H17.3332C20.6665 4.66666 22.3332 6.33332 22.3332 9.66666V13.8333C22.3332 17.1667 20.6665 18.8333 17.3332 18.8333H16.9165C16.6582 18.8333 16.4082 18.9583 16.2498 19.1667L14.9998 20.8333C14.4498 21.5667 13.5498 21.5667 12.9998 20.8333L11.7498 19.1667C11.6165 18.9833 11.3082 18.8333 11.0832 18.8333Z"
                  stroke="#515165"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M17.3305 12.1667H17.338"
                  stroke="#515165"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M13.9961 12.1667H14.0036"
                  stroke="#515165"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M10.6621 12.1667H10.6696"
                  stroke="#515165"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ),
            onClick: (e)=>{}
          },
          {
            label:  shareCount + ` Share${shareCount > 0 ? 's' : ''}`,
            icon: (
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="28" height="28" rx="6" fill="#F5F5F5" />
                <path
                  d="M10.1669 9.26667L17.2419 6.90834C20.4169 5.85001 22.1419 7.58334 21.0919 10.7583L18.7336 17.8333C17.1502 22.5917 14.5502 22.5917 12.9669 17.8333L12.2669 15.7333L10.1669 15.0333C5.40856 13.45 5.40856 10.8583 10.1669 9.26667Z"
                  stroke="#515165"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  opacity="0.34"
                  d="M12.4248 15.375L15.4081 12.3833"
                  stroke="#515165"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ),      
            onClick: (e)=>{shareThisPost(e)}
          },
          {
            label: "Report Post",
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.9584 2.04166C9.54173 1.55 10.4834 1.55 11.0501 2.04166L12.3667 3.16666C12.6167 3.375 13.0917 3.55 13.4251 3.55H14.8417C15.7251 3.55 16.4501 4.275 16.4501 5.15833V6.575C16.4501 6.90833 16.6251 7.375 16.8334 7.625L17.9584 8.94166C18.4501 9.525 18.4501 10.4667 17.9584 11.0333L16.8334 12.35C16.6251 12.6 16.4501 13.0667 16.4501 13.4V14.8167C16.4501 15.7 15.7251 16.425 14.8417 16.425H13.4251C13.0917 16.425 12.6251 16.6 12.3751 16.8083L11.0584 17.9333C10.4751 18.425 9.5334 18.425 8.96673 17.9333L7.65007 16.8083C7.40007 16.6 6.92507 16.425 6.60007 16.425H5.14173C4.2584 16.425 3.5334 15.7 3.5334 14.8167V13.3917C3.5334 13.0667 3.36673 12.5917 3.1584 12.35L2.0334 11.025C1.55007 10.45 1.55007 9.51666 2.0334 8.94166L3.1584 7.61666C3.36673 7.36666 3.5334 6.9 3.5334 6.575V5.16666C3.5334 4.28333 4.2584 3.55833 5.14173 3.55833H6.5834C6.91673 3.55833 7.3834 3.38333 7.6334 3.175L8.9584 2.04166Z"
                  stroke="#515165"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <g opacity="0.4">
                  <path
                    d="M10 6.7749V10.7999"
                    stroke="#515165"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.99512 13.3333H10.0026"
                    stroke="#515165"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            ),      
            onClick: (e)=>{}
          },
        ]?.map((item) => (
          <div className={`p-[5px] flex w-full items-center space-x-2 rounded-md cursor-pointer ${loading ? 'opacity-75 pointer-events-none' : ''}`} onClick={item.onClick}>
            <div className="bg-c_F5F5F5 rounded-md w-[28px] h-[28px] flex justify-center items-center">
              {item.icon}
            </div>
            <div className="text-white flex flex-col">
              <span className="text-c_949494 text-[14px] font-openSans_regular">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)((ActionBar));