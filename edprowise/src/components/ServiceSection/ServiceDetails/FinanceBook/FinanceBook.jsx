import React from "react";
import FinanceCommonHeader from "./FinanceCommonHeader.jsx";
import FinanceTabs from "./FinanceTabs.jsx";
import FinanceBookInfoMainPage from "./FinanceBookInfoMainPage.jsx";

const FinanceBook = () => {
  return (
    <>
      <FinanceCommonHeader />
      <FinanceBookInfoMainPage />
      <FinanceTabs />
    </>
  );
};

export default FinanceBook;
