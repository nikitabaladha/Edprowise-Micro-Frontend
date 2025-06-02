import React from "react";
import CreatableSelect from "react-select/creatable";

const RequestForLoan = () => {
  const loanTypes = [
    { label: "Home Loan", value: "Home Loan" },
    { label: "Personal Loan", value: "Personal Loan" },
    { label: "Education Loan", value: "Education Loan" },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center">Request for Loan</h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="employeeID" className="form-label">
                        Employee ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="employeeID"
                        name="employeeID"
                        className="form-control"
                        required
                        value={"EMP-001"}
                        placeholder="Enter Employee ID"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Employee Name <span className="text-danger">*</span>
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

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="loanType" className="form-label">
                        Loan Type <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        options={loanTypes}
                        placeholder="Select Loan Type"
                        isSearchable
                        classNamePrefix="react-select"
                        className="custom-react-select"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="loanAmount" className="form-label">
                        Loan Amount <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="loanAmount"
                        name="loanAmount"
                        className="form-control"
                        required
                        placeholder="Enter Loan Amount"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">
                        Start Date <span className="text-danger">*</span>
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
                        End Date <span className="text-danger">*</span>
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
                        Period of Loan (Months){" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="periodOfLoan"
                        name="periodOfLoan"
                        className="form-control"
                        required
                        placeholder="Enter Period of Loan"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-6">
                      <label htmlFor="purposeOfLoan" className="form-label">
                        Purpose of Loan <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="purposeOfLoan"
                        name="purposeOfLoan"
                        className="form-control"
                        required
                        placeholder="Enter Purpose of Loan"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit
                  </button>
                </div>
              </form>

              <div className="container px-0 mt-2">
                <div className="card-header px-0">
                  <h4 className="card-title text-start custom-heading-font ">
                    Requested Loan Details :
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
                      <th>Loan Type</th>
                      <th>Loan Amount</th>
                      <th>Apply Date</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Period of Loan</th>
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
                      <td> Personal Loan</td>
                      <td> 15,000</td>
                      <td>10-05-2025</td>
                      <td>12-05-2025</td>
                      <td>12-11-2025</td>
                      <td>6</td>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForLoan;
