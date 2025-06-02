import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResignationReport = () => {
  const [selectedAction, setSelectedAction] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (selectedAction === "Resignation Approval") {
      navigate(
        "/admin-dashboard/payroll-module/employer/resignation/resignation-approval-form"
      );
    } else if (selectedAction === "Employee Resignation Details") {
      navigate(
        "/admin-dashboard/payroll-module/employer/resignation/view-employee-resignation-detail"
      );
    } else if (selectedAction === "Employee Exit Interview") {
      navigate(
        "/admin-dashboard/payroll-module/employer/resignation/view-employee-exit-interview"
      );
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">
                    Resignation Report
                  </h4>

                  <form
                    className="app-search d-none d-md-block me-2"
                    // onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="position-relative">
                      <input
                        type="search"
                        className="form-control border border-dark"
                        placeholder="Search..."
                        autoComplete="off"
                        defaultValue=""
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="row m-0 mb-2 py-2 salary-slip-box">
                <div className="col-md-2">
                  <p className="text-dark text-center mb-0 py-1 payroll-box-text">
                    <strong>Status : </strong>
                  </p>
                </div>

                <div className="col-md-10">
                  <div className="py-2 d-flex justify-content-start align-items-center gap-1">
                    <div className="form-check ms-1">
                      <input
                        type="radio"
                        className="form-check-input border border-dark"
                        id="sameAsCurrentAddress"
                        name="sameAsCurrentAddress"
                        // checked={formData.sameAsCurrentAddress}
                        // onChange={handleChange}
                      />{" "}
                      <label
                        className="form-check-label"
                        htmlFor="sameAsCurrentAddress"
                      />
                    </div>
                    <h4 className="mb-0 payroll-box-text text-end"> Pending</h4>

                    <div className="form-check ms-1">
                      <input
                        type="radio"
                        className="form-check-input border border-dark"
                        id="sameAsCurrentAddress"
                        name="sameAsCurrentAddress"
                        // checked={formData.sameAsCurrentAddress}
                        // onChange={handleChange}
                      />{" "}
                      <label
                        className="form-check-label"
                        htmlFor="sameAsCurrentAddress"
                      />
                    </div>
                    <h4 className="mb-0 payroll-box-text text-end">
                      {" "}
                      Completed
                    </h4>

                    <div className="form-check ms-1">
                      <input
                        type="radio"
                        className="form-check-input border border-dark"
                        id="sameAsCurrentAddress"
                        name="sameAsCurrentAddress"
                        // checked={formData.sameAsCurrentAddress}
                        // onChange={handleChange}
                      />{" "}
                      <label
                        className="form-check-label"
                        htmlFor="sameAsCurrentAddress"
                      />
                    </div>
                    <h4 className="mb-0 payroll-box-text text-end">
                      {" "}
                      Retained
                    </h4>
                  </div>
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
                        <th>Name of Employee</th>
                        <th>Designation</th>
                        <th>LWD</th>
                        <th>Date of Resignation</th>
                        <th>Status</th>
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
                        <td>Emp-0001</td>
                        <td>Umesh Jadhav</td>
                        <td>Teacher</td>
                        <td>13-05-2025</td>
                        <td>13-06-2025</td>
                        <td>Pending</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <select
                              id="action"
                              name="action"
                              className="form-control"
                              required
                              onChange={(e) =>
                                setSelectedAction(e.target.value)
                              }
                              value={selectedAction}
                            >
                              <option value="">Select</option>
                              <option value="Resignation Approval">
                                Resignation Approval
                              </option>
                              <option value="Employee Resignation Details">
                                Employee Resignation Details
                              </option>
                              <option value="Employee Exit Interview">
                                Employee Exit Interview
                              </option>
                            </select>
                            {selectedAction && (
                              <button
                                className="btn btn-light btn-sm"
                                onClick={handleNavigate}
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                            )}
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

export default ResignationReport;
