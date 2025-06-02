import React from "react";
import PayrollCommonHeader from "./PayrollCommonHeader.jsx";
import PayrollTabs from "./PayrollTabs.jsx";
import PayrollInfoMainPage from "./PayrollInfoMainPage.jsx";

const PayrollService = () => {
  return (
    <>
      <PayrollCommonHeader />
      <PayrollInfoMainPage />
      <PayrollTabs />
    </>
  );
};

export default PayrollService;
