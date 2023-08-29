import React from "react";
import SideBarSkeleton from "views/components/skeletons/sidebar/sidebar";
import { USER_TYPE } from "constants/user.constant";
import { Link } from "react-router-dom";

const SideBar = ({isFetching, data}) => {
  return (
    <section>
      {!isFetching ? 
      <div className="rounded-2xl bg-white space-y-5 py-5 px-5">
        {data?.moderators?.members?.length > 0 ? 
        <>
        <div>
          <span className="text-[#3F4354] text-[16px] font-openSans_bold">
            Moderators
          </span>
        </div>

        <div className="space-y-5">
          {data?.moderators?.members?.map((item) => (
            <Link key={item._id} to={`/profile/${item?.user?.username}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  className="w-[30px] h-[30px] rounded-full object-cover"
                  src={item?.user?.profileImage}
                  alt={item?.user?.username}
                  title={item?.user?.username}
                />
                <div>
                  <span className="text-[#3F4354] text-[14px] font-openSans_medium font-medium">
                     {item?.user?.type === USER_TYPE?.PERSONAL
                ? `${item?.user?.first_name} ${item?.user?.last_name}`
                : item?.user?.business_name}
                  </span>
                </div>
              </div>
            </div></Link>
          ))}
        </div>
        </> : null}
      </div>
      : <SideBarSkeleton/>  
    }
    </section>
  );
};

export default SideBar;
