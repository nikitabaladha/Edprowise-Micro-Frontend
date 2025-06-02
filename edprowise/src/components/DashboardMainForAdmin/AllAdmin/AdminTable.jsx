import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import getAPI from "../../../api/getAPI.jsx";

import ConfirmationDialog from "../../ConfirmationDialog.jsx";
import { exportToExcel } from "../../export-excel.jsx";
const SubscriptionTable = () => {
  const navigate = useNavigate();

  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const fetchAdminData = async () => {
    try {
      const response = await getAPI(
        `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/get-all-admin`,
        {},
        true
      );
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setAdmins(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Admin List:", err);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");

  const openDeleteDialog = (admin) => {
    setSelectedAdmin(admin);
    setIsDeleteDialogOpen(true);
    setDeleteType("admin");
  };

  const handleDeleteConfirmed = (_id) => {
    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin._id !== _id));
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedAdmin(null);
  };

  const navigateToAddNewAdmin = (event) => {
    event.preventDefault();
    navigate(`/admin-dashboard/admins/add-new-admin`);
  };

  const navigateToUpdateAdmin = (event, admin) => {
    event.preventDefault();
    navigate(`/admin-dashboard/admins/update-admin`, {
      state: { admin },
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [adminPerPage] = useState(10);

  const indexOfLastAdmin = currentPage * adminPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminPerPage;
  const currentAdmin = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  const totalPages = Math.ceil(admins.length / adminPerPage);

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

  const handleExport = () => {};

  return (
    <>
      {" "}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">All Admin List</h4>
                <Link
                  onClick={(event) => navigateToAddNewAdmin(event)}
                  className="btn btn-sm btn-primary"
                >
                  Add Admin
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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th className="text-start">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAdmin.map((admin) => (
                        <tr key={admin._id}>
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
                          <td>{admin.firstName}</td>
                          <td>{admin.lastName}</td>
                          <td>{admin.email}</td>
                          <td>********</td>

                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                onClick={(event) =>
                                  navigateToUpdateAdmin(event, admin)
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
                                  openDeleteDialog(admin);
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
          id={selectedAdmin._id}
          onDeleted={() => handleDeleteConfirmed(selectedAdmin._id)}
        />
      )}
    </>
  );
};

export default SubscriptionTable;
