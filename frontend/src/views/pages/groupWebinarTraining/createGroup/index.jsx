import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AsyncPaginate } from "react-select-async-paginate";
import CustomEditor from "components/shared/editor";
import { Images } from "config/images";
import PageLayout from "views/layouts/page";
import ImageFormPreview from "views/components/shared/form-elements/imageFormPreview";
import { displayErrorsAction } from "redux/actions/commonActions";
import Input from "views/components/shared/form-elements/input";
import InputError from "views/components/shared/form-elements/inputError";
import Button from "views/components/shared/form-elements/button";
import { useForm, Controller } from "react-hook-form";
import useFormHandler from "shared/hooks/useFormHandler";
import TopicService from "services/topic.service";
import GroupService from "services/group.service";
import { toast } from "react-toastify";
import ProtectedMiddleware from "middleware/protectedMiddleware";

const CreateGroups = (props) => {
  const { uploadImageIcon } = Images;

  const [image, setImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [about, setAbout] = useState(null);
  const [title, setTitle] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [bannerImageName, setBannerImageName] = useState(null);

  const [selectedTags, setSelectedTags] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: title ? { title } : {},
  });
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

  const handleTitleChange = (event) => {
    if (event.target.value.length > 0) {
      setTitle(event.target.value);
    } else {
      setTitle(null);
    }
    handleChange(event);
  };

  const handleBannerImageFileSelected = (event) => {
    if (event.target.files && event.target.files[0]) {
      setBannerImage(URL.createObjectURL(event.target.files[0]));
      setBannerImageName(event.target.files[0].name);
    } else {
      setBannerImage(null);
      setBannerImageName(null);
    }
    handleChange(event);
  };
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
      console.log(about);
      const formData = new FormData();
      formData.append("about", about);
      formData.append(
        "tags",
        selectedTags.map((option) => option.value)
      );
      formData.append("title", title);
      if (data.coverImage?.[0])
        formData.append("coverImage", data.coverImage?.[0]);
      if (data.bannerImage?.[0])
        formData.append("bannerImage", data.bannerImage?.[0]);

      await GroupService.addGroup(props.token, formData)
        .then((response) => {
          navigate(`/groups/${response.data?.data?.group?._id}`);
        })
        .catch((error) => {
          props.displayErrors(error);
        });
      setLoading(false);
    } else toast.error("Content is required");
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="">
        <Input
          className="bg-[#F5F5F5] px-[15px] py-[10px] rounded-md text-[#949494] text-[26px] font-openSans_bold w-full outline-none"
          placeholder="Give Your Group A Name"
          value={title}
          register={{
            ...register("title", {
              onChange: handleTitleChange,
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
      <div className="flex md:flex-row gap-3  md:items-center flex-col">
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
                onChange: handleImageFileSelected,
              }),
            }}
          />
        </div>
        <div className="relative w-fit my-3">
          <label
            title="Click to upload"
            for="uploadBannerImage"
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
                Set Banner Photo
              </span>
            </div>
          </label>
          <Input
            hidden="true"
            type="file"
            name="uploadBannerImage"
            id="uploadBannerImage"
            register={{
              ...register("bannerImage", {
                onChange: handleBannerImageFileSelected,
              }),
            }}
          />
        </div>
      </div>
      {bannerImage && (
        <div>
          <ImageFormPreview
            imageName={bannerImageName}
            setImage={setBannerImage}
            image={bannerImage}
          />
        </div>
      )}
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
          Add or change tags (up to 5) so readers know what your story is about
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
        <InputError error={errors.tags?.message || props.common.errors?.tags} />
      </div>
      <div className="flex w-full items-center mt-[15px] flex-row gap-8 flex-wrap">
        <Button
          type="submit"
          disabled={loading}
          isLoading={loading}
          className="inline-flex justify-center items-center rounded-md bg-c_0493A3 py-[8px] px-[40px] text-[16px] font-openSans_bold text-white focus-visible:outline-none hover:brightness-110 min-h-[44px] space-x-2"
          text="Create Group"
        />
      </div>
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
      <div className="space-y-5 p-10 rounded-xl bg-white">
        <CreateGroups {...props} />
      </div>
    </main>
    <Right />
  </div>
);
function CreateGroupsPage(props) {
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
)(ProtectedMiddleware(CreateGroupsPage));
