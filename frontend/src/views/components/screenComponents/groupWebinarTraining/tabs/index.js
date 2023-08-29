import React from "react";
import { Link } from "react-router-dom";

const PageTabs = ({ activeTab }) => {

  return (
    <div className="relative isolate bg-white rounded-2xl p-4 space-y-5">
      <div className="flex flex-wrap items-center md:space-x-10 w-full justify-between md:justify-start">
        {["groups", "webinars", "trainings"]?.map((item) => (
          <Link to={`/${item}`}
            className={`${
              activeTab === item
                ? "bg-[#FD6769] text-white "
                : "bg-white text-[#949494]"
            } capitalize h-[42px] w-[123px] rounded-full flex justify-center items-center outline-none`}
          >
            <span className="text-[18px] font-openSans_semiBold ">{item}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PageTabs;
