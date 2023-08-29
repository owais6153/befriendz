import { Images } from "config/images";
import React, { useState } from "react";
import SubscriptionModal from "../subscriptionModal";
const { medalStarIcon } = Images;
const GoPremium = ({subscription}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <div className="cursor-pointer rounded-2xl bg-c_FD6769 flex items-center">
          <div className="px-5 py-6 flex w-full items-center space-x-2">
            <div className="bg-white rounded-md w-[28px] h-[28px] flex justify-center items-center">
              <img src={medalStarIcon.default} />
            </div>
            <div className="text-white flex flex-col">
              <span className="text-[12px] font-openSans_bold">Go Premium</span>
              <span className="text-[8px] font-openSans_regular">
                Join Us and Let’s Talk
              </span>
            </div>
          </div>
        </div>
      </section>
      <SubscriptionModal open={isModalOpen} setOpen={setIsModalOpen} subscription={subscription} />
    </>
  );
};

export default GoPremium;
