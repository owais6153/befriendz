import { connect } from "react-redux";
import EmptySpace from "views/components/shared/emptySpace";
import Button from "views/components/shared/form-elements/button";
import Input from "views/components/shared/form-elements/input";
import Select from "views/components/shared/form-elements/select";
import Textarea from "views/components/shared/form-elements/textarea";
import Modal from "views/components/shared/modal/components/EditModal";
import { useForm } from "react-hook-form";
import useFormHandler from "../../../../../shared/hooks/useFormHandler";
import { updateProfileAction } from "redux/actions/userAction";
import { REGX_CONSTANT } from "constants/regx.constant";
import { USER_TYPE } from "constants/user.constant";
import { useEffect, useState } from "react";
import TopicService from "services/topic.service";
import CheckboxGroup from "views/components/shared/form-elements/checkboxGroup";
import InputFile from "views/components/shared/form-elements/inputFile";
import { allowedFileType, fileSize } from "shared/validator";
import { APP_CONSTANT } from "constants/app.constant";

import { displayErrorsAction } from "redux/actions/commonActions";
import InputError from "views/components/shared/form-elements/inputError";

const EditProfileModal = (props) => {
  const [topics, setTopics] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchTopics() {
      setIsFetching(() => true);
      await TopicService.listAll(props.user.token).then(
        (response) => {
          setTopics(response.data.data.topics);
        },
        (error) => {
          props.displayError(error);
        }
      ).catch(()=>{});
      setIsFetching(() => false);
    }
    fetchTopics();
    return () => {
      setTopics(false);
    };
  }, []);

  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name:
        props?.user?.type === USER_TYPE.BUSINESS
          ? undefined
          : props?.user?.first_name,
      last_name:
        props?.user?.type === USER_TYPE.BUSINESS
          ? undefined
          : props?.user?.last_name,
      occupation:
        props?.user?.type === USER_TYPE.BUSINESS
          ? undefined
          : props?.user?.occupation,
      day:
        props?.user?.type === USER_TYPE.BUSINESS
          ? undefined
          : props?.user?.dob?.day,
      month:
        props?.user?.type === USER_TYPE.BUSINESS
          ? undefined
          : props?.user?.dob?.month,
      year:
        props?.user?.type === USER_TYPE.BUSINESS
          ? undefined
          : props?.user?.dob?.year,

      business_name:
        props?.user?.type === USER_TYPE.PERSONAL
          ? undefined
          : props?.user?.business_name,
      business_type:
        props?.user?.type === USER_TYPE.PERSONAL
          ? undefined
          : props?.user?.business_type,
      business_address:
        props?.user?.type === USER_TYPE.PERSONAL
          ? undefined
          : props?.user?.business_address,
      phoneNumber:
        props?.user?.type === USER_TYPE.PERSONAL
          ? undefined
          : props?.user?.phoneNumber,

      type: props?.user?.type,
      about: props?.user?.about,
      username: props?.user?.username,
      email: props?.user?.email,
    },
  });
  const { handleChange, resetFormErrors } = useFormHandler(clearErrors);

  const submitHandler = (data) => {
    resetFormErrors();

      const formData = new FormData();
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if(key == 'profileImage' || key == 'image1' || key == 'image2' || key == 'image3'){
              if(data[key][0])
              formData.append(key, data[key][0]);
            }
            else {
              if(data[key]) formData.append(key, data[key]);
            }     
        }
      }

    props.updateProfile(formData).then(() => {
      props.setOpen(false);
      props.refetchProfile();
    });
  };

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

  const form = () => (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-4 px-4">
        <div className="max-h-[50vh] overflow-scroll px-4">
          <Input
            type="hidden"
            name="type"
            register={{
              ...register("type"),
            }}
          />
          <EmptySpace height="10px" />

          <div className="">
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
                      fileSize(
                        files,
                        APP_CONSTANT.FILE.SIZE["10MB"],
                        "Max 10MB"
                      ),
                  },
                }),
              }}
              error={
                props.common.errors?.profileImage ||
                errors.profileImage?.message
              }
            />
          </div>
          {props?.user?.type == USER_TYPE.PERSONAL && (
            <>
              <div className="">
                <Input
                  type="text"
                  label="First Name"
                  placeholder="Demarai"
                  name="first_name"
                  register={{
                    ...register("first_name", {
                      onChange: handleChange,
                      required: "This field is required",
                      minLength: {
                        value: 3,
                        message:
                          "First name should be at least 3 characters long",
                      },
                      maxLength: {
                        value: 20,
                        message: "First name should be less then 20 characters",
                      },
                    }),
                  }}
                  error={
                    errors?.first_name?.message ||
                    props?.common?.errors?.first_name
                  }
                />
              </div>
              <div className="">
                <Input
                  type="text"
                  label="Last Name"
                  name="last_name"
                  placeholder="Gray"
                  register={{
                    ...register("last_name", {
                      onChange: handleChange,
                      required: "This field is required",
                      minLength: {
                        value: 3,
                        message:
                          "Last name should be at least 3 characters long",
                      },
                      maxLength: {
                        value: 20,
                        message: "Last name should be less then 20 characters",
                      },
                    }),
                  }}
                  error={
                    errors.last_name?.message || props.common.errors?.last_name
                  }
                />
              </div>
            </>
          )}

          <div className="">
            <Input
              type="text"
              label="Username"
              name="username"
              placeholder="demarai_gray"
              register={{
                ...register("username", {
                  onChange: handleChange,
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Username should be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username should be less then 20 characters",
                  },
                  pattern: {
                    value: REGX_CONSTANT.USERNAME,
                    message:
                      "Username should only contain letters, numbers, hyphens, and underscores",
                  },
                }),
              }}
              error={errors.username?.message || props.common.errors?.username}
            />
          </div>
          <div className="">
            <Input
              type="text"
              label="Email Address"
              name="email"
              placeholder="demaraigray@gmail.com"
              register={{
                ...register("email", {
                  onChange: handleChange,
                  required: "This field is required",
                  pattern: {
                    value: REGX_CONSTANT.EMAIL,
                    message: "Invalid email address",
                  },
                }),
              }}
              error={errors.email?.message || props.common.errors?.email}
            />
          </div>
          {props?.user?.type == USER_TYPE.PERSONAL && (
            <>
              <div>
                <div>
                  <label
                    className={`text-[2A2A2A] font-openSans_regular lg:text-[16px] md:text-[15px] sm:text-[14px] text-[13px]`}
                  >
                    Date of Birth
                  </label>
                  <div className="flex justify-between w-full flex-wrap gap-2">
                    <div>
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
                    <div>
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
                    <div>
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
                        <option value="">year</option>
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
              <div className="">
                <Input
                  type="text"
                  label="Occupation"
                  name="occupation"
                  placeholder="What do you do for living?"
                  register={{
                    ...register("occupation", {
                      onChange: handleChange,
                      minLength: {
                        value: 3,
                        message:
                          "Occupation should be at least 3 characters long",
                      },
                      maxLength: {
                        value: 30,
                        message: "Occupation should be less then 20 characters",
                      },
                    }),
                  }}
                  error={
                    errors.occupation?.message ||
                    props.common.errors?.occupation
                  }
                />
              </div>
            </>
          )}

          {props?.user?.type == USER_TYPE.BUSINESS && (
            <>
              <div className="">
                <Input
                  type="text"
                  label="Full Business Name"
                  name="business_name"
                  placeholder="S7N D3SIGNS"
                  register={{
                    ...register("business_name", {
                      onChange: handleChange,
                      required: "This field is required",
                      minLength: {
                        value: 3,
                        message:
                          "Business Name should be at least 3 characters long",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Business Name should be less then 20 characters",
                      },
                    }),
                  }}
                  error={
                    errors.business_name?.message ||
                    props.common.errors?.business_name
                  }
                />
              </div>
              <div className="">
                <Input
                  label="Business Type"
                  type="text"
                  name="business_type"
                  placeholder="Design"
                  register={{
                    ...register("business_type", {
                      onChange: handleChange,
                      required: "This field is required",
                      minLength: {
                        value: 3,
                        message:
                          "Business type should be at least 3 characters long",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Business type should be less then 20 characters",
                      },
                    }),
                  }}
                  error={
                    errors.business_type?.message ||
                    props.common.errors?.business_type
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
                    errors.phoneNumber?.message ||
                    props.common.errors?.phoneNumber
                  }
                />
              </div>
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
            </>
          )}
          <div className="">
            <Textarea
              label="Tell us about yourself"
              name="about"
              placeholder="Write something about you"
              register={{
                ...register("about", {
                  onChange: handleChange,
                  minLength: {
                    value: 3,
                    message: "About should be at least 3 characters long",
                  },
                  maxLength: {
                    value: 220,
                    message: "About should be less then 220 characters",
                  },
                }),
              }}
              error={errors.about?.message || props.common.errors?.about}
            />
          </div>
          <div>
            <label htmlFor="">What are your Interests</label>
            <div className="flex flex-row flex-wrap gap-3  h-full overflow-y-auto mt-3">
              {isFetching && <p>Fetching Topics...</p>}
              {topics && (
                <CheckboxGroup
                  options={topics}
                  control={control}
                  name="interests"
                  indexKey="_id"
                  value="name"
                />
              )}
            </div>
          </div>

          <EmptySpace height="60px" />
        </div>
      </div>
      <div className="w-full  shadow-inner rounded-md h-1"></div>
      <div className="absoulte bottom-0 pt-4 px-8">
        <Button
          disabled={props.common.form_loder === 1}
          isLoading={props.common.form_loder === 1}
          text={"Continue"}
        />
      </div>
      {/* <EmptySpace height="20px" /> */}
    </form>
  );

  return (
    <Modal
      open={props.open}
      setOpen={props.setOpen}
      title={"Edit Profile"}
      subTitle={"Kindly update the details below"}
    >
      {form()}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  common: state.common,
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data) => dispatch(updateProfileAction(data)),
  displayError: (data) => dispatch(displayErrorsAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);
