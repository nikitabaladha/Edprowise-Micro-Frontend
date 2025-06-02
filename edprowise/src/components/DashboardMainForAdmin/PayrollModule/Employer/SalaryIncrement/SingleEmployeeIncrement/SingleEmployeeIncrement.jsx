import React, { useState } from "react";

const SingleEmployeeIncrement = () => {
  const [showForm, setShowForm] = useState(false);

  const handleProceed = () => {
    setShowForm(true);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center ">
                      Single Employee Increment
                    </h4>
                  </div>
                </div>
                <form onSubmit="">
                  {/* <div className='d-flex'> */}
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
                          required
                          placeholder="Enter Employee ID"
                        />
                      </div>
                    </div>
                    <div
                      className={`col-md-2 ${showForm ? "d-none" : ""}`}
                      style={{ alignContent: "end", textAlign: "center" }}
                    >
                      {/* <div className=""> */}
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

                      <div className="row mb-2 mt-4">
                        <h6 className="card-title custom-heading-font">
                          Enter Increment Details :
                        </h6>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="mb-6">
                            <label
                              htmlFor="incrementPercentage"
                              className="form-label"
                            >
                              Increment %
                            </label>
                            <input
                              type="text"
                              id="incrementPercentage"
                              name="incrementPercentage"
                              className="form-control"
                              required
                              placeholder="Enter Increment Percentage"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="applicableFromDate"
                              className="form-label"
                            >
                              Applicable From
                            </label>
                            <input
                              type="date"
                              id="applicableFromDate"
                              name="applicableFromDate"
                              className="form-control"
                              // value={formData.applicableFromDate}
                              // onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="table-responsive px-lg-5 mb-4">
                        <table className="table text-dark border border-dark mb-4">
                          <thead>
                            <tr className="payroll-table-header">
                              <th className="text-center w-50 align-content-center p-2 border border-dark">
                                Components
                              </th>
                              <th className="text-center w-25 align-content-center p-2 border border-dark">
                                Old Amount
                              </th>
                              <th className="text-center w-25 align-content-center p-2 border border-dark">
                                Revised Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="payroll-table-body">
                              <td className="align-content-center p-2 border border-dark">
                                Basic Salary
                              </td>
                              <td className="text-end align-content-center p-2 border border-dark">
                                10,000
                              </td>
                              <td className="text-end align-content-center p-2 border border-dark">
                                <input
                                  type="number"
                                  id="basicSalary"
                                  name="basicSalary"
                                  className="form-control payroll-table-body text-end payroll-input-border"
                                  required
                                />
                              </td>
                            </tr>

                            <tr className="payroll-table-body">
                              <td className="align-content-center p-2 border border-dark">
                                HRA
                              </td>
                              <td className="text-end align-content-center p-2 border border-dark">
                                5,000
                              </td>
                              <td className="text-end align-content-center p-2 border border-dark">
                                <input
                                  type="number"
                                  id="basicSalary"
                                  name="basicSalary"
                                  className="form-control payroll-table-body text-end payroll-input-border"
                                  required
                                />
                              </td>
                            </tr>

                            <tr className="payroll-table-body">
                              <td className="align-content-center p-2 border border-dark">
                                PF Contribution
                              </td>
                              <td className="text-end align-content-center p-2 border border-dark">
                                1,000
                              </td>
                              <td className="text-end align-content-center p-2 border border-dark">
                                <input
                                  type="number"
                                  id="basicSalary"
                                  name="basicSalary"
                                  className="form-control payroll-table-body text-end payroll-input-border"
                                  required
                                />
                              </td>
                            </tr>

                            <tr className="payroll-table-body it-declaration-section-bg">
                              <td className="align-content-center fw-bold p-2 border border-dark">
                                Total Annual Gross
                              </td>
                              <td className="text-end align-content-center fw-bold p-2 border border-dark">
                                16,000
                              </td>
                              <td className="text-end align-content-center fw-bold p-2 border border-dark">
                                <input
                                  type="number"
                                  id="basicSalary"
                                  name="basicSalary"
                                  className="form-control payroll-table-body text-end payroll-input-border"
                                  required
                                />
                              </td>
                            </tr>

                            <tr className="payroll-table-body">
                              <td className="align-content-center p-2 border border-dark">
                                Gratuity
                              </td>
                              <td className="text-end align-content-center p-2 border border-dark">
                                900
                              </td>
                              <td className="text-end align-content-center p-2 border border-dark">
                                <input
                                  type="number"
                                  id="basicSalary"
                                  name="basicSalary"
                                  className="form-control payroll-table-body text-end payroll-input-border"
                                  required
                                />
                              </td>
                            </tr>

                            <tr className="payroll-table-body it-declaration-section-bg">
                              <td className="align-content-center fw-bold p-2 border border-dark">
                                Annual Cost To Institution
                              </td>
                              <td className="text-end align-content-center fw-bold p-2 border border-dark">
                                16,900
                              </td>
                              <td className="text-end align-content-center fw-bold p-2 border border-dark">
                                <input
                                  type="number"
                                  id="basicSalary"
                                  name="basicSalary"
                                  className="form-control payroll-table-body text-end payroll-input-border"
                                  required
                                />
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
                          Submit for Principal Approval
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
    </>
  );
};

export default SingleEmployeeIncrement;
