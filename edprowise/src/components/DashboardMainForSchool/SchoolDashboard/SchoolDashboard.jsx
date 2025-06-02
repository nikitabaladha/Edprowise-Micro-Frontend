import React, { useState, useEffect } from "react";
import getAPI from "../../../api/getAPI.jsx";

import SchoolDashboardInformationCards from "./SchoolDashboardInformationCards.jsx";
import SchoolDashboardRecentOrders from "./SchoolDashboardRecentOrders.jsx";

const Dashboard = () => {
  const [totalCounts, setTotalCounts] = useState({});

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const id = userDetails?.schoolId;

  const fetchTotalCounts = async () => {
    try {
      const response = await getAPI(`/get-count-by-school-id/${id}`, {}, true);
      if (!response.hasError && response.data) {
        setTotalCounts(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Total Counts:", err);
    }
  };

  // const fetchPerformance = async (year) => {
  //   try {
  //     const response = await getAPI(`/get-by-month-year/${year}`, {}, true);
  //     if (
  //       !response.hasError &&
  //       response.data &&
  //       Array.isArray(response.data.data)
  //     ) {
  //       setPerformance(response.data.data);
  //     } else {
  //       console.error("Invalid response format or error in response");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching Total Counts:", err);
  //   }
  // };

  useEffect(() => {
    // fetchSchoolData();
    fetchTotalCounts();
    // fetchPerformance(new Date().getFullYear());
  }, []);

  return (
    <>
      <div className="container-fluid">
        <SchoolDashboardInformationCards
          totalCounts={totalCounts}
          setTotalCounts={setTotalCounts}
        />

        {/* <div class="row">
          <SchoolDashboardPerformance
            performance={performance}
            fetchPerformance={fetchPerformance}
          />
          <SchoolDashboardConversions />
          <div />
        </div> */}
        <div className="row">
          <SchoolDashboardRecentOrders />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
