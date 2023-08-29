import MainContent from "views/components/screenComponents/buyAndSell/mainContent";
import SideBar from "views/components/screenComponents/buyAndSell/sidebar";
import PageLayout from "views/layouts/page";

export default function BuyAndSell() {
  return (
    <>
      <PageLayout sideBar={<SideBar />} mainContent={<MainContent />} />
    </>
  );
}
