import React from "react";
import { useNavigate } from "react-router-dom";

const OvertimeAllowanceEmployeesTable = () => {
  const navigate = useNavigate();

  const handleNavigateToViewOvertimeDetails = () => {
    navigate(
      "/admin-dashboard/payroll-module/employer/overtime-allowance/view-overtime-allowance-detail"
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex  align-items-center gap-1">
                  <h4 className="card-title text-center flex-grow-1">
                    Overtime Allowance Employees List
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="row my-2">
                  <div className="col-md-5">
                    <div className="mb-3">
                      <label htmlFor="fromDate" className="form-label">
                        From Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="fromDate"
                        name="fromDate"
                        className="form-control"
                        // value={formData.fromDate}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="mb-3">
                      <label htmlFor="toDate" className="form-label">
                        To Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="toDate"
                        name="toDate"
                        className="form-control"
                        // value={formData.toDate}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-2 text-center align-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
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
                        <th>Date</th>
                        <th>No.of Hours Worked</th>
                        <th>Working Hours</th>
                        <th>Overtime Hours</th>
                        <th>Total Amount</th>
                        <th>View Details</th>
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
                        <td>10-05-2025</td>
                        <td>10</td>
                        <td>8</td>
                        <td>2</td>
                        <td>500</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-light btn-sm"
                              onClick={handleNavigateToViewOvertimeDetails}
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

export default OvertimeAllowanceEmployeesTable;
