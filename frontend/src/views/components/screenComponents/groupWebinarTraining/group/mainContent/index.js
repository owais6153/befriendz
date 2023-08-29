import { Fragment, useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import PlaceAd from "views/components/shared/placeAd";
import CreateGroup from "../createGroup";
import GroupCards from "../groupCards";
import PageTabs from "../../tabs";
import GroupCardSkeleton from "views/components/skeletons/group/card";
import Search from "views/components/shared/search";

const MainContent = ({ activeTab, isFetching, groups, fetchingPosts, fetchData, page, onSearch, term, auth  }) => {
  const rightSide = () => (
    <>
    {auth.isLoggedIn ? 
      <CreateGroup />
      : null}
      <PlaceAd />
      <PlaceAd />
      <PlaceAd />
    </>
  );
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
      loaderref != null && loaderref.current &&
      groups.totalGroups?.[0]?.total > groups?.groups?.length
    )
      observer.observe(loaderref.current);

    return () => {
      if (!fetchingPosts && loaderref != null) observer.disconnect();
    };
  }, [isLoaderInetersecting, isFetching, term]);

  useEffect(() => {
    if (
      isLoaderInetersecting &&
      loaderref != null &&
      groups.totalGroups?.[0]?.total > groups?.groups?.length
    ) {
      fetchData(parseInt(page) + 1);
    }
  }, [isLoaderInetersecting]);


  return (
    <Fragment>
      <div className="mx-auto xl:grid xl:grid-cols-7 px-3 lg:px-4 lg:gap-8">
        <div className="col-span-5 flex flex-col space-y-6">
          {auth.isLoggedIn ? <PageTabs activeTab={activeTab} />
      : null}
          <div>
            <div className="xl:space-y-0 space-y-10 ">
              <aside className="xl:hidden space-y-6">{rightSide()}</aside>
              <div>
                <div className="mb-5">
                  <Search placeholder="Find Any Group Here..." onSearch={onSearch}/>
                </div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
                  {!isFetching ? 
                    <>        
                    {groups?.groups?.length > 0 ?             
                      <>
                        {groups?.groups?.map((item, index) => (
                          <GroupCards key={item._id} group={item}/>
                        ))}
                        {groups.totalGroups?.[0]?.total > groups.groups.length ? 
                          <>
                            <div></div>
                            <div className="observe space-y-5 w-full " ref={loaderref}>
                            <p className="text-center font-openSans_semiBold text-c_949494 text-[14px] ">Loading More items...</p> 
                            </div>
                          </>
                        : null}
                      </>
                    : <p className="font-openSans_semiBold text-c_949494 text-[14px] m-0">No group found to show</p>}
                    </>
                  : <>
                      {Array?.from({ length: 9 })?.map((item, index) => (
                        <GroupCardSkeleton key={index}/>
                      ))}
                  </>}
  
                  </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="hidden xl:block col-span-2 space-y-6">
          {rightSide()}
        </aside>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(MainContent);