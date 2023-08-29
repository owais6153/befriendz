import PostStats from "../postStats";
import PostedBy from "../postedBy";
const SideBar = ({postDetails, isFetching}) => {
  return (
    <div className="space-y-5">
      {!isFetching ? <>      
      <PostStats postDetails={postDetails}/>
      <PostedBy postDetails={postDetails}/>
      </>
       : null}
    </div>
  );
};

export default SideBar;
