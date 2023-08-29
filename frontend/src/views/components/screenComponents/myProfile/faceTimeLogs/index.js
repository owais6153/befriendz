import React from "react";
import Log from "views/components/shared/log";

const FaceTimeLogs = () => {
  const call = {
    name: "Floyd Miles",
    image:
      "https://media.licdn.com/dms/image/C4D03AQGg7qCuHavEdg/profile-displayphoto-shrink_200_200/0/1521010848026?e=1684972800&v=beta&t=dHLiCBHVZ8eXFgRx5RvfuTKIPuhhN0gf2q9cYsEivjU",
    duration: "12:09 minutes",
    callType: "Outgoing",
  };
  return (
    <section>
      <div className="rounded-2xl bg-white space-y-5  pt-5 pb-10">
        <div>
          <div className="flex space-x-2 items-center px-5 ">
            <span className="text-[#515165] font-openSans_bold text-[16px] leading-none">
              Facetime Logs
            </span>
          </div>
        </div>
        <div className="bg-[#0493A3] w-full h-[66px] flex justify-center flex-col items-center">
          <div>
            <span className="text-[14px] text-white font-openSans_medium">
              Talking time left
            </span>
          </div>
          <div>
            <span className="text-[18px] text-white font-openSans_regular">
              15 minutes
            </span>
          </div>
        </div>
        <div className="px-5 ">
          <div>
            <div>
              <span className="text-[#949494] text-[14px] font-openSans_semiBold">
                Today
              </span>
            </div>
            <div className="py-2">
              <Log call={call} />
            </div>
          </div>

          <div>
            <div>
              <span className="text-[#949494] text-[14px] font-openSans_semiBold">
                Yesterday
              </span>
            </div>
            <div className="py-2 space-y-3">
              {Array.from({ length: 5 }).map((item) => (
                <Log call={call} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaceTimeLogs;
