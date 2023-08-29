import AuthLayout from "../../layouts/Auth/AuthLayout";
import RecoverPasswordForm from "../../components/forms/auth/recoverPasswordForm";
import { siteTitle } from "../../../shared/helper";
import { Helmet } from "react-helmet";
import { publicURL } from "../../../shared/helper";
import GuestMiddleware from "../../../middleware/guestMiddleware";
import { Link } from "react-router-dom";
import { Images } from "config/images";
const { crossIcon } = Images;
const RecoverPassword = () => {
  return (
    <AuthLayout className="purpleish-gradient">
      <Helmet>
        <title>Recover Password - {siteTitle()}</title>
      </Helmet>
      <Link to="/sign-in" className="flex space-x-3">
        <img src={crossIcon.default} />{" "}
        <span className="text-[#0493A3] hover:text-[#0493A3] font-openSans_regular text-[16px]">
          Cancel
        </span>
      </Link>
      <div>
        <div className="text-black font-openSans_bold flex justify-between items-center flex-wrap">
          <span className="lg:text-[40px] md:text-[39px] sm:text-[38px] text-[37px]">
            Recover Password
          </span>
        </div>

        <p className="lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-c_949494 font-openSans_regular mb-0">
          Don’t panic we can help you recover password
        </p>
      </div>
      <div className="flex justify-center">
        <svg
          width="196"
          height="196"
          viewBox="0 0 196 196"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M147 61.2502H79.625V55.1252C79.6283 51.5009 80.7023 47.9583 82.7122 44.9422C84.722 41.9262 87.5781 39.5712 90.9218 38.1728C94.2656 36.7745 97.9479 36.3952 101.506 37.0825C105.065 37.7698 108.341 39.4931 110.924 42.0361C112.059 43.1959 113.047 44.492 113.864 45.8948C114.665 47.3081 115.996 48.345 117.562 48.7775C119.128 49.21 120.802 49.0026 122.215 48.2009C123.628 47.3992 124.665 46.069 125.098 44.5028C125.53 42.9366 125.323 41.2627 124.521 39.8495C123.168 37.5109 121.526 35.3522 119.633 33.4243C115.343 29.155 109.885 26.2517 103.946 25.0808C98.0082 23.9099 91.8562 24.5238 86.2664 26.845C80.6766 29.1663 75.8994 33.0909 72.5373 38.1238C69.1753 43.1567 67.379 49.0726 67.375 55.1252V61.2502H49C44.1281 61.2551 39.4572 63.1926 36.0123 66.6375C32.5674 70.0824 30.6299 74.7533 30.625 79.6252V159.25C30.6299 164.122 32.5674 168.793 36.0123 172.238C39.4572 175.683 44.1281 177.62 49 177.625H147C151.872 177.62 156.543 175.683 159.988 172.238C163.433 168.793 165.37 164.122 165.375 159.25V79.6252C165.37 74.7533 163.433 70.0824 159.988 66.6375C156.543 63.1926 151.872 61.2551 147 61.2502ZM104.125 127.498V140.875C104.125 142.5 103.48 144.058 102.331 145.206C101.182 146.355 99.6245 147 98 147C96.3755 147 94.8176 146.355 93.669 145.206C92.5203 144.058 91.875 142.5 91.875 140.875V127.498C87.7883 126.053 84.344 123.21 82.1508 119.472C79.9575 115.733 79.1566 111.339 79.8896 107.067C80.6226 102.795 82.8423 98.9192 86.1563 96.1253C89.4704 93.3314 93.6654 91.7991 98 91.7991C102.335 91.7991 106.53 93.3314 109.844 96.1253C113.158 98.9192 115.377 102.795 116.11 107.067C116.843 111.339 116.042 115.733 113.849 119.472C111.656 123.21 108.212 126.053 104.125 127.498ZM104.125 110.25C104.125 111.462 103.766 112.646 103.093 113.653C102.42 114.66 101.463 115.445 100.344 115.909C99.2247 116.373 97.9932 116.494 96.8051 116.258C95.6169 116.021 94.5256 115.438 93.669 114.581C92.8124 113.725 92.229 112.633 91.9927 111.445C91.7564 110.257 91.8777 109.025 92.3412 107.906C92.8048 106.787 93.5899 105.83 94.5971 105.157C95.6044 104.484 96.7886 104.125 98 104.125C99.6245 104.125 101.182 104.771 102.331 105.919C103.48 107.068 104.125 108.626 104.125 110.25Z"
            fill="#0493A3"
          />
        </svg>
      </div>
      <RecoverPasswordForm />
    </AuthLayout>
  );
};
export default GuestMiddleware(RecoverPassword);
