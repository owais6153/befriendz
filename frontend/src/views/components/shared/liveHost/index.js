import React from "react";

const LiveHost = ({ heading = "", name = "", image = "" }) => {
  return (
    <section>
      <div className="rounded-2xl bg-white space-y-5 p-5">
        <div>
          <span className="text-[#3F4354] text-[16px] font-openSans_bold">
            {heading}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="w-[45px] h-[45px] bg-gradient-to-r from-[#FD6769] to-[#FFE815] rounded-full object-cover flex justify-center items-center">
            <img
              className="w-[40px] h-[40px] rounded-full object-cover"
              src={image}
            />
          </div>
          <div>
            <span className="text-[#000000] text-[16px] font-openSans_semiBold">
              {name}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveHost;
