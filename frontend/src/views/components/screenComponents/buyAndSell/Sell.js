import React from "react";
import { Link } from "react-router-dom";

const Sell = () => {
  return (
    <section>
      <div className="rounded-2xl bg-white flex items-center flex-col space-y-3 p-4">
        <div className="text-[14px] font-openSans_semiBold text-[#515165]">
          Do You Have Anything You Want to Dispose?
        </div>
        <div className="text-[8px] font-openSans_semiBold text-[#949494]">
          Are you looking to sell any of your items to friends but you do not
          know how to do it
        </div>
        <div className="w-full">
          <Link to="/sell">
            <button
              type="button"
              className="mt-2 inline-flex w-full justify-center items-center rounded-md bg-c_0493A3 py-[5px] px-[20px] text-[12px] font-openSans_semiBold text-white focus-visible:outline-none hover:brightness-110 min-h-[40px] space-x-2"
            >
              <span>Sell Now</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sell;
