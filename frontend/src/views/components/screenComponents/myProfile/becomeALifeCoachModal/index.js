import { APP_CONSTANT } from "constants/app.constant";
import { useState } from "react";
import EmptySpace from "views/components/shared/emptySpace";
import Button from "views/components/shared/form-elements/button";
import Input from "views/components/shared/form-elements/input";
import InputFile from "views/components/shared/form-elements/inputFile";
import Message from "views/components/shared/message";
import Modal from "views/components/shared/modal";

const BecomeLifeCoachModal = ({ open, setOpen }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const form = () => (
    <form className="mt-5 space-y-5">
      <EmptySpace height="10px" />
      <div className="">
        <Input
          type="text"
          label="First Name"
          name="First_Name"
          placeholder="Demarai"
        />
      </div>
      <div className="">
        <Input
          type="text"
          label="Last Name"
          name="Last_Name"
          placeholder="Gray"
        />
      </div>

      <div className="">
        <Input
          type="text"
          label="Full Home Address"
          name="Full_Home_Address"
          placeholder="2972 Westheimer Rd. Santa Ana, Illinois 85486"
        />
      </div>
      <div className="">
        <Input
          type="text"
          label="Social Security Number"
          name="Social_Security_Number"
          placeholder="123456789"
        />
      </div>
      <EmptySpace height="60px" />

      <div className="">
        <Button text={"Continue"} onClick={() => setCurrentStep(2)} />
      </div>
      <EmptySpace height="20px" />
    </form>
  );

  const proofOfIdentity = () => (
    <div className="mt-5 space-y-5">
      <div className="text-center">
        <span className="text-[#515165] text-[18px] font-openSans_semiBold">
          Upload ID such as Driver’s license, National ID Card or International
          Passport
        </span>
      </div>
      <EmptySpace height="40px" />
      <div className="flex justify-center mb-5">
        <InputFile
          type="file"
          name="profileImage"
          accept="image/*"
          labelClass="blue"
          // size="w-full h-40 rounded-0"
          imageRadius="rounded-0"
          register={{
            ...("profileImage",
            {
              onChange: () => {},
              validate: {
                acceptedFormats: (files) => {
                  return (
                    files,
                    APP_CONSTANT.FILE.EXT.IMAGE,
                    "Only PNG, JPEG and GIF are allowed"
                  );
                },

                lessThan10MB: (files) => (
                  files, APP_CONSTANT.FILE.SIZE["10MB"], "Max 10MB"
                ),
              },
            }),
          }}
        />
      </div>
      <EmptySpace height="50px" />
      <div>
        <span className="text-[#949494] text-[12px] font-openSans_regular">
          Only JPEG,PNG and PDF are the formats accepted and not more than 2kb
          in size
        </span>
      </div>
      <EmptySpace height="10px" />
      <div className="">
        <Button text={"Continue"} onClick={() => setCurrentStep(3)} />
      </div>
      <EmptySpace height="20px" />
    </div>
  );

  const proofOfAddress = () => (
    <div className="mt-5 space-y-5">
      <div className="text-center">
        <span className="text-[#515165] text-[18px] font-openSans_semiBold">
          Upload Documents such as any Utility Bills or Financial Statement of
          the past month
        </span>
      </div>
      <EmptySpace height="40px" />
      <div className="flex justify-center mb-5">
        <InputFile
          type="file"
          name="profileImage"
          accept="image/*"
          labelClass="blue"
          // size="w-full h-40 rounded-0"
          imageRadius="rounded-0"
          register={{
            ...("profileImage",
            {
              onChange: () => {},
              validate: {
                acceptedFormats: (files) => {
                  return (
                    files,
                    APP_CONSTANT.FILE.EXT.IMAGE,
                    "Only PNG, JPEG and GIF are allowed"
                  );
                },

                lessThan10MB: (files) => (
                  files, APP_CONSTANT.FILE.SIZE["10MB"], "Max 10MB"
                ),
              },
            }),
          }}
        />
      </div>
      <EmptySpace height="50px" />
      <div>
        <span className="text-[#949494] text-[12px] font-openSans_regular">
          Only JPEG,PNG and PDF are the formats accepted and not more than 2kb
          in size
        </span>
      </div>
      <EmptySpace height="10px" />

      <div className="">
        <Button text={"Submit"} onClick={() => setCurrentStep(4)} />
      </div>
      <EmptySpace height="20px" />
    </div>
  );

  const success = () => (
    <Message
      title={"Request Submitted"}
      message="Your request to become a mentor on befriendz has been successfully submitted and will be reviewed, You will receive a mail once your request is approved"
      clickEvent={() => {
        setOpen(false);
        setCurrentStep(1);
      }}
    />
  );
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={
        (currentStep === 1 && "Become a Life Coach") ||
        (currentStep === 2 && "Proof of Identity") ||
        (currentStep === 3 && "Proof of Address")
      }
      subTitle={
        (currentStep === 1 && "Kindly provide answers the details below") ||
        (currentStep === 2 && "Kindly provide a government issued ID") ||
        (currentStep === 3 && "Kindly provide a government issued ID")
      }
    >
      {currentStep === 1 && form()}
      {currentStep === 2 && proofOfIdentity()}
      {currentStep === 3 && proofOfAddress()}
      {currentStep === 4 && success()}
    </Modal>
  );
};
export default BecomeLifeCoachModal;
