import React from "react";
import { Link } from "react-router-dom";
const Form16 = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header d-flex justify-content-between align-items-center gap-1">
                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">
                      Form16
                    </h4>
                  </div>
                </div>
                <div>
                  <div className="table-responsive">
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
                          <th>Employee ID</th>
                          <th>Name of Employee</th>
                          <th>Financial Year</th>
                          <th>Action</th>
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
                          <td>Emp-0001</td>
                          <td>Umesh Jadhav</td>
                          <td>2025-26</td>

                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <Link className="btn btn-light btn-sm">
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-info btn-sm"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                              >
                                <iconify-icon
                                  icon="solar:download-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* end table-responsive */}
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
    </>
  );
};

export default Form16;
