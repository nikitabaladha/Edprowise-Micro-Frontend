import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import ConfirmationDialog from "../../ConfirmationDialog.jsx";
import { exportToExcel } from "../../export-excel.jsx";
const SubscriptionTable = ({
  subscription,
  setSubscription,
  selectedSubscription,
  setSelectedsubscription,
}) => {
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");

  const openDeleteDialog = (subscription) => {
    setSelectedsubscription(subscription);
    setIsDeleteDialogOpen(true);
    setDeleteType("subscription");
  };

  const handleDeleteConfirmed = (id) => {
    setSubscription((prevSubscription) =>
      prevSubscription.filter((subscription) => subscription.id !== id)
    );
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedsubscription(null);
  };

  const navigateToAddNewSchool = (event) => {
    event.preventDefault();
    navigate(`/admin-dashboard/subscriptions/add-new-subscriptions`);
  };

  const navigateToViewSubscription = (event, subscriptions, id) => {
    event.preventDefault();
    navigate(`/admin-dashboard/subscriptions/view-subscriptions`, {
      state: { subscriptions, subscriptionId: id },
    });
  };

  const navigateToUpdateSubscription = (event, subscriptions) => {
    event.preventDefault();
    navigate(`/admin-dashboard/subscriptions/update-subscriptions`, {
      state: { subscriptions },
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [subscriptionPerPage] = useState(10);

  const indexOfLastSubscription = currentPage * subscriptionPerPage;
  const indexOfFirstSubscription =
    indexOfLastSubscription - subscriptionPerPage;
  const currentSubscription = subscription.slice(
    indexOfFirstSubscription,
    indexOfLastSubscription
  );

  const totalPages = Math.ceil(subscription.length / subscriptionPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageRange = 1;

  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);

  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handleExport = () => {
    const filteredData = subscription.map((sus) => ({
      Id: sus.id,
      SubscriptionFor: sus.subscriptionFor,
      StartDate: sus.subscriptionStartDate,
      NoOfMonth: sus.subscriptionNoOfMonth,
      MonthlyRate: sus.monthlyRate,
      SchoolId: sus.schoolId,
      sID: sus.sID,
      SchoolName: sus.schoolName,
      SchoolMobileNo: sus.schoolMobileNo,
      SchoolEmail: sus.schoolEmail,
      SchoolAddress: sus.schoolAddress,
      SchoolLocation: sus.schoolLocation,
    }));

    exportToExcel(filteredData, "Subscriptions", "Subscriptions Data");
  };

  return (
    <>
      {" "}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  All Subscription List
                </h4>
                <Link
                  onClick={(event) => navigateToAddNewSchool(event)}
                  className="btn btn-sm btn-primary"
                >
                  Add Subscription
                </Link>

                <div className="text-end">
                  <Link
                    onClick={handleExport}
                    className="btn btn-sm btn-outline-light"
                  >
                    Export
                  </Link>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
                    <thead className="bg-light-subtle">
                      <tr>
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
                        <th>School Id</th>
                        <th className="text-start">School Name</th>
                        <th>School Mobile No</th>
                        <th>Subscription Module</th>
                        <th className="text-start">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSubscription.map((subscriptions) => (
                        <tr key={subscriptions.id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customCheck2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customCheck2"
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>{subscriptions.schoolId}</td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="rounded bg-light d-flex align-items-center justify-content-center">
                                <img
                                  src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${subscriptions.profileImage}`}
                                  alt={`${subscriptions.schoolName} Profile`}
                                  className="avatar-md"
                                  style={{
                                    objectFit: "cover",
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "10px",
                                  }}
                                />
                              </div>
                              <div>{subscriptions.schoolName}</div>
                            </div>
                          </td>
                          <td>{subscriptions.schoolMobileNo}</td>
                          <td>{subscriptions.subscriptionFor}</td>

                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                onClick={(event) =>
                                  navigateToViewSubscription(
                                    event,
                                    subscriptions,
                                    subscriptions.id
                                  )
                                }
                                className="btn btn-light btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                onClick={(event) =>
                                  navigateToUpdateSubscription(
                                    event,
                                    subscriptions
                                  )
                                }
                                className="btn btn-soft-primary btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                onClick={(e) => {
                                  e.preventDefault();
                                  openDeleteDialog(subscriptions);
                                }}
                                className="btn btn-soft-danger btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
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
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {pagesToShow.map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className={`page-link pagination-button ${
                            currentPage === page ? "active" : ""
                          }`}
                          onClick={() => handlePageClick(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
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
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedSubscription.id}
          onDeleted={() => handleDeleteConfirmed(selectedSubscription.id)}
        />
      )}
    </>
  );
};

export default SubscriptionTable;
