import React from "react";
import { USER_TYPE } from "constants/user.constant";
import { Link } from "react-router-dom";

const UserAvatarNamePostType = ({post, isShared = false}) => {
  return (
    <Link to={`/profile/${post.author.username}`}> <div className="flex items-center gap-x-3">
      <div>
        <div className={`rounded-full flex justify-center items-center border border-[#FD6769] ${isShared ? 'w-[50px] h-[50px]': 'w-[60px] h-[60px]'}`}>
          <img
            className={`rounded-full object-cover object-center ${isShared ? 'w-[41px] h-[41px]': 'w-[51px] h-[51px]'}`}
            src={post.author.profileImage}
            alt={post.author.username}
            title={post.author.username}
          />
        </div>
      </div>
      <div>
        <div>
          <span className="text-[#FD6769] text-[16px] font-openSans_bold leading-none">
            {post.author?.type === USER_TYPE?.PERSONAL
                ? `${post.author?.first_name} ${post.author?.last_name}`
                : post.author?.business_name}
          </span>
        </div>
        <div className="space-x-1">
          {/* Group */}
          {post?.group ? <><span className="font-medium text-[#949494] text-[10px] font-openSans_regular capitalize">
            in group
          </span>
          <Link to={`/groups/${post?.group._id}`}>          
          <span className="text-[#0493A3] text-[10px] font-openSans_bold">
            {post?.group.title}
          </span>
          </Link>
          <span className="text-[#949494] text-[10px] font-openSans_bold">
            |
          </span>
          </>: null}

          {/* Shared */}
          {isShared ? <><span className="font-medium text-[#949494] text-[10px] font-openSans_regular capitalize">
            shared this
          </span><span className="text-[#949494] text-[10px] font-openSans_bold">
            |
          </span>
          </>: null}

          {/* Time  */}
          <span className="text-[#949494] font-medium text-[10px] font-openSans_regular">
           {post.createdAt}
          </span>
        </div>
      </div>
    </div></Link>
  );
};

export default UserAvatarNamePostType;
