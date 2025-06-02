import ServiceMainSection from "./ServiceMainSection.jsx";
import { useLocation } from "react-router-dom";
import CommonHeader from "./CommonHeader.jsx";
const ServiceMainPage = () => {
  const location = useLocation();

  const isDigitalServicesRoute =
    location.pathname === "/services/digital-services";

  const isBusinessServicesRoute =
    location.pathname === "/services/academic-admin-services";

  const isRecruitmentSectionRoute =
    location.pathname === "/services/hire-teacher";

  const isProcurementSectionRoute =
    location.pathname === "/services/get-goods-for-school";

  return (
    <>
      {isDigitalServicesRoute ? (
        <>
          <CommonHeader />
          <ServiceMainSection />
        </>
      ) : isBusinessServicesRoute ? (
        <>
          <CommonHeader />
          <ServiceMainSection />
        </>
      ) : isRecruitmentSectionRoute ? (
        <>
          <CommonHeader />
          <ServiceMainSection />
        </>
      ) : isProcurementSectionRoute ? (
        <>
          <CommonHeader />
          <ServiceMainSection />
        </>
      ) : null}
    </>
  );
};

export default ServiceMainPage;
