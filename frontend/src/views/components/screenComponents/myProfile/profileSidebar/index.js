import SideBarSkeleton from "views/components/skeletons/profile/sidebar";
import { Images } from "config/images";
import { USER_TYPE } from "constants/user.constant";
import FrendRequestButton from "views/components/shared/friendRequest/button";
import { Link } from "react-router-dom";
import React from "react";
import Communation from "./communication";
import { connect } from "react-redux";
import { openChatAction } from "redux/actions/chatAction";

const { starBadeIcon, profileCover } = Images;

const SideBarContent = ({
  user,
  friendStatus,
  setOpen,
  isMyProfile,
  totalFriends,
  friends,
  setIsBecomeLifeCoachModalOpen,
  onFriendStatusChange,
  chatRoom,
  openChat
}) => {

const communicationItems = [
  {
    image: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.08366 15.8332H6.66699C3.33366 15.8332 1.66699 14.9998 1.66699 10.8332V6.6665C1.66699 3.33317 3.33366 1.6665 6.66699 1.6665H13.3337C16.667 1.6665 18.3337 3.33317 18.3337 6.6665V10.8332C18.3337 14.1665 16.667 15.8332 13.3337 15.8332H12.917C12.6587 15.8332 12.4087 15.9582 12.2503 16.1665L11.0003 17.8332C10.4503 18.5665 9.55033 18.5665 9.00033 17.8332L7.75033 16.1665C7.61699 15.9832 7.30866 15.8332 7.08366 15.8332Z"
          stroke="#FD6769"
          strokeWidth="1.5"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.4"
          d="M5.83301 6.6665H14.1663"
          stroke="#FD6769"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.4"
          d="M5.83301 10.8335H10.833"
          stroke="#FD6769"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    baseColor: "#FFE1E1",
    text: "Message",
    action : () => {
      if(!isMyProfile)
       openChat({...chatRoom, user});
    }
  },
  {
    image: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.442 17.0167H5.17533C2.54199 17.0167 1.66699 15.2667 1.66699 13.5084V6.49173C1.66699 3.8584 2.54199 2.9834 5.17533 2.9834H10.442C13.0753 2.9834 13.9503 3.8584 13.9503 6.49173V13.5084C13.9503 16.1417 13.067 17.0167 10.442 17.0167Z"
          stroke="#0493A3"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          opacity="0.4"
          d="M16.2669 14.2501L13.9502 12.6251V7.36678L16.2669 5.74178C17.4002 4.95011 18.3335 5.43344 18.3335 6.82511V13.1751C18.3335 14.5668 17.4002 15.0501 16.2669 14.2501Z"
          stroke="#0493A3"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          opacity="0.4"
          d="M9.58301 9.1665C10.2734 9.1665 10.833 8.60686 10.833 7.9165C10.833 7.22615 10.2734 6.6665 9.58301 6.6665C8.89265 6.6665 8.33301 7.22615 8.33301 7.9165C8.33301 8.60686 8.89265 9.1665 9.58301 9.1665Z"
          stroke="#0493A3"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    baseColor: "#E6F4F6",
    text: "Facetime",
  },
  {
    image: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.3087 15.2748C18.3087 15.5748 18.242 15.8832 18.1003 16.1832C17.9587 16.4832 17.7753 16.7665 17.5337 17.0332C17.1253 17.4832 16.6753 17.8082 16.167 18.0165C15.667 18.2248 15.1253 18.3332 14.542 18.3332C13.692 18.3332 12.7837 18.1332 11.8253 17.7248C10.867 17.3165 9.90866 16.7665 8.95866 16.0748C8.00033 15.3748 7.09199 14.5998 6.22533 13.7415C5.36699 12.8748 4.59199 11.9665 3.90033 11.0165C3.21699 10.0665 2.66699 9.1165 2.26699 8.17484C1.86699 7.22484 1.66699 6.3165 1.66699 5.44984C1.66699 4.88317 1.76699 4.3415 1.96699 3.8415C2.16699 3.33317 2.48366 2.8665 2.92533 2.44984C3.45866 1.92484 4.04199 1.6665 4.65866 1.6665C4.89199 1.6665 5.12533 1.7165 5.33366 1.8165C5.55033 1.9165 5.74199 2.0665 5.89199 2.28317L7.82533 5.00817C7.97533 5.2165 8.08366 5.40817 8.15866 5.5915C8.23366 5.7665 8.27533 5.9415 8.27533 6.09984C8.27533 6.29984 8.21699 6.49984 8.10033 6.6915C7.99199 6.88317 7.83366 7.08317 7.63366 7.28317L7.00033 7.9415C6.90866 8.03317 6.86699 8.1415 6.86699 8.27484C6.86699 8.3415 6.87533 8.39984 6.89199 8.4665C6.91699 8.53317 6.94199 8.58317 6.95866 8.63317C7.10866 8.90817 7.36699 9.2665 7.73366 9.69984C8.10866 10.1332 8.50866 10.5748 8.94199 11.0165C9.39199 11.4582 9.82533 11.8665 10.267 12.2415C10.7003 12.6082 11.0587 12.8582 11.342 13.0082C11.3837 13.0248 11.4337 13.0498 11.492 13.0748C11.5587 13.0998 11.6253 13.1082 11.7003 13.1082C11.842 13.1082 11.9503 13.0582 12.042 12.9665L12.6753 12.3415C12.8837 12.1332 13.0837 11.9748 13.2753 11.8748C13.467 11.7582 13.6587 11.6998 13.867 11.6998C14.0253 11.6998 14.192 11.7332 14.3753 11.8082C14.5587 11.8832 14.7503 11.9915 14.9587 12.1332L17.717 14.0915C17.9337 14.2415 18.0837 14.4165 18.1753 14.6248C18.2587 14.8332 18.3087 15.0415 18.3087 15.2748Z"
          stroke="#30B52D"
          stroke-width="1.5"
          stroke-miterlimit="10"
        />
        <path
          opacity="0.4"
          d="M15.4167 7.50016C15.4167 7.00016 15.025 6.2335 14.4417 5.6085C13.9083 5.0335 13.2 4.5835 12.5 4.5835"
          stroke="#30B52D"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          opacity="0.4"
          d="M18.3333 7.49984C18.3333 4.27484 15.725 1.6665 12.5 1.6665"
          stroke="#30B52D"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    baseColor: "#30B52D1A",
    text: "Phone",
  },
];

  const friendList = (friend) => {
    if (friend)
      return (
        <Link to={`/profile/${friend.username}`}>
          <img
            key={friend._id}
            className="border-2 border-[#FD6769] h-[30px] object-cover rounded-full w-[30px]"
            src={friend.profileImage}
            alt={friend.username}
            title={friend.username}
          />
        </Link>
      );
    else return null;
  };

  return (
    <>
      {/* profile cover & image */}
      <div className="relative min-h-[190px]">
        <div className="h-[100px] bg-cover rounded-t-2xl bg-[#FD6769] flex justify-center items-center">
          <img src={profileCover.default} />
        </div>
        <div className="absolute top-16 w-full flex justify-center">
          <img
            className="w-[120px] h-[120px] bg-white rounded-full outline outline-white object-cover"
            src={user?.profileImage}
            alt={user?.username}
          />
        </div>
      </div>

      <div className="space-y-4 px-3">
        {/* name and bio */}
        <div className="text-center">
          <div>
            <span className="text-[26px] text-[#515165] font-openSans_medium">
              {user?.type === USER_TYPE?.PERSONAL
                ? `${user?.first_name} ${user?.last_name}`
                : user?.business_name}
            </span>
          </div>
          <div className=" truncate text-clip  ">
            <span className="text-[#949494] text-xs font-openSans_regular">
              {user?.type === USER_TYPE.PERSONAL
                ? user?.occupation
                : user?.business_type}
            </span>
          </div>
          {user?.type === USER_TYPE.BUSINESS && (
            <div>
              <span className="text-[#949494] text-[12px] font-openSans_medium">
                {user?.business_address}
              </span>
            </div>
          )}
        </div>

        <div className="flex w-full justify-center">
          {isMyProfile ? (
            <button
              className="bg-[#F5F5F5] min-h-[36px] min-w-[124px] rounded text-[#2A2A2A] text-[16px] font-openSans_medium"
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <div className="flex flex-wrap flex-row justify-center gap-6">
                <div>
                  {friendStatus && (
                    <FrendRequestButton
                      friendStatus={friendStatus}
                      user={user}
                      onFriendStatusChange={onFriendStatusChange}
                    />
                  )}
                </div>
                <div className="flex w-full px-2 justify-between flex-row flex-wrap ">
                  {communicationItems.map((item) => (
                    <Communation content={item}/>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* friends */}
        <div className="text-center space-y-4">
          {totalFriends?.[0]?.total > 0 && (
            <div>
              <span className="text-[14px] text-[#515165] font-openSans_medium">
                Friends {totalFriends[0].total}
              </span>
            </div>
          )}
          <div>
            <div className="flex flex-wrap justify-center gap-2">
              {friends &&
                friends.length > 0 &&
                friends
                  .slice(0, 9)
                  .map((item, index) => (
                    <React.Fragment key={index}>
                      {item?.from?._id !== user?._id
                        ? friendList(item?.from)
                        : friendList(item?.to)}
                    </React.Fragment>
                  ))}
              {friends.length > 9 ? (
                <div className="bg-[rgb(230,244,246)] h-[30px] object-cover rounded-full w-[30px]">
                  {friends.length - 9 > 99 ? "99" : friends.length - 9}+
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* bio detail */}
          <div className="text-center">
            <div>
              <span className="text-[14px] text-[#949494] font-openSans_medium">
                {user?.about}
              </span>
            </div>
          </div>

          {user?.interests && user?.interests.length > 0 && (
            <div className="flex space-x-1 flex-wrap text-center justify-center">
              {user?.interests?.map((item, key) => (
                <span
                  key={key}
                  className="rounded-2xl bg-[#f4646b] py-1 mt-[5px] px-2 font-openSans_semiBold text-[#fff] text-[10px]"
                >
                  {item.name}
                </span>
              ))}
            </div>
          )}
          {isMyProfile && (
            <div className="flex justify-center">
              <div className="inline-block">
                <div
                  onClick={() => setIsBecomeLifeCoachModalOpen(true)}
                  className="flex w-full justify-center items-center space-x-2 cursor-pointer"
                >
                  <div>
                    <img src={starBadeIcon.default} alt="star-badge" />
                  </div>
                  <div>
                    <span className="text-[#0493A3] text-[14px] font-openSans_bold">
                      Become a Life Coach
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center pt-5 pb-7 border-t border-[#E6F4F6] mx-3">
            <span className="text-[#949494] text-[14px] font-openSans_medium">
              joined {user?.createdAt}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const SideBar = (props) => {
  const { isFetching, ...rest } = props;
  return (
    <div className="bg-white rounded-2xl">
      {!isFetching ? <SideBarContent {...rest} /> : <SideBarSkeleton />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  chat: state.chat,
});
const mapDispatchToProps = (dispatch) => ({
  openChat: (data) => dispatch(openChatAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
