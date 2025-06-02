import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { exportToExcel } from "../../export-excel.jsx";

const DashboardRecentSchools = ({ schools }) => {
  const handleExport = () => {
    if (!schools.length) {
      toast.error("No data available to export");
      return;
    }

    const formattedData = schools.map((school) => ({
      School_ID: school.schoolId,
      School_Name: school.schoolName,
      PAN_Number: school.panNo,
      School_Address: school.schoolAddress,
      School_Location: school.schoolLocation,
      Landmark: school.landMark,
      School_Pincode: school.schoolPincode,
      Delivery_Address: school.deliveryAddress,
      Delivery_Location: school.deliveryLocation,
      Delivery_Landmark: school.deliveryLandMark,
      Delivery_Pincode: school.deliveryPincode,
      School_Mobile_No: school.schoolMobileNo,
      School_Alternate_Contact_No: school.schoolAlternateContactNo,
      School_Email: school.schoolEmail,
      Contact_Person_Name: school.contactPersonName,
      Number_of_Students: school.numberOfStudents,
      Principal_Name: school.principalName,
      Affiliation_Upto: school.affiliationUpto,
      PAN_File_URL: school.panFile,
      Profile_Image_URL: school.profileImage,
      Affiliation_Certificate_URL: school.affiliationCertificate,
      Created_At: school.createdAt,
      Updated_At: school.updatedAt,
    }));

    exportToExcel(formattedData, "Schools", "Schools");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [schoolsPerPage] = useState(10);

  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentSchools = schools.slice(indexOfFirstSchool, indexOfLastSchool);

  const totalPages = Math.ceil(schools.length / schoolsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageRange = 1;

  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);

  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center gap-1">
              <h4 className="card-title flex-grow-1">Recent Schools</h4>
            </div>
            <div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th style={{ width: 20 }}>
                        <div className="form-check ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheck1"
                          />
                        </div>
                      </th>
                      <th>School Id</th>
                      <th className="text-start">School Name</th>
                      <th>School Mobile No</th>
                      <th>School Email</th>
                      <th>School PAN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSchools.map((school) => (
                      <tr key={school._id}>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheck2"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </td>
                        <td>{school.schoolId}</td>

                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="rounded bg-light d-flex align-items-center justify-content-center">
                              <img
                                src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.profileImage}`}
                                alt={`${school.schoolName} Profile`}
                                className="avatar-md"
                                style={{
                                  objectFit: "cover",
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "10px",
                                }}
                              />
                            </div>
                            <div>{school.schoolName}</div>
                          </div>
                        </td>

                        <td>{school.schoolMobileNo}</td>
                        <td>{school.schoolEmail}</td>
                        <td>{school.panNo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer border-top">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mb-0">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {pagesToShow.map((page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className={`page-link pagination-button ${
                          currentPage === page ? "active" : ""
                        }`}
                        onClick={() => handlePageClick(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardRecentSchools;
