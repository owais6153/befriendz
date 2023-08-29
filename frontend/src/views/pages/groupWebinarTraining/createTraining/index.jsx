import { useState } from "react";
import { connect } from "react-redux";
import CustomEditor from "components/shared/editor";
import { AsyncPaginate } from "react-select-async-paginate";
import { TagsInput } from "react-tag-input-component";
import { Images } from "config/images";
import PageLayout from "views/layouts/page";
import ImageFormPreview from "views/components/shared/form-elements/imageFormPreview";
import Select from "views/components/shared/form-elements/select";
import Input from "views/components/shared/form-elements/input";
import InputError from "views/components/shared/form-elements/inputError";
import Button from "views/components/shared/form-elements/button";
import { useForm, Controller } from "react-hook-form";
import useFormHandler from "shared/hooks/useFormHandler";
import ProtectedMiddleware from "middleware/protectedMiddleware";
import { toast } from "react-toastify";
import TrainingService from "services/training.service";
import TopicService from "services/topic.service";
import { useNavigate } from "react-router-dom";
import { displayErrorsAction } from "redux/actions/commonActions";

const CreateTraining = (props) => {
  const { uploadImageIcon } = Images;

  const [image, setImage] = useState(null);
  const [about, setAbout] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [isMoreDetails, setIsMoreDetails] = useState(false);
  const [selectedTags, setSelectedTags] = useState(null);
  const currentDate = new Date();
  const minDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  const maxDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 6,
    currentDate.getDate()
  );
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    trigger,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();
  const { handleChange, resetFormErrors } = useFormHandler(clearErrors);

  const handleImageFileSelected = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageName(event.target.files[0].name);
    } else {
      setImage(null);
      setImageName(null);
    }
    handleChange(event);
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
  const handleOptionChange = (newValue) => {
    if (newValue.length <= 5) {
      setSelectedTags(newValue);
    } else {
      toast.error("You can only select upto 5 tags");
    }
  };
  async function loadOptions(search, loadedOptions) {
    const response = await TopicService.options(props.token, search);

    return {
      options: response.data.data.options.results,
      hasMore: false,
    };
  }
  const submitHandler = async (data) => {
    resetFormErrors();
    if (about?.length > 0) {
      setLoading(true);
      const formData = new FormData();

      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          if (key !== "coverImage" && key !== "about" && key !== "tags") {
            if (data[key]) formData.append(key, data[key]);
          }
        }
      }

      if (data.coverImage?.[0])
        formData.append("coverImage", data.coverImage?.[0]);

      formData.append("about", about);
      formData.append(
        "tags",
        selectedTags.map((option) => option.value)
      );

      await TrainingService.addTraining(props.token, formData)
        .then((response) => {
          navigate(`/trainings/${response.data?.data?.training?._id}`);
        })
        .catch((error) => {
          props.displayErrors(error);
        });
      setLoading(false);
    } else toast.error("Content is required");
  };

  const changeStep = async (v) => {
    // Check for validation before changing step
    const isValid = await trigger();
    if (isValid) setIsMoreDetails(v);
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {!isMoreDetails ? (
        <div>
          <section>
            <div>
              <Input
                className="bg-[#F5F5F5] px-[15px] py-[10px] rounded-md text-[#949494] text-[26px] font-openSans_bold w-full outline-none"
                placeholder="Give Your Training A Title"
                register={{
                  ...register("title", {
                    onChange: handleChange,
                    required: "This field is required",
                    minLength: {
                      value: 3,
                      message: "Title should be at least 3 characters long",
                    },
                    maxLength: {
                      value: 50,
                      message: "Title should be less then 20 characters",
                    },
                  }),
                }}
                error={errors.title?.message || props.common.errors?.title}
              />
            </div>
            <div className="flex flex-row gap-3  items-center">
              <div className="relative w-fit my-3">
                <label
                  title="Click to upload"
                  for="uploadCoverImage"
                  className="cursor-pointer flex items-center gap-2 px-3 py-2.5 rounded-md bg-[#f5f5f5]"
                >
                  <div className="w-max relative">
                    <img
                      className="w-5"
                      src={uploadImageIcon.default}
                      alt="file upload icon"
                    />
                  </div>
                  <div className="relative">
                    <span className="block text-xs font-semibold relative ">
                      Set Cover Photo
                    </span>
                  </div>
                </label>
                <Input
                  hidden="true"
                  type="file"
                  name="uploadCoverImage"
                  id="uploadCoverImage"
                  register={{
                    ...register("coverImage", {
                      required: "This field is required",
                      onChange: handleImageFileSelected,
                    }),
                  }}
                />
              </div>
            </div>
            <InputError
              error={
                errors.coverImage?.message || props.common.errors?.coverImage
              }
            />

            {image && (
              <div>
                <ImageFormPreview
                  imageName={imageName}
                  setImage={setImage}
                  image={image}
                />

                <div className="pb-5 pt-3">
                  <img
                    src={image}
                    alt="preview post cover image"
                    className="w-full h-[340px] object-cover rounded-lg"
                  />
                </div>
              </div>
            )}
            <div className="w-full mt-4">
              <CustomEditor
                value={about}
                setValue={setAbout}
                placeholder="Write a group description here"
              />
              <InputError
                error={errors.about?.message || props.common.errors?.about}
              />
            </div>
            <div className="w-full mt-[15px] flex flex-col gap-2">
              <label className="text-[#2A2A2A] text-[16px] font-openSans_regular">
                Add or change tags (up to 5) so readers know what your story is
                about
              </label>
              <Controller
                name="tags"
                control={control}
                rules={{ required: "Please select at least one option" }}
                render={({ field }) => (
                  <AsyncPaginate
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleOptionChange(e);
                    }}
                    loadOptions={loadOptions}
                    isMulti
                    value={selectedTags}
                  />
                )}
              />
              <InputError
                error={errors.tags?.message || props.common.errors?.tags}
              />
            </div>
            <div className=" mt-4 mb-2">
              <Select
                label="Training Type"
                name="type"
                id="type"
                error={errors.type?.message || props.common.errors?.type}
                register={{
                  ...register("type", {
                    required: "This field is required",
                    onChange: handleChange,
                  }),
                }}
              >
                <option value="">Select Type</option>
                <option value="on-site">On Site</option>
                <option value="virtual">Virtual</option>
              </Select>
            </div>
            <div className="flex w-full items-center mt-[15px] flex-row gap-8 flex-wrap">
              <button
                type="button"
                onClick={() => changeStep(true)}
                className="inline-flex justify-center items-center rounded-md bg-c_0493A3 py-[8px] px-[40px] text-[16px] font-openSans_bold text-white focus-visible:outline-none hover:brightness-110 min-h-[44px] space-x-2"
              >
                <span>Continue</span>
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <section>
            <div className="flex flex-col gap-2 mb-2 ">
              <span className="text-[#2A2A2A] text-[26px] font-bold">
                Set Your Training Preference
              </span>
            </div>
            <div className=" xl:grid xl:grid-cols-12 flex flex-row gap-4 flex-wrap">
              <div className="flex flex-col gap-2 mb-2 col-span-8 ">
                <label htmlFor="dob">Date </label>
                <div className="dob-row flex flex-row flex-wrap  w-full justify-start gap-4">
                  <div className="form-group">
                    <Select
                      name="day"
                      register={{
                        ...register("day", {
                          onChange: handleChange,
                          required: "This field is required",
                          validate: (value) => {
                            const selectedDay = parseInt(value, 10);
                            const selectedMonth = parseInt(
                              getValues("month"),
                              10
                            );
                            const selectedYear = parseInt(
                              getValues("year"),
                              10
                            );
                            const selectedDate = new Date(
                              selectedYear,
                              selectedMonth - 1,
                              selectedDay
                            );
                            if (
                              selectedDate < minDate ||
                              selectedDate > maxDate
                            ) {
                              return "Invalid Date";
                            }
                          },
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
                          required: "This field is required",
                          validate: (value) => {
                            const selectedMonth = parseInt(value, 10);
                            const selectedDay = parseInt(getValues("day"), 10);
                            const selectedYear = parseInt(
                              getValues("year"),
                              10
                            );
                            const selectedDate = new Date(
                              selectedYear,
                              selectedMonth - 1,
                              selectedDay
                            );
                            if (
                              selectedDate < minDate ||
                              selectedDate > maxDate
                            ) {
                              return "Invalid Date";
                            }
                          },
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
                          required: "This field is required",
                          validate: (value) => {
                            const selectedYear = parseInt(value, 10);
                            const selectedMonth = parseInt(
                              getValues("month"),
                              10
                            );
                            const selectedDay = parseInt(getValues("day"), 10);
                            const selectedDate = new Date(
                              selectedYear,
                              selectedMonth - 1,
                              selectedDay
                            );
                            if (
                              selectedDate < minDate ||
                              selectedDate > maxDate
                            ) {
                              return "Invalid Date";
                            }
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
              <div className="flex flex-col mb-2 col-span-8 ">
                <label htmlFor="time">Time</label>
                <div className=" flex flex-row flex-wrap gap-1 w-full justify-between">
                  <div className="form-group w-full">
                    <Input
                      name="time"
                      type="time"
                      register={{
                        ...register("time", {
                          onChange: handleChange,
                          required: "This field is required",
                        }),
                      }}
                      error={errors.time?.message || props.common.errors?.time}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-2 col-span-8 ">
                <label htmlFor="time">Price</label>
                <div className=" flex flex-row flex-wrap gap-1 w-full justify-between">
                  <div className="form-group w-full">
                    <Input
                      name="price"
                      type="number"
                      placeholder="$0.00"
                      register={{
                        ...register("price", {
                          onChange: handleChange,
                        }),
                      }}
                      error={
                        errors.price?.message || props.common.errors?.price
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center mt-10 flex-row gap-8 flex-wrap">
              <Button
                disabled={loading}
                isLoading={loading}
                type="submit"
                className="inline-flex justify-center items-center rounded-md bg-c_0493A3 py-[8px] px-[40px] text-[16px] font-openSans_bold text-white focus-visible:outline-none hover:brightness-110 min-h-[44px] space-x-2"
              >
                <span>Create Training</span>
              </Button>
            </div>
          </section>
        </div>
      )}
    </form>
  );
};

const Right = () => <aside className="hidden xl:col-span-3 xl:block"></aside>;
const Left = () => (
  <div className="hidden lg:col-span-3 lg:block xl:col-span-2 "></div>
);
const Center = (props) => (
  <div className="mx-auto xl:grid xl:grid-cols-7 px-3 lg:px-4 lg:gap-8">
    <main className="lg:col-span-5 xl:col-span-5">
      <div className="p-10 rounded-xl bg-white">
        <CreateTraining {...props} />
      </div>
    </main>
    <Right />
  </div>
);
function CreateTrainingPage(props) {
  return (
    <>
      <PageLayout
        mainContent={<Center {...props} />}
        sideBar={<Left />}
        containsSideBar={false}
      />
    </>
  );
}
const mapStateToProps = (state) => ({
  common: state.common,
  token: state.auth?.user?.token,
});
const mapDispatchToProps = (dispatch) => ({
  displayErrors: (data) => dispatch(displayErrorsAction(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedMiddleware(CreateTrainingPage));
