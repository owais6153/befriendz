import { Images } from "config/images";
import React from "react";

const { likeIcon } = Images;
const Post = ({ post }) => {
  return (
    <article className="relative isolate flex flex-col gap-5 lg:flex-row bg-white rounded-2xl p-6">
      <div className="absolute top-6 right-4 cursor-pointer">
        <img src={likeIcon.default} />
      </div>
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-[156px] lg:h-full lg:shrink-0 w-11/12">
        <img
          src={post?.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <div className="group relative max-w-xl">
          <h3 className="mt-2 w-11/12 text-[18px] text-dark font-openSans_bold">
            <span className="">
              <span className="absolute inset-0 " />
              <span style={{ width: "95%" }}>
                Ultimate Guide For Beginners looking to play guitar like a Pro
                in 6 weeks
              </span>
            </span>
          </h3>
        </div>
        <div className="flex items-center gap-x-3 mt-3">
          {[1, 2]?.map((item) => (
            <span className="rounded-full bg-c_F5F5F5 py-2 px-3.5 font-openSans_semiBold text-c_515165 text-[8px]">
              {post?.category.title}
            </span>
          ))}
        </div>
        <div className="mt-3 flex justify-between items-start">
          <div className="relative flex items-center gap-x-3">
            <img
              src={post?.author.imageUrl}
              alt=""
              className="h-[40px] w-[40px] rounded-full"
            />
            <div>
              <div>
                <div className="leading-[2px] text-[14px] font-openSans_semiBold text-c_515165 space-x-3">
                  <span>Ryan Bass</span>
                  <span className="text-c_FD6769">Music</span>
                </div>
                <span className="font-openSans_regular text-c_949494 text-[10px]">
                  3 weeks ago
                </span>
              </div>
            </div>
            {/* <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <span className="absolute inset-0 text-[140px]" />
                {post?.author.name}
              </p>
              <p className="text-gray-600">{post?.author.role}</p>
            </div> */}
          </div>
          <div className="flex justify-end items-center gap-x-3">
            <div>
              <span className="font-openSans_regular text-c_949494 text-[12px]">
                651,324 Views
              </span>
            </div>
            <div>
              <span className="font-openSans_regular text-c_949494 text-[12px]">
                36,6545 Likes
              </span>
            </div>
            <div>
              <span className="font-openSans_regular text-c_949494 text-[12px]">
                56 comments
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
