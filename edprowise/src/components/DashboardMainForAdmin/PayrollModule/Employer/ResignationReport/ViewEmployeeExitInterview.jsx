import React from "react";
import { useNavigate } from "react-router-dom";

const ViewEmployeeExitInterview = () => {
  const navigate = useNavigate();
  const rating = 4;
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title text-center flex-grow-1">
                    Exit Interview Details
                  </h4>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
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
                              <input
                                type="text"
                                className="form-control payroll-table-body payroll-input-border text-start "
                                required
                                value={"May"}
                              />
                            </div>
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="form-control payroll-table-body payroll-input-border text-start "
                                required
                                value={"2025"}
                              />
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
                            value={"qsnjnj nsdn snfsjdn sngjdn"}
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
                            value={"zbvzb b bjad "}
                          />
                        </td>
                      </tr>

                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Would you recommend our school to a friend as a good
                          place to work?
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                            value={"Yes"}
                          />
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
                                style={{
                                  fontSize: "2rem",
                                  color: star <= rating ? "#ffc107" : "#e4e5e9",
                                  marginRight: "0.5rem",
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
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                            value={"Yes"}
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Is the required compensation offered?
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                            value={"Yes"}
                          />
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
                            value={"10,000"}
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
                            value={"No yet"}
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Submission Date
                        </td>
                        <td className="text-start align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                            value={"15-05-2025"}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeExitInterview;
