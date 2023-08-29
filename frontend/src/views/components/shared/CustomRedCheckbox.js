import { useState } from "react";

const CustomRedCheckbox = (props) => {
  const { label = "", children, disabled = false, ...rest } = props;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div>
          <span className="text-[#515165] text-[12px] font-openSans_semiBold">
            {label}
          </span>
        </div>
        <div>
          <label
            className={`flex items-center justify-center cursor-pointer  h-5 w-5  rounded-md ${
              isChecked
                ? "bg-c_FD6769 text-white"
                : "bg-[#F5F5F5] border-2 border-c_949494"
            } ${disabled && "opacity-50 cursor-not-allowed"}`}
            key={label}
          >
            <input
              type="checkbox"
              id="choose-me"
              className="peer hidden"
              name={label}
              value={label}
              disabled={disabled}
              checked={isChecked}
              {...rest}
              onChange={(e) => {
                setIsChecked(!isChecked);
              }}
            />
            {isChecked && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="16" height="16" rx="2" fill="#FD6769" />
                <path d="M4 8.5L7 11L12 5" stroke="white" stroke-width="1.5" />
              </svg>
            )}
          </label>
        </div>
      </div>
    </>
  );
};

export default CustomRedCheckbox;
