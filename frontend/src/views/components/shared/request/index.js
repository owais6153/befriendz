import React from "react";

const Request = ({ user }) => {
  const { name, userName, image, date, time } = user;
  return (
    <div>
      <div className="flex w-full justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <img
            className="w-[40px] h-[40px] rounded-full object-cover"
            src={image}
          />

          <div className="flex flex-col">
            <span className="text-[#000000] text-[14px] font-openSans_semiBold">
              {name}
            </span>
            <span className="text-[#949494] text-[10px] font-openSans_regular">
              {userName}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[#000000] text-[12px] font-openSans_semiBold">
            {date}
          </span>
          <span className="text-[#949494] text-[10px] font-openSans_regular">
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Request;
