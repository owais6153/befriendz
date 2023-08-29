import CustomRedCheckbox from "../CustomRedCheckbox";

const Categories = ({ array = [] }) => {
  return (
    <section>
      <div className="rounded-2xl bg-white space-y-5 py-5 px-5">
        <div>
          <span className="text-[#3F4354] text-[16px] font-openSans_bold">
            Categories
          </span>
        </div>

        <div className="space-y-3">
          {array?.map((item) => (
            <CustomRedCheckbox label={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
