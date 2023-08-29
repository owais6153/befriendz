const GroupCardSkeleton = () => (
  <div className="animate-pulse rounded-2xl relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-full lg:h-full lg:shrink-0">
    <div className="absolute inset-0 h-full w-full rounded-2xl bg-gray-200 flex items-center justify-center">
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
    <div className="absolute bottom-0 bg-gradient-to-t from-[#0000008D] via-[#0000008D] to-[#00000000] t rounded-b-2xl  lg:w-full w-full p-3 pb-5">
      <div className="flex justify-between">
        <div>
          <span className="text-white font-openSans_bold text-[16px]">
            <div className="h-[8px] bg-gray-200 rounded-full w-[140px] mt-3 mb-2"></div>
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default GroupCardSkeleton;
