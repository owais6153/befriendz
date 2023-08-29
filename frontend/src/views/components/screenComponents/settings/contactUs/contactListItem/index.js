const ContactListItem = ({ item, ...rest }) => {
  return (
    <div className="py-2" {...rest}>
      <div>
        <h3 className="text-[#2A2A2A] font-openSans_bold text-[18px]">
          {item?.label}
        </h3>
        <p className="text-[#2A2A2A] text-[14px] font-openSans_regular pr-3 mt-3">
          {item?.description}
        </p>
      </div>
      <div>
        <button className="bg-[#0493A3] text-[#FFFFFF] text-[12px] font-openSans_regular flex justify-center items-center gap-2 min-h-[40px] min-w-[120px] rounded-md">
          <img src={item?.buttonContent?.icon?.default} />
          <span>{item?.buttonContent?.text}</span>
        </button>
      </div>
    </div>
  );
};

export default ContactListItem;
