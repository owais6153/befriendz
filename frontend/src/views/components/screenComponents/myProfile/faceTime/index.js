import { Images } from "config/images";
import React from "react";
import Request from "views/components/shared/request";

const FaceTime = () => {
  const user = {
    name: "Floyd Miles",
    userName: "@blazef",
    image:
      "https://media.licdn.com/dms/image/C4D03AQGg7qCuHavEdg/profile-displayphoto-shrink_200_200/0/1521010848026?e=1684972800&v=beta&t=dHLiCBHVZ8eXFgRx5RvfuTKIPuhhN0gf2q9cYsEivjU",
    date: "Today",
    time: "6:00pm",
  };
  const { greyBadgeIcon } = Images;
  return (
    <div className="space-y-5">
      <div className="space-y-5">
        <div className="flex items-center space-x-3">
          <div>
            <img src={greyBadgeIcon.default} />
          </div>
          <div>
            <span className="text-[#515165] text-[18px] font-openSans_semiBold">
              Gold Package
            </span>
          </div>
        </div>

        <div>
          <span className="text-[#949494] text-[14px] font-openSans_regular">
            You currently have unlimited Email, emergency text messages 30 min
            FaceTime for 1 friend @ $30 once in a week
          </span>
        </div>

        <div>
          <div className="flex justify-between flex-wrap gap-2">
            <button className="outline-none bg-[#0493A3] text-white text-[16px] font-openSans_semiBold flex justify-center items-center min-h-[36px] min-w-[147px] rounded-lg">
              <span>Renew Package</span>
            </button>
            <button className="outline-none bg-[#F5F5F5] text-[#515165] text-[16px] font-openSans_semiBold flex justify-center items-center min-h-[36px] min-w-[147px] rounded-lg">
              <span>View Logs</span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span className="text-[#515165] text-[18px] font-openSans_semiBold">
            You Requested to Facetime
          </span>
        </div>
        <div className="py-2">
          <Request user={user} />
        </div>
      </div>

      <div>
        <div>
          <span className="text-[#515165] text-[18px] font-openSans_semiBold">
            Facetime Requests
          </span>
        </div>
        <div className="py-2 space-y-3">
          {Array.from({ length: 5 }).map((item) => (
            <Request user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaceTime;
