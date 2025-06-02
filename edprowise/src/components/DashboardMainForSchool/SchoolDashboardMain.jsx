// EdProwise_Frontend\edprowise\src\components\DashboardMainForSchool\SchoolDashboardMain.js
import { Outlet } from "react-router-dom";
import SchoolDashboardHeader from "./SchoolDashboardHeader.jsx";

import Sidebar from "../Sidebar/Sidebar.jsx";
import Footer from "../Footer/Footer.jsx";
import { NotificationProviderForSchool } from "../NotificationProviderForSchool.jsx";
import { SocketProvider } from "../SocketContext.jsx";

const SchoolDashboardMain = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const schoolId = userDetails?.schoolId;
  const userType = "school";

  return (
    <>
      <SocketProvider userId={schoolId} userType={userType}>
        <NotificationProviderForSchool schoolId={schoolId}>
          <div className="wrapper">
            <SchoolDashboardHeader />
            <Sidebar />

            <div className="page-content custom-font-size">
              <Outlet />
            </div>

            <Footer />
          </div>
        </NotificationProviderForSchool>
      </SocketProvider>
    </>
  );
};

export default SchoolDashboardMain;
