import { Images } from "config/images";
import CartItem from "views/components/shared/cartItem";

const { arrowRightIcon } = Images;
const Cart = () => {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl bg-white space-y-5 p-5">
        <div className="rounded-2xl bg-white min-h-[800px] flex flex-col justify-between">
          <div className="p-[1.2rem] h-full">
            <div>
              <h2 className="font-openSans_bold text-c_515165 text-[16px] flex space-x-3 items-center">
                <span>Your Carts</span>
                <span>
                  <img src={arrowRightIcon.default} />
                </span>
              </h2>
              <div className="mt-[1rem] flow-root">
                <ul role="list" className="-my-4">
                  {Array.from({ length: 4 }).map((user) => (
                    <CartItem />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="divide-y divide-[#E6F4F6] font-openSans_medium text-[12px] p-[1.2rem] space-y-5 ">
            <div className="border-t border-[#E6F4F6]">
              <div className="flex w-full justify-between py-[10px]">
                <div>
                  <span className="text-[#949494]">Subtotal</span>
                </div>
                <div>
                  <span className="text-[#515165]">$40.99</span>
                </div>
              </div>
              <div className="flex w-full justify-between py-[10px]">
                <div>
                  <span className="text-[#949494]">Shipping Fee </span>
                </div>
                <div>
                  <span className="text-[#515165]">$5.99</span>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex w-full justify-between py-[10px]">
                <div>
                  <span className="text-[#949494]">Total(USD) </span>
                </div>
                <div>
                  <span className="text-[#515165]">$46.00</span>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex justify-center items-center rounded-md bg-[#FD6769] py-[5px] px-[20px] text-[12px] font-openSans_semiBold text-white focus-visible:outline-none hover:brightness-110 min-h-[40px] space-x-2 w-full mt-6"
              >
                <span>Buy Now!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Cart;
