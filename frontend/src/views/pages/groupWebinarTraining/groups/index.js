import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import MainContent from "views/components/screenComponents/groupWebinarTraining/group/mainContent";
import PageLayout from "views/layouts/page";
import LeftSideBar from "./LeftSideBar";
import DashboardService from "services/dashboard.service";
import ProtectedMiddleware from "middleware/protectedMiddleware";
import GroupService from "services/group.service";

const Groups = (props) => {

  const [isFetching ,setIsFetching] = useState(true)
  const [groups ,setGroups] = useState({
    groups: [],
    totalGroups: []
  })
  const [term, setTerm] = useState('');
  const [fastestGrowingGroups ,setFastestGrowingGroups] = useState({
    fastestGrowingGroups: [],
    totalFastestGrowingGroups: []
  })
  const [popularGroups ,setPopularGroups] = useState({
    popularGroups: [],
    totalFastestGrowingGroups: []
  })
  const [newlyLaunchedGroups ,setNewlyLaunchedGroups] = useState({
    newlyLaunchedGroups: [],
    totalNewlyLaunchedGroups: []
  })
  const [fetchingPosts, setFetchingPosts] = useState(false);
  const [page, setPage] = useState(1);


  async function fetchPosts (page = 1){
      setFetchingPosts(() => true);
      setPage(page);
      
    if(term.length < 1){
      await GroupService.fetchReleventGroups( props.auth?.user?.token || null, page).then(
        (response) => {
          if(response?.data?.data?.groups?.length > 0){
            setGroups(prevposts => ({groups: [...prevposts.groups, ...response?.data?.data?.groups], totalGroups: response?.data?.data?.totalGroups}))
          }
        }
      ).catch(()=>{});
    }
    else{
      await GroupService.searchGroups(props.auth?.user?.token || null, term, page).then((response)=>{
        setGroups(prevposts => ({groups: [...prevposts.groups, ...response?.data?.data?.groups], totalGroups: response?.data?.data?.totalGroups}))  
     }).catch(()=>{})
    }
    setFetchingPosts(() => false);
  }

  useEffect(()=>{
    async function fetchData (){
      setIsFetching(true);
      setPage(1)
      if(term.length < 1){
        await DashboardService.groups(props.auth?.user?.token || null).then((response)=>{
          setGroups({
            totalGroups: response.data.data.totalGroups,
            groups: response.data.data.groups
          });
          setFastestGrowingGroups(prevposts => ({fastestGrowingGroups: [...prevposts.fastestGrowingGroups, ...response?.data?.data?.fastestGrowingGroups], totalFastestGrowingGroups: response?.data?.data?.totalFastestGrowingGroups}))
          setPopularGroups(prevposts => ({popularGroups: [...prevposts.popularGroups, ...response?.data?.data?.popularGroups], totalPopularGroups: response?.data?.data?.totalPopularGroups}))
          setNewlyLaunchedGroups(prevposts => ({newlyLaunchedGroups: [...prevposts.newlyLaunchedGroups, ...response?.data?.data?.newlyLaunchedGroups], totalNewlyLaunchedGroups: response?.data?.data?.totalNewlyLaunchedGroups}))
        }).catch(()=>{})
      }
      else{
        await GroupService.searchGroups(props.auth?.user?.token || null, term).then((response)=>{
          setGroups({
            totalGroups: response.data.data.totalGroups,
            groups: response.data.data.groups
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
        sideBar={<LeftSideBar
          fastestGrowingGroups={fastestGrowingGroups}   
          popularGroups={popularGroups}   
          newlyLaunchedGroups={newlyLaunchedGroups}   
          isFetching={isFetching}
        />}
        mainContent={
          <MainContent
            onSearch={setTerm}
            term={term}
            activeTab={'groups'} 
            isFetching={isFetching}
            groups={groups}
            fetchingPosts={fetchingPosts} 
            page={page} 
            fetchData={fetchPosts} 
          />
        }
      />
    </Fragment>
  );
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Groups);