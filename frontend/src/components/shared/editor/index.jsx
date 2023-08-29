import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css";

const CustomEditor = ({ value = "", setValue, placeholder }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "link",
    "image",
    "list",
    "bullet",
    "indent",
    "align",
  ];
  return (
    <div className="w-full text-dark rounded-xl border border-x-c_F5F5F5 overflow-hidden">
      <div className="flex flex-row gap-2 items-center text-c_515165 px-4 pt-3 text-md font-openSans_bold bg-c_F5F5F5 ">
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.1187 4.53734L19.4681 2.88672V2.88691C18.9005 2.3191 18.1306 2 17.3278 2C16.5252 2 15.7553 2.31911 15.1877 2.88691L2.87218 15.2C2.74573 15.333 2.66744 15.5043 2.6494 15.6868L2.00565 21.0785C1.97802 21.3136 2.05266 21.549 2.21058 21.7254C2.36831 21.9015 2.59435 22.0017 2.83095 22H2.92728L8.31604 21.3535C8.50025 21.3316 8.6718 21.2484 8.80286 21.1171L21.1184 8.81531C21.6852 8.2479 22.0038 7.47863 22.0038 6.67656C22.0038 5.87448 21.6852 5.10502 21.1184 4.53761L21.1187 4.53734ZM7.84036 19.761L3.76621 20.2368L4.24209 16.1627L13.4546 6.95023L17.0528 10.5485L7.84036 19.761ZM19.9442 7.65713L18.2194 9.37912L14.624 5.78378L16.3545 4.05333C16.6124 3.79563 16.9622 3.65076 17.3267 3.65076C17.6915 3.65076 18.0413 3.79563 18.2992 4.05333L19.9499 5.70396C20.2079 5.96147 20.3534 6.31107 20.354 6.67585C20.3543 7.04043 20.21 7.39044 19.9525 7.64873L19.9442 7.65713Z"
              fill="#515165"
            />
          </svg>
        </div>
        <div>About</div>
      </div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        formats={formats}
        placeholder={placeholder}
        modules={modules}
        className="text-dark min-h-[300px]  overflow-hidden"
      />
    </div>
  );
};

export default CustomEditor;
