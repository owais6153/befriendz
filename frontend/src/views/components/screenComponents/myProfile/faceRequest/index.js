import React from "react";

const FaceRequest = () => {
  return (
    <section>
      <div className="rounded-2xl bg-white space-y-5   pt-5 pb-10">
        <div>
          <div className="flex space-x-2 items-center px-5">
            <span className="text-[#515165] font-openSans_bold text-[16px] leading-none">
              Facetime Request
            </span>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-[#FD6769] w-full h-[242px] flex justify-center flex-col items-center">
            <div className="border-2 border-white rounded-full">
              <img
                className="w-[130px] h-[130px] rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MIK6s--5K3qB5E9AZ2uYAeIiBLJ9tTyRgPpl2V5V0CtKluyaa2TpINXGn4nqhWZ1Cco&usqp=CAU"
              />
            </div>
            <div>
              <span className="text-[26px] text-white font-openSans_medium">
                Devon Lane
              </span>
            </div>
            <div>
              <span className="text-[16px] text-white font-openSans_regular">
                Life Coach
              </span>
            </div>
          </div>
          <div className="space-y-3 px-5">
            <div>
              <div>
                <span className="text-[#949494] text-[14px] font-openSans_regular">
                  Duration (minutes)
                </span>
              </div>
              <div>
                <span className="text-[#0493A3] text-[18px] font-openSans_semiBold">
                  15:00
                </span>
              </div>
            </div>

            <div>
              <div>
                <span className="text-[#949494] text-[14px] font-openSans_regular">
                  Date
                </span>
              </div>
              <div>
                <span className="text-[#515165] text-[18px] font-openSans_semiBold">
                  Wednesday, 24th Feb 2023
                </span>
              </div>
            </div>

            <div>
              <div>
                <span className="text-[#949494] text-[14px] font-openSans_regular">
                  Description
                </span>
              </div>
              <div>
                <span className="text-[#515165] text-[14px] font-openSans_semiBold">
                  I will like to talk to you about some challenges I am facing,
                  Please Accept
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between flex-wrap px-5 gap-2">
              <button className="outline-none bg-[#FD6769] text-white text-[16px] font-openSans_semiBold flex justify-center items-center min-h-[36px] min-w-[130px] rounded-lg">
                <span>Accept</span>
              </button>
              <button className="outline-none bg-[#F5F5F5] text-[#515165] text-[16px] font-openSans_semiBold flex justify-center items-center min-h-[36px] min-w-[130px] rounded-lg">
                <span>Decline</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaceRequest;
