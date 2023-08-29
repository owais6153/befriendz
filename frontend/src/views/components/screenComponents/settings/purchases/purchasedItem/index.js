import { Images } from "config/images";
import EmptySpace from "views/components/shared/emptySpace";
import Status from "views/components/shared/status";

const { redWarningIcon } = Images;
const PurchasesItem = () => {
  return (
    <section>
      <div className="rounded-2xl bg-white space-y-5  divide-y divide-[#F5F5F5] py-10">
        <div className="flex-shrink-0 flex justify-center items-center rounded-3xl w-full px-5">
          <div className=" h-[189.52px] w-[206px]">
            <img
              className="h-full w-full object-contain"
              src={
                "https://c.shld.net/rpx/i/s/i/spin/10167833/prod_19782326212"
              }
              alt=""
            />
          </div>
        </div>
        <div className="p-5 space-y-5">
          <div className="flex justify-between w-full font-openSans_bold text-[18px]">
            <div>
              <span className="text-[#515165]">Air Fryer</span>
            </div>
            <div>
              <span className="text-[#FD6769]">$20.99</span>
            </div>
          </div>
          <div>
            <span className="text-[#949494] text-[14px] font-openSans_light">
              Lorem ipsum dolor sit amet consectetur. Laoreet odio urna donec
              nibh. Justo velit netus ut nam. Purus turpis blandit non neque non
              fusce in eget. Nulla ornare non ornare varius pellentesque non.
              Aliquam leo ullamcorper lectus vitae mauris non. Massa eu
              ullamcorper ut enim odio turpis quis diam. Pellentesque risus
              aenean a sit. Id enim id aliquam pulvinar. .
            </span>
          </div>
          <div>
            <Status type="success" label="Success" />
          </div>
          <EmptySpace height={"20px"} />
          <div className="flex justify-center items-center space-x-2 ">
            <div>
              <img src={redWarningIcon.default} />
            </div>
            <div>
              <span className="text-[#FD6769] text-[12px] font-openSans_bold">
                Report this Transaction
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchasesItem;
