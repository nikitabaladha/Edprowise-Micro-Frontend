import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const studentData = [
  {
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
    dateOfBirth: "2005-05-15",
    nationality: "India",
    gender: "Male",
    masterDefineClass: "1st",
    masterDefineShift: "Morning",
    fatherName: "John Doe Sr.",
    fatherContactNo: "1234567890",
    motherName: "Jane Doe",
    motherContactNo: "0987654321",
    currentAddress: "123 Main St, City, Country",
    cityStateCountry: "City, State, Country",
    pincode: "123456",
    previousSchoolName: "ABC School",
    previousSchoolBoard: "CBSE",
    addressOfpreviousSchool: "456 School St, City, Country",
    previousSchoolResult: "Result.pdf",
    tcCertificate: "TC.pdf",
    studentCategory: "General",
    howReachUs: "Friend",
    aadharPassportFile: "Aadhar.pdf",
    aadharPassportNumber: "1234 5678 9012",
    castCertificate: "Caste.pdf",
    agreement: true,
    name: "John Doe",
    paymentMode: "UPI",
    dateOfApplicatopnReceive: "2023-10-01",
    registrationFeesReceivedBy: "Admin",
    transationOrChequetNumber: "123456789",
    receiptNumber: "987654321",
    registrationNumber: "REG123456",
  },
];

const EmployeeRegistrationList = () => {
  const navigate = useNavigate();

  const navigateToRegisterEmployee = (event) => {
    event.preventDefault();
    navigate(
      `/admin-dashboard/payroll-module/employer/registration/registration-form`
    );
  };

  const navigateToRegisterInfo = (event, employee) => {
    event.preventDefault();
    navigate(
      `/admin-dashboard/payroll-module/employer/registration/view-registration-form`,
      {
        //   state: { employee },
      }
    );
  };

  const navigateToUpdateRegisterInfo = (event, employee) => {
    event.preventDefault();
    navigate(
      `/admin-dashboard/payroll-module/employer/registration/update-registration-form`,
      {
        //   state: { employee },
      }
    );
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [studentListPerPage] = useState(5);

  const indexOfLastStudent = currentPage * studentListPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentListPerPage;
  const currentStudent = studentData.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(studentData.length / studentListPerPage);

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
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header d-flex align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Registered Empolyee List
                    </h4>
                    <Link
                      onClick={(event) => navigateToRegisterEmployee(event)}
                      className="btn btn-sm btn-primary"
                    >
                      Add New Employee
                    </Link>

                    <div className="text-end">
                      <Link className="text-primary text-end ms-3">
                        Export
                        <i className="bx bx-export ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="table-responsive">
                    <table className="table align-middle mb-0 table-hover table-centered text-center">
                      <thead className="bg-light-subtle">
                        <tr className="payroll-table-header">
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
                          <th>Employee ID.</th>
                          <th>Employee Name</th>
                          <th>Contact No</th>
                          <th>Email ID</th>
                          <th>Job Designation</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {studentData.map((student, index) => ( */}
                        <tr className="payroll-table-body">
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
                          <td>Emp-0001</td>

                          <td>Umesh jadhav</td>

                          <td>1234567890</td>
                          <td>XYZ@gmail.com</td>
                          <td>Teacher</td>

                          {/* <td>{student.dateOfApplicatopnReceive}</td> */}
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                className="btn btn-light btn-sm"
                                onClick={(event) =>
                                  navigateToRegisterInfo(event)
                                }
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-primary btn-sm"
                                onClick={(event) =>
                                  navigateToUpdateRegisterInfo(event)
                                }
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link className="btn btn-soft-danger btn-sm">
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                        {/* ))} */}
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
                          // onClick={handlePreviousPage}
                          // disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      <li className={`page-item`}>
                        <button
                          className={`page-link pagination-button `}
                          //   onClick={() => handlePageClick(page)}
                        >
                          1
                        </button>
                      </li>

                      <li className="page-item">
                        <button
                          className="page-link"
                          // onClick={handleNextPage}
                          // disabled={currentPage === totalPages}
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
        </div>
      </div>
    </>
  );
};

export default EmployeeRegistrationList;
