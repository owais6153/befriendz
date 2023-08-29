import { Images } from "config/images";
import React from "react";
import { Link } from "react-router-dom";
import { removeHTMLAndLimitString } from "shared/helper";
const { arrowRightIcon, musicIon, doubleArrowRightBlueIcon } = Images;

const PinnedGroupsList = ({item}) => (
  <Link to={`/groups/${item._id}`} className="w-full font-medium inline-block mb-1">
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0">
      <div className="h-[32px] w-[32px] bg-c_FFE1E1 rounded-md flex items-center justify-center">
        <img className=" " 
          src={item.bannerImage}
          alt={item.title} />
      </div>
    </div>
    <div className="">
      <p className="font-openSans_semiBold text-[#2A2A2A] text-[12px] mb-0">
        {item.title}
      </p>
      <p className="font-openSans_regular text-c_949494 text-[10px] mb-0">
        {removeHTMLAndLimitString(item.about)?.length > 218 ? 
          <>
            {removeHTMLAndLimitString(item.about, 218)}...{" "}
            <span className="text-[#0493A3] font-openSans_semiBold ">
              READ MORE
            </span>
          </>
          :
          removeHTMLAndLimitString(item.about)
        }
      </p>
    </div>
  </div></Link>
);

const PinnedGroups = ({pinnedGroups}) => {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl bg-white space-y-5 p-5">
        <>
          <div className="flex space-x-2 items-center">
            <span className="text-[#515165] font-openSans_bold text-[16px] leading-none">
              Pinned Groups
            </span>
            <span>
              <img src={arrowRightIcon.default} />
            </span>
          </div>
          <div className="space-y-4">
            {pinnedGroups?.map((item) => (
              <PinnedGroupsList key={item._id} item={item} />
            ))}
            <div className="flex justify-center">
              <div className="inline-block">
                <Link
                  to="/groups"
                  className="flex justify-center items-center space-x-2 cursor-pointer"
                >
                  <span className=" text-c_0493A3 text-[12px] font-openSans_light">
                    Explore
                  </span>
                  <img src={doubleArrowRightBlueIcon.default} />
                </Link>
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
  );
};

export default PinnedGroups;
