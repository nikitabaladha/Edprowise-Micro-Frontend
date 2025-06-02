import React from "react";
import { Link } from "react-router-dom";

const LoanSummary = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="payroll-title text-center mb-0 ">
                    Loan Summary
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="row m-0 salary-slip-box pt-2 my-2">
                  <div className="col-md-8">
                    <p className="text-dark payroll-box-text">
                      <strong>Employee ID : </strong> EMP-001
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p className="text-dark payroll-box-text">
                      <strong>Employee Name : </strong> Umesh Jadhav
                    </p>
                  </div>
                </div>

                <div>
                  <div className="table-responsive my-2">
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
                          <th>Loan Number</th>
                          <th>Opening Balance</th>
                          <th>Loan Added</th>
                          <th>Installment Paid</th>
                          <th>Closing Balance</th>
                          <th>Action</th>
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
                          <td>LOAN-0001</td>
                          <td></td>
                          <td>10,000</td>
                          <td>1,000</td>
                          <td>9,000</td>
                          <td>
                            <Link
                              to="/admin-dashboard/payroll-module/employee-services/loan-summary/my-loan-statement"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanSummary;
