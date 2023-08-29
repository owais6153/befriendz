import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import MainContent from "views/components/screenComponents/groupWebinarTraining/webinar/mainContent";
import SideBar from "views/components/screenComponents/groupWebinarTraining/webinar/sideBar";
import PageLayout from "views/layouts/page";
import DashboardService from "services/dashboard.service";
import WebinarService from "services/webinar.service";
import ProtectedMiddleware from "middleware/protectedMiddleware";

const Webinar = (props) => {
  const [isFetching ,setIsFetching] = useState(true)
  const [term, setTerm] = useState('');
  const [webinars ,setWebinars] = useState({
    webinars: [],
    totalWebinars: []
  })

  useEffect(()=>{
    async function fetchData (){
      setIsFetching(true);
      if(term.length < 1){
     await DashboardService.webinars(props.auth.user.token).then((response)=>{
      setWebinars({
        totalWebinars: response.data.data.totalWebinars,
        webinars: response.data.data.webinars
      });
     }).catch(()=>{})
      }
      else{
        await WebinarService.searchWebinars(props.auth.user.token, term).then((response)=>{
          setWebinars({
            totalWebinars: response.data.data.totalWebinars,
            webinars: response.data.data.webinars
          });
        }).catch(()=>{})
      }
     setIsFetching(false);
    }
    fetchData();
  }, [term])

  return (
    <Fragment>
      <PageLayout
        sideBar={<SideBar />}
        mainContent={
          <MainContent activeTab={'webinars'} webinars={webinars} isFetching={isFetching} onSearch={setTerm}/>
        }
      />
    </Fragment>
  );
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedMiddleware(Webinar));