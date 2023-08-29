import { Fragment, useRef, useState, useEffect } from "react"
import Attendees from "views/components/shared/attendees";
import GalleryGrid from "views/components/shared/galleryGrid";
import LiveHost from "views/components/shared/liveHost";
import PlaceAd from "views/components/shared/placeAd";
import Post1 from "views/components/shared/post/post1";
import Post2 from "views/components/shared/post/post2";
import EngageGroup from "../engageGroup";
import Explore from "../explore";
import ProfileSection from "../profileSection";
import GroupDetailSkeleton from "views/components/skeletons/group/groupDetail";
import { USER_TYPE } from "constants/user.constant";
import SideBarSkeleton from "views/components/skeletons/sidebar/sidebar";
import PostItemSkeleton from "views/components/skeletons/post/postItem";
import FreeTrialModal from "views/components/screenComponents/home/freeTrialModal";

const friends = [
  "https://media.licdn.com/dms/image/C4D03AQGg7qCuHavEdg/profile-displayphoto-shrink_200_200/0/1521010848026?e=1684972800&v=beta&t=dHLiCBHVZ8eXFgRx5RvfuTKIPuhhN0gf2q9cYsEivjU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgsqkHF5eNd4C0RVDrtlPZUWHlmWTTrZMpbB7KU9kHJ785LPLySvlLVslCoqCiVogkZE&usqp=CAU",
];

const MainContent = ({fetching, data, fetchingPosts, page, fetchData, posts, hasPinned}) => {
  const right = () => (
    <>
    {data.group?.isJoinedByCurrentUser ? 
    <>
      <EngageGroup group={data.group} />
      <LiveHost
        heading="Join Live"
        name="Bella craig is live now"
        image="https://media.licdn.com/dms/image/C4D03AQGg7qCuHavEdg/profile-displayphoto-shrink_200_200/0/1521010848026?e=1684972800&v=beta&t=dHLiCBHVZ8eXFgRx5RvfuTKIPuhhN0gf2q9cYsEivjU"
      />
      <PlaceAd />
      <Attendees heading={"Attendees"} users={friends} />
      </>: null}
      
      <PlaceAd />
      <div className="rounded-xl p-4 bg-white">
        <div className="my-1 font-openSans_semiBold text-[#3F4354]">
          Media Gallery
        </div>
        <GalleryGrid />
      </div>
    </>
  );
  const [isLoaderInetersecting, setIsLoaderInetersecting] = useState(false);
  const [isFreeTrialOpen, setIsFreeTrialOpen] = useState(false);
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
      posts.totalPosts?.[0]?.total > posts.posts.length
    )
      observer.observe(loaderref.current);

    return () => {
      if (!fetchingPosts && loaderref != null) observer.disconnect();
    };
  }, [isLoaderInetersecting, fetching]);

  useEffect(() => {
    if (
      isLoaderInetersecting &&
      loaderref != null &&
      posts.totalPosts?.[0]?.total > posts.posts.length
    ) {
      fetchData(parseInt(page) + 1);
    }
  }, [isLoaderInetersecting]);


  useEffect(()=>{
    const myTimeout = setTimeout(()=>{
      setIsFreeTrialOpen(true)
    }, 5000);
  }, [])
  
  return (
    <Fragment>
      <div className="mx-auto xl:grid xl:grid-cols-7 px-3 lg:px-4 lg:gap-8">
        <div className="col-span-5">          
          {!fetching ? <div>
            <div className="xl:space-y-0 space-y-10 ">
              <aside className="xl:hidden space-y-6">{right()}</aside>
              <div>
                <ProfileSection data={data}/>
                {data.group?.isJoinedByCurrentUser ? <Explore group={data.group} hasPinned={hasPinned} /> : null}
                <div className="space-y-5">
                  {!fetching ?
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
          </div> : <GroupDetailSkeleton /> }
        </div>
        <aside className="hidden xl:block col-span-2 space-y-6">
          {!fetching ? right() : <SideBarSkeleton />}
        </aside>
      </div>
      {isFreeTrialOpen && (
        <FreeTrialModal open={isFreeTrialOpen} setOpen={setIsFreeTrialOpen} />
      )}
    </Fragment>
  );
};
export default MainContent;
