import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../../ConfirmationDialog.jsx";
import getAPI from "../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";

const SchoolShifts = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestPerPage] = useState(5);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [shifts, setShifts] = useState([]);
  const [schoolId, setSchoolId] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }

    setSchoolId(id);
  }, []);

  useEffect(() => {
    if (!schoolId) return;

    const fetchShifts = async () => {
      try {
        const response = await getAPI(`/master-define-shift/${schoolId}`);
        console.log("Fetched Shifts:", response);
        if (!response.hasError) {
          const shiftArray = Array.isArray(response.data?.data)
            ? response.data.data
            : [];
          setShifts(shiftArray);
        } else {
          toast.error(response.message || "Failed to fetch shifts.");
        }
      } catch (err) {
        toast.error("Error fetching shift data.");
        console.error("Shift Fetch Error:", err);
      }
    };

    fetchShifts();
  }, [schoolId]);

  const indexOfLastRequest = currentPage * requestPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestPerPage;
  const currentShifts = shifts.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(shifts.length / requestPerPage);

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
    setDeleteType("shifts");
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
    navigate(`/school-dashboard/enquiry/enquity-details`, {
      state: { request },
    });
  };

  const navigateToAddNewClass = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/fees-module/admin-setting/grade/shifts/add-shift`
    );
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">All Shifts</h4>
                <Link
                  onClick={(event) => navigateToAddNewClass(event)}
                  className="btn btn-sm btn-primary"
                >
                  Add Shift
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
                      <th>Shift</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentShifts.map((shift, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`customCheck-${index}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`customCheck-${index}`}
                            >
                              &nbsp;
                            </label>
                          </div>
                        </td>
                        <td>{shift.masterDefineShiftName}</td>
                        <td>
                          {new Date(shift.startTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                              timeZone: "UTC",
                            }
                          )}
                        </td>

                        <td>
                          {new Date(shift.endTime).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                            timeZone: "UTC",
                          })}
                        </td>

                        <td>
                          <div className="d-flex gap-2">
                            {/* <Link
                              onClick={(event) => navigateToViewRequestInfo(event, shift)}
                              className="btn btn-light btn-sm"
                            >
                              <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                            </Link> */}
                            <button
                              className="btn btn-soft-primary btn-sm"
                              onClick={() =>
                                navigate(
                                  "/school-dashboard/fees-module/admin-setting/grade/shifts/update-shift",
                                  {
                                    state: { shift },
                                  }
                                )
                              }
                            >
                              <iconify-icon
                                icon="solar:pen-2-broken"
                                className="align-middle fs-18"
                              />
                            </button>

                            <Link
                              onClick={(e) => {
                                e.preventDefault();
                                openDeleteDialog(shift);
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
export default SchoolShifts;
