import React from "react";
import Sell from "./components/Sell";
import FilterItems from "./components/FilterItems";

const LeftSideFilter = () => {
  return (
    <div className="hidden lg:col-span-3 lg:block xl:col-span-2 ">
      <nav aria-label="Sidebar" className="sticky top-4 space-y-4">
        <Sell />
        <FilterItems />
      </nav>
    </div>
  );
};

export default LeftSideFilter;
