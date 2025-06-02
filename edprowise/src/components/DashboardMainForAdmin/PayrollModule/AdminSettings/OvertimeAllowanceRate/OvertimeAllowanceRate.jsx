import React from "react";

const OvertimeAllowanceRate = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Overtime Allowance Rate
                  </h4>
                  <div>
                    <select
                      id="yearSelect"
                      className="custom-select payroll-table-body border border-dark"
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
                <div className="table-responsive px-lg-6 px-md-5">
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
                        <th>Category</th>
                        <th>Grade</th>
                        <th>Rate per Year</th>
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
                        <td>
                          <div
                            className="col-md-8"
                            style={{ justifySelf: "center" }}
                          >
                            <select
                              id="category"
                              name="category"
                              className="form-control payroll-table-body payroll-input-border"
                              required
                            >
                              <option value="">Select Category</option>
                              <option value="Teaching Staff">
                                Teaching Staff
                              </option>
                              <option value="Non-Teaching Staff">
                                Non-Teaching Staff
                              </option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <div
                            className="col-md-8"
                            style={{ justifySelf: "center" }}
                          >
                            <input
                              type="text"
                              id="grade"
                              name="grade"
                              className="form-control payroll-table-body payroll-input-border"
                              required
                              placeholder="Enter Grade"
                            />
                          </div>
                        </td>

                        <td>
                          <div
                            className="col-md-8"
                            style={{ justifySelf: "center" }}
                          >
                            <input
                              type="text"
                              id="rate"
                              name="rate"
                              className="form-control payroll-table-body payroll-input-border"
                              required
                              placeholder="Enter Rate"
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
                        <td>
                          <div
                            className="col-md-8"
                            style={{ justifySelf: "center" }}
                          >
                            <select
                              id="category"
                              name="category"
                              className="form-control payroll-table-body payroll-input-border"
                              required
                            >
                              <option value="">Select Category</option>
                              <option value="Teaching Staff">
                                Teaching Staff
                              </option>
                              <option value="Non-Teaching Staff">
                                Non-Teaching Staff
                              </option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <div
                            className="col-md-8"
                            style={{ justifySelf: "center" }}
                          >
                            <input
                              type="text"
                              id="grade"
                              name="grade"
                              className="form-control payroll-table-body payroll-input-border"
                              required
                              placeholder="Enter Grade"
                            />
                          </div>
                        </td>

                        <td>
                          <div
                            className="col-md-8"
                            style={{ justifySelf: "center" }}
                          >
                            <input
                              type="text"
                              id="rate"
                              name="rate"
                              className="form-control payroll-table-body payroll-input-border"
                              required
                              placeholder="Enter Rate"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvertimeAllowanceRate;
