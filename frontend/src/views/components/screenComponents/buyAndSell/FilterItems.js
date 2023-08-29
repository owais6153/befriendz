import React, { useState } from "react";
import DisclosureWrapper from "./DisclosureWrapper";
import { Images } from "config/images";
import CustomGreenCheckbox from "../../../components/shared/CustomGreenCheckbox";
import CategoryGroupCheckbox from "./CategoryGroupCheckbox";
import PriceInput from "./PriceInput";

const { minimizeIcon, maximizeArrow } = Images;
const FilterHeader = (props) => {
  const { title } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="text-[14px] font-openSans_semiBold text-c_515165 flex flex-row items-center justify-between w-full"
      >
        <div>{title}</div>
        <div className="w-[14px]">
          <img src={!isOpen ? minimizeIcon.default : maximizeArrow.default} />
        </div>
      </div>
    </>
  );
};

const SortLabels = ["Newest", "Popular", "Relevance", "Friends"];
const SortInputs = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        {SortLabels.map((label, index) => {
          return (
            <div className="flex flex-row items-center ">
              <CustomGreenCheckbox label={label}>
                <div className="ml-2 select-none">{label}</div>
              </CustomGreenCheckbox>
            </div>
          );
        })}
      </div>
    </>
  );
};

function CategoryFilter({ options, name }) {
  return (
    <>
      <div className="flex flex-row flex-wrap gap-2">
        {options.map((option, index) => {
          return (
            <>
              <CategoryGroupCheckbox option={option} index={index} />
            </>
          );
        })}
      </div>
    </>
  );
}
const categories = [
  "Beauty",
  "Office",
  "Laptops",
  "Baby Items",
  "Games",
  "Fashion",
  "Home",
  "Electronics",
  "Phones & Tablets",
];
const FilterItems = () => {
  return (
    <section>
      <div className="rounded-2xl bg-white flex items-center flex-col space-y-3 p-4">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="text-md font-openSans_semiBold text-[#515165]">
            Filter By
          </div>
          <div>
            <span className="cursor-pointer text-[12px] font-openSans_semiBold text-c_0493A3">
              Clear
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          <DisclosureWrapper header={<FilterHeader title={"Sort By"} />}>
            <SortInputs />
          </DisclosureWrapper>
          <div className="bg-[#E6F4F6] h-[1px] w-full " />
          <DisclosureWrapper header={<FilterHeader title={"Price"} />}>
            <PriceInput />
          </DisclosureWrapper>
          <div className="bg-[#E6F4F6] h-[1px] w-full " />
          <DisclosureWrapper header={<FilterHeader title={"Category"} />}>
            <CategoryFilter options={categories} name={"category"} />
          </DisclosureWrapper>
        </div>
      </div>
    </section>
  );
};

export default FilterItems;
