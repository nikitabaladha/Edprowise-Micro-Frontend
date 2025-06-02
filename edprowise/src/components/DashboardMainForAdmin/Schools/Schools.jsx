import React from "react";
import { useLocation } from "react-router-dom";

import SchoolsTable from "./SchoolsTable.jsx";
import AddNewSchool from "./AddNewSchool/AddNewSchool.jsx";
import ViewSchool from "./ViewSchool/ViewSchool.jsx";
import UpdateSchool from "./UpdateSchool/UpdateSchool.jsx";

const Schools = () => {
  const location = useLocation();
  const isCreateRoute =
    location.pathname === "/admin-dashboard/schools/add-new-school";
  const isViewRoute =
    location.pathname === "/admin-dashboard/schools/view-school";
  const isUpdateRoute =
    location.pathname === "/admin-dashboard/schools/update-school";

  return (
    <>
      {isCreateRoute ? (
        <AddNewSchool />
      ) : isViewRoute ? (
        <ViewSchool />
      ) : isUpdateRoute ? (
        <UpdateSchool />
      ) : (
        <>
          <SchoolsTable />
        </>
      )}
    </>
  );
};

export default Schools;
