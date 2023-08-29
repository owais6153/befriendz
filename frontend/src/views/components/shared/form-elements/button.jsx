const spinner = () => (
  <div className="flex justify-center items-center">
    <div>
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx={12}
          cy={12}
          r={10}
          stroke="currentColor"
          strokeWidth={4}
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
    <div>
      Loading <span className="animate-pulse ">...</span>
    </div>
  </div>
);

const Button = (props) => {
  const {
    isLoading = false,
    text = "",
    className = "",
    children,
    ...rest
  } = props;
  return (
    <button
      className={`lg:text-[16px] md:text-[15px] sm:text-[14px] text-[13px] text-white bg-[#FD6769] min-h-[60px] w-full rounded-full font-openSans_bold text-center hover:brightness-110 cursor-pointer ${className}`}
      {...rest}
    >
      {isLoading ? <>{spinner()}</> : <>{children ? children : text}</>}
    </button>
  );
};

export default Button;
