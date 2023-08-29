import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import MainContent from "views/components/screenComponents/friends/mainContent";
import SideBar from "views/components/screenComponents/friends/sidebar";
import PageLayout from "views/layouts/page";
import DashboardService from "services/dashboard.service";
import FriendsService from "services/friends.service";
import ProtectedMiddleware from "middleware/protectedMiddleware";
import { useParams } from "react-router-dom";
import Page404 from "../404";

const Friends = (props) => {

  const type = useParams().type || 'friends';

  const [friendRequests, setFriendRequests] = useState([]);  
  const [friendRequestsPage, setFriendRequestsPage] = useState(1);
  const [friends, setFriends] = useState([]);
  const [friendsPage, setFriendsPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pinnedGroups, setPinnedGroups] = useState([]);

  useEffect(() => {
    fetchFriends();
    return () => {
      setFriendRequests([])
      setFriends([])
    }
  }, [type])

  const fetchFriends = useCallback(async  () => {      
    setIsFetching(() => true);
    await DashboardService.friends( props.auth.user.token,).then(
      (response) => {
        setFriendRequests(response.data.data.friendRequests);
        setFriends(response.data.data.friends)      
        setPinnedGroups(response.data.data.pinnedGroups)
      },
      (error) => {
      }
    ).catch(()=>{});
    setIsFetching(() => false);
  })
  
  const loadMoreList =useCallback( async () => {    
    setLoadingMore(true)
    if(type === 'friends'){
      await FriendsService.fetchFriends(props.auth.user.token, friendsPage + 1).then((response)=>{
          setFriends((prevState) => ({
            ...prevState,
            friends: [...prevState.friends, ...response.data?.data?.friends?.friends],
            totalFriends: response.data?.data?.friends?.totalFriends,
          }))
          setFriendsPage(friendsPage + 1)
        },
        (error) => {}
      ).catch(()=>{})
    }
    if(type === 'request'){
      await FriendsService.fetchFriendRequests(props.auth.user.token, friendRequestsPage + 1).then((response)=>{
          setFriendRequests((prevState) => ({
            ...prevState,
            friendRequests: [...prevState.friendRequests, ...response.data?.data?.friendRequests?.friendRequests],
            totalRequests: response.data?.data?.friendRequests?.totalRequests,
          }))
          setFriendRequestsPage(friendRequestsPage + 1)
        },
        (error) => {}
      ).catch(()=>{})
    }
    setLoadingMore(false)
  })

  const filterFriendsList = useCallback((friendItem) => { 
    if(type === 'request'){
      if(friendRequests.friendRequests.length > 0){
        setFriendRequests(prevState => ({
          friendRequests: prevState.friendRequests.filter(request => request._id !== friendItem._id)
        }));
      }
    }
    if(type === 'friends'){
      if(friends.friends.length > 0){
        setFriends(prevState => ({
          friends: prevState.friends.filter((request)=>(request._id !== friendItem?._id))
        }))
      }
    }
  })

  if(type === "suggestions" || type === "friends" || type === "request")
  return (
    <>
      <PageLayout
        sideBar={
          <SideBar
            activeOPtion={type}
            isFetching={isFetching} 
            pinnedGroups={pinnedGroups}
          />
        }
        mainContent={<MainContent  isFetching={isFetching} loadMoreList={loadMoreList} loadingMore={loadingMore} onFriendStatusChange={filterFriendsList} friendRequests={friendRequests} friends={friends} activeOPtion={type} />}
      />
    </>
  );
  else
  return <Page404 />;
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedMiddleware(Friends));