import React from "react";
import { connect } from "react-redux";
import UserAvatarNamePostType from "../userAvatarNamePostType";
import { Images } from "config/images";
import PostComment from "../postComment.js";
import PostStats from "../postStats";
import PostTags from "../postTags";
import { Link } from "react-router-dom";
import { removeHTMLAndLimitString } from "shared/helper";
const { likeIcon } = Images;


const PostInner = ({post, isShared, auth}) => {
  return (
    <>
      <div className="flex w-full justify-between items-center flex-wrap gap-2">
        <div>
          <UserAvatarNamePostType post={post} />
        </div>
        <div>
          <PostTags tags={post.tags || []} />
        </div>
      </div>

      <div>
        <div className="">
          <div>
            <span className="text-[#515165] text-[18px] font-openSans_bold">
              {post.title}
            </span>
          </div>
          <div>
            {post.content ? (
              <span className="text-[#949494] text-[14px] font-openSans_regular font-medium">
                {removeHTMLAndLimitString(post.content)?.length > 218 ? (
                  <>
                    {removeHTMLAndLimitString(post.content, 218)}...{" "}
                    <span className="text-[#0493A3] font-openSans_semiBold ">
                      READ MORE
                    </span>
                  </>
                ) : (
                  removeHTMLAndLimitString(post.content)
                )}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div>
        {post.fileType === "image" && post.coverImage ? (
          <div className="relative">
            <div>
              <img
                className="w-full rounded-[8px] max-h-[402px] object-cover object-top"
                src={post.coverImage}
                alt={post.title}
              />
            </div>
          </div>
        ) : null}
        {post.fileType === "video" && post.coverImage ? (
          <div>
            <video
              className="w-full max-h-[402px] rounded-[8px] object-cover object-top"
              src={post.coverImage}
              alt={post.title}
              controls
            />
          </div>
        ) : (
          <div style={{ height: "20px" }}></div>
        )}
      </div>
      <PostStats post={post} />
      {auth.isLoggedIn ? (
        <div onClick={(e) => e.preventDefault()}>
          <PostComment post={post._id} />
        </div>
      ) : null}
    </>
  );
};



const Post1 = ({post, auth}) => {
  return (
    <Link
      to={`/${!!post.sharedPost ? post.sharedPost?._id : post._id}`}
      className="block"
    >
      {!!post.sharedPost ? (
        <article className="relative isolate flex flex-col gap-5 bg-[#FEE8E8] rounded-t-2xl p-4 cursor-pointer">
          <UserAvatarNamePostType post={post} isShared={true} />
        </article>
      ) : null}
      <article
        className={`relative isolate flex flex-col gap-5 bg-white py-4 cursor-pointer ${
          !!post.sharedPost ? "px-10 rounded-b-2xl" : "rounded-2xl px-4"
        }`}
      >
        <PostInner
          auth={auth}
          post={post.sharedPost ? post.sharedPost : post}
          isShared={!!post.isShared}
        />
      </article>
    </Link>
  );
};



const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Post1);
