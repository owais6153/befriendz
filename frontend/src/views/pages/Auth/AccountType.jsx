import { Images } from "config/images";
import GuestMiddleware from "middleware/guestMiddleware";
import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { siteTitle } from "shared/helper";
import AuthLayout from "views/layouts/Auth/AuthLayout";

const { personalAccount, businessAccount, arrowRightIcon } = Images;
const accountTypeArray = [
  {
    id: "1",
    label: "Personal Account",
    description: [
      "Lorem ipsum dolor sit amet consectetur. Sed faucibus vitae suscipit",
      <br />,
      "pellentesque diam urna quis neque fames.",
    ],
    image: personalAccount,
    path: "/create-account/personal",
  },
  {
    id: "2",
    label: "Business Account",
    description: [
      "Lorem ipsum dolor sit amet consectetur. Sed faucibus vitae suscipit",
      <br />,
      "pellentesque diam urna quis neque fames.",
    ],
    image: businessAccount,
    path: "/create-account/business",
  },
];

const AccountType = () => {
  const [displayLoader, setDisplayLoader] = useState(true);
  useEffect(() => {
    const myTimeout = setTimeout(() => {
      setDisplayLoader(false);
    }, 5000);
  }, []);
  return (
    <Fragment>
      <AuthLayout className="bg-gradient-to-r from-c_FD6769 to-c_FFE815">
        <Helmet>
          <title>Choose Account Type - {siteTitle()}</title>
        </Helmet>
        <div className="mt-5">
          <span className="text-black font-openSans_bold lg:text-[40px] md:text-[39px] sm:text-[38px] text-[37px]">
            Welcome 🤗
          </span>
          <p className="lg:text-[14px] md:text-[13px] text-md  text-c_949494 font-openSans_regular mb-0">
            What type of account do you want to create?
          </p>
        </div>
        <div className="space-y-10 mt-5">
          {accountTypeArray?.map((item) => (
            <div key={item.id} className="relative">
              <img src={item?.image} className="w-full" />
              <div className="absolute bottom-0 lg:p-5 md:p-4 sm:p-3 p-2">
                <div className="text-white">
                  <span className="font-openSans_bold lg:text-[20px] md:text-[18px] text-md">
                    {item?.label}
                  </span>
                  <p className="lg:text-[12px] md:text-[10px] text-sm font-openSans_regular">
                    {item?.description}
                  </p>
                </div>
              </div>
              <div className="absolute md:bottom-3 right-0 bottom-0 md:right-3 lg:p-5 md:p-4 sm:p-3 p-2">
                <Link to={item?.path}>
                  <div className="bg-white rounded-md p-1 cursor-pointer">
                    <img src={arrowRightIcon.default} />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="my-10 text-center">
          <span className="text-c_2A2A2A font-openSans_regular lg:text-[14px] md:text-[13px] text-md">
            Already a member ?{" "}
            <Link
              to="/sign-in"
              className="text-c_0493A3 font-openSans_bold hover:text-c_0493A3 lg:text-[16px] md:text-[15px] sm:text-[14px] text-[13px]"
            >
              <span>Sign In</span>
            </Link>
          </span>
        </div>
        {displayLoader && (
          <div class="loader-wrapper">
            <img src="/loader/Comp-1.gif" width={300} alt="Befriends Loader" />
          </div>
        )}
      </AuthLayout>
    </Fragment>
  );
};

export default GuestMiddleware(AccountType);
