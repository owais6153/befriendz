import { useState } from "react";

const CategoryGroupCheckbox = (props) => {
  const { option, index } = props;
  const [isChecked, setIsChecked] = useState(false);
  return (
    <label
      className={`flex gap-2 h-[40px] whitespace-nowrap text-sm items-center p-2 px-3 cursor-pointer select-none  rounded-full w-min ${
        isChecked
          ? "bg-[#0493A3] text-white"
          : "bg-[#F5F5F5] border-2 border-[#E6F4F6]"
      }`}
      key={index}
    >
      <input
        type="checkbox"
        id="choose-me"
        className="peer hidden"
        name={option}
        value={isChecked}
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(!isChecked);
        }}
      />
      {option}
      {isChecked && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 3L3 9"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3 3L9 9"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </label>
  );
};

export default CategoryGroupCheckbox;
