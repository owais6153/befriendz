import Message from "../../../shared/message";

const PrfileCompleted = ({ currentStep }) => (
  <div
    className={` text-center step-form one ${
      currentStep !== 7 ? "hidden" : ""
    }`}
  >
    <Message
      title="Your Account is Ready"
      message="You can now meet up with different people and chill out with people of  the same interest"
      action="/"
    />
  </div>
);
export default PrfileCompleted;
