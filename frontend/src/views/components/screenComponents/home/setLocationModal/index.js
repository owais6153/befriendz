import { Images } from "config/images";
import EmptySpace from "views/components/shared/emptySpace";
import Button from "views/components/shared/form-elements/button";
import Modal from "../../../shared/modal";
const { locationIcon, gpsIcon } = Images;

const SetLocationModal = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={"Set Your Location"}
      subTitle={"Let’s help you socialize with people around you"}
    >
      <div className="space-y-10">
        <EmptySpace height="10px" />
        <div className="relative ">
          <div>
            <input
              className="bg-[#F5F5F5] py-4 px-3 w-full rounded  placeholder:text-[#C5D0E6] placeholder:font-openSans_regular outline-none"
              placeholder="Enter Your Location"
            />
          </div>
          <div className="absolute right-3 top-4">
            <span>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="9"
                  r="8"
                  stroke="#C5D0E6"
                  stroke-width="2"
                />
                <path
                  d="M15.5 15.5L19.5 19.5"
                  stroke="#C5D0E6"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <img src={locationIcon.default} />
        </div>
        <div>
          <div className="text-center">
            <div>
              <span className="text-[#2A2A2A] font-openSans_bold text-[32px] ">
                Where Are You ?
              </span>
            </div>
            <div>
              <p className="text-[#949494] text-[16px] font-openSans_regular">
                You have turned off your location, Allow us access your location
                while using our app so we can deliver the best experience{" "}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-3">
                <img src={gpsIcon.default} />
                <span className="text-[#0493A3] text-[14px] font-openSans_bold">
                  Use Current Location
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Button type="button" onClick={() => {}} text="Create Account" />
        </div>
        <EmptySpace height="20px" />
      </div>
    </Modal>
  );
};
export default SetLocationModal;
