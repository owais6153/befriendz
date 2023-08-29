import InputError from "./inputError";
const Textarea = (props) => {
  const { register, error, label, labelClass, inputClass, ...rest } = props;
  return (
    <>
      {label && (
        <label
          htmlFor={props.name}
          className={`text-[2A2A2A] font-openSans_regular lg:text-[16px] md:text-[15px] sm:text-[14px] text-[13px] ${labelClass}`}
        >
          {label}
        </label>
      )}
      <div className={` ${error ? "has-error" : ""} `}>
        <textarea
          {...rest}
          {...register}
          className={`bg-c_F5F5F5 p-4  w-full min-h-[136px] border-b-2 border-c_949494 rounded-t-3xl px-5 lg:text-[18px] md:text-[17px] sm:text-[16px] text-[15px] font-openSans_regular text-c_515165 placeholder:text-c_949494 outline-none focus:outline-none ${inputClass}`}
        />
      </div>

      {error && <InputError error={error} />}
    </>
  );
};
export default Textarea;
