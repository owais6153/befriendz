import React from "react";

const ClicksAndImpressions = () => {
  return (
    <div className="p-4 border border-[#f5f5f5] rounded-xl col-span-12 md:col-span-6">
      <div className="flex flex-row flex-wrap justify-between items-center">
        <div className="text-[#515165] font-semibold">
          Clicks and Impressions
        </div>
      </div>
      <div className="flex flex-col h-full  justify-around">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl text-[#30B52D] font-bold">291</span>
          </div>
          <div className="text-[#949494] font-semibold">clicks</div>
        </div>

        <div className="flex items-center gap-2 justify-between">
          <div>Impressions</div>
          <div className="flex items-center gap-2">
            <span className="float-right text-3xl text-[#0493A3] font-bold">
              3.18k
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClicksAndImpressions;
