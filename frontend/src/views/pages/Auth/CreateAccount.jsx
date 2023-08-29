import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import AuthLayout from "../../layouts/Auth/AuthLayout";
import { siteTitle } from "../../../shared/helper";
import SignUpForm from "../../components/forms/auth/signUpForm";
import GuestMiddleware from "../../../middleware/guestMiddleware";
import { USER_TYPE } from "../../../constants/user.constant";
const CreateAccount = () => {
  const type = useParams().type;
  const navigate = useNavigate();
  useEffect(() => {
    if (type !== USER_TYPE.BUSINESS && type !== USER_TYPE.PERSONAL) {
      navigate("/create-account");
    }
  }, [type]);

  return (
    <AuthLayout className="bg-gradient-to-r from-c_FD6769 to-c_FFE815">
      <Helmet>
        <title>Create Account - {siteTitle()}</title>
      </Helmet>
      <div className="mt-5">
        <div className="text-black font-openSans_bold flex justify-between items-center flex-wrap">
          <span className="lg:text-[40px] md:text-[39px] sm:text-[38px] text-[37px]">
            Welcome 🤗
          </span>
          <span className="text-[24px]">1 of 6</span>
        </div>

        <p className="lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-c_949494 font-openSans_regular mb-0">
          Don’t keep your friends waiting, Sign Up
        </p>
      </div>
      <SignUpForm type={type} />
      <div className="mt-5 text-center">
        <span className="text-c_2A2A2A font-openSans_regular lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px]">
          Already a member ?{" "}
          <Link
            to="/sign-in"
            className="text-c_0493A3 font-openSans_bold hover:text-c_0493A3 lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px]"
          >
            <span>Sign In</span>
          </Link>
        </span>
      </div>
    </AuthLayout>
  );
};
export default GuestMiddleware(CreateAccount);
