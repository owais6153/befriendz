import React from "react";
import AgeChart from "./charts/ageChart";

const AgeAnalytics = () => {
  return (
    <div className="p-4 border border-[#f5f5f5] rounded-xl col-span-12 md:col-span-6">
      <div className="text-[#515165] font-semibold">Age</div>
      <div>
        <AgeChart />
      </div>
    </div>
  );
};

export default AgeAnalytics;
