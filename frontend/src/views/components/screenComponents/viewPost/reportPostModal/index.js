import EmptySpace from "views/components/shared/emptySpace";
import Button from "views/components/shared/form-elements/button";
import Textarea from "views/components/shared/form-elements/textarea";
import Modal from "views/components/shared/modal";

const ReportPostModal = ({ open = {}, setOpen = () => {} }) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={"Report Post"}
      subTitle={"Kindly tell us why you are reporting this post"}
    >
      <form className="mt-5 space-y-5">
        <div className="flex flex-wrap gap-2">
          {[
            "False Information?",
            "Low Quality",
            "Spam",
            "Hate Speech",
            "Inappropriate",
          ]?.map((item) => (
            <div className="bg-[#F5F5F5] border border-[#C5D0E6] text-[#515165] rounded-3xl h-[38px] px-4 flex justify-center items-center cursor-pointer">
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="">
          <Textarea
            label="Tell Us More"
            name="about"
            placeholder="Write about why you are reporting ?"
          />
        </div>

        <EmptySpace height="120px" />

        <div className="">
          <Button text={"Submit"} />
        </div>
        <EmptySpace height="20px" />
      </form>
    </Modal>
  );
};
export default ReportPostModal;
