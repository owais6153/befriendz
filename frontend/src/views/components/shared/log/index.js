import { Images } from "config/images";
import React from "react";

const { callOutGoing } = Images;
const Log = ({ call }) => {
  const { name, duration, image, callType } = call;

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
              {duration}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div>
            <img src={callOutGoing.default} />
          </div>
          <div>
            <span className="text-[#949494] text-[10px] font-openSans_regular">
              {callType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
