import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../../ConfirmationDialog.jsx";
import getAPI from "../../../../../api/getAPI.jsx";

const DefineCtcComponentsList = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestPerPage] = useState(5);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch the requests for demo on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getAPI("");
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  // Pagination logic
  const indexOfLastRequest = currentPage * requestPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestPerPage;
  const currentRequests = requests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const totalPages = Math.ceil(requests.length / requestPerPage);

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

  const openDeleteDialog = (request) => {
    setSelectedRequest(request);
    setIsDeleteDialogOpen(true);
    setDeleteType("enquiry");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleDeleteConfirmed = (_id) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== _id)
    );
  };

  const navigateToAddCTCComponents = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/payroll-module/admin-setting/define-ctc-components`
    );
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  Define CTC Components
                </h4>
                <Link
                  onClick={(event) => navigateToAddCTCComponents(event)}
                  className="btn btn-sm btn-primary"
                >
                  Add CTC Components
                </Link>
              </div>

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
                      <th>Define CTC Components</th>
                      <th className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
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
                      <td>Basic Salary</td>

                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            //   onClick={(event) => navigateToViewRequestInfo(event, request)}
                            className="btn btn-light btn-sm"
                          >
                            <iconify-icon
                              icon="solar:eye-broken"
                              className="align-middle fs-18"
                            />
                          </Link>
                          <Link className="btn btn-soft-primary btn-sm">
                            <iconify-icon
                              icon="solar:pen-2-broken"
                              className="align-middle fs-18"
                            />
                          </Link>

                          <Link
                            //   onClick={(e) => { e.preventDefault(); openDeleteDialog(request); }}
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
                  </tbody>
                </table>
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
          id={selectedRequest._id}
          onDeleted={() => handleDeleteConfirmed(selectedRequest._id)}
        />
      )}
    </>
  );
};

export default DefineCtcComponentsList;
