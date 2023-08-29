import { Fragment } from "react";
import PlaceAd from "views/components/shared/placeAd";
import WebinarInfoCard from "../webinarInfoCard";
import Attendees from "views/components/shared/attendees";
import WebinarDetailSkeleton from "views/components/skeletons/webinar/webinarDetail";

const friends = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgsqkHF5eNd4C0RVDrtlPZUWHlmWTTrZMpbB7KU9kHJ785LPLySvlLVslCoqCiVogkZE&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgsqkHF5eNd4C0RVDrtlPZUWHlmWTTrZMpbB7KU9kHJ785LPLySvlLVslCoqCiVogkZE&usqp=CAU",
];
const MainContent = ({data, isFetching}) => {
  return (
    <Fragment>
      <div className="mx-auto xl:grid xl:grid-cols-7 px-3 lg:px-4 lg:gap-8">
        <div className="col-span-5">
          <div>
            <div className="xl:space-y-0 space-y-10 ">
              <aside className="xl:hidden space-y-6">
                <PlaceAd />
                <Attendees heading={"Attendees"} users={friends} />
                <PlaceAd />
              </aside>
              <div>
                {isFetching ? <WebinarDetailSkeleton />: 
                <WebinarInfoCard webinar={data.webinar} />}
              </div>
            </div>
          </div>
        </div>
        <aside className="hidden xl:block col-span-2 space-y-6">
          <PlaceAd />
          <Attendees heading={"Attendees"} users={friends} />
          <PlaceAd />
        </aside>
      </div>
    </Fragment>
  );
};
export default MainContent;
