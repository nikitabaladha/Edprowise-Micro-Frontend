import React from "react";
import SchoolApplicationCommonHeader from "./SchoolApplicationCommonHeader.jsx";
import SchoolApplicationTabs from "./SchoolApplicationTabs.jsx";
import SchoolApplicationInfoSection from "./SchoolApplicationInfoSection.jsx";

const SchoolApplication = () => {
  return (
    <>
      <SchoolApplicationCommonHeader />
      <SchoolApplicationInfoSection />
      <SchoolApplicationTabs />
    </>
  );
};
export default SchoolApplication;
