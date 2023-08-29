import { useState } from "react";
import OTPInput from "../../shared/form-elements/otpInput";
import Button from "../../shared/form-elements/button";
import {
  verifyOTPAction,
  resendOTPService,
} from "../../../../redux/actions/authActions";
import { resetFormErrorsAction } from "../../../../redux/actions/commonActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptySpace from "../../shared/emptySpace";

const VerifyEmailForm = (props) => {
  const [otp, setOtp] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const verifyOTP = (value = null) => {
    props.verifyOTP(value | otp).then(() => {
      navigate(props.navigate);
    });
  };

  const onChange = (value) => {
    props.resetErrors();
    setOtp(value);
    if (value.length === 6) {
      if (!props.common.show_loader) {
        setButtonDisabled(false);
      }
    } else {
      setButtonDisabled(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    verifyOTP();
  };
  const resendOTP = () => {
    props.resendOTP();
  };
  return (
    <form onSubmit={submitHandler} className="mt-5 space-y-5">
      <div>
        <span className="font-openSans_regular text-[#2A2A2A] text-[16px]">
          Enter OTP here
        </span>
      </div>
      <OTPInput
        length={6}
        className="code-row"
        isNumberInput
        otp={otp}
        autoFocus
        onChangeOTP={onChange}
        error={props.common.errors?.otp}
      />

      <p className="text-[#949494] font-openSans_regular lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px ]text-center">
        Did not receive email?{" "}
        <a
          className="text-[#0493A3] hover:text-[#0493A3] font-openSans_bold lg:text-[16px] md:text-[15px] sm:text-[14px] text-[13px]"
          onClick={resendOTP}
          href="#!"
        >
          Resend Code
        </a>
      </p>

      <EmptySpace height="60px" />
      <Button
        type="submit"
        disabled={buttonDisabled || props.common.show_loader === 1}
        isLoading={props.common.show_loader === 1}
        text="Verify Email"
      />
      <EmptySpace height="40px" />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  verifyOTP: (data) => dispatch(verifyOTPAction(data)),
  resendOTP: () => dispatch(resendOTPService()),
  resetErrors: () => dispatch(resetFormErrorsAction()),
});
const mapStateToProps = (state) => ({
  common: state.common,
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailForm);
