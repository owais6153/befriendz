import React from "react";
import { USER_TYPE } from "constants/user.constant";
import { Link } from "react-router-dom";

const PostedBy = ({postDetails}) => {
  return (
    <section>
      <div className="rounded-2xl bg-white flex items-center flex-col space-y-3 py-3 px-2">
        <div className="p-[5px] flex w-full items-center space-x-2 rounded-md">
          <div className="text-white flex flex-col">
            <span className="text-c_949494 text-[14px] font-openSans_regular">
              <Link to={`/profile/${postDetails?.author?.username}`}><span className="underline text-[#0493A3] font-openSans_semiBold">
                {postDetails?.author?.type === USER_TYPE?.PERSONAL
                ? `${postDetails?.author?.first_name} ${postDetails?.author?.last_name}`
                : postDetails?.author?.business_name}
              </span></Link>{" "}
              Posted this {postDetails.createdAt}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostedBy;
