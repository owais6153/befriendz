import { connect } from "react-redux";
import { USER_TYPE } from "../../../../../constants/user.constant";
import Input from "../../../shared/form-elements/input";
import Select from "../../../shared/form-elements/select";
import Button from "../../../shared/form-elements/button";
import InputError from "../../../shared/form-elements/inputError";
import EmptySpace from "../../../shared/emptySpace";
import { REGX_CONSTANT } from "../../../../../constants/regx.constant";

const Step4 = (props) => {
  const { currentStep, nextStep, changeStep, register, handleChange, errors } =
    props;


  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;
  const yearoptions = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearoptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }
  return (
    <div className={`step-form one ${currentStep !== 4 ? "hidden" : ""}`}>
      <a href="/logout" className="back">
        <i className="fa fa-times" aria-hidden="true"></i> Logout
      </a>
      <div className="flex flex-row items-center justify-between mt-5">
        <div>
          <span className="h2 text-dark">Profile</span>
          <p className="text-[#949494]">
            Let us build your profile to optimize your account
          </p>
        </div>
        <h5 className="font-bold text-2xl">{currentStep} of 6</h5>
      </div>
      {props.user.type === USER_TYPE.PERSONAL && (
        <>
          <div className="flex flex-col gap-2 mb-2 ">
            <label htmlFor="dob">Date of Birth</label>
            <div className="dob-row flex flex-row flex-wrap gap-1 w-full justify-between">
              <div className="form-group">
                <Select
                  name="day"
                  register={{
                    ...register("day", {
                      onChange: handleChange,
                    }),
                  }}
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="form-group">
                <Select
                  name="month"
                  register={{
                    ...register("month", {
                      onChange: handleChange,
                    }),
                  }}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="form-group">
                <Select
                  name="year"
                  register={{
                    ...register("year", {
                      onChange: handleChange,
                      min: { value: 1900, message: "Invalid Year" },
                      max: {
                        value: new Date().getFullYear() - 18,
                        message: "Invalid Year",
                      },
                    }),
                  }}
                >
                  <option value="">Year</option>
                  {yearoptions}
                </Select>
              </div>
            </div>
            <InputError
              error={
                props.common.errors?.day ||
                props.common.errors?.month ||
                props.common.errors?.year ||
                props.common.errors?.dob ||
                errors.day?.message ||
                errors.month?.message ||
                errors.year?.message ||
                errors.dob?.message
              }
            />
          </div>
          <div className="  mb-2">
            <Select
              label="Gender"
              name="gender"
              id="gender"
              error={errors.gender?.message || props.common.errors?.gender}
              register={{
                ...register("gender", {
                  onChange: handleChange,
                }),
              }}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </div>
          <div className="form-group">
            <Input
              type="text"
              label="Occupation"
              name="occupation"
              id="occupation"
              placeholder="What do you do for living?"
              register={{
                ...register("occupation", {
                  onChange: handleChange,
                  minLength: {
                    value: 3,
                    message: "Occupation should be at least 3 characters long",
                  },
                  maxLength: {
                    value: 30,
                    message: "Occupation should be less then 20 characters",
                  },
                }),
              }}
              error={
                errors.occupation?.message || props.common.errors?.occupation
              }
            />
          </div>
        </>
      )}
      {props.user.type === USER_TYPE.BUSINESS && (
        <>
          <div className="form-group">
            <Input
              type="text"
              label="Full Business Address"
              name="business_address"
              placeholder="Enter Business Address"
              register={{
                ...register("business_address", {
                  onChange: handleChange,
                  minLength: {
                    value: 10,
                    message:
                      "Business Address should be at least 10 characters long",
                  },
                  maxLength: {
                    value: 50,
                    message:
                      "Business Address should be less then 50 characters",
                  },
                }),
              }}
              error={
                errors.business_address?.message ||
                props.common.errors?.business_address
              }
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              label="Business Phone Number"
              name="phoneNumber"
              placeholder="Enter Business Phone Number"
              register={{
                ...register("phoneNumber", {
                  onChange: handleChange,
                  minLength: {
                    value: 10,
                    message:
                      "Business Phone Number should be at least 10 characters long",
                  },
                  maxLength: {
                    value: 13,
                    message:
                      "Business Phone Number should be less then 13 characters",
                  },
                  pattern: {
                    value: REGX_CONSTANT.PHONE,
                    message: "Invalid Phone",
                  },
                }),
              }}
              error={
                errors.phoneNumber?.message || props.common.errors?.phoneNumber
              }
            />
          </div>
        </>
      )}
      <EmptySpace
        height={props.user.type === USER_TYPE.PERSONAL ? "100px" : "200px"}
      />
      <div className="w-100">
        <Button
          type="button"
          onClick={changeStep}
          className="mb-4 "
          text="Continue"
        />
        <p className="sm mb-0 text-[#0493A3] text-center">
          <b>
            <a href="#!" onClick={nextStep}>
              Do It Later
            </a>
          </b>
        </p>
      </div>
      <EmptySpace height="40px" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  common: state.common,
  user: state.auth.user,
});
export default connect(mapStateToProps)(Step4);
