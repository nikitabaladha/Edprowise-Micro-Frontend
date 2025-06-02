import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import AdminTable from "./AdminTable.jsx";
import AddNewAdmin from "./AddNewAdmin/AddNewAdmin.jsx";

import UpdateAdmin from "./UpdateAdmin/UpdateAdmin.jsx";

const Admin = () => {
  const location = useLocation();
  const isCreateRoute =
    location.pathname === "/admin-dashboard/admins/add-new-admin";
  const isUpdateRoute =
    location.pathname === "/admin-dashboard/admins/update-admin";

  return (
    <>
      {isCreateRoute ? (
        <AddNewAdmin />
      ) : isUpdateRoute ? (
        <UpdateAdmin />
      ) : (
        <AdminTable />
      )}
    </>
  );
};

export default Admin;
