import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainContent from "views/components/screenComponents/group/groupDetails/mainContent";
import SideBar from "views/components/screenComponents/group/groupDetails/sidebar";
import PageLayout from "views/layouts/page";
import ProtectedMiddleware from "middleware/protectedMiddleware";
import { connect } from "react-redux";
import GroupService from "services/group.service";
import Page404 from "views/pages/404";

const GroupDetails = (props) => {

  const gid = useParams().gid;
  const [is404, setIs404] = useState(false);
  const [isFetching, setIsFecthing] = useState(true);
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState({
        totalPosts:[],
        posts: []
      });
  const [fetchingPosts, setFetchingPosts] = useState(false);
  const [page, setPage] = useState(1);
  const [hasPinned, setPin] = useState(false);

    useEffect(()=>{ 
      async function fetchPost () {
        setIsFecthing(true)
        await GroupService.viewGroup(props.auth?.user?.token, gid).then((response)=>{
            setData({group: response.data.data.group, admins: response.data.data.admins});          
            setPosts({
              totalPosts: response.data.data.totalPosts,
              posts: response.data.data.posts
            });
            setPin(response.data.data?.hasPinned)
        }).catch((error)=>{
          setIs404(true);
        });
        setIsFecthing(false)
      }
      fetchPost();
    },[gid])

    async function fetchGroupPosts (page = 1){
      setFetchingPosts(() => true);
      setPage(page);
      await GroupService.fetchGroupPosts( props.auth?.user?.token, data.group._id, page).then(
        (response) => {
          if(response?.data?.data?.posts?.length > 0){
            setPosts(prevposts => ({posts: [...prevposts.posts, ...response?.data?.data?.posts], totalPosts: response?.data?.data?.totalPosts}))
          }
        }
      ).catch(()=>{});
        setFetchingPosts(() => false);
  }


  return (
    <>
      {!is404  ? <>
        <PageLayout sideBar={<SideBar data={data} fetching={isFetching}/>} mainContent={<MainContent
          data={data} 
          hasPinned={hasPinned}
          fetching={isFetching}
          fetchingPosts={fetchingPosts} 
          page={page} 
          fetchData={fetchGroupPosts} 
          posts={posts} 

        />} />
      </> : 
        <Page404 />
      }
    </>
    
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(GroupDetails);