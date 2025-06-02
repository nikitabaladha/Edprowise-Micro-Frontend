import React from "react";
import GoodsAndServicesTable from "./GoodsAndServicesTable.jsx";
import AddGoodsAndServices from "./AddGoodsAndServices/AddGoodsAndServices.jsx";
import UpdateGoodAndService from "./UpdateGoodAndService/UpdateGoodAndService.jsx";
import { useLocation } from "react-router-dom";

const DefineGoodsAndServices = () => {
  const location = useLocation();

  const isCreateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/add-good-services";

  const isUpdateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/update-good-service";

  return (
    <>
      {isUpdateRoute ? (
        <UpdateGoodAndService />
      ) : isCreateRoute ? (
        <AddGoodsAndServices />
      ) : (
        <GoodsAndServicesTable />
      )}
    </>
  );
};
export default DefineGoodsAndServices;
