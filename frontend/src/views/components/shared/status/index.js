import React from "react";

const Status = ({ type = "", label = "" }) => {
  return (
    <div
      className={`
      ${type === "success" && "bg-[#E9F9F4] text-[#30B52D]"}
      ${type === "cancelled" && "bg-[#FEE8E8] text-[#FD6769]"}
     font-openSans_regular text-[12px] h-[28px] w-[92px] rounded flex justify-center items-center`}
    >
      <span>{label}</span>
    </div>
  );
};

export default Status;
