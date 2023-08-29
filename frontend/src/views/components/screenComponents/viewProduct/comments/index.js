import { UserIcon } from "@heroicons/react/20/solid";
import { Images } from "config/images";

const { undoIcon, inActiveLikeIcon, moreOptionsIcon } = Images;

const timeline = [
  {
    id: 1,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 1,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 1,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 1,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 1,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
];
const Comments = () => {
  return (
    <div>
      <div className="p-[15px]">
        <div className="flex">
          <div className="min-w-[50px] flex justify-center items-center">
            <img
              className="h-[40px] w-[40px] rounded-full"
              src={
                "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              }
              alt=""
            />
          </div>
          <div className="w-full px-[10px]">
            <input
              className="bg-white border border-[#C5D0E6] min-h-[44px] w-full px-[15px] rounded-full focus:outline-none text-[16px] font-openSans_regular"
              placeholder="Type your comments here..."
            />
          </div>
        </div>
      </div>

      <div className="p-[15px]">
        <ul role="list" className="-mb-8">
          {timeline.map((event, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== timeline.length - 1 ? (
                  <span
                    className="absolute top-4 left-5 -ml-px h-full w-0.5 bg-opacity-30 bg-[#C5D0E6]"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div className="min-w-[50px]">
                    <img
                      className="w-[45px] h-[45px] rounded-full"
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0qKxeCcgV_gLesfo7kh33pLqn3nIEwMO_xG7Z2miK&s"
                      }
                    />
                  </div>
                  <div className="flex flex-wrap min-w-0 flex-1 justify-between space-x-4 py-1.5">
                    <div className="w-full px-[10px]">
                      <div className="text-wrap bg-white border border-[#C5D0E6] w-full p-[15px] rounded-2xl text-[14px] font-openSans_regular">
                        <div className="text-[#515165] font-openSans_regular flex w-full flex-wrap">
                          <span className="font-openSans_bold ">
                            Taye Gibbs
                          </span>{" "}
                          • Feb 01 • Edited on Feb 02
                        </div>
                        <div className="mt-[10px]">
                          Lorem ipsum dolor sit amet consectetur. Lobortis hac
                          sed sapien blandit nisl ultrices ac. Faucibus massa
                          consectetur orci in amet imperdiet sociis tincidunt.
                          Netus lectus tristique ut diam felis a aliquam magna.
                          Non sit a mauris euismod cursus adipiscing. Aliquet
                          turpis tortor a facilisi laoreet dui. Sed vitae sed
                          purus sapien viverra interdum. Faucibus semper
                          eleifend velit tellus non morbi. Blandit.
                        </div>
                      </div>
                    </div>
                    <div className="mt-[15px] flex space-x-5 flex-wrap">
                      <span className="cursor-pointer">
                        <img src={inActiveLikeIcon.default} />
                      </span>
                      <span className="cursor-pointer">
                        <img src={undoIcon.default} />
                      </span>
                      <span className="cursor-pointer">
                        <img src={moreOptionsIcon.default} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Comments;
