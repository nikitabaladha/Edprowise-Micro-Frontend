import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getAPI from "../../../api/getAPI.jsx";

import SellersTable from "./SellersTable.jsx";
import AddNewSeller from "./AddNewSeller/AddNewSeller.jsx";
import ViewSeller from "./ViewSeller/ViewSeller.jsx";
import UpdateSeller from "./UpdateSeller/UpdateSeller.jsx";

const Sellers = () => {
  const location = useLocation();
  const isCreateRoute =
    location.pathname === "/admin-dashboard/sellers/add-new-seller";
  const isViewRoute =
    location.pathname === "/admin-dashboard/sellers/view-seller";
  const isUpdateRoute =
    location.pathname === "/admin-dashboard/sellers/update-seller";

  return (
    <>
      {isCreateRoute ? (
        <AddNewSeller />
      ) : isViewRoute ? (
        <ViewSeller />
      ) : isUpdateRoute ? (
        <UpdateSeller />
      ) : (
        <>
          <SellersTable />
        </>
      )}
    </>
  );
};

export default Sellers;
