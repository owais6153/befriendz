import { Images } from "config/images";
import { Link } from "react-router-dom";
const { doubleArrowRightBlueIcon } = Images;

const WebinarsAndTrainingList = () => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0">
      <div className="">
        <img
          className="h-[32px] w-[32px] rounded-md"
          src={
            "https://cdn.pixabay.com/photo/2019/04/28/15/13/pen-4163403__340.jpg"
          }
          alt=""
        />
      </div>
    </div>
    <div className="">
      <p className="font-openSans_semiBold text-[#2A2A2A] text-[12px] mb-0">
        Write With Steven
      </p>
      <p className="font-openSans_regular text-c_949494 text-[8px] mb-0">
        Wed Feb 2, 2023
      </p>
    </div>
  </div>
);

const WebinarsAndTraining = () => {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl bg-white space-y-5 p-5">
        <>
          <div className="flex space-x-2 items-center">
            <span className="text-[#515165] font-openSans_regular text-[16px] leading-none">
              Webinars & Training
            </span>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 })?.map((item) => (
              <WebinarsAndTrainingList />
            ))}
            <div className="flex justify-center">
              <div className="inline-block">
                <Link
                  to="/groups"
                  className="flex justify-center items-center space-x-2 cursor-pointer"
                >
                  <span className=" text-c_0493A3 text-[12px] font-openSans_light">
                    See more
                  </span>
                  <img src={doubleArrowRightBlueIcon.default} />
                </Link>
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
  );
};

export default WebinarsAndTraining;
