import React from "react";
import { useNavigate } from "react-router-dom";

const CreateTraining = () => {
  const navigate = useNavigate();

  const handleClickFunction = () => {
    navigate("/trainings/create");
  };
  return (
    <section>
      <div className="rounded-2xl bg-[#FD6769] text-[#FFFFFF] space-y-3 p-5">
        <div>
          <span className="font-openSans_regular text-[18px]">
            Create Your Training
          </span>
        </div>
        <div>
          <span className="font-openSans_regular text-[12px]">
            Create Your Own Community And Rub Minds With Them and Enjoy Meeting
            New People
          </span>
        </div>
        <div>
          <button
            onClick={() => handleClickFunction()}
            className="outline-none text-[#FD6769] bg-white text-[14px] font-openSans_regular flex justify-center items-center min-h-[40px] min-w-[132px] rounded"
          >
            <span>New Training</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateTraining;
