import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import MainContent from "views/components/screenComponents/viewPost/mainContent";
import ReportPostModal from "views/components/screenComponents/viewPost/reportPostModal";
import SideBar from "views/components/screenComponents/viewPost/sideBar";
import PageLayout from "views/layouts/page";
import Page404 from "../404";
import PostService from "services/post.service";
import ProtectedMiddleware from "middleware/protectedMiddleware";

function ViewPost(props) {
  const postid = useParams().postid;
  const [is404, setIs404] = useState(false);
  const [isFetching, setIsFecthing] = useState(true);
  const [isReportPostModalOpen, setIsReportPostModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [post, setPost] = useState([]);
  const [relatedPosts, setRelatedPost] = useState([]);
  useEffect(()=>{ 
    async function fetchPost () {
      setIsFecthing(true)
      await PostService.viewPost(props.auth?.user.token, postid).then((response)=>{
          setPost(response.data.data.post);
          setRelatedPost(response.data.data.relatedPosts);
      }).catch((error)=>{
        setIs404(true);
      });
      setIsFecthing(false)
    }
    fetchPost();
  },[postid, refetch])
  return (
    <>
      {!is404  ? <>
      <PageLayout sideBar={<SideBar  isFetching={isFetching} postDetails={post} />} mainContent={<MainContent isFetching={isFetching} postDetails={post} relatedPosts={relatedPosts} setRefetch={setRefetch} />} />

      <ReportPostModal
        open={isReportPostModalOpen}
        setOpen={setIsReportPostModalOpen}
      />
      </> : 
      <Page404 />
      }
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedMiddleware(ViewPost));