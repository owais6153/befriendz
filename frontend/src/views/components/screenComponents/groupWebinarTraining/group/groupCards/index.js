import { Link } from "react-router-dom";
import { Images } from "config/images";
const { arrowRightIcon } = Images;

const GroupCards = ({group}) => {

  return (
    <Link to={`/groups/${group._id}`}>
      <div className="rounded-2xl relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-full lg:h-full lg:shrink-0">
        <img
          src={group.bannerImage}
          alt={group.title}
          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
        />
        <div className="absolute bottom-0 bg-gradient-to-t from-[#0000008D] via-[#0000008D] to-[#00000000] t rounded-b-2xl  lg:w-full w-full p-3 pb-5">
          <div className="flex justify-between">
            <div>
              <span className="text-white font-openSans_bold text-[16px]">
                {group.title}
              </span>
            </div>
              <div className="bg-white rounded-md p-1 cursor-pointer">
                <img src={arrowRightIcon.default} />
              </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupCards;
