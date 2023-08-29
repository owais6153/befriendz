import { Fragment, useState } from "react";
import LegalDetailModal from "views/components/screenComponents/settings/legal/detailModal";
import ListItem from "views/components/screenComponents/settings/legal/listItem";

const legalArray = [
  {
    label: "About Befriendz",
    heading: "About Befriendz",
    subHeading: "Kindly read through the term of use",
    description: `Lorem ipsum dolor sit amet consectetur. Volutpat enim purus purus nunc adipiscing venenatis interdum ac nulla. Diam lorem adipiscing condimentum egestas non cras consequat amet. Tellus sed sed arcu ipsum eget massa orci. Laoreet aliquam ac cursus sapien sed et ut. Lacus arcu sed quam egestas ut. Vitae turpis netus dictumst in porta sed ultricies. Proin duis sed tortor aliquam mauris risus eu. Consectetur in tincidunt risus enim. Sit diam tellus ultrices erat molestie pretium. Rhoncus praesent sit tincidunt fusce arcu nunc consequat feugiat. Vel morbi in vestibulum venenatis nunc adipiscing. Cras elit donec nunc est arcu. Viverra morbi purus porta ultrices. Egestas molestie sapien orci sit arcu ligula porttitor aliquam.
Lacinia adipiscing neque cras aliquam est id aliquet arcu. Feugiat semper et pharetra suspendisse sollicitudin aliquet. Adipiscing nunc enim ornare lacus pellentesque vitae et enim diam. Dictumst tristique leo aliquet ipsum hac purus morbi lorem. Eget est penatibus mattis sit fusce faucibus. Consequat tincidunt egestas vitae aliquet sed morbi varius volutpat. Mauris diam mi platea non magnis volutpat. Vulputate pharetra suspendisse quis nec turpis dictum est venenatis faucibus. Vestibulum nunc scelerisque in ut non. Ac tincidunt ultricies ipsum leo. Velit at tristique nec porta nisi. Sit ultricies in tempor mauris condimentum dignissim. Fermentum volutpat neque etiam id nam.
Feugiat elit malesuada vulputate mattis risus. Nisl ut massa eget aliquet vitae mauris et bibendum. Sed proin diam vitae lobortis facilisi. Morbi quisque purus euismod elementum ridiculus est morbi at. Massa commodo tristique ac vitae dictum sed etiam nulla. Proin mauris dignissim viverra habitant morbi. Parturient sem consectetur consequat commodo varius praesent nunc facilisis varius. Tortor elementum viverra ornare diam morbi. Bibendum condimentum feugiat pulvinar bibendum enim odio. Pharetra fames egestas elit pellentesque. Pharetra at lectus in adipiscing diam. A aliquam ut convallis dolor malesuada sit tellus.
Platea neque maecenas vulputate tristique. Commodo dui eros consequat justo libero. Eros at tristique egestas risus suspendisse at. Ac at urna tortor eget quam nisi lorem risus. Mauris amet pharetra blandit risus imperdiet commodo.
Amet imperdiet viverra risus lobortis aliquam tincidunt egestas feugiat dui. Pretium egestas sem vel dictum aliquam in. Erat nisi amet facilisis tristique molestie egestas. Non suscipit volutpat fermentum tortor et aenean purus. Ultrices et elit proin in. Etiam non egestas turpis commodo orci feugiat erat a lacus. Id ultricies scelerisque eget congue nulla imperdiet mattis quis dui. Vitae pharetra vel pellentesque habitant rhoncus a.
    `,
  },
  {
    label: "Terms of Use",
    heading: "Terms of Use",
    subHeading: "Kindly read through the term of use",
    description: `Lorem ipsum dolor sit amet consectetur. Volutpat enim purus purus nunc adipiscing venenatis interdum ac nulla. Diam lorem adipiscing condimentum egestas non cras consequat amet. Tellus sed sed arcu ipsum eget massa orci. Laoreet aliquam ac cursus sapien sed et ut. Lacus arcu sed quam egestas ut. Vitae turpis netus dictumst in porta sed ultricies. Proin duis sed tortor aliquam mauris risus eu. Consectetur in tincidunt risus enim. Sit diam tellus ultrices erat molestie pretium. Rhoncus praesent sit tincidunt fusce arcu nunc consequat feugiat. Vel morbi in vestibulum venenatis nunc adipiscing. Cras elit donec nunc est arcu. Viverra morbi purus porta ultrices. Egestas molestie sapien orci sit arcu ligula porttitor aliquam.
Lacinia adipiscing neque cras aliquam est id aliquet arcu. Feugiat semper et pharetra suspendisse sollicitudin aliquet. Adipiscing nunc enim ornare lacus pellentesque vitae et enim diam. Dictumst tristique leo aliquet ipsum hac purus morbi lorem. Eget est penatibus mattis sit fusce faucibus. Consequat tincidunt egestas vitae aliquet sed morbi varius volutpat. Mauris diam mi platea non magnis volutpat. Vulputate pharetra suspendisse quis nec turpis dictum est venenatis faucibus. Vestibulum nunc scelerisque in ut non. Ac tincidunt ultricies ipsum leo. Velit at tristique nec porta nisi. Sit ultricies in tempor mauris condimentum dignissim. Fermentum volutpat neque etiam id nam.
Feugiat elit malesuada vulputate mattis risus. Nisl ut massa eget aliquet vitae mauris et bibendum. Sed proin diam vitae lobortis facilisi. Morbi quisque purus euismod elementum ridiculus est morbi at. Massa commodo tristique ac vitae dictum sed etiam nulla. Proin mauris dignissim viverra habitant morbi. Parturient sem consectetur consequat commodo varius praesent nunc facilisis varius. Tortor elementum viverra ornare diam morbi. Bibendum condimentum feugiat pulvinar bibendum enim odio. Pharetra fames egestas elit pellentesque. Pharetra at lectus in adipiscing diam. A aliquam ut convallis dolor malesuada sit tellus.
Platea neque maecenas vulputate tristique. Commodo dui eros consequat justo libero. Eros at tristique egestas risus suspendisse at. Ac at urna tortor eget quam nisi lorem risus. Mauris amet pharetra blandit risus imperdiet commodo.
Amet imperdiet viverra risus lobortis aliquam tincidunt egestas feugiat dui. Pretium egestas sem vel dictum aliquam in. Erat nisi amet facilisis tristique molestie egestas. Non suscipit volutpat fermentum tortor et aenean purus. Ultrices et elit proin in. Etiam non egestas turpis commodo orci feugiat erat a lacus. Id ultricies scelerisque eget congue nulla imperdiet mattis quis dui. Vitae pharetra vel pellentesque habitant rhoncus a.
    `,
  },
  {
    label: "Tsadasdsad Use",
    heading: "Terms of Use",
    subHeading: "Kindly read through the term of use",
    description: `Lorem ipsum dolor sit amet consectetur. Volutpat enim purus purus nunc adipiscing venenatis interdum ac nulla. Diam lorem adipiscing condimentum egestas non cras consequat amet. Tellus sed sed arcu ipsum eget massa orci. Laoreet aliquam ac cursus sapien sed et ut. Lacus arcu sed quam egestas ut. Vitae turpis netus dictumst in porta sed ultricies. Proin duis sed tortor aliquam mauris risus eu. Consectetur in tincidunt risus enim. Sit diam tellus ultrices erat molestie pretium. Rhoncus praesent sit tincidunt fusce arcu nunc consequat feugiat. Vel morbi in vestibulum venenatis nunc adipiscing. Cras elit donec nunc est arcu. Viverra morbi purus porta ultrices. Egestas molestie sapien orci sit arcu ligula porttitor aliquam.
Lacinia adipiscing neque cras aliquam est id aliquet arcu. Feugiat semper et pharetra suspendisse sollicitudin aliquet. Adipiscing nunc enim ornare lacus pellentesque vitae et enim diam. Dictumst tristique leo aliquet ipsum hac purus morbi lorem. Eget est penatibus mattis sit fusce faucibus. Consequat tincidunt egestas vitae aliquet sed morbi varius volutpat. Mauris diam mi platea non magnis volutpat. Vulputate pharetra suspendisse quis nec turpis dictum est venenatis faucibus. Vestibulum nunc scelerisque in ut non. Ac tincidunt ultricies ipsum leo. Velit at tristique nec porta nisi. Sit ultricies in tempor mauris condimentum dignissim. Fermentum volutpat neque etiam id nam.
Feugiat elit malesuada vulputate mattis risus. Nisl ut massa eget aliquet vitae mauris et bibendum. Sed proin diam vitae lobortis facilisi. Morbi quisque purus euismod elementum ridiculus est morbi at. Massa commodo tristique ac vitae dictum sed etiam nulla. Proin mauris dignissim viverra habitant morbi. Parturient sem consectetur consequat commodo varius praesent nunc facilisis varius. Tortor elementum viverra ornare diam morbi. Bibendum condimentum feugiat pulvinar bibendum enim odio. Pharetra fames egestas elit pellentesque. Pharetra at lectus in adipiscing diam. A aliquam ut convallis dolor malesuada sit tellus.
Platea neque maecenas vulputate tristique. Commodo dui eros consequat justo libero. Eros at tristique egestas risus suspendisse at. Ac at urna tortor eget quam nisi lorem risus. Mauris amet pharetra blandit risus imperdiet commodo.
Amet imperdiet viverra risus lobortis aliquam tincidunt egestas feugiat dui. Pretium egestas sem vel dictum aliquam in. Erat nisi amet facilisis tristique molestie egestas. Non suscipit volutpat fermentum tortor et aenean purus. Ultrices et elit proin in. Etiam non egestas turpis commodo orci feugiat erat a lacus. Id ultricies scelerisque eget congue nulla imperdiet mattis quis dui. Vitae pharetra vel pellentesque habitant rhoncus a.
    `,
  },
  {
    label: "Privacy Policy",
    heading: "Privacy Policy",
    subHeading: "Last updated June 11, 2023",
    description: `<p>This privacy policy for BEFRIENDZ LLC ("Company," "we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:
    <ul>
      <li>
      Visit our website at <a href="http://befriendz.com" >http://befriendz.com</a>, or any website of ours that links to this privacy policy
      </li>
      <li>
      Engage with us in other related ways, including any sales, marketing, or events
      </li>
    </ul>
    </p>
    <p>Questions or concerns? Reading this privacy policy will help you understand your privacy
rights and choices. If you do not agree with our policies and practices, please do not use our
Services. If you still have any questions or concerns, please contact us at
<a href="mailto:befriendsacrosstheworld@gmail.com">befriendsacrosstheworld@gmail.com</a> .</p>
<h3>SUMMARY OF KEY POINTS</h3>
<p>This summary provides key points from our privacy policy, but you can find out more
details about any of these topics by clicking the link following each key point or by
using our <a href="#table-of-content">table of contents</a> below to find the section you are looking for.</p>

`,
  },
  {
    label: "Cancellation Policy",
    heading: "Cancellation Policy",
    subHeading: "Kindly read through the term of use",
    description: `Lorem ipsum dolor sit amet consectetur. Volutpat enim purus purus nunc adipiscing venenatis interdum ac nulla. Diam lorem adipiscing condimentum egestas non cras consequat amet. Tellus sed sed arcu ipsum eget massa orci. Laoreet aliquam ac cursus sapien sed et ut. Lacus arcu sed quam egestas ut. Vitae turpis netus dictumst in porta sed ultricies. Proin duis sed tortor aliquam mauris risus eu. Consectetur in tincidunt risus enim. Sit diam tellus ultrices erat molestie pretium. Rhoncus praesent sit tincidunt fusce arcu nunc consequat feugiat. Vel morbi in vestibulum venenatis nunc adipiscing. Cras elit donec nunc est arcu. Viverra morbi purus porta ultrices. Egestas molestie sapien orci sit arcu ligula porttitor aliquam.
Lacinia adipiscing neque cras aliquam est id aliquet arcu. Feugiat semper et pharetra suspendisse sollicitudin aliquet. Adipiscing nunc enim ornare lacus pellentesque vitae et enim diam. Dictumst tristique leo aliquet ipsum hac purus morbi lorem. Eget est penatibus mattis sit fusce faucibus. Consequat tincidunt egestas vitae aliquet sed morbi varius volutpat. Mauris diam mi platea non magnis volutpat. Vulputate pharetra suspendisse quis nec turpis dictum est venenatis faucibus. Vestibulum nunc scelerisque in ut non. Ac tincidunt ultricies ipsum leo. Velit at tristique nec porta nisi. Sit ultricies in tempor mauris condimentum dignissim. Fermentum volutpat neque etiam id nam.
Feugiat elit malesuada vulputate mattis risus. Nisl ut massa eget aliquet vitae mauris et bibendum. Sed proin diam vitae lobortis facilisi. Morbi quisque purus euismod elementum ridiculus est morbi at. Massa commodo tristique ac vitae dictum sed etiam nulla. Proin mauris dignissim viverra habitant morbi. Parturient sem consectetur consequat commodo varius praesent nunc facilisis varius. Tortor elementum viverra ornare diam morbi. Bibendum condimentum feugiat pulvinar bibendum enim odio. Pharetra fames egestas elit pellentesque. Pharetra at lectus in adipiscing diam. A aliquam ut convallis dolor malesuada sit tellus.
Platea neque maecenas vulputate tristique. Commodo dui eros consequat justo libero. Eros at tristique egestas risus suspendisse at. Ac at urna tortor eget quam nisi lorem risus. Mauris amet pharetra blandit risus imperdiet commodo.
Amet imperdiet viverra risus lobortis aliquam tincidunt egestas feugiat dui. Pretium egestas sem vel dictum aliquam in. Erat nisi amet facilisis tristique molestie egestas. Non suscipit volutpat fermentum tortor et aenean purus. Ultrices et elit proin in. Etiam non egestas turpis commodo orci feugiat erat a lacus. Id ultricies scelerisque eget congue nulla imperdiet mattis quis dui. Vitae pharetra vel pellentesque habitant rhoncus a.
    `,
  },
];
const initialState = {
  isModalOpen: false,
};
const Legal = () => {
  const [legalDetailModal, setLegalDetailModal] = useState(initialState);
  const handleClickFunction = (data) => {
    setLegalDetailModal({ isModalOpen: true, ...data });
  };
  const handleCloseFunction = () => {
    setLegalDetailModal(initialState);
  };
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
                        Legal
                      </span>
                    </div>
                  </div>
                  <div className="h-1 bg-c_FD6769 w-full rounded-full"></div>
                  <div className="py-10 space-y-5 max-w-2xl">
                    {legalArray?.map((item) => (
                      <ListItem
                        item={item}
                        onClick={() => handleClickFunction(item)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <aside className="hidden xl:block col-span-2"></aside>
        </div>
        <LegalDetailModal
          open={legalDetailModal}
          setOpen={handleCloseFunction}
        />
      </div>
    </Fragment>
  );
};

export default Legal;
