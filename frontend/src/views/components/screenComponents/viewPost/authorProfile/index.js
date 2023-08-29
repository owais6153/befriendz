import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { USER_TYPE } from "constants/user.constant";
import FrendRequestButton from "views/components/shared/friendRequest/button";
const AuthorProfile = ({author, auth, setRefetch}) => {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl bg-white">
        <div className="p-5 h-full">
          <Link to={`/profile/${author.username}`}>
            <div>
              <div className="flex w-full flex-col justify-center items-center mb-5">
                <img
                  className="w-[100px] h-[100px] object-cover rounded-full"
                  src={author.profileImage}
                  alt={author.username}
                  title={author.username}
                  />
                <h2 className="font-openSans_bold text-c_515165 text-[26px] flex space-x-3 items-center leading-tight mb-0 mt-[12px]">
                  <span>              {author?.type === USER_TYPE?.PERSONAL
                ? `${author?.first_name} ${author?.last_name}`
                : author?.business_name}</span>
                </h2>
                <span className="font-openSans_regular text-[#949494] text-[16px] font-medium">
                                {author?.type === USER_TYPE.PERSONAL
                ? author?.occupation
                : author?.business_type}
                </span>
              </div>
            </div>
          </Link>
          {auth.user._id !== author._id ? <div className="flex w-full justify-center">
            <FrendRequestButton
              friendStatus={author.friendStatus}
              user={author}
              onFriendStatusChange={()=>{setRefetch((prev)=>!prev)}} />
          </div> :      null }
          <div className="text-center mt-2">
            <span className="font-openSans_regular text-[14px] text-[#949494] ">
              joined {author?.createdAt}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(AuthorProfile);