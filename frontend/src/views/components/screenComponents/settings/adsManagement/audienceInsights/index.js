import React from "react";
import Demographics from "./demographics";
import AgeAnalytics from "./ageAnalytics";
import GenderAnalytics from "./genderAnalytics";
import ClicksAndImpressions from "./clicksAndImpressions";

const AudienceInsights = () => {
  return (
    <div>
      <div className="my-6 text-xl font-semibold text-[#515165]">
        Audience Insights
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <div className=" w-full h-min grid gap-4  grid-cols-12">
          <AgeAnalytics />
          <Demographics />
        </div>
        <div className=" w-full h-min grid gap-4  grid-cols-12">
          <GenderAnalytics />
          <ClicksAndImpressions />
        </div>
      </div>
    </div>
  );
};

export default AudienceInsights;
