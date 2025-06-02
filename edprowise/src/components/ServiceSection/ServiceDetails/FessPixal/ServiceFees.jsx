import React from "react";
import ServiceInfoCommonHeader from "./ServiceInfoCommonHeader.jsx";
import ServiceTabs from "./ServiceTabs.jsx";
import PixalFeesInfoMainPage from "./PixalFeesInfoMainPage.jsx";

const ServiceFess = () => {
  return (
    <>
      <ServiceInfoCommonHeader />
      <PixalFeesInfoMainPage />
      <ServiceTabs />
    </>
  );
};

export default ServiceFess;
