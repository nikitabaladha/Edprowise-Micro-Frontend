import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../../ConfirmationDialog.jsx";
import getAPI from "../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";

const Fine = () => {
  const navigate = useNavigate();

  const [fines, setFines] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [finesPerPage] = useState(5);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("fine");
  const [selectedFine, setSelectedFine] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [loadingYears, setLoadingYears] = useState(false);

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        setLoadingYears(true);
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const schoolId = userDetails?.schoolId;
        const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
        setAcademicYears(response.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingYears(false);
      }
    };

    fetchAcademicYears();
  }, []);

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
    if (!schoolId || !selectedYear) return;

    const fetchFines = async () => {
      try {
        const response = await getAPI(
          `/get-fine/school/${schoolId}/year/${selectedYear}`
        );
        if (!response.hasError) {
          const fineArray = Array.isArray(response.data?.data)
            ? response.data.data
            : [];
          setFines(fineArray);
        } else {
          toast.error(response.message || "Failed to fetch fines.");
        }
      } catch (err) {
        toast.error("Error fetching fine data.");
        console.error("Fine Fetch Error:", err);
      }
    };

    fetchFines();
  }, [schoolId, selectedYear]);

  const indexOfLast = currentPage * finesPerPage;
  const indexOfFirst = indexOfLast - finesPerPage;
  const currentFines = fines.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(fines.length / finesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => setCurrentPage(page);

  const pageRange = 1;
  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);
  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const openDeleteDialog = (fine) => {
    setSelectedFine(fine);
    setIsDeleteDialogOpen(true);
    setDeleteType("fine");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirmed = (_id) => {
    setFines((prevFines) => prevFines.filter((fine) => fine._id !== _id));
  };

  const navigateToAddNewFine = (e) => {
    e.preventDefault();
    navigate(
      `/school-dashboard/fees-module/admin-setting/fees-structure/fine/add-fine`
    );
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">Fine</h4>
                {fines.length === 0 && (
                  <Link
                    onClick={navigateToAddNewFine}
                    className="btn btn-sm btn-primary"
                  >
                    Add Fine
                  </Link>
                )}

                <select
                  className="form-select form-select-sm w-auto"
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    localStorage.setItem(
                      "selectedAcademicYear",
                      e.target.value
                    );
                  }}
                  disabled={loadingYears}
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  {academicYears.map((year) => (
                    <option key={year._id} value={year.academicYear}>
                      {year.academicYear}
                    </option>
                  ))}
                </select>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>#</th>
                      <th>Fine</th>
                      <th>Type</th>
                      <th>Frequency</th>
                      <th>Max Cap Fee</th>

                      <th className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentFines.length > 0 ? (
                      currentFines.map((item, index) => (
                        <tr key={index}>
                          <td>{indexOfFirst + index + 1}</td>
                          <td>
                            {item.feeType === "percentage"
                              ? `${item.value}%`
                              : `₹${item.value}`}
                          </td>
                          <td>
                            {item.feeType.charAt(0).toUpperCase() +
                              item.feeType.slice(1)}
                          </td>
                          <td>{item.frequency}</td>
                          <td>
                            {item.maxCapFee != null
                              ? `₹${item.maxCapFee}`
                              : "-"}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                onClick={(e) => {
                                  e.preventDefault();
                                  openDeleteDialog(item);
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6"></td>
                      </tr>
                    )}
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
                          className="page-link"
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
          id={selectedFine._id}
          onDeleted={() => handleDeleteConfirmed(selectedFine._id)}
        />
      )}
    </>
  );
};

export default Fine; //
