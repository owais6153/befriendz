import React from "react";
import { USER_TYPE } from "constants/user.constant";
import { Link } from "react-router-dom";


const MorePost = ({ relatedPosts, author }) => {
  return (
    <>
      {relatedPosts?.length > 0 ? <section className="space-y-5">
        <div className="rounded-2xl bg-white">
          <div className="p-5 divide-y divide-[#F5F5F5]">
            <div className="pb-3">
              <span className="text-[#515165] text-[16px] font-openSans_semiBold">
                More posts from {author?.type === USER_TYPE?.PERSONAL
                  ? `${author?.first_name} ${author?.last_name}`
                  : author?.business_name}
              </span>
            </div>
            {relatedPosts?.map((item) => (
              <Link to={`/${item._id}`}>
                <div className="py-3">
                  <div>
                    <span className="text-[12px] font-openSans_semiBold">
                      {item.title}
                    </span>
                  </div>
                  <div>
                    {item.tags?.length > 0 ?
                      <span className="text-[#949494] text-[12px] font-openSans_semiBold">
                        {item.tags?.map(tag=>`#${tag.name} `)}
                      </span>
                    : null }

                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> : null}
    </>
  );
};

export default MorePost;
