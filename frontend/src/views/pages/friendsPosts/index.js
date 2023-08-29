import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProtectedMiddleware from "middleware/protectedMiddleware";
import FreeTrialModal from "views/components/screenComponents/home/freeTrialModal";
import MainContent from "views/components/screenComponents/home/mainContent";
import PaymentModal from "views/components/screenComponents/home/paymentModal";
import SetLocationModal from "views/components/screenComponents/home/setLocationModal";
import SideBar from "views/components/screenComponents/home/sidebar";
import SubscriptionModal from "views/components/screenComponents/home/subscriptionModal";
import PageLayout from "views/layouts/page";
import DashboardService from "services/dashboard.service";
import PostService from "services/post.service";

const FriendsPosts = (props) => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isFreeTrialOpen, setIsFreeTrialOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState({
        totalRequests:[],
        friendRequests: []
      });
  const [posts, setPosts] = useState({
        totalPosts:[],
        posts: []
      });
  const [isFetching, setIsFetching] = useState(true);
  const [fetchingPosts, setFetchingPosts] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(()=>{
    async function fetchData (){
      setIsFetching(true);
     await DashboardService.friendsNewsfeed(props.auth.user.token).then((response)=>{
      setPosts({
        totalPosts: response.data.data.totalPosts,
        posts: response.data.data.posts
      });
      setFriendRequests({
        totalRequests: response.data.data.totalRequests,
        friendRequests: response.data.data.friendRequests
      });
     }).catch(()=>{})
     setIsFetching(false);
    }
    fetchData();
  }, [])

  async function fetchPosts (page = 1){
      setFetchingPosts(() => true);
      setPage(page);
      await PostService.fetchFreindsPosts( props.auth.user.token, page).then(
        (response) => {
          if(response?.data?.data?.posts?.length > 0){
            setPosts(prevposts => ({posts: [...prevposts.posts, ...response?.data?.data?.posts], totalPosts: response?.data?.data?.totalPosts}))
          }
        }
      ).catch(()=>{});
        setFetchingPosts(() => false);
  }

  const filterFriendsRequset = (friendItem) => { 
      if(friendRequests.friendRequests.length > 0){
        setFriendRequests(prevState => ({
          friendRequests: prevState.friendRequests.filter(request => request._id !== friendItem._id)
        }));
      }
  }

  return (
    <>
      <PageLayout sideBar={<SideBar isFetching={isFetching} />} mainContent={<MainContent
          fetchingPosts={fetchingPosts} 
          page={page} 
          fetchData={fetchPosts} 
          posts={posts} 
          filterFriendsRequset={filterFriendsRequset} 
          friendRequests={friendRequests} 
          isFetching={isFetching} />} 
        />

      {isLocationModalOpen && (
        <SetLocationModal
          open={isLocationModalOpen}
          setOpen={setIsLocationModalOpen}
        />
      )}
      {isFreeTrialOpen && (
        <FreeTrialModal open={isFreeTrialOpen} setOpen={setIsFreeTrialOpen} />
      )}
      {isPaymentModalOpen && (
        <PaymentModal
          open={isPaymentModalOpen}
          setOpen={setIsPaymentModalOpen}
        />
      )}

      {isSubscriptionModalOpen && (
        <SubscriptionModal
          open={isSubscriptionModalOpen}
          setOpen={setIsSubscriptionModalOpen}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedMiddleware(FriendsPosts));