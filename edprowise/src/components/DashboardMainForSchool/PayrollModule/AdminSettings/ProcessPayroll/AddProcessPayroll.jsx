import React from "react";

const AddProcessPayroll = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Payroll Process
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="academicYear" className="form-label">
                        Academic Year
                      </label>
                      <input
                        type="text"
                        id="academicYear"
                        name="academicYear"
                        className="form-control"
                        // value={formData.academicYear}
                        // onChange={handleChange}
                        required
                        placeholder="Enter Academic Year"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="month" className="form-label">
                        Month
                      </label>
                      <select
                        id="month"
                        name="categoryOfEmployees"
                        className="form-control"
                        // value={formData.categoryOfEmployee}
                        // onChange={handleChange}
                        required
                      >
                        <option value="">Select Month</option>
                        <option value="January">January</option>
                        <option value="February"> February </option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                  </div>
                </div>
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
                        <th colspan="5" className="border-right-black"></th>
                        <th colspan="4">Days</th>
                        <th colspan="12">Salary Components</th>
                      </tr>
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
                        <th>Employee No</th>
                        <th>Employee Name</th>
                        <th>Grade</th>
                        <th>Designation</th>
                        <th>Category</th>
                        <th>Total Days in A Month</th>
                        <th>Paid Days</th>
                        <th>Regularization Leave</th>
                        <th>Paid Leave Deduction</th>
                        <th>Basic Salary</th>
                        <th>HRA</th>
                        <th>Variable Pay</th>
                        <th>Overtime Allowance</th>
                        <th>Bonus</th>
                        <th>Gross Earning</th>
                        <th>PF Deduction</th>
                        <th>Income Tax</th>
                        <th>Professional Tax</th>
                        <th>Paid Leave Deduction</th>
                        <th>Gross Deduction</th>
                        <th>Net Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
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
                        <td>Emp10</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <div className="mr-2">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Submit For Principal Approval
                    </button>
                  </div>
                  <div className="text" style={{ marginLeft: "2px" }}>
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                    >
                      Proceed For Payment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProcessPayroll;
