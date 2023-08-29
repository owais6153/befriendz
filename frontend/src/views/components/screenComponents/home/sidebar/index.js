import FilterFeed from "../filterFeed";
import GoPremium from "../goPremium";
import PinnedGroups from "../pinnedGroups";
import SideBarSkeleton from "views/components/skeletons/sidebar/sidebar";

const SideBar = ({isFetching, pinnedGroups, subscription}) => {
  return (
    <div className="space-y-5">
      {!isFetching ? 
        <>
          <GoPremium subscription={subscription} />
          <FilterFeed />
           {/* <WebinarsAndTraining /> */}
          {pinnedGroups?.length > 0 ? <PinnedGroups pinnedGroups={pinnedGroups} />  : null}
        </>
      : <SideBarSkeleton />}
    </div>
  );
};

export default SideBar;
