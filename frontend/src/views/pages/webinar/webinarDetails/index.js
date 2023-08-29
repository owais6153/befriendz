import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import MainContent from "views/components/screenComponents/webinar/webinarDetails/mainContent";
import SideBar from "views/components/screenComponents/webinar/webinarDetails/sidebar";
import PageLayout from "views/layouts/page";
import ProtectedMiddleware from "middleware/protectedMiddleware";
import WebinarService from "services/webinar.service";
import Page404 from "views/pages/404";

const WebinarDetails = (props) => {
  const wid = useParams().wid;
  const [is404, setIs404] = useState(false);
  const [isFetching, setIsFecthing] = useState(true);
  const [data, setData] = useState([]);
  useEffect(()=>{ 
    async function fetchPost () {
      setIsFecthing(true)
      await WebinarService.viewWebinar(props.auth?.user?.token, wid).then((response)=>{
          setData({webinar: response.data.data.webinar, moderators: response.data.data.moderators});          
      }).catch((error)=>{
        setIs404(true);
      });
      setIsFecthing(false)
    }
    fetchPost();
  },[wid])
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
export default connect(mapStateToProps)(ProtectedMiddleware(WebinarDetails));