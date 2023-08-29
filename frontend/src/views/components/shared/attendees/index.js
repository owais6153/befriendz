import React from "react";

const Attendees = ({ heading, users }) => {
  return (
    <section>
      <div className="rounded-2xl bg-white space-y-5 p-5">
        <div>
          <span className="text-[#3F4354] text-[16px] font-openSans_bold">
            {heading}
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {users?.slice(0, 9)?.map((item) => (
            <img
              className="w-[40px] h-[40px] rounded-full object-cover"
              src={item}
            />
          ))}
          {users.length > 9 ? (
            <div className="relative">
              <div className="absolute">
                <div className="bg-[#2A2A2A] bg-opacity-25 w-[40px] h-[40px] object-cover rounded-full flex items-center justify-center text-white text-[12px] font-openSans_semiBold cursor-pointer">
                  {users.length - 9 > 99 ? "99" : users.length - 9}+
                </div>
              </div>
              <div>
                <img
                  className="w-[40px] h-[40px] rounded-full object-cover"
                  src={users[10]}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default Attendees;
