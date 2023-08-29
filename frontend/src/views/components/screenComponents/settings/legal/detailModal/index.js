import Modal from "views/components/shared/modal";

const LegalDetailModal = ({ open = {}, setOpen = () => {} }) => {
  const {
    isModalOpen = false,
    heading = "",
    subHeading = "",
    description = "",
  } = open;

  return (
    <Modal
      open={isModalOpen}
      setOpen={setOpen}
      title={heading}
      subTitle={subHeading}
    >
       <div className="font-openSans_regular text-[#515165] text-sm" dangerouslySetInnerHTML={{ __html: description }} />

    </Modal>
  );
};
export default LegalDetailModal;
