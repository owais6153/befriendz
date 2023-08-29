import { Images } from "config/images";
import { Helmet } from "react-helmet";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import GuestMiddleware from "../../../middleware/guestMiddleware";
import { siteTitle } from "../../../shared/helper";
const { brandLogo, homeBackgroundImage } = Images;
const owlArray = [
  {
    id: "1",
    title: ["Meet People From All", <br />, "Walks Of Life"], 
    description: [
      "Befriendz is a social platform where family, Friendz, professionals, and businesses, can come to connect.",
      <br />,
      "Where the missing links can be found. Befriendz is Categorized by groups: music group,",
      <br />,
      "business group, Real-estate group ETC. Easy for people to identify with.",
    ],
  },
  {
    id: "2",
    title: ["Let's Talk: Friends", <br />, "accross the World Service"],
    description: [
      "Friendz across the world, Willbe.a-service where you can have a non-bious conversation or conversations",
      <br />,
      "with your friend/health coach/ therapist. From Anywhere you choose. These Friendz will take emergency calls",
      <br />,
      "Text, emails, phone calls and FaceTimes. This service is 24hr 7days a week to help people cope",
      <br />,
      "with their problems in life, and celebrate their achievements at real time.",
    ],
  },
  {
    id: "3",
    title: ["Befrirends", <br />, "Services"],
    description: [
      "This service is rounded with trained life’ Coaches that are your new found family and Friendz who are filled",
      <br />,
      "with empathy, compassion, understanding, equipped with great listening skills to set a strategic plan to help",
      <br />,
      "you better your life. With many resources to offer someone in need.",
    ],
  },
];
const SlideContainer = ({ item }) => (
  <div className="text-center text-white md:px-20 pb-6 px-5">
    <div className="mb-4">
      <span className="lg:text-[50px] md:text-[45px] text-4xl font-openSans_bold leading-tight">
        {item?.title}
      </span>
    </div>
    <div>
      <span className="lg:text-[20px] md:text-[18px] sm:text-[18px] text-[18px] font-openSans_regular ">
        {item?.description}
      </span>
    </div>
  </div>
);

const Home = () => {
  return (
    <section
      className={`min-h-screen bg-no-repeat bg-c_282828 bg-cover flex flex-col justify-center`}
      style={{
        backgroundImage: `url('${homeBackgroundImage}')`,
      }}
    >
      <Helmet>
        <title>Meet People From All Walks Of Life - {siteTitle()}</title>
      </Helmet>
      <div className="py-8">
        <div className="flex justify-center">
          <img src={brandLogo.default} className=" w-40 md:w-64" />
        </div>
        <div className="flex flex-row items-center justify-center">
          <div className="md:w-10/12 w-11/12">
            <OwlCarousel
              className="owl-theme"
              loop
              nav
              items={1}
              navText={[
                '<div class="bg-white w-[80px] flex items-center justify-center h rounded-full"><i class="fa fa-angle-left text-c_FD6769 bg-white" aria-hidden="true"></i></div>',
                '<div class="bg-white w-[80px] flex items-center justify-center h rounded-full"><i class="fa fa-angle-right  text-c_FD6769 " aria-hidden="true"></i></div>',
              ]}
            >
              {owlArray?.map((item) => (
                <SlideContainer key={item.id} item={item} />
              ))}
            </OwlCarousel>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex flex-wrap justify-center gap-10 font-openSans_semiBold text-[16px] px-5">
            <Link
              to="/create-account"
              className="bg-c_FD6769 text-white rounded-full min-h-[60px] w-96 flex justify-center items-center hover:brightness-110 hover:text-white"
            >
              <span>Create Account</span>
            </Link>
            <Link
              to="/sign-in"
              className="outline outline-white text-white rounded-full min-h-[60px] w-96 flex justify-center items-center hover:bg-white hover:text-black"
            >
              <span> Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default GuestMiddleware(Home);
