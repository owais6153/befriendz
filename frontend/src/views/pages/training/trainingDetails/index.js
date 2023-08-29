import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import MainContent from "views/components/screenComponents/training/trainingDetails/mainContent";
import SideBar from "views/components/screenComponents/training/trainingDetails/sidebar";
import PageLayout from "views/layouts/page";
import ProtectedMiddleware from "middleware/protectedMiddleware";
import TrainingService from "services/training.service";
import Page404 from "views/pages/404";

const TrainingDetails = (props) => {
    const tid = useParams().tid;
  const [is404, setIs404] = useState(false);
  const [isFetching, setIsFecthing] = useState(true);
  const [data, setData] = useState([]);
  useEffect(()=>{ 
    async function fetchPost () {
      setIsFecthing(true)
      await TrainingService.viewTraining(props.auth?.user?.token, tid).then((response)=>{
          setData({training: response.data.data.training, moderators: response.data.data.moderators});          
      }).catch((error)=>{
        setIs404(true);
      });
      setIsFecthing(false)
    }
    fetchPost();
  },[tid])

  return (
    <>
      {!is404  ? 
        <>
      <PageLayout sideBar={<SideBar data={data} isFetching={isFetching} />} mainContent={<MainContent data={data} isFetching={isFetching} />} />
        </> : 
        <Page404 />
      }
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedMiddleware(TrainingDetails));