import MainContent from "views/components/screenComponents/viewProduct/mainContent";
import SideBar from "views/components/screenComponents/viewProduct/sideBar";
import PageLayout from "views/layouts/page";

export default function ViewProduct() {
  return (
    <>
      <PageLayout sideBar={<SideBar />} mainContent={<MainContent />} />
    </>
  );
}
