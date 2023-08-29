import { Fragment } from "react";
import { Switch } from "@headlessui/react";

function CustomSwitch(props) {
  const { enabled, setEnabled } = props;
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      as={Fragment}
      className="relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      {({ checked }) => (
        /* Use the `checked` state to conditionally style the button. */
        <button
          className={`${
            checked ? "bg-c_30B52D" : "bg-gray-500"
          } relative inline-flex h-[28px] w-[54px] items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              checked ? "translate-x-7" : "translate-x-0"
            } inline-block h-[24px] w-[24px] transform rounded-full bg-white transition`}
          />
        </button>
      )}
    </Switch>
  );
}
export default CustomSwitch;
