import { useState } from "react";
import EmptySpace from "views/components/shared/emptySpace";
import Button from "views/components/shared/form-elements/button";
import Input from "views/components/shared/form-elements/input";
import Message from "views/components/shared/message";
import Modal from "views/components/shared/modal";

const PaymentModal = ({ open, setOpen }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const form = () => (
    <form className="space-y-5">
      <EmptySpace height="10px" />
      <div className="">
        <Input
          type="text"
          label="Account Name"
          name="account_name"
          placeholder="Enter your Account Name"
        />
      </div>
      <div className="">
        <Input
          type="text"
          label="Bank Name"
          name="bank_name"
          placeholder="Enter card number here"
        />
      </div>

      <div className="">
        <Input
          type="text"
          label="Account Number"
          name="account_number"
          placeholder="Enter your account number"
        />
      </div>
      <EmptySpace height="80px" />

      <div className="">
        <Button text={"Submit"} onClick={() => setCurrentStep(2)} />
      </div>
      <EmptySpace height="30px" />
    </form>
  );

  const success = () => (
    <Message
      title={"Payment Info Added "}
      message="Lorem ipsum dolor sit amet consectetur. Quis placerat sed cum consequat dignissim sollicitudin dolor. Vestibulum in vel ultrices."
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
      title={currentStep === 1 ? "Add Payment Info" : ""}
      subTitle={currentStep === 1 ? "Get paid for your services" : ""}
    >
      {currentStep === 1 ? form() : success()}
    </Modal>
  );
};
export default PaymentModal;
