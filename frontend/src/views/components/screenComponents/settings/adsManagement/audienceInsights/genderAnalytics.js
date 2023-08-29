import React from "react";
import GenderChart from "./charts/genderChart";

const GenderAnalytics = () => {
  return (
    <div className="p-4 border border-[#f5f5f5] rounded-xl col-span-12 md:col-span-6">
      <div className="text-[#515165] font-semibold">Gender</div>
      <div className="flex flex-row flex-wrap gap-2 w-full justify-between">
        <div>
          <GenderChart variant="blue" label="Male" />
        </div>
        <div>
          <GenderChart variant="red" label="Female" />
        </div>
        <div>
          <GenderChart variant="yellow" label="Others" />
        </div>
      </div>
    </div>
  );
};

export default GenderAnalytics;
