import { Fragment } from "react";
import { Link } from "react-router-dom";
import { USER_TYPE } from "constants/user.constant";
import { formatDateObject, convertTo12HourFormat, removeHTMLAndLimitString } from "shared/helper";

const WebinarInfoCard = ({training}) => {
  return (
    <Fragment>
      <div>
        <div className="bg-white rounded-2xl">
          <div className="lg:min-h-[463px] flex justify-center rounded-full lg:aspect-video aspect-square">
            <img
              className="object-cover w-full rounded-t-2xl "
              src={training?.coverImage}
              alt={training?.title}
            />
          </div>
          <div className="p-5 border-t border-[#F5F5F5]">
            <div className="w-full space-y-5">
              <div>
                <div className="flex w-full flex-wrap justify-between items-center text-[26px] font-openSans_bold">
                  <div>
                    <span className="text-[#3F4354]">
                      {training?.title}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#FD6769]">{training?.price?.$numberDecimal ? "$ "  + training?.price?.$numberDecimal : 'Free'}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[#949494] text-[14px] font-openSans_regular">
                    Created by <Link to={`/profile/${training?.author?.username}`}><span className="font-medium"> {training?.author?.type === USER_TYPE?.PERSONAL
                  ? `${training?.author?.first_name} ${training?.author?.last_name}`
                  : training?.author?.business_name}</span></Link>
                  </span>
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-x-5">
                <div>
                  <span className="text-[#0493A3] text-[14px] font-openSans_medium capitalize">
                      {training?.type}
                  </span>
                </div>
                <div>
                  <span className="text-[#0493A3] text-[14px] font-openSans_medium capitalize">
                   {formatDateObject(training?.date?.day, training?.date?.month, training?.date?.year)}
                  </span>
                </div>
                <div>
                  <span className="text-[#0493A3] text-[14px] font-openSans_medium">
                    {convertTo12HourFormat(training?.date?.time)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[14px] text-[#949494] font-openSans_regular">
                    {removeHTMLAndLimitString(training?.about)}
                </p>
              </div>
              <div className="flex justify-end flex-wrap">
                <button
                  type="button"
                  className="inline-flex justify-center items-center rounded-md bg-[#FD6769] min-w-[191px]  min-h-[50px] text-[16px] font-openSans_bold text-white focus-visible:outline-none hover:brightness-110 space-x-2"
                >
                  <span>Attend Webinar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WebinarInfoCard;
