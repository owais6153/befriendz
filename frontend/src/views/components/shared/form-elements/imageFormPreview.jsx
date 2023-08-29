import React from "react";

const ImageFormPreview = (props) => {
  const { image, imageName, setImage } = props;
  return (
    <div className="text-[#2A2A2A] my-4 text-sm font-semibold flex flex-row gap-2 items-center">
      <div>
        <img
          src={image}
          alt="preview cover image"
          className="rounded-full h-10 w-10 object-cover"
        />
      </div>
      <div className="truncate max-w-[70vw] overflow-hidden">{imageName}</div>
      <div onClick={() => setImage(null)} className="cursor-pointer">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.1786 10L13.8311 12.6525C14.156 12.9776 14.1579 13.5025 13.8302 13.8303C13.5048 14.1556 12.9773 14.1557 12.6525 13.8311L9.99998 11.1786L7.34748 13.8311C7.02243 14.156 6.49745 14.158 6.16973 13.8303C5.8444 13.5048 5.84426 12.9773 6.1689 12.6525L8.8214 10L6.1689 7.3475C5.84398 7.02244 5.84203 6.49746 6.16973 6.16975C6.49521 5.84441 7.0227 5.84428 7.34748 6.16891L9.99998 8.82141L12.6525 6.16891C12.9775 5.844 13.5025 5.84205 13.8302 6.16975C14.1556 6.49523 14.1557 7.02271 13.8311 7.3475L11.1786 10ZM10 20C4.47714 20 0 15.5229 0 10C0 4.47714 4.47714 0 10 0C15.5229 0 20 4.47714 20 10C20 15.5229 15.5229 20 10 20ZM10 18.3333C14.6025 18.3333 18.3332 14.6026 18.3332 10.0001C18.3332 5.39757 14.6025 1.66686 10 1.66686C5.3975 1.66686 1.66679 5.39757 1.66679 10.0001C1.66679 14.6026 5.3975 18.3333 10 18.3333Z"
            fill="#949494"
          />
        </svg>
      </div>
    </div>
  );
};

export default ImageFormPreview;
