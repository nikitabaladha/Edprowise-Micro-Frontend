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
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    CTC Update
                  </h4>
                </div>
              </div>
              <form>
                <div className="row mb-3">
                  <div className="col-md-12">
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
                </div>
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={handleProceed}
                  >
                    Proceed
                  </button>
                </div>
                {showForm && (
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name Of Employee
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          // value={FormData.name}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="grade" className="form-label">
                          Grade
                        </label>
                        <input
                          type="text"
                          id="grade"
                          name="grade"
                          // value={FormData.grade}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="designation" className="form-label">
                          Designation
                        </label>
                        <input
                          type="text"
                          id="designation"
                          name="designation"
                          // value={FormData.designation}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="categoryOfEmployees"
                          className="form-label"
                        >
                          Category Of Employees
                        </label>
                        <input
                          type="text"
                          id="categoryOfEmployees"
                          name="categoryOfEmployees"
                          // value={FormData.grade}
                          className="form-control"
                          required
                        />
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
                            <th>Components</th>
                            <th>Annual Amounts</th>
                          </tr>
                        </thead>
                        <tbody>
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
                                htmlFor="basicSalary"
                                className="form-label"
                                style={{ fontSize: "18px" }}
                              >
                                Basic Salary
                              </label>
                              {/* <p>Basic Salary</p> */}
                            </td>
                            <td>
                              <input
                                type="number"
                                id="basicSalary"
                                name="basicSalary"
                                className="form-control"
                                required
                              />
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
                                htmlFor="HRA"
                                className="form-label"
                                style={{ fontSize: "18px" }}
                              >
                                HRA
                              </label>
                              {/* <p>Basic Salary</p> */}
                            </td>
                            <td>
                              <input
                                type="number"
                                id="HRA"
                                name="HRA"
                                className="form-control"
                                required
                              />
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
                                htmlFor="pfContribution"
                                className="form-label"
                                style={{ fontSize: "18px" }}
                              >
                                PF Contribution
                              </label>
                              {/* <p>Basic Salary</p> */}
                            </td>
                            <td>
                              <input
                                type="number"
                                id="pfContribution"
                                name="pfContribution"
                                className="form-control"
                                required
                              />
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
                                htmlFor="totalAnnualGross"
                                className="form-label"
                                style={{ fontSize: "18px" }}
                              >
                                Total Annual Gross
                              </label>
                              {/* <p>Basic Salary</p> */}
                            </td>
                            <td>
                              <input
                                type="number"
                                id="totalAnnualGross"
                                name="totalAnnualGross"
                                className="form-control"
                                required
                              />
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
                                className="form-label"
                                style={{ fontSize: "18px" }}
                              >
                                Gratuity
                              </label>
                              {/* <p>Basic Salary</p> */}
                            </td>
                            <td>
                              <input
                                type="number"
                                id="gratuity"
                                name="gratuity"
                                className="form-control"
                                required
                              />
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
                                htmlFor="annualCostToInstitution"
                                className="form-label"
                                style={{ fontSize: "18px" }}
                              >
                                Annual Cost To Institution
                              </label>
                              {/* <p>Basic Salary</p> */}
                            </td>
                            <td>
                              <input
                                type="number"
                                id="annualCostToInstitution"
                                name="annualCostToInstitution"
                                className="form-control"
                                required
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* Add more form fields here */}
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
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
