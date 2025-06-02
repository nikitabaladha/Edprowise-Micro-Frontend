import React, { useState, useEffect } from "react";
import TrackOrderHistoryTable from "./TrackOrderHistoryTable.jsx";
import { useLocation } from "react-router-dom";
import ViewOrderHistory from "./ViewOrderHistory/ViewOrderHistory.jsx";

const TrackOrderHistory = () => {
  const location = useLocation();

  const isViewRoute =
    location.pathname ===
    "/school-dashboard/procurement-services/view-order-history";

  return <>{isViewRoute ? <ViewOrderHistory /> : <TrackOrderHistoryTable />}</>;
};

export default TrackOrderHistory;
