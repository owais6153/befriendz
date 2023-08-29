import { RadioGroup } from "@headlessui/react";
import { Images } from "config/images";
import { APP_CONSTANT } from "constants/app.constant";
import React from "react";
import Button from "views/components/shared/form-elements/button";
import Input from "views/components/shared/form-elements/input";
import InputFile from "views/components/shared/form-elements/inputFile";
import Textarea from "views/components/shared/form-elements/textarea";
const { arrowRightIcon } = Images;
const ManageAdForm = () => {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl bg-white space-y-5   pt-5 pb-10">
        <div className="px-5">
          <div className="flex space-x-2 items-center">
            <span className="text-[#515165] font-openSans_bold text-[16px] leading-none">
              Manage Ads
            </span>
            <span>
              <img src={arrowRightIcon.default} />
            </span>
          </div>
        </div>
        <div className="">
          <form className="space-y-5">
            <div>
              <InputFile
                type="file"
                name="profileImage"
                accept="image/*"
                labelClass="blue"
                size="w-full h-40 rounded-0"
                imageRadius="rounded-0"
                register={{
                  ...("profileImage",
                  {
                    onChange: () => {},
                    validate: {
                      acceptedFormats: (files) => {
                        return (
                          files,
                          APP_CONSTANT.FILE.EXT.IMAGE,
                          "Only PNG, JPEG and GIF are allowed"
                        );
                      },

                      lessThan10MB: (files) => (
                        files, APP_CONSTANT.FILE.SIZE["10MB"], "Max 10MB"
                      ),
                    },
                  }),
                }}
                // error={
                //   props.common.errors?.profileImage ||
                //   errors.profileImage?.message
                // }
              />
            </div>
            <div className="flex flex-col gap-4 px-5">
              <div className="">
                <Input
                  type="text"
                  label="Title"
                  name="Title"
                  placeholder="Instagram"
                  inputClass="min-h-[50px] text-[14px] placeholder:text-[14px]"
                />
              </div>
              <div className="">
                <Input
                  type="text"
                  label="Primary Text"
                  name="Primary Text"
                  placeholder="Type here..."
                  inputClass="min-h-[50px] text-[14px] placeholder:text-[14px]"
                />
              </div>
              <div className="">
                <Textarea
                  type="text"
                  label="Description"
                  name="Description"
                  placeholder="Write your text here"
                  inputClass="min-h-[173px] text-[14px] placeholder:text-[14px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>Description</div>
                <div>
                  <input
                    type="radio"
                    id="Website"
                    name="fav_language"
                    value="Website"
                  />{" "}
                  <label for="Website" className="text-[#949494] ml-2">
                    Website
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Befriendz"
                    name="fav_language"
                    value="Befriendz"
                  />{" "}
                  <label for="Befriendz" className="text-[#949494] ml-2">
                    Befriendz
                  </label>
                </div>
              </div>
              <div className=""></div>
              <div className="">
                <Input
                  type="text"
                  label="Website URL"
                  name="Website URL"
                  placeholder="www.befriendz.com"
                  inputClass="min-h-[50px] text-[14px] placeholder:text-[14px]"
                />
              </div>

              <div className="">
                <Input
                  type="text"
                  label="Other Links"
                  name="Other Links"
                  placeholder="www.befriendz.com"
                  inputClass="min-h-[50px] text-[14px] placeholder:text-[14px]"
                />
              </div>

              <div className="">
                <Button
                  text={"Update Ads"}
                  className="min-h-[50px] text-[16px]"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="rounded-2xl bg-white space-y-5  px-5 pt-5 pb-10">
        <div>
          <div className="flex space-x-2 items-center">
            <span className="text-[#515165] font-openSans_bold text-[16px] leading-none">
              Customize Audience
            </span>
            <span>
              <img src={arrowRightIcon.default} />
            </span>
          </div>
        </div>
        <div className="">
          <form className="space-y-5">
            <div className="">
              <Input
                type="text"
                label="Location"
                name="Location"
                placeholder="USA, Canada"
                inputClass="min-h-[50px] text-[14px] placeholder:text-[14px]"
              />
            </div>
            <div className="">
              <Input
                type="text"
                label="Age"
                name="Age"
                placeholder="20-65"
                inputClass="min-h-[50px] text-[14px] placeholder:text-[14px]"
              />
            </div>

            <div className="">
              <Input
                type="text"
                label="Gender"
                name="Gender"
                placeholder="All"
                inputClass="min-h-[50px] text-[14px] placeholder:text-[14px]"
              />
            </div>

            <div className="">
              <Input
                type="text"
                label="Language"
                name="Language"
                placeholder="www.befriendz.com"
                inputClass="min-h-[50px] text-[14px] placeholder:text-[14px]"
              />
            </div>

            <div className="">
              <Button text={"Update"} className="min-h-[50px] text-[16px]" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ManageAdForm;
