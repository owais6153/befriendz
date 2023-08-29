import { Fragment, useState, useRef, useEffect } from "react";
import { USER_TYPE } from "constants/user.constant";
import Post1 from "views/components/shared/post/post1";
import Post2 from "views/components/shared/post/post2";
import FaceTimeAndPhoneCall from "../faceTimePhoneCall";
import FaceRequest from "../faceRequest";
import FaceTimeLogs from "../faceTimeLogs";
import ProfileTabs from "../profileTabs";
import PostItemSkeleton from "views/components/skeletons/post/postItem";
const MainContent = ({isMyProfile, myPosts, isFetching, fetchingPosts, fetchData, page}) => {
  const [activeTab, setActiveTab] = useState("My Posts");
  
  
  const [isLoaderInetersecting, setIsLoaderInetersecting] = useState(false);
  const loaderref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLoaderInetersecting(entry.isIntersecting);
      },
      { rootMargin: "-50px" }
    );
    if (
      !fetchingPosts &&
      loaderref != null &&
      myPosts.totalPosts?.[0]?.total > myPosts.posts.length
    )
      observer.observe(loaderref.current);

    return () => {
      if (!fetchingPosts && loaderref != null) observer.disconnect();
    };
  }, [isLoaderInetersecting, isFetching]);

  useEffect(() => {
    if (
      isLoaderInetersecting &&
      loaderref != null &&
      myPosts.totalPosts?.[0]?.total > myPosts.posts.length
    ) {
      fetchData(parseInt(page) + 1);
    }
  }, [isLoaderInetersecting]);

  const right = () => (
    <>
      {isMyProfile ? (
        <>
          <FaceTimeAndPhoneCall />
          <FaceRequest />
          <FaceTimeLogs />
        </>
      ) : (
        <></>
      )}
    </>
  );
  return (
    <Fragment>
      <div className="mx-auto xl:grid xl:grid-cols-7 px-3 lg:px-4 lg:gap-8">
        <div className="col-span-5">
          <div>
            <div className="xl:space-y-0 space-y-10 ">
              <aside className="xl:hidden space-y-6">{right()}</aside>
              <div>
                <div className="space-y-5">
                  <div>
                    <ProfileTabs
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  </div>
                  {!isFetching ?
                  <>
                    {myPosts.posts?.length > 0 ? 
                   <>
                   {myPosts.posts?.map((item, index) => (item?.author?.type === USER_TYPE.BUSINESS) ? <Post2 post={item} key={index}/> : <Post1 post={item} key={index}/> )}
                   {myPosts.totalPosts?.[0]?.total > myPosts.posts.length ? 
                   <div className="observe space-y-5" ref={loaderref}>
                   <p className="text-center font-openSans_semiBold text-c_949494 text-[14px] ">Loading More items...</p> 
                   </div>
                   : null}
                   </>
                    : <p className="font-openSans_semiBold text-c_949494 text-[14px] m-0">No post found to show</p>}
                  </>
                  : Array.from({ length: 10 }).map((item, index) => (
                    <PostItemSkeleton  key={index}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="hidden xl:block col-span-2 space-y-6">
          {right()}
        </aside>
      </div>
    </Fragment>
  );
};
export default MainContent;
