import React from "react";

const AuthorProfile = () => {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl bg-white">
        <div className="p-5 h-full">
          <div>
            <div className="flex w-full flex-col justify-center items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-full"
                src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              />
              <h2 className="font-openSans_bold text-c_515165 text-[26px] flex space-x-3 items-center leading-tight mt-[12px]">
                <span>Skubla Ven</span>
              </h2>
              <span className="font-openSans_regular text-[#949494] text-[16px]">
                Artiste
              </span>
            </div>
          </div>

          <div className="flex w-full justify-center mt-[1rem]">
            <button
              type="button"
              className="inline-flex justify-center items-center rounded-md bg-c_0493A3 py-[8px] px-[10px] text-[16px] font-openSans_semiBold text-white focus-visible:outline-none hover:brightness-110 min-h-[46px] w-full"
            >
              <span>Befriend</span>
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="font-openSans_regular text-[14px] text-[#949494] ">
              joined Mar, 2019
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorProfile;
