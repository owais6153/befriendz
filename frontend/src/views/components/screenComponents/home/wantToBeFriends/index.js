import { Images } from "config/images";
import React from "react";
import { Link } from "react-router-dom";
import FreindListItem from "views/components/shared/friendRequest";

const { arrowRightIcon, doubleArrowRightBlueIcon } =
  Images;

const WantToBeFriends = ({friendRequests, filterFriendsRequset}) => {
  return (
    <>
    {friendRequests && friendRequests?.length > 0 && 
    <section className="space-y-5">
      <div className="rounded-2xl bg-white space-y-5 p-5">
        <>
          <div className="flex space-x-2 items-center">
            <span className="text-[#515165] font-openSans_bold text-[16px] leading-none">
              Want To Be Friends
            </span>
            <span>
              <img src={arrowRightIcon.default} />
            </span>
          </div>
          <div className="space-y-4">
            <ul>
              {friendRequests?.map((item, index) => (
                <FreindListItem key={index} friendRequest={item} onFriendStatusChange={filterFriendsRequset}/>
              ))}
            </ul>
            <div className="flex justify-center">
              <div className="inline-block">
                <Link
                  to="/friends/request"
                  className="flex justify-center items-center space-x-2 cursor-pointer"
                >
                  <span className=" text-c_0493A3 text-[12px] font-openSans_light">
                    See More Friend Requests
                  </span>
                  <img src={doubleArrowRightBlueIcon.default} />
                </Link>
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
    }
    </>
  );
};

export default WantToBeFriends;
