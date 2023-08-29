import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "views/components/shared/form-elements/input";
import InputError from "views/components/shared/form-elements/inputError";
import Button from "views/components/shared/form-elements/button";
import { useForm, Controller } from "react-hook-form";
import CustomEditor from "components/shared/editor";
import useFormHandler from "shared/hooks/useFormHandler";
import { useState } from "react";
import { Images } from "../../../config/images";
import Post from "./Post";
import PreviewPost from "./PreviewPost";
import PageLayout from "views/layouts/page";
import ImageFormPreview from "views/components/shared/form-elements/imageFormPreview";
import PostService from "services/post.service";
import { toast } from "react-toastify";
import { displayErrorsAction } from "redux/actions/commonActions";
import TopicService from "services/topic.service";
import GroupService from "services/group.service";
import { AsyncPaginate } from "react-select-async-paginate";
import ProtectedMiddleware from "middleware/protectedMiddleware";
import VideoFormPreview from "views/components/shared/form-elements/VideoFormPreview";

const { uploadImageIcon } = Images;
const AddPost = (props) => {
  const location = useLocation();
  const stateTitle = location?.state?.title;
  const stateGroup = location?.state?.group;
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [content, setContent] = useState(null);
  const [filetype, setFileType] = useState(null);
  const [title, setTitle] = useState(stateTitle || null);
  const [imageName, setImageName] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [groups, setGroups] = useState(stateGroup || []);
  const [selectedTags, setSelectedTags] = useState([]);

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

  const handleFileSelected = (event) => {
    if (event.target.files && event.target.files[0].type.startsWith("image/")) {
      setFileType("image");
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageName(event.target.files[0].name);
    } else if (
      event.target.files &&
      event.target.files[0].type.startsWith("video/")
    ) {
      setFileType("video");
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

  const handlePreviewToggle = () => {
    setIsPreview(!isPreview);
    window.scrollTo(0, 0);
  };

  const handleGroupChange = (newValue) => {
    setGroups(newValue);
  };

  const handleOptionChange = (newValue) => {
    if (newValue.length <= 5) {
      setSelectedTags(newValue);
    } else {
      toast.error("You can only select upto 5 tags");
    }
  };

  const submitHandler = async (data) => {
    resetFormErrors();
    if (content?.length > 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append("content", content);
      formData.append(
        "tags",
        selectedTags.map((option) => option.value)
      );
      formData.append("title", title);
      if (data.coverImage?.[0])
        formData.append("coverImage", data.coverImage?.[0]);

      if (groups?.value) formData.append("groupid", groups.value);

      formData.append("filetype", filetype);

      await PostService.addPost(props.token, formData)
        .then((response) => {
          navigate(`/${response.data?.data?.post?._id}`);
        })
        .catch((error) => {
          props.displayErrors(error);
        });
      setLoading(false);
    } else toast.error("Content is required");
  };
  async function loadOptions(search, loadedOptions) {
    const response = await TopicService.options(props.token, search);

    return {
      options: response.data.data.options.results,
      hasMore: false,
    };
  }

  async function loadGroupOptions(search, loadedOptions) {
    const response = await GroupService.options(props.token, search);

    return {
      options: response.data.data.options.results,
      hasMore: false,
    };
  }
  return (
    <section>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={`bg-white rounded-2xl px-[40px] py-[30px] flex flex-col gap-4 ${
          isPreview ? "hidden" : "block"
        }`}
      >
        <div className="">
          <Input
            className="bg-[#F5F5F5] px-[15px] py-[10px] rounded-md text-[#949494] text-[26px] font-openSans_bold w-full outline-none"
            placeholder="Give Your Post A Title"
            name="title"
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
        <div
          className={`flex flex-row gap-3  items-center ${image ? "" : "pb-6"}`}
        >
          <div className="relative w-fit my-3">
            <label
              title="Click to upload"
              for="uploadPostCoverImage"
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
                  file attachment
                </span>
              </div>
            </label>
            <Input
              hidden="true"
              type="file"
              name="uploadPostCoverImage"
              id="uploadPostCoverImage"
              accept="image/*, video/*"
              register={{
                ...register("coverImage", {
                  onChange: handleFileSelected,
                }),
              }}
            />
          </div>
        </div>
        <div>
          <Controller
            name="group"
            control={control}
            render={({ field }) => (
              <AsyncPaginate
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleGroupChange(e);
                }}
                loadOptions={loadGroupOptions}
                value={groups}
              />
            )}
          />
          <InputError
            error={errors.group?.message || props.common.errors?.group}
          />
        </div>
        {image && filetype === "image" && (
          <div>
            <ImageFormPreview
              imageName={imageName}
              setImage={setImage}
              image={image}
            />
            <div className="pb-5 pt-3">
              <img
                src={image}
                alt="preview post cover"
                className="w-full h-[340px] object-cover rounded-lg"
              />
            </div>
          </div>
        )}
        {image && filetype === "video" && (
          <div>
            <VideoFormPreview
              imageName={imageName}
              setImage={setImage}
              image={image}
            />
            <div className="pb-5 pt-3">
              <video
                src={image}
                controls
                className="w-full h-[340px] object-cover rounded-lg"
              ></video>
            </div>
          </div>
        )}
        <div className="w-full mt-4">
          <CustomEditor
            value={content}
            setValue={setContent}
            placeholder="Write all the informations you want people to know.... "
          />
          <InputError
            error={errors.content?.message || props.common.errors?.content}
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
        <div className="flex w-full items-center mt-[15px] flex-row gap-8 flex-wrap">
          <Button
            disabled={loading}
            isLoading={loading}
            type="submit"
            className="inline-flex justify-center items-center rounded-md bg-c_0493A3 py-[8px] px-[40px] text-[16px] font-openSans_bold text-white focus-visible:outline-none hover:brightness-110 min-h-[44px] space-x-2"
          >
            <span>Upload Post</span>
          </Button>
          <div onClick={handlePreviewToggle} className="cursor-pointer">
            <PreviewPost />
          </div>
        </div>
      </form>

      <div className={`bg-white rounded-2xl ${isPreview ? "" : "hidden"}`}>
        <div className="p-10 flex flex-row flex-wrap gap-4 items-center">
          <div onClick={handlePreviewToggle} className="cursor-pointer">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 10H4M4 10L8.66667 5M4 10L8.66667 15"
                stroke="#515165"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <PreviewPost />
        </div>
        <Post
          postDetails={{
            coverImage: image,
            title: title,
            tags: selectedTags,
            content: content,
          }}
        />
      </div>
    </section>
  );
};

const Right = () => <aside className="hidden xl:col-span-3 xl:block"></aside>;
const Left = () => (
  <div className="hidden lg:col-span-3 lg:block xl:col-span-2 "></div>
);
const Center = (props) => (
  <div className="mx-auto xl:grid xl:grid-cols-7 px-3 lg:px-4 lg:gap-8">
    <main className="lg:col-span-5 xl:col-span-5">
      <div className="space-y-5">
        <AddPost {...props} />
      </div>
    </main>
    <Right />
  </div>
);
function AddPostPage(props) {
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
)(ProtectedMiddleware(AddPostPage));
