import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeLoanStatement = () => {
  const navigate = useNavigate();

  const handleNavigateToViewLoanStatement = () => {
    navigate(
      "/admin-dashboard/payroll-module/employer/loan-to-employees/loan-statement/view-loan-summary"
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center gap-1">
                  <h4 className="card-title text-center flex-grow-1">
                    Loan Statement
                  </h4>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
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
                        <th>Employee ID</th>
                        <th>Employee Name </th>
                        <th>Grade</th>
                        <th>Designation</th>
                        <th>Outstanding Amount</th>
                        <th>Statement</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="payroll-table-body">
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={"customCheck"}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={"customCheck"}
                            >
                              &nbsp;
                            </label>
                          </div>
                        </td>
                        <td>Emp-0001</td>
                        <td>Umesh Jadhav</td>
                        <td>A</td>
                        <td>Teacher</td>
                        <td>15,000</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-light btn-sm"
                              onClick={handleNavigateToViewLoanStatement}
                            >
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end table-responsive */}
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
  );
};

export default EmployeeLoanStatement;
