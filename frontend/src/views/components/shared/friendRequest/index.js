import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { USER_TYPE } from "constants/user.constant";
import FrendRequestButton from "views/components/shared/friendRequest/button";

const FreindListItem = ({friendRequest, onFriendStatusChange, currentUser}) => {

  const user = (currentUser._id !== friendRequest.from._id) ? friendRequest.from: friendRequest.to;

  return (
    <li>
      <Link to={`/profile/${user.username}`} className="flex items-center space-x-3 py-[0.5rem]">
        <div className="flex-shrink-0">
          <img
            className="h-[40px] w-[40px] rounded-full"
            src={
              user.profileImage
            }
            alt={`${user.username}`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-openSans_semiBold text-[#2A2A2A] text-[14px] mb-0">
            {user.type === USER_TYPE.PERSONAL ? `${user.first_name || 'UNKNOWN NAME'} ${user.last_name || ''}` : 
            <>{`${user.business_name || user.username} `}<span className="text-c_949494 text-[10px]">{user.business_type || ''}</span></>}
          </p>
          <p className="font-openSans_regular text-c_949494 text-[10px] mb-0" style={{fontWeight: '400'}}>
            @{user.username}
          </p>
        </div>
        <FrendRequestButton friendStatus={friendRequest} onFriendStatusChange={onFriendStatusChange}/>
      </Link>
    </li>
  );
};


const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});
export default connect(mapStateToProps)((FreindListItem));