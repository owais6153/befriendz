import FilterItems from "../FilterItems";
import Sell from "../Sell";
const SideBar = () => {
  return (
    <div className="space-y-5">
      <Sell />
      <FilterItems />
    </div>
  );
};
export default SideBar;
