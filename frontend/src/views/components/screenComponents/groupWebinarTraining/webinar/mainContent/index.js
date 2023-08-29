import { Fragment } from "react";
import PlaceAd from "views/components/shared/placeAd";
import WebinarTraining from "views/components/shared/webinarTraining";
import PageTabs from "../../tabs";
import CreateWebinar from "../createWebinar";
import Search from "views/components/shared/search";
import GroupCardSkeleton from "views/components/skeletons/group/card";

const MainContent = ({ activeTab, webinars, isFetching, onSearch }) => {
  const rightSide = () => (
    <>
      <CreateWebinar />
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
                    {webinars?.webinars?.length > 0 ?             
                      <>
                        {webinars?.webinars?.map((item, index) => (
                          <WebinarTraining key={item._id} webinar={item}/>
                        ))}
                        {webinars.totalWebinars?.[0]?.total > webinars.webinars.length ? 
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
