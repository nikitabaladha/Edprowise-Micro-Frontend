import React from "react";
import SchoolOperationCommonHeader from "./SchoolOperationCommonHeader.jsx";
import SchoolOperationTabs from "./SchoolOperationTabs.jsx";
import SchoolOperationInfoSection from "./SchoolOperationInfoSection.jsx";

const SchoolOperation = () => {
  return (
    <>
      <SchoolOperationCommonHeader />
      <SchoolOperationInfoSection />
      <SchoolOperationTabs />
    </>
  );
};

export default SchoolOperation;
