import React from "react";
import { useParams } from "react-router-dom";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const { username } = useParams();
  const handleClick = (item) => {
    setActiveTab(item);
  };
  return (
    <div className="relative isolate bg-white rounded-2xl p-4 space-y-5">
      <div className="flex flex-wrap  items-center justify-between w-full">
        {[
          "My Posts",
          ...(!username ? ["Liked Posts"] : []),
          "Webinars",
          "Training",
        ]?.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item)}
            className={`${
              activeTab === item
                ? "bg-[#FD6769] text-white "
                : "bg-white text-[#949494]"
            } h-[42px] w-[123px] rounded-full flex justify-center items-center outline-none`}
          >
            <span className="text-[18px] font-openSans_semiBold ">{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
