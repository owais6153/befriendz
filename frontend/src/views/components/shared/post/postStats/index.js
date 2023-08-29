import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PostService from "services/post.service";
import {  toast } from "react-toastify";

const PostStats = ({ postType = 1, post, auth }) => {

  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(post.isLikedByCurrentUser)
  const [likeCount, setLikeCount] = useState( post.likeCount)
  const [shareCount, setShareCount] = useState( post.shareCount )
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const likeThisPost = async (e) => {
    if(auth.isLoggedIn){
      e.preventDefault();
      if(!loading){
        setLoading(true)
        await PostService.likePost(auth.user.token, post._id).then((response)=>{
          setIsLikedByCurrentUser(response.data.data.isLikedByCurrentUser)
          if(response.data.data.isLikedByCurrentUser) setLikeCount((prev)=>parseInt(prev) + 1)
          else setLikeCount((prev)=>parseInt(prev) - 1)
        }).catch(()=>{
        })
        setLoading(false);
      }
    }
    else{
      navigate('/home')
    }
  }

  const shareThisPost = async (e) => {
    if(auth.isLoggedIn){
      e.preventDefault();
      if(!loading){
        setLoading(true)
        await PostService.sharePost(auth.user.token, post._id).then((response)=>{
          setShareCount((prev)=>parseInt(prev) + 1)
          toast.success('Post Shared')
        }).catch(()=>{
        })
        setLoading(false);
    }
    }
    else{
      navigate('/home')
    }
  }

  const stats = [
    {
      icon: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99992 5.96427C11.5322 5.95918 13.0348 6.38659 14.335 7.19738C15.6352 8.00816 16.6802 9.16941 17.3499 10.5476C15.9749 13.3559 13.1666 15.1309 9.99992 15.1309C6.83325 15.1309 4.02492 13.3559 2.64992 10.5476C3.3196 9.16941 4.36461 8.00816 5.66482 7.19738C6.96502 6.38659 8.46764 5.95918 9.99992 5.96427ZM9.99992 4.29761C5.83325 4.29761 2.27492 6.88927 0.833252 10.5476C2.27492 14.2059 5.83325 16.7976 9.99992 16.7976C14.1666 16.7976 17.7249 14.2059 19.1666 10.5476C17.7249 6.88927 14.1666 4.29761 9.99992 4.29761ZM9.99992 8.46427C10.5525 8.46427 11.0824 8.68377 11.4731 9.07447C11.8638 9.46517 12.0833 9.99507 12.0833 10.5476C12.0833 11.1001 11.8638 11.63 11.4731 12.0207C11.0824 12.4114 10.5525 12.6309 9.99992 12.6309C9.44738 12.6309 8.91748 12.4114 8.52678 12.0207C8.13608 11.63 7.91659 11.1001 7.91659 10.5476C7.91659 9.99507 8.13608 9.46517 8.52678 9.07447C8.91748 8.68377 9.44738 8.46427 9.99992 8.46427ZM9.99992 6.79761C7.93325 6.79761 6.24992 8.48094 6.24992 10.5476C6.24992 12.6143 7.93325 14.2976 9.99992 14.2976C12.0666 14.2976 13.7499 12.6143 13.7499 10.5476C13.7499 8.48094 12.0666 6.79761 9.99992 6.79761Z"
            fill="#FD6769"
          />
        </svg>
      ),
      count: post.viewCount,
      label: `View${post.viewCount > 1 ? 's' : ''}`,
    },
    {
      icon: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
           {!isLikedByCurrentUser ?
          <path
            d="M6.2334 15.8393L8.81673 17.8393C9.15006 18.1726 9.90006 18.3393 10.4001 18.3393H13.5667C14.5667 18.3393 15.6501 17.5893 15.9001 16.5893L17.9001 10.506C18.3167 9.33929 17.5667 8.33929 16.3167 8.33929H12.9834C12.4834 8.33929 12.0667 7.92262 12.1501 7.33929L12.5667 4.67262C12.7334 3.92262 12.2334 3.08929 11.4834 2.83929C10.8167 2.58929 9.9834 2.92262 9.65006 3.42262L6.2334 8.50595"
            stroke="#FD6769"
            stroke-width="1.5"
            stroke-miterlimit="10"
          /> : 
          <path
            d="M6.2334 15.8393L8.81673 17.8393C9.15006 18.1726 9.90006 18.3393 10.4001 18.3393H13.5667C14.5667 18.3393 15.6501 17.5893 15.9001 16.5893L17.9001 10.506C18.3167 9.33929 17.5667 8.33929 16.3167 8.33929H12.9834C12.4834 8.33929 12.0667 7.92262 12.1501 7.33929L12.5667 4.67262C12.7334 3.92262 12.2334 3.08929 11.4834 2.83929C10.8167 2.58929 9.9834 2.92262 9.65006 3.42262L6.2334 8.50595"
            fill="#FD6769"
          />}
          <path
            d="M1.9834 15.8393V7.6726C1.9834 6.50593 2.4834 6.08926 3.65007 6.08926H4.4834C5.65006 6.08926 6.15007 6.50593 6.15007 7.6726V15.8393C6.15007 17.0059 5.65006 17.4226 4.4834 17.4226H3.65007C2.4834 17.4226 1.9834 17.0059 1.9834 15.8393Z"
            stroke="#FD6769"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      count: likeCount,
      label: `Like${likeCount > 1 ? 's' : ''}`,
      onClick: (e)=>{likeThisPost(e)}
    },
    {
      icon: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.41675 15.5476V14.7976H6.66675H3.33341C3.0903 14.7976 2.85714 14.701 2.68523 14.5291C2.51332 14.3572 2.41675 14.124 2.41675 13.8809V3.88093C2.41675 3.63782 2.51333 3.40466 2.68523 3.23275C2.85714 3.06084 3.0903 2.96426 3.33341 2.96426H16.6667C16.9099 2.96426 17.143 3.06084 17.3149 3.23275C17.4868 3.40466 17.5834 3.63781 17.5834 3.88093V13.8809C17.5834 14.124 17.4868 14.3572 17.3149 14.5291C17.143 14.701 16.9099 14.7976 16.6667 14.7976H11.5834H11.2722L11.0524 15.018L7.97879 18.0999C7.94626 18.1289 7.92227 18.1309 7.91675 18.1309H7.50008C7.47798 18.1309 7.45678 18.1222 7.44116 18.1065L6.91083 18.6369L7.44115 18.1065C7.42553 18.0909 7.41675 18.0697 7.41675 18.0476V15.5476Z"
            stroke="#FD6769"
            stroke-width="1.5"
          />
        </svg>
      ),
      count: post.commentCount,
      label: `Comment${post.commentCount > 1 ? 's' : ''}`,
      onClick: (e)=>{}
    },
    {
      icon: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.4563 8.96637L12.2063 2.71637C12.1408 2.6509 12.0573 2.60632 11.9664 2.58827C11.8755 2.57022 11.7814 2.5795 11.6958 2.61494C11.6102 2.65039 11.537 2.71041 11.4855 2.78741C11.4339 2.86442 11.4064 2.95497 11.4063 3.04762V6.3445C7.15008 6.62497 2.00086 10.6414 1.4118 15.7711C1.39267 15.9344 1.42557 16.0996 1.50582 16.2432C1.58607 16.3867 1.70958 16.5013 1.85874 16.5705C2.0079 16.6398 2.17512 16.6602 2.33657 16.6289C2.49801 16.5976 2.64546 16.5161 2.75789 16.3961C3.63758 15.4578 6.79696 12.4695 11.4063 12.2765V15.5476C11.4064 15.6403 11.4339 15.7308 11.4855 15.8078C11.537 15.8848 11.6102 15.9449 11.6958 15.9803C11.7814 16.0157 11.8755 16.025 11.9664 16.007C12.0573 15.9889 12.1408 15.9443 12.2063 15.8789L18.4563 9.62887C18.5441 9.54098 18.5934 9.42184 18.5934 9.29762C18.5934 9.1734 18.5441 9.05426 18.4563 8.96637ZM12.3438 14.4164V11.7976C12.3438 11.6733 12.2944 11.5541 12.2065 11.4662C12.1186 11.3783 11.9994 11.3289 11.8751 11.3289C9.70867 11.3289 7.59696 11.8953 5.60008 13.0125C4.43619 13.6663 3.3641 14.4715 2.4118 15.407C2.77899 13.332 3.9868 11.3445 5.8493 9.7609C7.69305 8.19919 9.94461 7.26637 11.8751 7.26637C11.9994 7.26637 12.1186 7.21699 12.2065 7.12908C12.2944 7.04117 12.3438 6.92194 12.3438 6.79762V4.17965L17.4618 9.29762L12.3438 14.4164Z"
            fill="#EB5757"
          />
        </svg>
      ),
      count: shareCount,
      label: `Share${shareCount > 1 ? 's' : ''}`,
      onClick: (e)=>{shareThisPost(e)}
    },
  ];
  return (
    <div
      className={`flex sm:justify-center justify-between sm:gap-16 sm:py-4 py-1 bg-white sm:px-10 px-2 flex-wrap border-[#EAEAEA]  ${
        postType === 2
          ? "border-b-[2px] sm:rounded-full rounded-xl"
          : "border-b-[2px]"
      } ${loading ? 'opacity-75 pointer-events-none' : ''}`}
    >
      {stats.map((item) => (
        <div className="flex items-center gap-x-2 pointer" onClick={item.onClick}>
          <div>{item.icon}</div>
          {item.count > 0 ? 
            <div>
              <div className="space-x-1">
                <span className="text-[#949494] text-[12px] font-openSans_medium font-medium">
                  {item.count}
                </span>
                <span className="text-[#949494] text-[12px] font-openSans_medium font-medium">
                  {item.label}
                </span>
              </div>
            </div> : null
          }
        </div>
      ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)((PostStats));