import React from "react";
import { useNavigate, Link } from "react-router-dom";
const PayLoanEmployeeTable = () => {
  const navigate = useNavigate();

  const handleNavigateToPage = () => {
    navigate(
      "/admin-dashboard/payroll-module/employer/loan-to-employees/loan-requested-list/pay-loan"
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Requested for Loan
                  </h4>
                  <div>
                    <select
                      id="yearSelect"
                      className="custom-select"
                      aria-label="Select Year"
                    >
                      <option selected>2025-26</option>
                      <option>2026-27</option>
                      <option>2027-28</option>
                      <option>2028-29</option>
                      <option>2029-30</option>
                    </select>
                  </div>
                </div>
              </div>
              <form onSubmit="">
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
                        <th>Employee ID</th>
                        <th>Name of Employee</th>
                        <th>Designation</th>
                        <th>Grade</th>
                        <th>Loan Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="payroll-table-body">
                        <td style={{ width: 20 }}>
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
                        </td>
                        <td>Emp-001</td>
                        <td>Umesh Jadhav</td>
                        <td>Teacher</td>
                        <td>A</td>
                        <td>15,000</td>
                        <td></td>
                        <td>
                          <Link
                            to="/admin-dashboard/payroll-module/employer/loan-to-employees/pay-loan/pay-loan-detail"
                            className="btn btn-light btn-sm"
                          >
                            <iconify-icon
                              icon="solar:eye-broken"
                              className="align-middle fs-18"
                            />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayLoanEmployeeTable;
