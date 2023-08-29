import { useState } from "react";
import InputError from "./inputError";
const Checkbox = (props) => {
  const { register, error, label, labelClass, ...rest } = props;
  const [checked, setChecked] = useState(props.checked ? props.checked : false);
  const changeHandler = (e) => {
    setChecked(e.target.checked);
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return (
    <>
      <label
        className={`checkbox ${labelClass ? labelClass : ""} ${
          checked ? "active" : ""
        }`}>
        <input
          type="checkbox"
          {...rest}
          {...register}
          onChange={changeHandler}
        />
        {label}
      </label>
      {error && <InputError error={error} />}
    </>
  );
};
export default Checkbox;
