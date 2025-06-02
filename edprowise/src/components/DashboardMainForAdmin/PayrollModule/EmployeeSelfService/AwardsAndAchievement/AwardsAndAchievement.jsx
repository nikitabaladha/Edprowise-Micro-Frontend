import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AwardsAndAchievement = () => {
  const navigate = useNavigate();
  const navigateToRegisterEmployee = (event) => {
    event.preventDefault();
    navigate(
      `/admin-dashboard/payroll-module/employee-services/award-achievement/add-award-achievement`
    );
  };

  const navigateToView = (event) => {
    event.preventDefault();
    navigate(
      `/admin-dashboard/payroll-module/employee-services/award-achievement/view-award-achievement`
    );
  };

  const navigateToUpdate = (event) => {
    event.preventDefault();
    navigate(
      `/admin-dashboard/payroll-module/employee-services/award-achievement/update-award-achievement`
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">
                    Awards And Achievement
                  </h4>
                  <Link
                    onClick={(event) => navigateToRegisterEmployee(event)}
                    className="btn btn-sm btn-primary"
                  >
                    Add New Achievement
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
                        <th>Achievement Title</th>
                        <th>Date of Receive</th>
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
                        <td>Best Teacher</td>
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
  );
};

export default AwardsAndAchievement;
