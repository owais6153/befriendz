import { Fragment, useRef, useState, useEffect } from "react";
import PlaceAd from "views/components/shared/placeAd";
import MeetNewPeople from "../meetNewPeople";
import WantToBeFriends from "../wantToBeFriends";
import AddPost from "../addPost";
import SideBarSkeleton from "views/components/skeletons/sidebar/sidebar";
import PostItemSkeleton from "views/components/skeletons/post/postItem";
import Post1 from "views/components/shared/post/post1";
import Post2 from "views/components/shared/post/post2";
import { USER_TYPE } from "constants/user.constant";

const MainContent = ({ friendRequests,filterFriendsRequset, isFetching, posts, fetchingPosts, page, fetchData }) => {
  const [isLoaderInetersecting, setIsLoaderInetersecting] = useState(false);
  const loaderref = useRef(null);

  const rightSide = () => (
    <>
      {friendRequests?.totalRequests?.[0]?.total > 0 && (
        <WantToBeFriends filterFriendsRequset={filterFriendsRequset} friendRequests={friendRequests?.friendRequests} />
      )}
      <PlaceAd />
      {/* <MeetNewPeople /> */}
      {/* <PlaceAd /> */}
    </>
  );


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
      posts.totalPosts?.[0]?.total > posts.posts.length
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
      posts.totalPosts?.[0]?.total > posts.posts.length
    ) {
      fetchData(parseInt(page) + 1);
    }
  }, [isLoaderInetersecting]);

  return (
    <Fragment>
      <div className="mx-auto xl:grid xl:grid-cols-7 px-3 lg:px-4 lg:gap-8">
        <div className="col-span-5">
          <div>
            <div className="xl:space-y-0 space-y-10 ">
              <aside className="xl:hidden space-y-6">
                {!isFetching ? rightSide() : null}
              </aside>
              <div className="space-y-5">
                <div>
                  <AddPost />
                </div>
                  {!isFetching ?
                  <>
                      {posts.posts?.length > 0 ? 
                      <>
                        {posts.posts?.map((item, index) => (item?.author?.type === USER_TYPE.BUSINESS) ? <Post2 post={item} key={index}/> : <Post1 post={item} key={index}/> )}
                        {posts.totalPosts?.[0]?.total > posts.posts.length ? 
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
        <aside className="hidden xl:block col-span-2 space-y-6">
          {!isFetching ? rightSide() : <SideBarSkeleton />}
        </aside>
      </div>
    </Fragment>
  );
};
export default MainContent;
