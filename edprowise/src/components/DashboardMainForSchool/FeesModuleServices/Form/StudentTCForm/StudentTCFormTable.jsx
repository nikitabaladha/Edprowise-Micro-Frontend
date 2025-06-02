import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import getAPI from "../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../ConfirmationDialog.jsx";
import ExcelSheetModal from "./ExcelSheetModal.jsx";

const StudentTCFormTable = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [classList, setClassList] = useState([]);
  const [deleteType, setDeleteType] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [loadingYears, setLoadingYears] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        setLoadingYears(true);
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const schoolId = userDetails?.schoolId;
        const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
        setAcademicYears(response.data.data || []);
      } catch (err) {
        toast.error("Error fetching academic years.");
        console.error(err);
      } finally {
        setLoadingYears(false);
      }
    };

    fetchAcademicYears();
  }, []);

  const handleImportSuccess = async () => {
    try {
      const response = await getAPI(`/get-TC-form/${schoolId}/${selectedYear}`);

      if (!response.hasError) {
        const studentArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setStudentData(studentArray);
      } else {
        toast.error(response.message || "Failed to fetch TC form list.");
      }
    } catch (err) {
      toast.error("Error refreshing TC form data.");
    }
  };

  const openDeleteDialog = (request) => {
    setSelectedRequest(request);
    setIsDeleteDialogOpen(true);
    setDeleteType("TCform");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirmed = (_id) => {
    setStudentData((prevRequests) =>
      prevRequests.filter((request) => request._id !== _id)
    );
  };

  const getClassNameById = (id) => {
    const found = classList.find((cls) => cls._id === id);
    return found ? found.className : "N/A";
  };

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

    const fetchStudents = async () => {
      try {
        const response = await getAPI(
          `/get-TC-form/${schoolId}/${selectedYear}`
        );

        const classRes = await getAPI(
          `/get-class-and-section/${schoolId}`,
          {},
          true
        );
        if (!classRes.hasError) {
          setClassList(classRes.data.data);
        }
        if (!response.hasError) {
          const studentArray = Array.isArray(response.data.data)
            ? response.data.data
            : [];
          setStudentData(studentArray);
        } else {
          toast.error(response.message || "Failed to fetch student list.");
        }
      } catch (err) {
        toast.error("Error fetching student data.");
        console.error("Student Fetch Error:", err);
      }
    };

    fetchStudents();
  }, [schoolId, selectedYear]);

  const navigateToTCForm = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/trasfer-certificate-form`);
  };

  const navigateToViewTCInfo = (event, student) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/fees-module/form/view-trasfer-certificate-details`,
      {
        state: { student },
      }
    );
  };

  const navigateToUpdateTCForm = (event, student) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/fees-module/form/update-trasfer-certificate-form`,
      {
        state: { student },
      }
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [studentListPerPage] = useState(5);

  const indexOfLastStudent = currentPage * studentListPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentListPerPage;
  const currentStudent = studentData.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(studentData.length / studentListPerPage);

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

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-end mb-2 gap-2">
          <Link
            onClick={(event) => navigateToTCForm(event)}
            className="btn btn-sm btn-primary"
          >
            TC Form
          </Link>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setShowImportModal(true)}
          >
            Import
          </button>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  Transfer Certificate List
                </h4>
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
                        <th>TC Certificate No.</th>
                        <th>Admission No.</th>
                        <th>Student First Name</th>
                        <th>Student Last Name</th>
                        <th>Class</th>
                        <th>Date of Issue</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudent.map((student, index) => (
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
                                 
                              </label>
                            </div>
                          </td>
                          <td>{student.certificateNumber}</td>
                          <td>{student.AdmissionNumber}</td>
                          <td>{student.firstName}</td>
                          <td>{student.lastName}</td>
                          <td>{getClassNameById(student.masterDefineClass)}</td>
                          <td>
                            {new Date(student.dateOfIssue).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                className="btn btn-light btn-sm"
                                onClick={(event) =>
                                  navigateToViewTCInfo(event, student)
                                }
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-primary btn-sm"
                                onClick={(event) =>
                                  navigateToUpdateTCForm(event, student)
                                }
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-danger btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  openDeleteDialog(student);
                                }}
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
      <ExcelSheetModal
        show={showImportModal}
        onClose={() => setShowImportModal(false)}
        schoolId={schoolId}
        academicYear={selectedYear}
        onImportSuccess={handleImportSuccess}
      />
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

export default StudentTCFormTable;
