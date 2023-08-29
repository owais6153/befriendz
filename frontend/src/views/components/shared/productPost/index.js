import { Images } from "config/images";
import React from "react";
import { useNavigate } from "react-router-dom";

const { shoppingCartIcon, likeIcon } = Images;
const ProductPost = ({ post, linkTo = null }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (linkTo) {
      navigate(linkTo);
    }
  };
  return (
    <article
      onClick={() => handleClick()}
      className="relative isolate flex flex-col gap-5 lg:flex-row bg-white rounded-2xl p-4 cursor-pointer"
    >
      <div className="absolute top-6 right-4 cursor-pointer z-10">
        <img src={likeIcon.default} />
      </div>
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-[156px] lg:h-full lg:shrink-0 w-12/12 shadow-sm rounded-lg">
        <img
          src={
            "https://c.shld.net/rpx/i/s/i/spin/10167833/prod_19782326212?hei=350&wid=350&op_sharpen=1"
          }
          alt=""
          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-contain"
        />
        <div className="absolute inset-0 rounded-2xl" />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <div className="group relative max-w-2xl">
            <h3 className="mt-2.5 text-[18px] text-dark font-openSans_bold flex w-full justify-between">
              <span className="">Air Fryer</span>
              <span className="text-[#FD6769]">$20.99</span>
            </h3>
          </div>
          <div className="flex items-center gap-x-3 mt-[10px]">
            <span className="font-openSans_regular  text-[#949494] text-[12px]">
              An air fryer is a small countertop convection oven designed to
              simulate deep frying without submerging the food in oil. A fan
              circulates hot air at high speed, producing a crisp layer via
              browning reactions such as the Maillard reaction{" "}
              <span className="text-[#0493A3] cursor-pointer">
                read more...
              </span>
            </span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap justify-between items-center gap-2">
          <div className="relative flex items-center gap-x-3">
            <img
              src={
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
              }
              alt=""
              className="h-[40px] w-[40px] rounded-full"
            />
            <div>
              <div>
                <div className="leading-[2px] text-[14px] font-openSans_semiBold text-c_515165 space-x-3">
                  <span>Ryan Bass</span>
                </div>
                <span className="font-openSans_regular text-c_949494 text-[10px]">
                  3 weeks ago
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-x-3">
            <div>
              <span className="font-openSans_regular text-c_949494 text-[12px]">
                651,324 Views
              </span>
            </div>
            <div>
              <span className="font-openSans_regular text-c_949494 text-[12px]">
                36,6545 Likes
              </span>
            </div>
            <div>
              <span className="font-openSans_regular text-c_949494 text-[12px]">
                56 Sales
              </span>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="inline-flex justify-center items-center rounded-md bg-c_0493A3 py-[5px] px-[20px] text-[12px] font-openSans_semiBold text-white focus-visible:outline-none hover:brightness-110 min-h-[40px] space-x-2"
            >
              <span>
                <img src={shoppingCartIcon.default} />
              </span>
              <span>Add To Cart</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductPost;
