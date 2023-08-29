import React, { useState } from "react";
import FaceTime from "../faceTime";
const tabs = ["Facetime", "Phone Call"];
const FaceTimeAndPhoneCall = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <section>
      <div className="rounded-2xl bg-[#ffff] space-y-3 p-5">
        <div>
          <div className="flex justify-between">
            {tabs?.map((item) => {
              return (
                <div
                  onClick={() => setActiveTab(item)}
                  className={`flex justify-center w-full border-b-4 cursor-pointer ${
                    activeTab === item ? "border-[#FD6769]" : "border-[#FFE1E1]"
                  } py-2`}
                >
                  <span
                    className={`text-[18px] ${
                      activeTab === item
                        ? "text-[#FD6769] font-openSans_semiBold"
                        : "text-[#949494] font-openSans_regular"
                    }`}
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <FaceTime />
      </div>
    </section>
  );
};

export default FaceTimeAndPhoneCall;
