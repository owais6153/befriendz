import { Images } from "config/images";
import React from "react";
const { chevronRightIcon } = Images;
const ListItem = ({ item, ...rest }) => {
  return (
    <div
      {...rest}
      className="bg-[#F5F5F5] min-h-[60px] rounded-sm flex items-center relative px-4 cursor-pointer"
    >
      <span className="font-openSans_medium text-[#515165] lg:text-[16px] md:text-[15px] sm:text-[14px] text-[13px]">
        {item?.label}
      </span>
      <img className="absolute right-4" src={chevronRightIcon.default} />
    </div>
  );
};

export default ListItem;
