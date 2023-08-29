import { Images } from "config/images";
import { useNavigate, useLocation } from "react-router-dom";

import SettingDashBoard from "views/layouts/settingDashboard";
const {
  activePaymentIcon,
  paymentIcon,

  activePurchaseIcon,
  purchaseIcon,

  activeAdsManagementIcon,
  adsManagementIcon,

  activeSecurityIcon,
  securityIcon,

  activeNotificationIcon,
  notificationIcon,

  activeContactIcon,
  contactIcon,

  activeLegalIcon,
  legalIcon,
  chevronRightIcon,
  activeChevronRightIcon,
} = Images;

const settingsNavItemsArray = [
  {
    label: "Payments",
    icon: paymentIcon,
    activeIcon: activePaymentIcon,
    route: "payments",
  },
  {
    label: "Ads Management",
    icon: adsManagementIcon,
    activeIcon: activeAdsManagementIcon,
    route: "ads-management",
  },
  {
    label: "Purchases",
    icon: purchaseIcon,
    activeIcon: activePurchaseIcon,
    route: "purchases",
  },
  {
    label: "Security",
    icon: securityIcon,
    activeIcon: activeSecurityIcon,
    route: "security",
  },
  {
    label: "Notification",
    icon: notificationIcon,
    activeIcon: activeNotificationIcon,
    route: "notifications",
  },
  {
    label: "Contact Us",
    icon: contactIcon,
    activeIcon: activeContactIcon,
    route: "contact-us",
  },
  {
    label: "Legal",
    icon: legalIcon,
    activeIcon: activeLegalIcon,
    route: "legal",
  },
];

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <nav aria-label="Sidebar" className="sticky top-4 space-y-4">
        <section>
          <div className="bg-white rounded-2xl px-3 pt-3 pb-10">
            <div className="py-5">
              <span className="text-[16px] text-[#515165] font-openSans_bold">
                Settings
              </span>
            </div>
            <div>
              <ul role="list" className="divide-y divide-[#E6F4F6]">
                {settingsNavItemsArray?.map((item) => (
                  <li
                    className={`flex items-center space-x-2 flex-wrap text-[14px] py-4 relative cursor-pointer ${
                      location.pathname === `/settings/${item.route}`
                        ? "font-openSans_bold text-[#FD6769]"
                        : "font-openSans_regular text-[#515165]"
                    }`}
                    onClick={() => navigate(item?.route)}
                  >
                    <div>
                      <img
                        src={
                          item?.[
                            location.pathname === `/settings/${item.route}`
                              ? "activeIcon"
                              : "icon"
                          ]?.default
                        }
                      />
                    </div>
                    <div>{item?.label}</div>
                    <img
                      className="absolute right-0 p-1"
                      src={
                        (location.pathname === `/settings/${item.route}`
                          ? activeChevronRightIcon
                          : chevronRightIcon
                        ).default
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </nav>
    </>
  );
};
const Settings = () => {
  return <SettingDashBoard nav={<Nav />} />;
};

export default Settings;
