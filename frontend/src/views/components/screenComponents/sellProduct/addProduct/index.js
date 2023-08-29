import CustomEditor from "components/shared/editor";
import { Images } from "config/images";
import React, { useState } from "react";

const { uploadImageIcon } = Images;
const AddProduct = () => {
  const [image, setImage] = useState(null);
  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    setImage(files[0]);
    console.log("files:", files[0].name);
  };
  return (
    <section>
      <div className="bg-white rounded-2xl px-[40px] py-[30px] flex flex-col gap-4">
        <div className="">
          <input
            className="bg-[#F5F5F5] px-[15px] py-[10px] rounded-md text-[#949494] text-[26px] font-openSans_bold w-full outline-none"
            placeholder="Name of the Product"
          />
        </div>
        <div className="flex flex-row gap-3  items-center pb-6">
          <div className="relative w-fit my-3">
            <label
              title="Click to upload"
              for="uploadProductImage"
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
                  Upload Photo of product
                </span>
              </div>
            </label>
            <input
              hidden="true"
              type="file"
              onChange={handleFileSelected}
              name="uploadProductImage"
              id="uploadProductImage"
            />
          </div>
          {image && <div>{image.name}</div>}
        </div>
        <div className="w-full ">
          <CustomEditor placeholder="Write a product description here" />
        </div>
        <div className="w-full mt-[15px]">
          <label className="text-[#2A2A2A] text-[16px] font-openSans_regular">
            Set Price
          </label>
          <input
            className="bg-[#F5F5F5] min-h-[60px] w-full border-b border-[#949494] rounded-t-3xl text-[#949494] focus:outline-none px-[20px]"
            placeholder="$100.00"
          />
        </div>
        <div className="flex w-full justify-between items-center mt-[15px]">
          <button
            type="button"
            className="inline-flex justify-center items-center rounded-md bg-c_0493A3 py-[8px] px-[30px] text-[16px] font-openSans_bold text-white focus-visible:outline-none hover:brightness-110 min-h-[44px] space-x-2"
          >
            <span>Upload Product</span>
          </button>
          <span className="text-[#949494] font-openSans_regular text-[16px]">
            Cancel
          </span>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
