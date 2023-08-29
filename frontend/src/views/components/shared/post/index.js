import React from "react"; 
import { Images } from "config/images";
import { Link } from "react-router-dom";
import { USER_TYPE } from "constants/user.constant";

const { likeIcon } = Images;
const Post = ({ post }) => {

  return (
    <Link to={`/${post._id}`} className="block">
    <article
      className="relative isolate flex flex-col gap-5 lg:flex-row bg-white rounded-2xl p-4 cursor-pointer"
    >
      <div className="absolute top-6 right-4 cursor-pointer p-1 z-10">
        <img src={likeIcon.default} alt="like"/>
      </div>
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-[156px] lg:h-full lg:shrink-0 w-12/12">
        <img
          src={
            post.coverImage
          }
          alt={post.title}
          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
        />
        <div className="absolute inset-0 rounded-2xl" />
      </div>
      <div className="w-[100%] flex flex-col justify-around">
        <div className="group relative">
          <h3 className="mt-2 w-11/12 text-[18px] text-dark font-openSans_bold">
            <span className="">
              <span className="absolute inset-0 " />
              <span style={{ width: "95%" }}>
                {post.title}
              </span>
            </span>
          </h3>
        </div>

          {post?.topics?.length > 0 ? 
        <div className="flex items-center gap-x-3 mt-3">
          {post?.topics?.map((item) => (
            <span className="rounded-2xl bg-c_F5F5F5 py-2 px-4 font-openSans_semiBold text-c_515165 text-[8px]">
              {item.name}
            </span>
          ))}
        </div>: null}
        <div className="mt-3 flex flex-wrap justify-between items-start ">
          <div className="relative flex items-center gap-x-3">
            <img
              src={post.author.profileImage}
              alt={post.author.username}
              title={post.author.username}
              className="h-[40px] w-[40px] rounded-full"
            />
            <div>
              <div>
                <div className="leading-[2px] text-[14px] font-openSans_semiBold text-c_515165 space-x-3">
                  <span>
                    {post.author?.type === USER_TYPE?.PERSONAL
                ? `${post.author?.first_name} ${post.author?.last_name}`
                : post.author?.business_name}
                </span>
                {/* <span className="text-c_FD6769">Music</span> */}
                </div>
                <span className="font-openSans_regular text-c_949494 text-[10px]">
                  {post.createdAt}
                </span>
              </div>
            </div>
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
    </Link>
  );
};

export default Post;
