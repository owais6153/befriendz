import { Images } from "config/images";
import React from "react";
const { masterCardIcon, dustbinIcon } = Images;
const SavedCards = () => {
  return (
    <div>
      <div>
        <div>
          <span className="text-[#515165] text-[18px] font-openSans_bold">
            Payment Information
          </span>
        </div>
      </div>
      <div className=" max-w-[100vw] overflow-y-auto">
        <table className="min-w-full">
          <tbody
            className=" text-[#2A2A2A] text-[12px] font-openSans_regular divide-y divide-[#F5F5F5] text-center"
            style={{ textAlign: "-webkit-center" }}
          >
            {Array.from({ length: 2 })?.map((item) => (
              <tr className="">
                <td className="pt-5 min-w-[80px] pb-3">
                  <div className="flex items-center gap-3">
                    <img src={masterCardIcon.default} />
                    <div>
                      <span>Master Card</span>
                    </div>
                  </div>
                </td>
                <td className="pt-5 min-w-[80px] pb-3">5199 17** **** 1234</td>
                <td className="pt-5 min-w-[80px] pb-3">03/26</td>
                <td className="pt-5 min-w-[80px] pb-3">21-03-2021</td>
                <td className="pt-5 min-w-[80px] pb-3">
                  <button className="bg-[#F5F5F5] flex items-center justify-center gap-2 h-[40px] w-[108px] rounded-lg">
                    <div>
                      <img src={dustbinIcon.default} />
                    </div>
                    <div>
                      <span className="text-[#000000] text-[12px] font-openSans_regular">
                        Remove
                      </span>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedCards;
