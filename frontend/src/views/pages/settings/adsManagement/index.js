import { Fragment, useState } from "react";
import AdsManagementTable from "views/components/screenComponents/settings/adsManagement/adsManagementTable";
import AudienceInsights from "views/components/screenComponents/settings/adsManagement/audienceInsights";
import BudgetsAndScheduleForm from "views/components/screenComponents/settings/adsManagement/budegtsAndScheduleForm";
import CreateAd from "views/components/screenComponents/settings/adsManagement/createAd";
import ManageAdForm from "views/components/screenComponents/settings/adsManagement/manageAdForm";
import TableSearchAndFilter from "views/components/shared/tableSearch";

const AdsManagement = () => {
  const [currentView, setCurrentView] = useState({
    adListing: true,
    manageAd: false,
  });

  const adsListingView = () => (
    <div className="py-4">
      <div className="mx-auto xl:grid xl:grid-cols-7 px-3 sm:px-6 lg:gap-8 lg:px-8">
        <div className="col-span-5">
          <div>
            <div className="xl:space-y-0 space-y-10">
              <aside className="xl:hidden">
                <CreateAd setCurrentView={setCurrentView} />
              </aside>
              <div className="bg-white px-4 rounded-2xl min-h-screen">
                <div className="pb-5 pt-10 flex w-full justify-between items-center flex-wrap">
                  <div>
                    <span className="text-[#2A2A2A] font-openSans_bold text-[24px]">
                      Ads Management
                    </span>
                  </div>

                  <div>
                    <TableSearchAndFilter />
                  </div>
                </div>
                <div className="h-1 bg-c_FD6769 w-full rounded-full"></div>
                <AdsManagementTable />
              </div>
            </div>
          </div>
        </div>
        <aside className="hidden xl:block col-span-2">
          <CreateAd setCurrentView={setCurrentView} />
        </aside>
      </div>
    </div>
  );
  const manageAd = () => (
    <div className="py-4">
      <div className="mx-auto xl:grid xl:grid-cols-7 px-3 sm:px-6 lg:gap-8 lg:px-8">
        <div className="col-span-5">
          <div>
            <div className="xl:space-y-0 space-y-10">
              <aside className="xl:hidden">
                <ManageAdForm />
              </aside>
              <div className="bg-white px-4 pl-10 rounded-2xl min-h-screen">
                <div className="pb-5 pt-10 flex w-full justify-between items-center flex-wrap">
                  <div>
                    <span className="ml-6 text-[#2A2A2A] font-openSans_bold text-[24px]">
                      Instagram Post
                    </span>
                  </div>
                </div>
                <div></div>
                <div className="h-1 bg-c_FD6769 w-full rounded-full"></div>
                <AudienceInsights />

                {/* budgets and schedule form */}
                <BudgetsAndScheduleForm />
              </div>
            </div>
          </div>
        </div>
        <aside className="hidden xl:block col-span-2">
          <ManageAdForm />
        </aside>
      </div>
    </div>
  );
  return (
    <Fragment>
      {currentView?.adListing && adsListingView()}
      {currentView?.manageAd && manageAd()}
    </Fragment>
  );
};

export default AdsManagement;
