import InputError from "./inputError";
const Select = (props) => {
  const { register, error, label, labelClass, name, ...rest } = props;

  return (
    <>
      {label && (
        <label htmlFor={props.name} className={labelClass}>
          {label}
        </label>
      )}
      <div
        className={`flex  items-center bg-c_F5F5F5  lg:text-[18px] md:text-[17px] sm:text-[16px] text-[15px] font-openSans_regular text-c_949494 placeholder:text-c_949494 outline-none focus:outline-none border-b-2 border-c_949494 rounded-t-3xl px-3 select ${
          error ? "has-error" : ""
        } `}
      >
        <select
          {...rest}
          {...register}
          className={`min-h-[60px] focus:outline-none bg-transparent ${
            name === "day"
              ? "w-[120px]"
              : name === "month"
              ? "w-[140px]"
              : "w-full"
          }   `}
        >
          {props.children}
        </select>
      </div>

      {error && <InputError error={error} />}
    </>
  );
};
export default Select;
