import { useState } from "react";
import EmptySpace from "views/components/shared/emptySpace";
import Button from "views/components/shared/form-elements/button";
import Input from "views/components/shared/form-elements/input";
import Select from "views/components/shared/form-elements/select";
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
          label="Card Name"
          name="card_name"
          placeholder="Enter Card Name"
        />
      </div>
      <div className="">
        <Input
          type="text"
          label="Card Number"
          name="card_number"
          placeholder="Enter card number here"
        />
      </div>
      <div>
        <div>
          <label
            className={`text-[2A2A2A] font-openSans_regular lg:text-[16px] md:text-[15px] sm:text-[14px] text-[13px]`}
          >
            Date of Birth
          </label>
          <div className="flex justify-between w-full">
            <div>
              <Select name="day">
                <option value="">Day</option>
                {["Mon"].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Select name="month">
                <option value="">Month</option>
                {["Jan", "Feb"].map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Select name="year">
                <option value="">year</option>
                {["Jan", "Feb"].map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Input
          type="text"
          label="Billing Address"
          name="billing_address"
          placeholder="Enter Full Address"
        />
      </div>
      <EmptySpace height="60px" />
      <div className="">
        <Button onClick={() => setCurrentStep(2)} text={"Pay $50.00"} />
      </div>
      <EmptySpace height="20px" />
    </form>
  );

  const success = () => (
    <Message
      title={"Payment Succesful"}
      message="Your $50.00 payment for gold plan subscription is successful, Search for the friend you will like to connect."
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
      title={"Payment"}
      subTitle={"Kindly provide the details below"}
    >
      {currentStep === 1 ? form() : success()}
    </Modal>
  );
};
export default PaymentModal;
