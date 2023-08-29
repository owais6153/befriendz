import { Images } from "config/images";
import BaseLayout from "../BaseLayout";
import React from "react";
const { authBrandLogo } = Images;
const AuthLayout = ({ className = "", children, hasLogo = true}) => {
  return (
    <BaseLayout>
      <div
        className={`min-h-screen w-full flex items-center justify-center py-16 ${
          className || ""
        }`}
      >
        <div className="grid grid-cols-5 w-full lg:max-w-4xl md:max-w-xl md:px-5 p-2">
          <div></div>
          <div className="lg:col-span-3 col-span-5">
            <div className="bg-white rounded-3xl lg:p-6 md:p-4 sm:p-3 p-2 sm:w-full ">
              {hasLogo && (<div className="flex w-full justify-center">
                <img src={authBrandLogo.default} />
              </div>)}
              <div className="p-4">{children}</div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default AuthLayout;
