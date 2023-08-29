import { useState } from "react";

const PriceInput = () => {
  const [price, setPrice] = useState(0);

  const handleChangePrice = (e) => {
    console.log(e.target.value);
    setPrice(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-6 w-full justify-center">
        <div className="flex flex-row items-center justify-center">
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={handleChangePrice}
            min={0}
            className=" w-2/4 bg-c_F5F5F5 block text-black font-openSans_semiBold rounded-md placeholder:text-c_949494 placeholder:font-openSans_regular placeholder:text-[14px] text-[14px] focus:outline-none py-2.5 px-[12px]"
            placeholder="$0"
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <input
            type="range"
            className="bg-c_FD6769 h-1 range  accent-c_FD6769  w-full cursor-pointer appearance-none rounded-lg border-transparent "
            id="priceRange"
            min={0}
            max={1000}
            onChange={handleChangePrice}
          />
        </div>
      </div>
    </>
  );
};

export default PriceInput;
