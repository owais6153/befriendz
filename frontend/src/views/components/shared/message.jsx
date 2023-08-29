import { Images } from "config/images";
import { Link } from "react-router-dom";
import EmptySpace from "./emptySpace";
import Button from "./form-elements/button";
const Message = ({ title, message, action, clickEvent = null }) => {
  const { successIcon } = Images;
  return (
    <div className="message">
      <EmptySpace height="20px" />
      <div className="flex justify-center">
        <img src={successIcon.default} alt={title} />
      </div>
      <div className="">
        <div className="text-black font-openSans_bold flex justify-center items-center flex-wrap">
          <span className="lg:text-[40px] md:text-[39px] sm:text-[38px] text-[37px]">
            {title}
          </span>
        </div>

        <p className="lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-c_949494 font-openSans_regular mb-0 text-center">
          {message}
        </p>
      </div>

      <EmptySpace height="130px" />
      {!clickEvent ? (
        <Link
          to={action}
          className={
            "text-white bg-[#FD6769] min-h-[60px] w-full rounded-full font-openSans_bold text-center hover:brightness-110 cursor-pointer flex justify-center items-center hover:text-white"
          }
        >
          Done!
        </Link>
      ) : (
        <Button onClick={() => clickEvent()} text={"Thank You"} />
      )}
      <EmptySpace height="40px" />
    </div>
  );
};
export default Message;
