import { Images } from "config/images";
import CreditCardUI from "views/components/shared/creditCardUI";
import EmptySpace from "views/components/shared/emptySpace";
import Button from "views/components/shared/form-elements/button";

const CardInfoItem = ({ label, details }) => (
  <div className="">
    <div>
      <span className="text-[#949494] text-[12px] font-openSans_regular">
        {label}
      </span>
    </div>
    <div className="flex space-x-3">
      <div>
        <span className="text-[#2A2A2A] text-[14px] font-openSans_regular ">
          {details}
        </span>
      </div>
      <img className="cursor-pointer" src={copyIcon.default} />
    </div>
  </div>
);
const { arrowRightIcon, copyIcon } = Images;
const CardInfo = () => {
  return (
    <section>
      <div className="rounded-2xl bg-white space-y-5  px-5 pt-5 pb-10">
        <div>
          <div className="flex space-x-2 items-center">
            <span className="text-[#515165] font-openSans_bold text-[16px] leading-none">
              Card Information
            </span>
            <span>
              <img src={arrowRightIcon.default} />
            </span>
          </div>
        </div>
        <div>
          <CreditCardUI />
        </div>
        <div className="space-y-3">
          <CardInfoItem label={"Card Name"} details={"Deborah Dada"} />
          <CardInfoItem label={"Card Number"} details={"51991762525361234"} />
          <CardInfoItem label={"Expiry Date"} details={"03/2026"} />
          <CardInfoItem label={"CVV"} details={"987"} />
          <CardInfoItem
            label={"Billing Address"}
            details={"2715 Ash Dr. San Jose, South Dakota 83475"}
          />
        </div>
        <EmptySpace height={"40px"} />
        <div>
          <Button className="min-h-[50px]" text={"Delete Card"} />
        </div>
      </div>
    </section>
  );
};

export default CardInfo;
