import React from "react";
import ReactQuill from "react-quill";
import { Images } from "../../../config/images";
const { startIcon } = Images;

const Post = (props) => {
  const { postDetails } = props;

  return (
    <section>
      <div>           
         {postDetails.coverImage ?             <div>
              <img src={postDetails.coverImage}className="h-[273px] w-full object-cover object-top rounded-t-2xl"  alt="preview post cover"/>
            </div> : null}

        <div className="p-[15px]">
          <div className="flex">
            {/* <div className="p-2 md:p-5 flex justify-center items-start">
              <img src={startIcon.default} className="mt-[10px]" />
            </div> */}
            <div className="w-full">
              <div>
                <h1 className="text-[26px] font-openSans_bold text-[#515165]">
                  {postDetails.title}
                </h1>
              </div>
              <div className="flex space-x-5 mt-[15px]">
                {postDetails.tags?.map((item) => (
                  <span className="font-openSans_regular text-[#FD6769] text-[16px]">
                    #{item?.label ? item.label : item.name}
                  </span>
                ))}
              </div>
              <ReactQuill
                value={postDetails.content}
                readOnly={true}
                theme={"bubble"}
              />
              {/* {postDetails.content} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
