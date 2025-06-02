import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const GenerateLeaveReportModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Body className="modal-body-scrollable">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body custom-heading-padding">
                  <div className="container">
                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Generate Leave Report
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-2">
                        <label htmlFor="entity" className="form-label">
                          Entity
                        </label>
                        <select
                          id="entity"
                          name="entity"
                          className="form-control"
                          required
                        >
                          <option value="">Select Entity</option>
                          <option value="All">All</option>
                          <option value="Some">Some</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-2">
                        <label htmlFor="leaveYear" className="form-label">
                          Leave Accounting Year
                        </label>
                        <select
                          id="leaveYear"
                          name="leaveYear"
                          className="form-control"
                          required
                        >
                          <option value="">Select Year</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-end mt-3">
                      <Button
                        variant="secondary"
                        onClick={onClose}
                        className="me-2"
                      >
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          // Handle report generation here
                          onClose();
                        }}
                      >
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ApplyForLeave = () => {
  const [showReportModal, setShowReportModal] = useState(false);

  const handleGenerateReport = () => {
    setShowReportModal(true);
  };

  const handleCloseModal = () => {
    setShowReportModal(false);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body pb-0">
              {/* <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="text-center payroll-title">
                                        Ap Leave
                                    </h4>
                                </div>
                            </div> */}

              <div className="row m-0 salary-slip-box pt-2 my-2">
                <div className="col-md-8">
                  <p className="text-dark payroll-box-text">
                    <strong>Employee ID : </strong> EMP-001
                  </p>
                </div>

                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Employee Name : </strong> Umesh Jadhav
                  </p>
                </div>

                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Grade : </strong> A
                  </p>
                </div>

                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Year : </strong> 2025-26
                  </p>
                </div>

                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Job Designation :</strong> Teacher
                  </p>
                </div>
              </div>

              <div className="container ps-0">
                <div className="card-header px-0 mb-1">
                  <h4 className="text-start mb-0 payroll-title">
                    Leave Balance :
                  </h4>
                </div>
              </div>

              {/* <h4 className="payroll-title pt-4 mb-2 text-center">

                            </h4> */}
              <div className="table-responsive pb-4">
                <table className="table text-dark border border-dark mb-1">
                  <thead>
                    <tr className="payroll-table-header">
                      <th className="text-center align-content-center border border-dark p-2">
                        Leave Type
                      </th>
                      <th className="text-center align-content-center border border-dark p-2">
                        Carry Forward
                      </th>
                      <th className="text-center align-content-center border border-dark p-2">
                        Entitled Leave
                      </th>
                      <th className="text-center align-content-center border border-dark p-2">
                        Availed Leave
                      </th>
                      <th className="text-center align-content-center border border-dark p-2">
                        Balance Leave
                      </th>
                      <th className="text-center align-content-center border border-dark p-2">
                        Leave Pending for Approval
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="payroll-table-body">
                      <td className="text-center align-content-center border border-dark p-2">
                        Leave Without Pay
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        0
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        0
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        0
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        0
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        0
                      </td>
                    </tr>

                    <tr className="payroll-table-body">
                      <td className="text-center align-content-center border border-dark p-2">
                        Optional Holiday
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        0
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        2
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        0
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        2
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        0
                      </td>
                    </tr>

                    <tr className="payroll-table-body">
                      <td className="text-center align-content-center border border-dark p-2">
                        Earned Leave
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        12
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        1
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        0
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        13
                      </td>
                      <td className="text-end align-content-center border border-dark p-2">
                        0
                      </td>
                    </tr>

                    <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                      <td className="text-center align-content-center fw-bold border border-dark p-2">
                        Total Leave
                      </td>
                      <td className="text-end align-content-center fw-bold border border-dark p-2">
                        12
                      </td>
                      <td className="text-end align-content-center fw-bold border border-dark p-2">
                        3
                      </td>
                      <td className="text-end align-content-center fw-bold border border-dark p-2">
                        0
                      </td>
                      <td className="text-end align-content-center fw-bold border border-dark p-2">
                        15
                      </td>
                      <td className="text-end align-content-center fw-bold border border-dark p-2">
                        0
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="payroll-box-line m-0" />

            <div className="card-body">
              <div className="container ps-0">
                <div className="card-header px-0 mb-1">
                  <h4 className="text-start mb-0 payroll-title">
                    Leave Details :
                  </h4>
                </div>
              </div>

              <div className="table-responsive pb-4">
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
                      <th>Type of Leave</th>
                      <th>Apply Date</th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Leave Days</th>

                      <th>Status</th>
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
                      <td> Optional Holiday</td>
                      <td>10-05-2025</td>
                      <td>12-05-2025</td>
                      <td>14-05-2025</td>
                      <td>2</td>

                      <td>Approved</td>
                    </tr>
                  </tbody>
                </table>
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
            <div className="payroll-box-line m-0" />
            <div className="card-body">
              <div className="container ps-0">
                <div className="card-header px-0 mb-1">
                  <h4 className="text-center mb-0 payroll-title">
                    Apply for Leave
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="leaveFor" className="form-label">
                        Select Leave <span className="text-danger">*</span>
                      </label>
                      <select
                        id="leaveFor"
                        name="leaveFor"
                        className="form-control"
                        required
                      >
                        <option value="">Select Leave</option>
                        <option value="Non-Casual Leave">
                          Non-Casual Leave
                        </option>
                        <option value="Casual Leave">Casual Leave</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="leaveReason" className="form-label">
                        Reason for Leave <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="leaveReason"
                        name="leaveReason"
                        className="form-control"
                        required
                        placeholder="Write Leave Reason"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="leaveStartDate" className="form-label">
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
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="leaveEndDate" className="form-label">
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

                  <div className="col-md-4">
                    <div className="mb-6">
                      <label
                        htmlFor="numberOfDayOnLeave"
                        className="form-label"
                      >
                        Number of Leave Days{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="numberOfDayOnLeave"
                        name="numberOfDayOnLeave"
                        className="form-control"
                        required
                        placeholder="Enter Number of Leave Days"
                      />
                    </div>
                  </div>
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
            <div className="payroll-box-line m-0 " />
            <div className="card-body">
              <div className="container ps-0">
                <div className="card-header px-0 mb-1">
                  <h4 className="text-center  mb-0 payroll-title">
                    Generate Leave Report
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="leaveStartDate" className="form-label">
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
                      <label htmlFor="leaveEndDate" className="form-label">
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
                  <div className="text-end">
                    <button
                      type="button"
                      onClick={handleGenerateReport}
                      className="btn btn-primary me-2 custom-submit-button"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <GenerateLeaveReportModal
        show={showReportModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ApplyForLeave;
