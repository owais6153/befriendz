import React from "react";

const CartItem = () => {
  return (
    <li className="flex w-full justify-between py-[0.5rem]">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 flex justify-center items-center h-[60px] w-[60px] shadow-sm rounded-3xl">
          <img
            className="h-full w-full object-contain"
            src={
              "https://c.shld.net/rpx/i/s/i/spin/10167833/prod_19782326212?hei=350&wid=350&op_sharpen=1"
            }
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[#515165] font-openSans_semiBold">
            Air Fryer
          </span>
          <span className="text-[#515165] font-openSans_regular">$20.99</span>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div className="bg-[#F5F5F5] rounded-xl font-openSans_medium min-w-[105px] min-h-[45px] flex justify-evenly items-center">
          <span className="text-[#515165]">-</span>
          <span className="text-[#2A2A2A]">01</span>
          <span className="text-[#FD6769]">+</span>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
