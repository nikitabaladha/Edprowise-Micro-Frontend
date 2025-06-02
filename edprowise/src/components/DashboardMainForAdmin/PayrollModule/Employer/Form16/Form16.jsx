import React from "react";

const Form16 = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2 d-flex align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Form 16
                    </h4>
                    <div>
                      <select
                        id="yearSelect"
                        className="custom-select"
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
                          <th>Employee ID</th>
                          <th>Name of Employee</th>
                          <th>Designation</th>
                          <th>Grade</th>
                          <th>Financial Year</th>
                          <th>Upload Documents</th>
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
                          <td>Emp-0001</td>
                          <td>Umesh Jadhav</td>
                          <td>Teacher</td>
                          <td>A</td>
                          <td>2025-26</td>
                          <td>
                            <div
                              className="col-md-8"
                              style={{ justifySelf: "center" }}
                            >
                              <input
                                type="file"
                                id="documentFile"
                                name="documentFile"
                                className="form-control"
                                accept="image/*,application/pdf"
                              />
                            </div>
                          </td>
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
                  {/* <div className="d-flex justify-content-end mt-3"> */}
                  <div className="text-end mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Submit
                    </button>
                  </div>
                  {/* </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form16;
