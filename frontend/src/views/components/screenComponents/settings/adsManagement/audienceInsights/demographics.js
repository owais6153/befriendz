import React from "react";

const Demographics = () => {
  return (
    <div className="p-4 border border-[#f5f5f5] rounded-xl col-span-12 md:col-span-6">
      <div className="flex flex-row flex-wrap justify-between items-center">
        <div className="text-[#515165] font-semibold"> Demographics</div>
        <div>
          <div
            for="country"
            className="flex relative items-center bg-c_F5F5F5  font-openSans_regular font-medium placeholder:text-c_949494 outline-none focus:outline-none  rounded-md  "
          >
            <select
              name="country"
              style={{ appearance: "none" }}
              className={`px-4 py-3 focus:outline-none bg-transparent `}
            >
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Poland">Poland</option>
            </select>
            <div className="absolute right-3">
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.33657 6.84913C6.24717 6.94573 6.12593 7 5.99952 7C5.87311 7 5.75188 6.94573 5.66248 6.84913L0.139104 0.879073C0.0726452 0.807014 0.0274105 0.715302 0.00910282 0.615497C-0.00920486 0.515691 0.00023365 0.412262 0.0362291 0.318246C0.0722246 0.224231 0.133166 0.143839 0.21137 0.0872035C0.289574 0.0305686 0.381539 0.000226021 0.475674 9.53674e-07L11.5224 9.53674e-07C11.6168 -0.000181198 11.7092 0.0299401 11.7877 0.0865474C11.8663 0.143155 11.9275 0.223699 11.9637 0.317968C11.9998 0.412237 12.0093 0.515986 11.9908 0.616063C11.9723 0.716139 11.9268 0.808036 11.8599 0.880103L6.33657 6.84913Z"
                  fill="#2A2A2A"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-4/6  justify-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl text-[#30B52D] font-bold">28.5%</span>
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.33657 0.150868C6.24717 0.0542671 6.12593 0 5.99952 0C5.87311 0 5.75188 0.0542671 5.66248 0.150868L0.139104 6.12093C0.0726448 6.19299 0.0274104 6.2847 0.00910263 6.3845C-0.00920511 6.48431 0.000233746 6.58774 0.0362294 6.68175C0.072225 6.77577 0.133166 6.85616 0.21137 6.9128C0.289574 6.96943 0.381539 6.99977 0.475674 7L11.5224 7C11.6168 7.00018 11.7092 6.97006 11.7877 6.91345C11.8663 6.85685 11.9275 6.7763 11.9637 6.68203C11.9998 6.58776 12.0093 6.48401 11.9908 6.38394C11.9723 6.28386 11.9268 6.19196 11.8599 6.1199L6.33657 0.150868Z"
              fill="#30B52D"
            />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2 justify-end">
            <span className="float-right text-3xl text-[#FD6769] font-bold">
              28.5%
            </span>
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33657 6.84913C6.24717 6.94573 6.12593 7 5.99952 7C5.87311 7 5.75188 6.94573 5.66248 6.84913L0.139104 0.879073C0.0726452 0.807014 0.0274105 0.715302 0.00910282 0.615497C-0.00920486 0.515691 0.00023365 0.412262 0.0362291 0.318246C0.0722246 0.224231 0.133166 0.143839 0.21137 0.0872035C0.289574 0.0305686 0.381539 0.000226021 0.475674 9.53674e-07L11.5224 9.53674e-07C11.6168 -0.000181198 11.7092 0.0299401 11.7877 0.0865474C11.8663 0.143155 11.9275 0.223699 11.9637 0.317968C11.9998 0.412237 12.0093 0.515986 11.9908 0.616063C11.9723 0.716139 11.9268 0.808036 11.8599 0.880103L6.33657 6.84913Z"
                fill="#FD6769"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demographics;
