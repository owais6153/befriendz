import React from "react";
import SideBarSkeleton from "views/components/skeletons/sidebar/sidebar";
import { USER_TYPE } from "constants/user.constant";
import { Link } from "react-router-dom";

const SideBar = ({data, fetching}) => {
  return (
    <>
      {!fetching ?     
        <div className="space-y-5">      
          <section>
            <div className="rounded-2xl bg-white py-5 px-5">
              <div>
                <span className="text-[#3F4354] text-[16px] font-openSans_bold">
                  About
                </span>
              </div>

              <div>
                <span className="text-[#3F4354] text-[12px] font-openSans_regular" dangerouslySetInnerHTML={{ __html: data.group.about}} />
              </div>
            </div>
          </section>
          {data?.admins?.members?.length > 0 ? 
            <section>
              <div className="rounded-2xl bg-white space-y-5 py-5 px-5">
                <div>
                  <span className="text-[#3F4354] text-[16px] font-openSans_bold">
                    Admins
                  </span>
                </div>

                <div className="space-y-5">
                  {data?.admins?.members?.map((item) => (
                    <Link to={`/profile/${item.user.username}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          className="w-[30px] h-[30px] rounded-full object-cover"           
                          src={item?.user.profileImage}
                          alt={item?.user.username}
                          title={item?.user.username}
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
              </div>
            </section>
          : null}
        </div>
      : <SideBarSkeleton />}
    </>

  );
};

export default SideBar;
