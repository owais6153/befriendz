import { Images } from "config/images";
import Button from "views/components/shared/form-elements/button";
import Input from "views/components/shared/form-elements/input";
import MapView from "views/components/shared/mapView";
const { arrowRightIcon } = Images;
const FindFriends = () => {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl bg-white space-y-5 pt-5 pb-10">
        <div className="px-5">
          <div className="flex space-x-2 items-center">
            <span className="text-[#515165] font-openSans_bold text-[16px] leading-none">
              Find Friends by
            </span>
            <span>
              <img src={arrowRightIcon.default} />
            </span>
          </div>
        </div>
        <div>
          <MapView />
        </div>
        <div className="px-5">
          <form className="space-y-5">
            <div className="">
              <Input
                type="text"
                label="Location"
                name="Location"
                placeholder="Sacramento California, US"
                inputClass="min-h-[50px] text-[14px] placeholder:text-[14px]"
              />
            </div>
            <div className="">
              <Input
                type="text"
                label="Account Type"
                name="Account Type"
                placeholder="Regular"
                inputClass="min-h-[50px] text-[14px] placeholder:text-[14px]"
              />
            </div>
            <div className="">
              <Input
                type="text"
                label="Group"
                name="Group"
                placeholder="Any"
                inputClass="min-h-[50px] text-[14px] placeholder:text-[14px]"
              />
            </div>
            <div className="">
              <Button text={"Apply"} className="min-h-[50px] text-[16px]" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FindFriends;
