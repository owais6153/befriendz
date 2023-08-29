import { Images } from "config/images";
import React from "react";
import { Link } from "react-router-dom";
const { arrowRightIcon, musicIon, doubleArrowRightBlueIcon } = Images;

const MeetNewPeopleList = () => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0">
      <img
        className="h-[40px] w-[40px] rounded-full"
        src={
          "https://th.bing.com/th/id/OIP.yd8H6xp_oq4OYbfQmz25eQAAAA?pid=ImgDet&w=300&h=300&rs=1"
        }
        alt=""
      />
    </div>
    <div className="min-w-0 flex-1">
      <p className="font-openSans_semiBold text-[#2A2A2A] text-[14px] mb-0">
        <a>James</a>
      </p>
      <p className="font-openSans_regular text-c_949494 text-[10px] mb-0">
        <a>@lai_james</a>
      </p>
    </div>
    <div className="flex-shrink-0">
      <button
        type="button"
        className="inline-flex rounded-md bg-c_0493A3 py-2 px-3 text-[12px] font-openSans_semiBold text-white focus-visible:outline-none hover:brightness-110"
      >
        Befriend
      </button>
    </div>
  </div>
);

const MeetNewPeople = () => {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl bg-white space-y-5 p-5">
        <>
          <div className="flex space-x-2 items-center">
            <span className="text-[#515165] font-openSans_bold text-[16px] leading-none">
              Meet New People
            </span>
            <span>
              <img src={arrowRightIcon.default} />
            </span>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 })?.map((item) => (
              <MeetNewPeopleList />
            ))}
            <div className="flex justify-center">
              <div className="inline-block">
                <Link
                  to="/friends"
                  className="flex justify-center items-center space-x-2 cursor-pointer"
                >
                  <span className=" text-c_0493A3 text-[12px] font-openSans_light">
                    See More People
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

export default MeetNewPeople;
