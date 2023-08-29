import React from "react";

const PostedBy = () => {
  return (
    <section>
      <div className="rounded-2xl bg-white flex items-center flex-col space-y-3 py-3 px-2">
        <div className="p-[5px] flex w-full items-center space-x-2 rounded-md">
          <div className="text-white flex flex-col">
            <span className="text-c_949494 text-[14px] font-openSans_regular">
              <span className="underline text-[#0493A3] font-openSans_semiBold">
                Skubla Ven
              </span>{" "}
              Posted this on February 21,2022
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostedBy;
