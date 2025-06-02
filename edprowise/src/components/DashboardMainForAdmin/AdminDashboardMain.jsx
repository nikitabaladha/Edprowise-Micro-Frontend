import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardHeader from "./AdminDashboardHeader.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Footer from "../Footer/Footer.jsx";
import { NotificationProviderForEdprowise } from "../NotificationProviderForEdprowise.jsx";
import { SocketProvider } from "../SocketContext.jsx";

const AdminDashboardMain = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const edprowiseId = userDetails?.id;
  const userType = "edprowise";

  return (
    <>
      <SocketProvider userId={edprowiseId} userType={userType}>
        <NotificationProviderForEdprowise edprowiseId={edprowiseId}>
          <div className="wrapper">
            <AdminDashboardHeader />
            <Sidebar />
            <div className="page-content custom-font-size">
              <Outlet />
            </div>
            <Footer />
          </div>
        </NotificationProviderForEdprowise>
      </SocketProvider>
    </>
  );
};

export default AdminDashboardMain;
