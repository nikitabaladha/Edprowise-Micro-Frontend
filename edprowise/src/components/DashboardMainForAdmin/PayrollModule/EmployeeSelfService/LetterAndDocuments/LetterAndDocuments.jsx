import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const LetterAndDocuments = () => {
  const navigate = useNavigate();
  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(
      `/admin-dashboard/payroll-module/employee-services/letter-documents/add-letter-documents`
    );
  };

  const navigateToView = (event) => {
    event.preventDefault();
    navigate(
      `/admin-dashboard/payroll-module/employee-services/letter-documents/view-letter-documents`
    );
  };

  const navigateToUpdate = (event) => {
    event.preventDefault();
    navigate(
      `/admin-dashboard/payroll-module/employee-services/letter-documents/update-letter-documents`
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex  align-items-center ">
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">
                    Letter And Documents
                  </h4>
                  <Link
                    onClick={(event) => navigateToAdd(event)}
                    className="btn btn-sm btn-primary"
                  >
                    Add New Document
                  </Link>
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
                        <th>Document Title</th>
                        <th>Date of Upload</th>
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
                        <td>Aadhar Card</td>
                        <td>17-05-2025</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-light btn-sm"
                              onClick={(event) => navigateToView(event)}
                            >
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                            <Link
                              className="btn btn-soft-primary btn-sm"
                              onClick={(event) => navigateToUpdate(event)}
                            >
                              <iconify-icon
                                icon="solar:pen-2-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                            <Link className="btn btn-soft-danger btn-sm">
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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

export default LetterAndDocuments;
