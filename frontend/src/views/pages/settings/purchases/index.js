import { Fragment } from "react";
import PurchasesItem from "../../../components/screenComponents/settings/purchases/purchasedItem";
import PurchaseTable from "views/components/screenComponents/settings/purchases/purchaseTable";
import TableSearchAndFilter from "views/components/shared/tableSearch";

const Purchases = () => {
  return (
    <Fragment>
      <div className="py-4">
        <div className="mx-auto xl:grid xl:grid-cols-7 px-3 sm:px-6 lg:gap-8 lg:px-8">
          <div className="col-span-5">
            <div>
              <div className="xl:space-y-0 space-y-10">
                <aside className="xl:hidden">
                  <PurchasesItem />
                </aside>
                <div className="bg-white px-4 rounded-2xl min-h-screen">
                  <div className="pb-5 pt-10 flex w-full justify-between items-center flex-wrap">
                    <div>
                      <span className="text-[#2A2A2A] font-openSans_bold text-[24px]">
                        Purchases
                      </span>
                    </div>
                    <div>
                      <TableSearchAndFilter />
                    </div>
                  </div>
                  <div className="h-1 bg-c_FD6769 w-full rounded-full"></div>
                  <PurchaseTable />
                </div>
              </div>
            </div>
          </div>
          <aside className="hidden xl:block col-span-2">
            <PurchasesItem />
          </aside>
        </div>
      </div>
    </Fragment>
  );
};

export default Purchases;
