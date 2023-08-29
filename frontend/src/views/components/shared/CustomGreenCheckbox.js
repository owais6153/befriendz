import { useEffect } from "react";

const CustomGreenCheckbox = (props) => {
  const { label = "", children, disabled = false, checked = true, onChange, ...rest } = props;

  return (
    <>
      <label
        className={`flex items-center justify-center cursor-pointer  h-5 w-5  rounded-md ${
          checked
            ? "bg-c_30B52D text-white"
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
          checked={checked}
          {...rest}
          onChange={(e) => {
            onChange();
          }}
        />
        {checked && (
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 1L3.5 6.5L1 4"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </label>
      <div className="ml-2 select-none">{children}</div>
    </>
  );
};

export default CustomGreenCheckbox;
