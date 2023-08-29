import { Images } from "config/images";
import React, { useRef } from "react";
const { searchMagnifyIcon } = Images;
const Search = ({ placeholder = "", onSearch = () =>{} }) => {

  const inputref = useRef(); 
  const submitHandler = (e) => {
    e.preventDefault();
    onSearch(inputref.current.value)
  }

  return (
    <form className="p-5 bg-white rounded-2xl flex w-full gap-5" onSubmit={submitHandler}>
      <div className="w-full">
        <input
          ref={inputref}
          className="text-[#949494] bg-[#F5F5F5] px-3 h-[46px] w-full rounded outline-none"
          placeholder={placeholder}
        />
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center items-center rounded-md bg-c_0493A3 text-[16px] font-openSans_bold text-white focus-visible:outline-none hover:brightness-110 min-w-[112px] min-h-[44px] space-x-2 "
        >
          <div>
            <img src={searchMagnifyIcon.default} />
          </div>
          <div>
            <span className="text-[14px] font-openSans_semiBold">Search</span>
          </div>
        </button>
      </div>
    </form>
  );
};

export default Search;
