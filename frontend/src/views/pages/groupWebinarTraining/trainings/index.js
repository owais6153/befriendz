import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import MainContent from "views/components/screenComponents/groupWebinarTraining/training/mainContent/index";
import SideBar from "views/components/screenComponents/groupWebinarTraining/training/sideBar/index";
import PageLayout from "views/layouts/page";
import DashboardService from "services/dashboard.service";
import TrainingService from "services/webinar.service";
import ProtectedMiddleware from "middleware/protectedMiddleware";

const Training = (props) => {
  const [isFetching ,setIsFetching] = useState(true)
  const [term, setTerm] = useState('');
  const [trainings ,setTrainings] = useState({
    trainings: [],
    totalTrainings: []
  })

  useEffect(()=>{
    async function fetchData (){
      setIsFetching(true);
      if(term.length < 1){
        await DashboardService.trainings(props.auth.user.token).then((response)=>{
          setTrainings({
            totalTrainings: response.data.data.totalTrainings,
            trainings: response.data.data.trainings
          });
        }).catch(()=>{})
      }
      else{
        await TrainingService.searchTrainings(props.auth.user.token, term).then((response)=>{
          setTrainings({
            totalTrainings: response.data.data.totalTrainings,
            trainings: response.data.data.trainings
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
          <MainContent activeTab={'trainings'} trainings={trainings} isFetching={isFetching} onSearch={setTerm}/>
        }
      />
    </Fragment>
  );
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedMiddleware(Training));