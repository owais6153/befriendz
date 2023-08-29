import React from "react";
import Pagination from "views/components/shared/pagination";
import Status from "views/components/shared/status";

const PurchaseTable = () => {
  return (
    <div>
      <div className=" max-w-[100vw] overflow-y-auto">
        <table className="min-w-full">
          <thead className="text-center text-[#515165] text-[12px] font-openSans_bold">
            <tr>
              <th className="pb-5 px-4 pt-2">Description</th>
              <th className="pb-5 px-4 pt-2">Item</th>
              <th className="pb-5 px-4 pt-2">Amount</th>
              <th className="pb-5 px-4 pt-2">Date & Time</th>
              <th className="pb-5 px-4 pt-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-center text-[#2A2A2A] text-[12px] font-openSans_regular divide-y divide-[#F5F5F5]">
            {Array.from({ length: 5 })?.map((item) => (
              <tr className="">
                <td className="pt-5 pb-3">Buy</td>
                <td className="pt-5 pb-3">Air Fryer</td>
                <td className="pt-5 pb-3">$50.00</td>
                <td className="pt-5 pb-3">
                  <div>
                    <div>
                      <span className="text-[#2A2A2A] text-[12px] font-openSans_regular">
                        21-03-2021
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#515165] font-openSans_regular">
                        @ 8:45 PM
                      </span>
                    </div>
                  </div>
                </td>
                <td className="pt-5 pb-3 ">
                  <Status label="Sucess" type="success" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default PurchaseTable;
