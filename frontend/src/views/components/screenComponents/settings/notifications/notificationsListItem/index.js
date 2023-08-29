import { useState } from "react";
import NotificationCheckBox from "../notificationCheckBox";
import CustomSwitch from "./CustomSwitch";
import {  toast } from "react-toastify";

const NotificationListItem = ({ item, ...rest }) => {
  const [enabled, setEnabled] = useState(true);
  const [checkBoxArray, setCheckBoxArray] = useState([
    {
      label: "New Notifications",
      key: `${item.key}new_notification`,
      checked: false,
    },
    {
      label: "Direct Messages",
      key: `${item.key}direct_message`,
      checked: false,
    },
    {
      label: "Mentions",
      key: `${item.key}mentions`,
      checked: false,
    },
  ]);

  const updateChanges = async () => {
    toast.success('Setting Updated')
  }

  return (
    <div className="py-2" {...rest}>
      <div>
        <div className="flex justify-between items-center w-full">
          <h3 className="text-[#2A2A2A] font-openSans_bold text-[18px]">
            {item?.label}
          </h3>
          <div>
            <CustomSwitch enabled={enabled} setEnabled={(val)=>{
              setEnabled(val)
              setCheckBoxArray(prevState => {
                return prevState.map(item => {
                  return {
                    ...item,
                    checked: val
                  };
                });
              });
              updateChanges();
            }} />
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-2 max-w-sm">
        {checkBoxArray?.map((item) => (
          <NotificationCheckBox
            onChange={(val)=>{
              setCheckBoxArray(prevState => {
                const updatedArray = [...prevState];
                const updatedIndex = updatedArray.findIndex(i => i.key === item.key);
                if (updatedIndex !== -1) {
                  updatedArray[updatedIndex] = {
                    ...updatedArray[updatedIndex],
                    checked: val
                  };
                }
                return updatedArray;
              });
              updateChanges()
            }}
            key={item.key}
            label={item.label}
            className={`${!enabled && "opacity-50"}`}
            disabled={!enabled}
            checked={item.checked}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationListItem;
