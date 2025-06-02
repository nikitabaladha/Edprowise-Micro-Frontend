import React, { useState } from "react";

const EmployeeExitInterview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="payroll-title text-center mb-0">
                    Exit Interview
                  </h4>
                </div>
              </div>

              <div className="row m-0 mb-2 pt-2 salary-slip-box">
                <div className="col-md-8">
                  <p className="text-dark payroll-box-text">
                    <strong>Employee Name : </strong>Umesh jadhav
                  </p>

                  <p className="text-dark payroll-box-text">
                    <strong>Resignation Date : </strong>Umesh jadhav
                  </p>
                </div>

                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Employee ID : </strong>Emp-001
                  </p>
                  <p className="text-dark payroll-box-text">
                    <strong>LWD : </strong>Emp-001
                  </p>
                </div>
              </div>
              <form onSubmit="">
                <div className="table-responsive mb-2">
                  <table className="table border border-dark text-dark mb-2">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center align-content-center w-60 border border-dark p-2">
                          Questions
                        </th>

                        <th className="text-center align-content-center w-40 border border-dark p-2">
                          Answer
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          How long were you thinking about leaving the school
                        </td>
                        <td className="align-content-center text-center p-2 border border-dark">
                          <div className="row">
                            <div className="col-md-6">
                              <select
                                id="monthSelect"
                                className="custom-select payroll-table-body payroll-input-border"
                                aria-label="Select Month"
                              >
                                <option selected>January</option>
                                <option>February</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December.</option>
                              </select>
                            </div>
                            <div className="col-md-6">
                              <select
                                id="yearSelect"
                                className="custom-select payroll-table-body payroll-input-border"
                                aria-label="Select Year"
                              >
                                <option selected>2025</option>
                                <option>2026</option>
                                <option>2027</option>
                                <option>2028</option>
                                <option>2029</option>
                              </select>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          What did you like most about working with the School?
                        </td>
                        <td className="align-content-center text-end p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>

                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          What would you recommend us to do better and how?
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>

                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Would you recommend our school to a friend as a good
                          place to work?
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <select
                            id="physicalHandicap"
                            name="physicalHandicap"
                            className="form-control payroll-table-body payroll-input-border"
                            // value={formData.physicalHandicap}
                            // onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          How would you rate your relationship with your
                          Principal?
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <div
                            className="star-rating"
                            style={{ display: "flex" }}
                          >
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className="star"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                style={{
                                  cursor: "pointer",
                                  fontSize: "2rem",
                                  color:
                                    star <= (hover || rating)
                                      ? "#ffc107"
                                      : "#e4e5e9",
                                  marginRight: "0.5rem",
                                  transition: "color 0.2s",
                                }}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>

                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Is the required level/designation offered?
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <select
                            id="physicalHandicap"
                            name="physicalHandicap"
                            className="form-control payroll-table-body payroll-input-border"
                            // value={formData.physicalHandicap}
                            // onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Is the required compensation offered?
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <select
                            id="physicalHandicap"
                            name="physicalHandicap"
                            className="form-control payroll-table-body payroll-input-border"
                            // value={formData.physicalHandicap}
                            // onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          What is the compensation increase being offered?
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Could anything be done to improve your experience with
                          the school
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Submission Date
                        </td>
                        <td className="text-start align-content-center p-2 border border-dark">
                          <input
                            type="date"
                            className="form-control payroll-table-body payroll-input-border text-start "
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

export default EmployeeExitInterview;
