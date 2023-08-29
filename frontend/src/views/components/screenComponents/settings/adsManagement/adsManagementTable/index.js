import React from "react";
import Pagination from "views/components/shared/pagination";
import Status from "views/components/shared/status";

const AdsManagementTable = () => {
  return (
    <div>
      <div className=" max-w-[100vw] overflow-y-auto">
        <table className="min-w-full">
          <thead className="text-left text-[#515165] text-[12px] font-openSans_bold">
            <tr>
              <th className="pb-5 px-4 pt-2">Name</th>

              <th className="pb-5 px-4 pt-2">Budget</th>
              <th className="pb-5 px-4 pt-2">Amount Spent</th>
              <th className="pb-5 px-4 pt-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-left text-[#2A2A2A] text-[12px] font-openSans_regular divide-y divide-[#F5F5F5]">
            {Array.from({ length: 5 })?.map((item) => (
              <tr className="">
                <td className="pt-5 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-[40px] h-[40px]">
                      <img
                        className="object-contain"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
                      />
                    </div>
                    <div>Instagram post: We mean it when....</div>
                  </div>
                </td>
                <td className="pt-5 pb-3">$50.00</td>
                <td className="pt-5 pb-3">$50.00</td>
                <td className="pt-5 pb-3">
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

export default AdsManagementTable;
