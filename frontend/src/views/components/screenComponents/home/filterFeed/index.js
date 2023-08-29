import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Images } from "config/images";
import { Link } from "react-router-dom";

const FilterFeed = () => {
  const { newIcon, starIcon, friendsIcon } = Images;
  const [mode, setMode] = useState("");
  const location = useLocation();

  useEffect(() => {
    setMode(window.location.pathname.substring(1));
    console.log(window.location.pathname.substring(1))
  }, [location]);
  return (
    <div className="hidden lg:col-span-3 lg:block xl:col-span-2 ">
      <nav aria-label="Sidebar" className="sticky top-4 space-y-4">
        <section>
          <div className="rounded-2xl bg-white flex items-center flex-col space-y-3 py-3 px-2">
            <Link to="/" className="block w-full">
              <div className={`p-[5px] flex w-full items-center space-x-2 rounded-md ${mode !== 'wall-of-fame' && mode !== 'friends/posts' ? 'bg-[#EAF8EA]' : ''}`}>
                <div className="bg-c_F5F5F5 rounded-md p-[10px]">
                  <img src={newIcon.default} />
                </div>
                <div className="text-white flex flex-col">
                  <span className="text-c_515165 text-[12px] font-openSans_bold">
                    New Feeds
                  </span>
                  <span className="text-c_949494 text-[8px] font-openSans_regular">
                    Find the latest update
                  </span>
                </div>
              </div>
            </Link>
            
            <Link to="/wall-of-fame" className="block w-full">
              <div className={`p-[5px] flex w-full items-center space-x-2 rounded-md ${mode === 'wall-of-fame' ? 'bg-c_FFF5E6' : ''}`}>
                <div className="bg-white rounded-md p-[10px]">
                  <img src={starIcon.default} />
                </div>
                <div className=" flex flex-col">
                  <span className="text-c_515165 text-[12px] font-openSans_bold">
                    Wall of Fame
                  </span>
                  <span className="text-c_949494 text-[8px] font-openSans_regular">
                    Shots featured today by curators
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/friends/posts" className="block w-full">
              <div className={`p-[5px] flex w-full  items-center space-x-2 rounded-md ${mode === 'friends/posts' ? 'bg-[#E6F4F6] ' : ''}`}>
                <div className="bg-c_F5F5F5 rounded-md p-[10px]">
                  <img src={friendsIcon.default} />
                </div>
                <div className=" flex flex-col">
                  <span className="text-c_515165 text-[12px] font-openSans_bold">
                    From Friends{" "}
                    {/* <span className="p-0.5 px-1 text-xs bg-tahiti-600 rounded-md text-white">
                      12
                    </span> */}
                  </span>

                  <span className="text-c_949494 text-[8px] font-openSans_regular">
                    Explore from your favorite people
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </nav>
    </div>
  );
};

export default FilterFeed;
