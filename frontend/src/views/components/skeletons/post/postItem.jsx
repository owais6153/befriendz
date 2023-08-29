import React from "react";
const PostItemSkeleton = () => {
  return (
    <article
      className={`relative isolate flex flex-col gap-5 bg-white py-4 cursor-pointer rounded-2xl px-4 animate-pulse`}
    >
      <div className="flex w-full justify-between items-center flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-x-3">
            <div>
              <div
                className={`rounded-full flex justify-center items-center border border-[#FD6769] w-[60px] h-[60px]`}
              >
                <div className="w-[51px] h-[51px] rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 flex">
                  <svg
                    className=" bg-gray-50 h-[30px] inset-0 mx-auto object-cover w-[30px]  text-[#97989D]"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <div>
                <span className="text-[#FD6769] text-[16px] font-openSans_bold leading-none">
                  <span>
                    <div className="h-[13px] bg-gray-200 rounded-full w-[150px] mt-3 mb-2"></div>
                  </span>
                </span>
              </div>
              <div className="space-x-1">
                <span className="font-openSans_regular text-c_949494 text-[10px]">
                  <div className="h-[8px] bg-gray-200 rounded-full w-[40px] mt-3 mb-2"></div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="">
          <div>
            <span>
              <div className="h-[13px] bg-gray-200 rounded-full w-[150px] mt-0 mb-2"></div>
            </span>
          </div>
          <div>
            <span className="font-openSans_regular text-c_949494 text-[10px]">
              <div className="h-[8px] bg-gray-200 rounded-full w-[300px] mt-3 mb-0"></div>
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full h-[300px] rounded-2xl bg-gray-200 flex items-center justify-center flex-shrink-0 flex">
          <svg
            className=" bg-gray-50 h-[30px] inset-0 mx-auto object-cover w-[30px]  text-[#97989D]"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
      </div>
    </article>
  );
};

export default PostItemSkeleton;
