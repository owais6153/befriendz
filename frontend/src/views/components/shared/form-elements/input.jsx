import { Images } from "config/images";
import { useState } from "react";
import InputError from "./inputError";
const { eyeIcon } = Images;
const Input = (props) => {
  const { register, type, error, label, labelClass, inputClass, ...rest } =
    props;
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(() => !isPasswordVisible);
  };

  return (
    <>
      {label && (
        <label
          htmlFor={props.name}
          className={`text-[#000000] mb-2 lg:text-[16px] md:text-[15px] sm:text-[14px] text-[13px] ${labelClass}`}
        >
          {label}
        </label>
      )}
      <div
        className={`relative ${type ? type : ""} ${error ? "has-error" : ""} `}
      >
        <input
          className={`bg-c_F5F5F5 mt-2 w-full min-h-[60px] border-b-2 border-c_949494 rounded-t-3xl px-5 lg:text-[18px] md:text-[17px] sm:text-[16px] text-[15px] font-openSans_regular text-c_949494 placeholder:text-c_949494 outline-none focus:outline-none ${inputClass}`}
          type={isPasswordVisible ? "text" : type}
          {...rest}
          {...register}
        />
        {type && type === "password" && (
          <img
            className="absolute right-5 top-8 cursor-pointer object-contain"
            src={eyeIcon}
            alt="View Password"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>

      {error && <InputError error={error} />}
    </>
  );
};
export default Input;
