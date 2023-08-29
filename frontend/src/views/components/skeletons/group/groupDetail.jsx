import SideBarSkeleton from "../sidebar/sidebar";
import PostItemSkeleton from "../post/postItem";

const GroupDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="xl:space-y-0 space-y-10 ">
      <aside className="xl:hidden space-y-6">
        <SideBarSkeleton />
      </aside>
      <div>
        <div className="p-3 bg-white rounded-2xl mb-3">
          <div className="">
            <div className="w-[100%]  h-[174px] rounded-2xl bg-gray-200 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          </div>
          <div className="py-5">
            <div className="flex justify-between items-center">
              <div className="flex space-x-3 items-center">
                <div>
                  <div className="w-14  h-14 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                      className="w-2/4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 640 512"
                    >
                      <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="h-[12px] bg-gray-400 rounded-full w-[150px] mt-0 mb-2 "></div>
                  <div className="h-[8px] bg-gray-200 rounded-full w-[100px] mb-0 "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          {Array.from({ length: 10 }).map((item, index) => (
            <PostItemSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default GroupDetailSkeleton;
