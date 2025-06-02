import React, { useState } from "react";
import { toast } from "react-toastify";

const CTCUpdate = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [showForm, setShowForm] = useState(false);

  const validateEmployeeId = (id) => {
    return id.trim().length > 0;
  };

  const handleProceed = () => {
    if (validateEmployeeId(employeeId)) {
      setShowForm(true);
    } else {
      toast.error("Please enter a valid Employee ID.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="payroll-title text-center mb-0">CTC Update</h4>
                </div>
              </div>
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="employeeID" className="form-label">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        id="employeeID"
                        name="employeeID"
                        className="form-control"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                        placeholder="Enter Employee ID"
                      />
                    </div>
                  </div>
                  <div
                    className={`col-md-2 ${showForm ? "d-none" : ""}`}
                    style={{ alignContent: "end", textAlign: "center" }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={handleProceed}
                    >
                      Proceed
                    </button>
                  </div>
                </div>

                {showForm && (
                  <>
                    <div className="row m-0 mb-2 pt-2 salary-slip-box">
                      <div className="col-md-8">
                        <p className="text-dark payroll-box-text">
                          <strong>Employee Name : </strong>Umesh jadhav
                        </p>
                      </div>

                      <div className="col-md-4">
                        <p className="text-dark payroll-box-text">
                          <strong>Employee ID : </strong>Emp-001
                        </p>
                      </div>

                      <div className="col-md-4">
                        <p className="text-dark payroll-box-text">
                          <strong>Designation : </strong> Teacher
                        </p>
                      </div>

                      <div className="col-md-4">
                        <p className="text-dark">
                          <strong>Category of Employees : </strong> Teaching
                          Staff
                        </p>
                      </div>

                      <div className="col-md-4">
                        <p className="text-dark payroll-box-text">
                          <strong> Grade : </strong> A
                        </p>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="table-responsive px-lg-6 px-md-5">
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
                              <th>Components</th>
                              <th>Annual Amounts</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="payroll-table-body">
                              <td>
                                <div className="form-check ms-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                  />
                                  <label className="form-check-label">
                                    &nbsp;
                                  </label>
                                </div>
                              </td>
                              <td>
                                <label
                                  htmlFor="basicSalary"
                                  className="form-label fw-bold"
                                >
                                  Basic Salary{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                {/* <p>Basic Salary</p> */}
                              </td>
                              <td>
                                <div
                                  className="col-md-8"
                                  style={{ justifySelf: "center" }}
                                >
                                  <input
                                    type="number"
                                    id="basicSalary"
                                    name="basicSalary"
                                    className="form-control payroll-table-body payroll-input-border"
                                    required
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr className="payroll-table-body">
                              <td>
                                <div className="form-check ms-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                  />
                                  <label className="form-check-label">
                                    &nbsp;
                                  </label>
                                </div>
                              </td>
                              <td>
                                <label
                                  htmlFor="HRA"
                                  className="form-label fw-bold"
                                >
                                  HRA <span className="text-danger">*</span>
                                </label>
                                {/* <p>Basic Salary</p> */}
                              </td>
                              <td>
                                <div
                                  className="col-md-8"
                                  style={{ justifySelf: "center" }}
                                >
                                  <input
                                    type="number"
                                    id="HRA"
                                    name="HRA"
                                    className="form-control payroll-table-body payroll-input-border"
                                    required
                                  />
                                </div>
                              </td>
                            </tr>

                            <tr className="payroll-table-body">
                              <td>
                                <div className="form-check ms-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                  />
                                  <label className="form-check-label">
                                    &nbsp;
                                  </label>
                                </div>
                              </td>
                              <td>
                                <label
                                  htmlFor="pfContribution"
                                  className="form-label fw-bold"
                                >
                                  PF Contribution{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                {/* <p>Basic Salary</p> */}
                              </td>
                              <td>
                                <div
                                  className="col-md-8"
                                  style={{ justifySelf: "center" }}
                                >
                                  <input
                                    type="number"
                                    id="pfContribution"
                                    name="pfContribution"
                                    className="form-control payroll-table-body payroll-input-border"
                                    required
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr className="payroll-table-body">
                              <td>
                                <div className="form-check ms-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                  />
                                  <label className="form-check-label">
                                    &nbsp;
                                  </label>
                                </div>
                              </td>
                              <td>
                                <label
                                  htmlFor="totalAnnualGross"
                                  className="form-label fw-bold"
                                >
                                  Total Annual Gross{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                {/* <p>Basic Salary</p> */}
                              </td>
                              <td>
                                <div
                                  className="col-md-8"
                                  style={{ justifySelf: "center" }}
                                >
                                  <input
                                    type="number"
                                    id="totalAnnualGross"
                                    name="totalAnnualGross"
                                    className="form-control payroll-table-body payroll-input-border"
                                    required
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="form-check ms-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                  />
                                  <label className="form-check-label">
                                    &nbsp;
                                  </label>
                                </div>
                              </td>
                              <td>
                                <label
                                  htmlFor="gratuity"
                                  className="form-label fw-bold"
                                >
                                  Gratuity{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                {/* <p>Basic Salary</p> */}
                              </td>
                              <td>
                                <div
                                  className="col-md-8"
                                  style={{ justifySelf: "center" }}
                                >
                                  <input
                                    type="number"
                                    id="gratuity"
                                    name="gratuity"
                                    className="form-control payroll-table-body payroll-input-border"
                                    required
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr className="payroll-table-body">
                              <td>
                                <div className="form-check ms-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                  />
                                  <label className="form-check-label">
                                    &nbsp;
                                  </label>
                                </div>
                              </td>
                              <td>
                                <label
                                  htmlFor="annualCostToInstitution"
                                  className="form-label fw-bold"
                                >
                                  Annual Cost To Institution{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                {/* <p>Basic Salary</p> */}
                              </td>
                              <td>
                                <div
                                  className="col-md-8"
                                  style={{ justifySelf: "center" }}
                                >
                                  <input
                                    type="number"
                                    id="annualCostToInstitution"
                                    name="annualCostToInstitution"
                                    className="form-control payroll-table-body payroll-input-border"
                                    required
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* Add more form fields here */}
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
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTCUpdate;
