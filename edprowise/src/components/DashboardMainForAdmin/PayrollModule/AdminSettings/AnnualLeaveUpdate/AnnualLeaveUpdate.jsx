import React from "react";

const AnnualLeaveUpdate = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Annual Leave Update
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
                        <th style={{ width: 20 }} className="w-lg-10">
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
                        <th className="w-50">Type of Leave</th>
                        <th>Days</th>
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
                        <td>Casual Leave</td>
                        <td>
                          <div
                            className="col-md-8"
                            style={{ justifySelf: "center" }}
                          >
                            <input
                              type="text"
                              id="days"
                              name="days"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                              placeholder="Enter Numbers of Days"
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
                        <td>Sick Leave</td>
                        <td>
                          <div
                            className="col-md-8"
                            style={{ justifySelf: "center" }}
                          >
                            <input
                              type="text"
                              id="days"
                              name="days"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                              placeholder="Enter Numbers of Days"
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
                        <td>Paid Leave</td>
                        <td>
                          <div
                            className="col-md-8"
                            style={{ justifySelf: "center" }}
                          >
                            <input
                              type="text"
                              id="days"
                              name="days"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                              placeholder="Enter Numbers of Days"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="it-declaration-section-bg payroll-table-body">
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
                        <td className="fw-bold">Total</td>
                        <td className="fw-bold">
                          <div
                            className="col-md-8"
                            style={{ justifySelf: "center" }}
                          >
                            <input
                              type="text"
                              id="days"
                              value={"10"}
                              name="days"
                              className="form-control payroll-table-body payroll-input-border fw-bold text-end"
                              required
                              placeholder="Enter Numbers of Days"
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

export default AnnualLeaveUpdate;
