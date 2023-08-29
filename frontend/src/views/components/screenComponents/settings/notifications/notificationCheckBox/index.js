import React from "react";
import CustomGreenCheckbox from "views/components/shared/CustomGreenCheckbox";

const NotificationCheckBox = (props) => {
  const {
    label = "",
    labelClass = "",
    className = "",
    disabled,
    checked,
    onChange,
    ...rest
  } = props;
  return (
    <div
      className={`flex justify-between items-center w-full ${className} ${
        disabled && "opacity-50"
      }`}
    >
      <div>
        <span
          className={`text-[#515165] text-[14px] font-openSans_medium ${labelClass}`}
        >
          {label}
        </span>
      </div>
      <div>
        <CustomGreenCheckbox checked={checked} onChange={onChange} label={label} disabled={disabled} />
      </div>
    </div>
  );
};

export default NotificationCheckBox;
