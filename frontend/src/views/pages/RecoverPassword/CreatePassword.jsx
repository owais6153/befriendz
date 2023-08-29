import { Helmet } from "react-helmet";
import AuthLayout from "../../layouts/Auth/AuthLayout";
import CreatePasswordForm from "../../components/forms/auth/createPasswordForm";
import { siteTitle } from "../../../shared/helper";
import GuestMiddleware from "../../../middleware/guestMiddleware";
import { Images } from "config/images";
const { leftBackIcon } = Images;
const CreatePasswordRecover = () => {
  return (
    <AuthLayout className="purpleish-gradient">
      <Helmet>
        <title>Create Password - {siteTitle()}</title>
      </Helmet>
      <a href="#!" className="flex space-x-3">
        <img src={leftBackIcon.default} />{" "}
        <span className="text-[#0493A3] hover:text-[#0493A3] font-openSans_regular text-[16px]">
          Back
        </span>
      </a>
      <div className="mt-5">
        <div className="text-black font-openSans_bold flex justify-between items-center flex-wrap">
          <span className="lg:text-[40px] md:text-[39px] sm:text-[38px] text-[37px]">
            Create Password
          </span>
          <span className="text-[24px]">3 of 6</span>
        </div>

        <p className="lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-c_949494 font-openSans_regular mb-0">
          Add security to your account by creating a password
        </p>
      </div>
      <CreatePasswordForm navigate="/recover-password/password-recovered" />
    </AuthLayout>
  );
};
export default GuestMiddleware(CreatePasswordRecover, true);
