import EmptySpace from "views/components/shared/emptySpace";
import Button from "views/components/shared/form-elements/button";
import Input from "views/components/shared/form-elements/input";
import Select from "views/components/shared/form-elements/select";

const BudgetsAndScheduleForm = () => (
  <div className="py-10 space-y-5">
    <div>
      <span className="text-[#515165] lg:text-[18px] md:text-[17px] sm:text-[16px] text-[15px] font-openSans_bold ">
        Budgets and Schedule
      </span>
    </div>
    <div>
      <div className="grid grid-cols-7">
        <div className="lg:col-span-5 col-span-full">
          <form className="mt-5 space-y-5">
            <div>
              <Input
                type="text"
                name="Budget"
                label="Budget"
                placeholder="$50.00"
              />
            </div>
            <div>
              <Select label="Frequency" placeholder="2 hours" />
            </div>
            <div>
              <Input
                type="text"
                name="Amount Spent"
                label="Amount Spent"
                placeholder="$24.00"
              />
            </div>

            <EmptySpace height="10px" />
            <div>
              <Button
                type="submit"
                text={"Start Ads"}
                className="min-h-[50px]"
              />
            </div>
          </form>
          <div className="mt-5 flex flex-col md:flex-row flex-wrap gap-4 items-center justify-between">
            <div>
              <Button
                type="submit"
                text={"Pause"}
                className="min-h-[50px] px-20 w-min bg-white text-[#0493A3] border-2 border-[#0493A3]"
                style={{ color: "#0493A3" }}
              />
            </div>
            <div>
              <Button
                type="submit"
                text={"Stop"}
                className="min-h-[50px] px-20 w-min "
                style={{ background: "#F5F5F5", color: "black" }}
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
);
export default BudgetsAndScheduleForm;
