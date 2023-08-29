import { Fragment } from "react";
import PlaceAd from "views/components/shared/placeAd";
import Training from "views/components/shared/training/index";
import CreateTraining from "../createTraining";
import PageTabs from "../../tabs";
import GroupCardSkeleton from "views/components/skeletons/group/card";
import Search from "views/components/shared/search";

const MainContent = ({ activeTab, trainings, isFetching, onSearch }) => {
  const rightSide = () => (
    <>
      <CreateTraining />
      <PlaceAd />
      <PlaceAd />
      <PlaceAd />
    </>
  );
  return (
    <Fragment>
      <div className="mx-auto xl:grid xl:grid-cols-7 px-3 lg:px-4 lg:gap-8">
        <div className="col-span-5 flex flex-col space-y-6">
          <PageTabs activeTab={activeTab} />
          <div>
            <div className="xl:space-y-0 space-y-10 ">
              <aside className="xl:hidden space-y-6">{rightSide()}</aside>
              <div>
                <div className="mb-5">
                  <Search placeholder="Find Webinars" onSearch={onSearch} />
                </div>
                <div className="space-y-5 ">
                  {!isFetching ? 
                    <>        
                    {trainings?.trainings?.length > 0 ?             
                      <>
                        {trainings?.trainings?.map((item, index) => (
                          <Training key={item._id} training={item}/>
                        ))}
                        {trainings.totalWebinars?.[0]?.total > trainings.trainings.length ? 
                          <>
                            <div></div>
                            <div className="observe space-y-5 w-full ">
                            <p className="text-center font-openSans_semiBold text-c_949494 text-[14px] ">Loading More items...</p> 
                            </div>
                          </>
                        : null}
                      </>
                    : <p className="font-openSans_semiBold text-c_949494 text-[14px] m-0">No webinar found to show</p>}
                    </>
                  : <>
                      {Array?.from({ length: 9 })?.map((I, IN) => (
                        <GroupCardSkeleton key={IN}/>
                      ))}
                  </>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="hidden xl:block col-span-2 space-y-6">
          {rightSide()}
        </aside>
      </div>
    </Fragment>
  );
};
export default MainContent;
