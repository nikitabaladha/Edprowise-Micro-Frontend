// EdProwise_Frontend\edprowise\src\components\DashboardMainForSeller\SellerDashboardMain.js
import { Outlet } from "react-router-dom";
import SellerDashboardHeader from "./SellerDashboardHeader.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Footer from "../Footer/Footer.jsx";
import { NotificationProvider } from "../NotificationProviderForSeller.jsx";

const SellerDashboardMain = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const sellerId = userDetails?.id;

  return (
    <>
      <NotificationProvider sellerId={sellerId}>
        <div className="wrapper">
          <SellerDashboardHeader />
          <Sidebar />

          <div className="page-content custom-font-size">
            <Outlet />
          </div>

          <Footer />
        </div>
      </NotificationProvider>
    </>
  );
};

export default SellerDashboardMain;
