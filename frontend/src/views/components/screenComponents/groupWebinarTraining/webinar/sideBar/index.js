import React from "react";
import Categories from "views/components/shared/categories";

const SideBar = () => {
  return (
    <div className="space-y-5">
      <Categories
        array={["Free", "Paid", "Newest", "Popular", "Relevant", "Friends"]}
      />
    </div>
  );
};

export default SideBar;
