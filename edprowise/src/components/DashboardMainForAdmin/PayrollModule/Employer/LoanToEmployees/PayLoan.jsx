import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const PayLoan = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Pay Loan to Employee
                  </h4>
                  <button
                    type="button "
                    className="btn btn-primary ms-2 custom-submit-button"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form onSubmit="">
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
                        value={"Emp-001"}
                        required
                        placeholder="Enter Employee ID"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Employee Name
                      </label>
                      <input
                        type="text"
                        id=""
                        name=""
                        value={"Umesh Jadhav"}
                        className="form-control"
                        required
                        placeholder="Enter Employee Name"
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
                        value={"A"}
                        className="form-control"
                        required
                        placeholder="Enter Grade"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="jobDesignation" className="form-label">
                        Job Designation
                      </label>
                      <input
                        type="text"
                        id="jobDesignation"
                        name="jobDesignation"
                        value={"Teacher"}
                        className="form-control"
                        required
                        placeholder="Enter Job Designation"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="loanType" className="form-label">
                        Loan Type
                      </label>
                      <input
                        type="text"
                        id="loanType"
                        name="loanType"
                        value={"Personal Loan"}
                        className="form-control"
                        required
                        placeholder="Enter Loan Type"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="loanAmount" className="form-label">
                        Loan Amount
                      </label>
                      <input
                        type="text"
                        id="loanAmount"
                        name="loanAmount"
                        value={"15,000"}
                        className="form-control"
                        required
                        placeholder="Enter Loan Amount"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="rateOfInterest" className="form-label">
                        Rate of Interest
                      </label>
                      <input
                        type="text"
                        id="rateOfInterest"
                        name="rateOfInterest"
                        value={"8%"}
                        className="form-control"
                        required
                        placeholder="Enter Rate Of Interest"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="form-control"
                        // value={formData.startDate}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="endDate" className="form-label">
                        End Date
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="form-control"
                        // value={formData.endDate}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-6">
                      <label htmlFor="periodOfLoan" className="form-label">
                        Period of Loan (Months)
                      </label>
                      <input
                        type="text"
                        id="periodOfLoan"
                        name="periodOfLoan"
                        value={"6"}
                        className="form-control"
                        required
                        placeholder="Enter Period Of Loan"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Approve Loan
                  </button>

                  <button
                    type="button "
                    className="btn btn-danger ms-2 custom-submit-button"
                  >
                    Reject Loan
                  </button>
                </div>

                <div className="container px-0 mt-2">
                  <div className="card-header px-0">
                    <h4 className="card-title text-start custom-heading-font ">
                      Recovery Plan :
                    </h4>
                  </div>
                </div>

                <div className="table-responsive">
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
                        <th>Installment</th>
                        <th>Date</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>EMI</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="payroll-table-body">
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
                        <td>Installment-1</td>
                        <td>10-05-2025</td>
                        <td>15,000</td>
                        <td>9</td>
                        <td>1000</td>
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

                <div className="text-end mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Proceed for Payment
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

export default PayLoan;
