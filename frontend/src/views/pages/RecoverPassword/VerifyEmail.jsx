import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import AuthLayout from "../../layouts/Auth/AuthLayout";
import VerifyEmailForm from "../../components/forms/auth/verifyEmailForm";
import { publicURL, siteTitle } from "../../../shared/helper";
import GuestMiddleware from "../../../middleware/guestMiddleware";
import { Images } from "config/images";
const { crossIcon, emailVerify, verifyEmail, coin } = Images;
const VerifyEmailRecover = (props) => {
  return (
    <AuthLayout className="purpleish-gradient">
      <Helmet>
        <title>Verify your email - Recover Password- {siteTitle()}</title>
      </Helmet>
      <a href="/logout" className="back">
        <img src={crossIcon.default} />{" "}
        <span className="text-[#0493A3] hover:text-[#0493A3] font-openSans_regular text-[16px]">
          Cancel
        </span>
      </a>

      <div className="mt-5">
        <div className="text-black font-openSans_bold flex justify-between items-center flex-wrap">
          <span className="lg:text-[40px] md:text-[39px] sm:text-[38px] text-[37px]">
            Verify Email
          </span>
          <span className="text-[24px]">2 of 6</span>
        </div>

        <p className="lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-c_949494 font-openSans_regular mb-0">
          Enter OTP sent to{" "}
          <a
            className="text-[#0493A3] hover:text-[#0493A3] font-openSans_regular text-[16px]"
            href={`mailto:${props.user?.email}`}
          >
            {props.user?.email}
          </a>{" "}
          below
        </p>
      </div>
      <div className="flex justify-center my-10">
        <img src={verifyEmail} alt="Email Sent" />
      </div>
      <VerifyEmailForm navigate="/recover-password/create-password" />
    </AuthLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(
  GuestMiddleware(VerifyEmailRecover, true)
);
