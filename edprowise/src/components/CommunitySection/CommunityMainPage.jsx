import CommunityMainSection from "./CommunityMainSection.jsx";
import { useLocation } from "react-router-dom";
import CommonHeader from "./CommonHeader.jsx";
const CommunityMainPage = () => {
  const location = useLocation();

  const isGalleryRoute = location.pathname === "/community-connect/gallery";

  const isEdprowiseTalksRoute =
    location.pathname === "/community-connect/edprowise-talks";

  const isStudentZoneRoute =
    location.pathname === "/community-connect/student-zone";

  const isEducatorZoneRoute =
    location.pathname === "/community-connect/educator-zone";

  return (
    <>
      {isGalleryRoute ? (
        <>
          <CommonHeader />
          <CommunityMainSection />
        </>
      ) : isEdprowiseTalksRoute ? (
        <>
          <CommonHeader />
          <CommunityMainSection />
        </>
      ) : isStudentZoneRoute ? (
        <>
          <CommonHeader />
          <CommunityMainSection />
        </>
      ) : isEducatorZoneRoute ? (
        <>
          <CommonHeader />
          <CommunityMainSection />
        </>
      ) : null}
    </>
  );
};

export default CommunityMainPage;
