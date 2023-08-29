const InputError = ({ error }) => {
  if (error)
    return (
      <div className="font-openSans_regular text-[#f4646b] leading-[210%] lg:text-[12px] md:text-[11px] sm:text-[10px] text-[9px]">
        {error}
      </div>
    );
  else return null;
};
export default InputError;
