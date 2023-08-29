import React from "react";

const CreateAd = ({ setCurrentView }) => {
  const handleClickFunction = () => {
    setCurrentView({
      adListing: false,
      manageAd: true,
    });
  };
  return (
    <section>
      <div className="rounded-2xl bg-[#0493A3] text-[#FFFFFF] space-y-3  p-5">
        <div>
          <span className="font-openSans_regular text-[18px]">Create Ads</span>
        </div>
        <div>
          <span className="font-openSans_regular text-[12px]">
            You can create and promote your ads on Befriendz platforms
            seamlessly.
          </span>
        </div>
        <div>
          <button
            onClick={() => handleClickFunction()}
            className="outline-none text-[#0493A3] bg-white text-[14px] font-openSans_regular flex justify-center items-center min-h-[40px] min-w-[132px] rounded"
          >
            <span>Create Ads</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateAd;
