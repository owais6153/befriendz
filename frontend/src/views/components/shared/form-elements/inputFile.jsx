import { Images } from "config/images";
import { useState } from "react";
import InputError from "./inputError";
const { blueCamera, camera } = Images;
const InputFile = (props) => {
  const {
    register,
    error,
    labelClass,
    size = "",
    imageRadius,
    ...rest
  } = props;
  const { onChange } = register;

  const clickHandler = (e) => {
    e.target.firstElementChild?.click();
  };
  const [image, setImage] = useState(null);

  const onFileChange = (event) => {
    if (onChange) onChange(event);

    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    } else {
      setImage(null);
    }
  };
  const handler = { ...register, onChange: onFileChange };
  return (
    <>
      <div
        className={`file ${error ? "has-error" : ""} ${labelClass || false}`}
        onClick={clickHandler}
      ></div>
      <label
        className={`flex flex-row justify-center items-center cursor-pointer w-36 h-36 ${
          labelClass == "blue"
            ? `${imageRadius ? imageRadius : "rounded-xl"} bg-[#E6F4F6]`
            : `${imageRadius ? imageRadius : "rounded-full"} bg-[#FFE1E1]`
        } ${size}`}
      >
        {image ? (
          <img
            alt="preview"
            className={` h-full w-full object-cover ${
              labelClass == "blue"
                ? `${imageRadius ? imageRadius : "rounded-xl"}`
                : `${imageRadius ? imageRadius : "rounded-full"} `
            }`}
            src={image}
          />
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center ">
            <img
              alt="camera Image"
              className="w-10 h-10 "
              src={labelClass == "blue" ? blueCamera : camera}
            />
            {labelClass != "blue" && (
              <div className="text-c_FD6769 font-openSans_semiBold text-sm">
                Profile Photo
              </div>
            )}
          </div>
        )}{" "}
        <input type="file" {...rest} {...handler} className="hidden" />
      </label>

      {error && <InputError error={error} />}
    </>
  );
};
export default InputFile;
