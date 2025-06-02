import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../../ConfirmationDialog.jsx";
import getAPI from "../../../api/getAPI.jsx";

const ViewRequestsForDemo = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]); // State to hold the fetched data
  const [currentPage, setCurrentPage] = useState(1);
  const [requestPerPage] = useState(5);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch the requests for demo on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getAPI("/get-request-demo", {}, true);

        // Check if the data has the expected format
        if (!response.hasError && Array.isArray(response.data.data)) {
          setRequests(response.data.data); // Store the fetched demo requests in the state
        } else {
          console.error("Error in fetching data:", response.message);
        }
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
    setDeleteType("requestdemo");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirmed = (_id) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== _id)
    );
  };

  const navigateToViewRequestInfo = (event, request) => {
    event.preventDefault();
    navigate(`/admin-dashboard/request-for-demo/view-demo-request-details`, {
      state: { request }, // Pass student data through state
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  All Request Demo List
                </h4>

                <div className="text-end">
                  <Link className="btn btn-sm btn-outline-light">Export</Link>
                </div>
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
                      <th>Name</th>
                      <th>School Name</th>
                      <th>Email</th>
                      <th>Phone No.</th>
                      <th>Demo Date & Time.</th>
                      <th className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRequests.map((request, index) => (
                      <tr key={index}>
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
                        <td>{request.name}</td>
                        <td>
                          {request.schoolName.length > 35
                            ? `${request.schoolName.slice(0, 35)}...`
                            : request.schoolName}
                        </td>

                        <td>{request.email}</td>
                        <td>{request.phone}</td>
                        <td>
                          {new Date(request.demoDateTime).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              day: "2-digit",
                              month: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link
                              onClick={(event) =>
                                navigateToViewRequestInfo(event, request)
                              }
                              className="btn btn-light btn-sm"
                            >
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                            {/* <Link
                                                            onClick={(event) => navigate("/admin-dashboard/subscriptions/update-subscriptions", { state: { request } })}
                                                            className="btn btn-soft-primary btn-sm"
                                                        >
                                                            <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
                                                        </Link> */}
                            <Link
                              onClick={(e) => {
                                e.preventDefault();
                                openDeleteDialog(request);
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

export default ViewRequestsForDemo;
