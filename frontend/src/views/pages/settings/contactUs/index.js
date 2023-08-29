import { Images } from "config/images";
import { Fragment } from "react";
import ContactListItem from "views/components/screenComponents/settings/contactUs/contactListItem";
const { emailUsIcon, callUsIcon } = Images;
const contactUsArray = [
  {
    label: "Send Us A Mail",
    description: `Lorem ipsum dolor sit amet consectetur. Fames elit justo vitae adipiscing sem. Purus eget ut aliquet dui justo adipiscing. Facilisis fermentum morbi pharetra facilisis et pretium. `,
    buttonContent: {
      icon: emailUsIcon,
      text: "Email Us",
    },
  },
  {
    label: "Call us via Phone",
    description: `Lorem ipsum dolor sit amet consectetur. Fames elit justo vitae adipiscing sem. Purus eget ut aliquet dui justo adipiscing. Facilisis fermentum morbi pharetra facilisis et pretium. `,
    buttonContent: {
      icon: callUsIcon,
      text: "Call Us",
    },
  },
];
const ContactUs = () => {
  return (
    <Fragment>
      <div className="py-4">
        <div className="mx-auto xl:grid xl:grid-cols-7 px-3 sm:px-6 lg:gap-8 lg:px-8">
          <div className="col-span-5">
            <div>
              <div className="xl:space-y-0 space-y-10">
                <aside className="xl:hidden"></aside>
                <div className="bg-white px-4 rounded-2xl min-h-screen">
                  <div className="pb-5 pt-10 flex w-full justify-between items-center flex-wrap">
                    <div>
                      <span className="text-[#2A2A2A] font-openSans_bold text-[24px]">
                        Contact Us
                      </span>
                    </div>
                  </div>
                  <div className="h-1 bg-c_FD6769 w-full rounded-full"></div>
                  <div className="py-10 space-y-5 divide-y divide-[#E6F4F6]">
                    {contactUsArray?.map((item) => (
                      <ContactListItem item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <aside className="hidden xl:block col-span-2"></aside>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactUs;
