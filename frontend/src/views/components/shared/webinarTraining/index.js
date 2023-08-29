import { Link } from "react-router-dom";
import { removeHTMLAndLimitString } from "shared/helper";

const WebinarTraining = ( {webinar}) => {
   const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <Link to={`/webinars/${webinar._id}`} className="font-medium">
    <article      
      className="relative isolate bg-white rounded-2xl p-4 pb-10 space-y-5 cursor-pointer"
    >
      <div className="flex flex-wrap justify-between w-full">
        <div className="flex space-x-3">
          <div className="w-[72px] h-[72px]">
            <img
              src={webinar.coverImage}
              alt={webinar.title}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="">
            <span className="text-[#515165] text-[18px] font-openSans_medium">
              {webinar.title}
            </span>
          </div>
        </div>
        <div>
          <div className="border border-[#C5D0E6] w-[59px] h-[72px] rounded flex flex-col items-center justify-center shadow-sm">
            <div>
              <span className="text-[16px] text-[#515165] font-openSans_medium">
                {months[webinar?.date?.month - 1]}
              </span>
            </div>
            <div>
              <span className="text-[26px] text-[#0493A3] font-openSans_bold">
                {webinar?.date?.day}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div>
          <span className="text-[#515165] text-[14px] font-openSans_regular">
            {removeHTMLAndLimitString(webinar?.about, 100)}
          </span>
        </div>
      </div>

      <div className="">
        <div className="flex justify-between w-full">
          <div>
            <div className="flex items-center gap-x-3 mt-3">
                <span className="rounded-2xl bg-c_F5F5F5 py-2 px-4 font-openSans_semiBold capitalize text-[#949494] text-[12px]">
                  {webinar?.type}
                </span>

              {webinar?.tags?.map((tag) => (
                <span className="rounded-2xl bg-c_F5F5F5 py-2 px-4 font-openSans_semiBold text-[#949494] text-[12px]">
                  {tag?.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[#FD6769] text-[26px] font-openSans_bold">
              {webinar?.price?.$numberDecimal ? "$ "  + webinar?.price?.$numberDecimal : 'Free'}
            </span>
          </div>
        </div>
      </div>
    </article></Link>
  );
};

export default WebinarTraining;
