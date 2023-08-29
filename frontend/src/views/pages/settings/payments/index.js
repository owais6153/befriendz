import { Images } from "config/images";
import { Fragment, useState } from "react";
import BillingHistory from "views/components/screenComponents/settings/payments/billingHistory";
import PaymentInformation from "views/components/screenComponents/settings/payments/paymentInformation";
import CardInfo from "views/components/screenComponents/settings/payments/cardInfo";
import PaymentModal from "views/components/screenComponents/settings/payments/paymentModal";
import SavedCards from "views/components/screenComponents/settings/payments/savedCards";
const { addPaymentIcon } = Images;

const Payments = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <Fragment>
      <div className="py-4">
        <div className="mx-auto xl:grid xl:grid-cols-7 px-3 sm:px-6 lg:gap-8 lg:px-8">
          <div className="col-span-5">
            <div>
              <div className="xl:space-y-0 space-y-10">
                <aside className="xl:hidden">
                  <CardInfo />
                </aside>
                <div className="bg-white px-4 rounded-2xl min-h-screen">
                  <div className="pb-5 pt-10 flex w-full justify-between items-center flex-wrap">
                    <div>
                      <span className="text-[#2A2A2A] font-openSans_bold text-[24px]">
                        Payments
                      </span>
                    </div>
                    <div>
                      <button
                        className="bg-[#FD6769] text-[#FFFFFF] text-[14px] font-openSans_regular flex justify-center items-center gap-2 min-h-[45px] min-w-[169px] rounded-md"
                        onClick={() =>
                          setIsPaymentModalOpen(!isPaymentModalOpen)
                        }
                      >
                        <img src={addPaymentIcon?.default} />
                        <span>Add Payment Info</span>
                      </button>
                    </div>
                  </div>
                  <div className="h-1 bg-c_FD6769 w-full rounded-full"></div>
                  <div className="space-y-5">
                    <PaymentInformation />
                    <SavedCards />
                    <BillingHistory />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <aside className="hidden xl:block col-span-2">
            <CardInfo />
          </aside>
        </div>
      </div>
      {isPaymentModalOpen && (
        <PaymentModal
          open={isPaymentModalOpen}
          setOpen={setIsPaymentModalOpen}
        />
      )}
    </Fragment>
  );
};

export default Payments;
