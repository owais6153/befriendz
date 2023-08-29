import React from "react";

const Comments = () => {
  return (
    <section>
      <div className="rounded-2xl bg-white space-y-5 p-5">
        <div>
          <span className="text-[#3F4354] text-[16px] font-openSans_bold">
            Comments
          </span>
        </div>

        <div className="flex flex-wrap flex-col justify-center gap-4 pt-4">
          {Array.from({ length: 4 })?.map((item) => (
            <div className="flex gap-2">
              <div>
                <img
                  className="w-[30px] h-[30px] rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgsqkHF5eNd4C0RVDrtlPZUWHlmWTTrZMpbB7KU9kHJ785LPLySvlLVslCoqCiVogkZE&usqp=CAU"
                />
              </div>
              <div>
                <div>
                  <span className="text-[14px] text-[#515165] font-openSans_semiBold">
                    Soham posted
                  </span>{" "}
                  <span className="text-[12px] text-[#949494] font-openSans_semiBold">
                    2m ago
                  </span>
                </div>
                <div className="py-1">
                  <span className="text-[12px] text-[#515165] font-openSans_semiBold">
                    Yo pappy...I am feeling you
                  </span>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="min-w-[50px] flex justify-center items-center">
            <img
              className="h-[40px] w-[40px] rounded-full"
              src={
                "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              }
              alt=""
            />
          </div>
          <div className="w-full px-[10px]">
            <input
              className="bg-white border border-[#C5D0E6] min-h-[44px] w-full px-[15px] rounded-full focus:outline-none text-[16px] font-openSans_regular"
              placeholder="Type your comments here..."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;
