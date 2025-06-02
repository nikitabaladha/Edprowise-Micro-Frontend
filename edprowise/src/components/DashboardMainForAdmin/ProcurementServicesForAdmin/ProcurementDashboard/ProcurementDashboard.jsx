import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.jsx";

import ProcurementDashboardInformationCards from "./ProcurementDashboardInformationCards.jsx";
import ProcurementDashboardPerformance from "./ProcurementDashboardPerformance.jsx";
import ProcurementDashboardConversions from "./ProcurementDashboardConversions.jsx";
import ProcurementDashboardRecentOrders from "./ProcurementDashboardRecentOrders.jsx";

const Dashboard = () => {
  const [totalCounts, setTotalCounts] = useState({});
  const [performance, setPerformance] = useState([]);

  const fetchTotalCounts = async () => {
    try {
      const response = await getAPI(`/get-total-count`, {}, true);
      if (!response.hasError && response.data) {
        setTotalCounts(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Total Counts:", err);
    }
  };

  const fetchPerformance = async (year) => {
    try {
      const response = await getAPI(`/get-by-month-year/${year}`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setPerformance(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Total Counts:", err);
    }
  };

  useEffect(() => {
    fetchTotalCounts();
    fetchPerformance(new Date().getFullYear());
  }, []);

  return (
    <>
      <div className="container-fluid">
        <ProcurementDashboardInformationCards
          totalCounts={totalCounts}
          setTotalCounts={setTotalCounts}
        />
        <div class="row">
          <ProcurementDashboardPerformance
            performance={performance}
            fetchPerformance={fetchPerformance}
          />
          <ProcurementDashboardConversions />
          <div />
        </div>

        <ProcurementDashboardRecentOrders />
      </div>
    </>
  );
};

export default Dashboard;
