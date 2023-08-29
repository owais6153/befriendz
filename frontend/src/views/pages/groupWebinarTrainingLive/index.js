import React, { Fragment } from "react";
import PageLayout from "views/layouts/page";
import MainContent from "../../components/screenComponents/groupWebinarTrainingLive/mainContent";
import SideBar from "../../components/screenComponents/groupWebinarTrainingLive/sidebar";
const GroupWebinarTrainingLive = () => {
  return (
    <Fragment>
      <PageLayout sideBar={<SideBar />} mainContent={<MainContent />} />
    </Fragment>
  );
};

export default GroupWebinarTrainingLive;
