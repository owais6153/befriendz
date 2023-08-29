import { Images } from "config/images";
import CustomGreenCheckbox from "views/components/shared/CustomGreenCheckbox";
const { dustbinIcon } = Images;
const PaymentInformation = () => {
  return (
    <div>
      <div>
        <div className="py-4">
          <span className="text-[#515165] text-[18px] font-openSans_bold">
            Payment Information
          </span>
        </div>
      </div>
      <div className=" max-w-[100vw] overflow-y-auto">
        <table className="min-w-full ">
          <tbody
            className=" text-[#2A2A2A] text-[12px] font-openSans_regular divide-y divide-[#F5F5F5] text-center"
            style={{ textAlign: "-webkit-center" }}
          >
            {Array.from({ length: 1 })?.map((item) => (
              <tr className="">
                <td className="pt-5 px-4 pb-3">
                  <div className="flex items-center gap-3">
                    <CustomGreenCheckbox />
                    <div>
                      <span>Demarai Gray</span>
                    </div>
                  </div>
                </td>
                <td className="pt-5 px-4 pb-3">1234567890</td>
                <td className="pt-5 px-4 pb-3">Bank of America</td>

                <td className="pt-5 px-4 pb-3">
                  <button className="bg-[#F5F5F5] flex items-center justify-center gap-2 h-[40px] w-[108px] rounded-lg">
                    <div>
                      <img src={dustbinIcon.default} />
                    </div>
                    <div>
                      <span className="text-[#000000] text-[12px] font-openSans_regular">
                        Remove
                      </span>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentInformation;
