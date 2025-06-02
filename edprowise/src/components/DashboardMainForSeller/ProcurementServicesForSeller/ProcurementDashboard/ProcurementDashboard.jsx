import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.jsx";

import ProcurementDashboardInformationCards from "./ProcurementDashboardInformationCards.jsx";
import ProcurementDashboardRecentOrders from "./ProcurementDashboardRecentOrders.jsx";

const Dashboard = () => {
  const [totalCounts, setTotalCounts] = useState({});

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const id = userDetails?.id;

  const fetchTotalCounts = async () => {
    try {
      const response = await getAPI(`/get-count-by-seller-id/${id}`, {}, true);
      if (!response.hasError && response.data) {
        setTotalCounts(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Total Counts:", err);
    }
  };

  useEffect(() => {
    fetchTotalCounts();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <ProcurementDashboardInformationCards
          totalCounts={totalCounts}
          setTotalCounts={setTotalCounts}
        />

        <div className="row">
          <ProcurementDashboardRecentOrders />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
