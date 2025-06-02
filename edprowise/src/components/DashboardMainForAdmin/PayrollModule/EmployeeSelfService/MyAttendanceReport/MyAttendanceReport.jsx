import React, { useState } from "react";
import { Link } from "react-router-dom";
const MyAttendanceReport = () => {
  const [showForm, setShowForm] = useState(false);

  const [filterType, setFilterType] = useState(null);

  const handleProceed = (type) => {
    setFilterType(type);
    setShowForm(true);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              {/* <div className="container">
                                <div className="card-header d-flex align-items-center gap-1 mb-2">
                                    <h4 className="payroll-title text-center mb-0">
                                        Attendance Report
                                    </h4>

                                    <Link className="text-primary text-end ">
                                        Export
                                        <i className="bx bx-export ms-1"></i>
                                    </Link>

                                </div>
                            </div> */}
              <div className="container">
                <div className="card-header d-flex align-items-center justify-content-between mb-2">
                  <div className="flex-grow-1 text-center">
                    <h4 className="payroll-title mb-0">Attendance Report</h4>
                  </div>
                  <Link className="text-primary text-end ms-3">
                    Export
                    <i className="bx bx-export ms-1"></i>
                  </Link>
                </div>
              </div>

              <form onSubmit="">
                <div className="row salary-slip-box m-0 mb-2">
                  <div className="col-md-7">
                    <p className="text-dark payroll-box-text my-2">
                      <strong>Employee ID :</strong> EMP-0001
                    </p>
                  </div>

                  <div className="col-md-5">
                    <p className="text-dark payroll-box-text my-2">
                      <strong>Employee Name :</strong> Umesh Jadhav
                    </p>
                  </div>
                </div>

                <div className="row border border-dark m-0 my-2">
                  <div className="col-md-6 border border-dark">
                    <p className="text-dark payroll-box-text my-2">
                      <strong>By Months :</strong>
                    </p>

                    <p className="text-dark my-2">
                      <div className="d-flex flex-wrap fw-bold align-items-center payroll-table-body gap-3">
                        <label
                          for="yearSelect"
                          className="mb-0 fw-bold payroll-box-text"
                        >
                          Year :
                        </label>
                        <select
                          id="yearSelect"
                          className="custom-select"
                          aria-label="Select Year"
                        >
                          <option selected>2025</option>
                          <option>2026</option>
                          <option>2027</option>
                          <option>2028</option>
                          <option>2029</option>
                        </select>

                        <label
                          for="monthSelect "
                          className="mb-0 payroll-box-text fw-bold"
                        >
                          Month :
                        </label>
                        <select
                          id="monthSelect"
                          className="custom-select"
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
                          <option>December</option>
                        </select>
                      </div>
                    </p>

                    <p className="text-dark text-end my-2">
                      <div className="text-end">
                        <button
                          type="button"
                          className={`btn btn-primary custom-submit-button ${
                            showForm ? "d-none" : ""
                          }`}
                          onClick={() => handleProceed("month")}
                        >
                          Show Attendance
                        </button>
                      </div>
                    </p>
                  </div>

                  <div className="col-md-6 border border-dark">
                    <p className="text-dark payroll-box-text my-2">
                      <strong>By Date :</strong>
                    </p>

                    <p className="text-dark my-2">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="leaveStartDate"
                              className="form-label fw-bold"
                            >
                              Date From <span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              id="leaveStartDate"
                              name="leaveStartDate"
                              className="form-control"
                              // value={formData.leaveStartDate}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="leaveEndDate"
                              className="form-label fw-bold"
                            >
                              Date To <span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              id="leaveEndDate"
                              name="leaveEndDate"
                              className="form-control"
                              // value={formData.leaveEndDate}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </p>

                    <p className="text-dark text-end my-2">
                      <div className="text-end">
                        <button
                          type="button"
                          className={`btn btn-primary custom-submit-button ${
                            showForm ? "d-none" : ""
                          }`}
                          onClick={() => handleProceed("custom")}
                        >
                          Show Attendance
                        </button>
                      </div>
                    </p>
                  </div>
                </div>

                {showForm && (
                  <>
                    <div className="table-responsive my-4">
                      <table className="table border text-dark border-dark mb-4">
                        <thead>
                          <tr className="payroll-table-header">
                            <th className="text-center align-content-center border border-dark p-2">
                              Date
                            </th>
                            <th className="text-center align-content-center border border-dark p-2">
                              Day
                            </th>
                            <th className="text-center align-content-center border border-dark p-2">
                              In Time
                            </th>
                            <th className="text-center align-content-center border border-dark p-2">
                              Out Time
                            </th>
                            <th className="text-center align-content-center border border-dark p-2">
                              No.of Hours
                            </th>
                            <th className="text-center align-content-center border border-dark p-2">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="payroll-table-body">
                            <td className="text-center align-content-center border border-dark p-2">
                              07-05-2025
                            </td>
                            <td className="text-center align-content-center border border-dark p-2">
                              Monday
                            </td>
                            <td className="text-center align-content-center border border-dark p-2">
                              9:00 AM
                            </td>
                            <td className="text-center align-content-center border border-dark p-2">
                              3:00 PM
                            </td>
                            <td className="text-center align-content-center border border-dark p-2">
                              6
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

export default MyAttendanceReport;
