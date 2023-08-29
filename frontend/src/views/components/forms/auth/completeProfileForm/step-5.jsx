import { connect } from "react-redux";
import InputFile from "../../../shared/form-elements/inputFile";
import Button from "../../../shared/form-elements/button";
import { fileSize, allowedFileType } from "../../../../../shared/validator";
import { APP_CONSTANT } from "../../../../../constants/app.constant";

const Step5 = (props) => {
  const {
    currentStep,
    nextStep,
    prevStep,
    changeStep,
    register,
    handleChange,
    errors,
  } = props;

  return (
    <div className={`step-form two ${currentStep !== 5 ? "hidden" : ""}`}>
      <a href="#!" onClick={prevStep} className="back">
        <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
      </a>
      <div className="mt-5 flex flex-row items-center justify-between">
        <div>
          <span className="h2 text-dark">Upload Photo</span>
          <p className="sm text-[#949494]">
            Share your peng and lovely pictures for identity
          </p>
        </div>
        <div>
          <h5 className="font-bold text-2xl">5 of 6</h5>
        </div>
      </div>
      <h3 className="h3 mb-4">Add Profile Photo</h3>
      <div className="form-group mb-5">
        <InputFile
          type="file"
          name="profileImage"
          accept="image/*"
          labelClass="radius-100"
          register={{
            ...register("profileImage", {
              onChange: handleChange,
              validate: {
                acceptedFormats: (files) => {
                  return allowedFileType(
                    files,
                    APP_CONSTANT.FILE.EXT.IMAGE,
                    "Only PNG, JPEG and GIF are allowed"
                  );
                },

                lessThan10MB: (files) =>
                  fileSize(files, APP_CONSTANT.FILE.SIZE["10MB"], "Max 10MB"),
              },
            }),
          }}
          error={
            props.common.errors?.profileImage || errors.profileImage?.message
          }
        />
      </div>

      <h3 className="h3 mb-4">Add Other Photos</h3>
      <div className="form-group">
        <div className="flex flex-row gap-2 justify-around mb-10">
          <div className="col-4">
            <InputFile
              type="file"
              name="image1"
              accept="image/*"
              labelClass="blue"
              register={{
                ...register("image1", {
                  onChange: handleChange,
                  validate: {
                    acceptedFormats: (files) =>
                      allowedFileType(
                        files,
                        APP_CONSTANT.FILE.EXT.IMAGE,
                        "Only PNG, JPEG and GIF are allowed"
                      ),
                    lessThan10MB: (files) =>
                      fileSize(
                        files,
                        APP_CONSTANT.FILE.SIZE["10MB"],
                        "Max 10MB"
                      ),
                  },
                }),
              }}
              error={props.common.errors?.image1 || errors.image1?.message}
            />
          </div>
          <div className="col-4">
            <InputFile
              type="file"
              name="image2"
              accept="image/*"
              labelClass="blue"
              register={{
                ...register("image2", {
                  onChange: handleChange,
                  validate: {
                    acceptedFormats: (files) =>
                      allowedFileType(
                        files,
                        APP_CONSTANT.FILE.EXT.IMAGE,
                        "Only PNG, JPEG and GIF are allowed"
                      ),
                    lessThan10MB: (files) =>
                      fileSize(
                        files,
                        APP_CONSTANT.FILE.SIZE["10MB"],
                        "Max 10MB"
                      ),
                  },
                }),
              }}
              error={props.common.errors?.image2 || errors.image2?.message}
            />
          </div>
          <div className="col-4">
            <InputFile
              type="file"
              name="image3"
              accept="image/*"
              labelClass="blue"
              register={{
                ...register("image3", {
                  onChange: handleChange,
                  validate: {
                    acceptedFormats: (files) =>
                      allowedFileType(
                        files,
                        APP_CONSTANT.FILE.EXT.IMAGE,
                        "Only PNG, JPEG and GIF are allowed"
                      ),
                    lessThan10MB: (files) =>
                      fileSize(
                        files,
                        APP_CONSTANT.FILE.SIZE["10MB"],
                        "Max 10MB"
                      ),
                  },
                }),
              }}
              error={props.common.errors?.image3 || errors.image3?.message}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Button type="button" onClick={changeStep} text="Continue" />
        <p className="sm mb-0 text-[#0493A3] text-center">
          <b>
            <a href="#!" onClick={nextStep}>
              Do It Later
            </a>
          </b>
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  common: state.common,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Step5);
