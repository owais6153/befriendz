import React from "react";

const PostTags = ({ postType = 1, tags }) => {
  return (
    <div>
        <div className="flex gap-2 flex-wrap">
          {tags.slice(0, 3).map((item) => (
            <div className="bg-[#FD6769] rounded-full md:px-4 px-2 py-1  flex items-center">
              <span className="text-[#F2F2F2] text-xs font-openSans_medium font-medium ">
                {item.name}
              </span>
            </div>
          ))}
          {tags.length > 3 && (
            <div className="bg-[#FD6769] rounded-full md:px-4 px-2 py-1  flex items-center">
              <span className="text-[#F2F2F2] text-xs font-openSans_medium font-medium">
                +{tags.length - 3} More
              </span>
            </div>
          )}
        </div>
    </div>
  );
};

export default PostTags;
