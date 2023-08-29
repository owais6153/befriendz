import MainContent from "views/components/screenComponents/sellProduct/mainContent";
import PageLayout from "views/layouts/page";

export default function SellProduct() {
  return (
    <>
      <PageLayout
        sideBar={<></>}
        containsSideBar={false}
        mainContent={<MainContent />}
      />
    </>
  );
}
