import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../../ConfirmationDialog.jsx";
import getAPI from "../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";
import ExcelSheetModal from "./ExcelSheetModal.jsx";

const FeeStructureList = () => {
  const navigate = useNavigate();
  const [feeStructures, setFeeStructures] = useState([]);
  const [classMap, setClassMap] = useState({});
  const [sectionMap, setSectionMap] = useState({});
  const [feesTypeMap, setFeesTypeMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [schoolId, setSchoolId] = useState("");
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

    const fetchData = async () => {
      try {
        const feeRes = await getAPI(
          `/get-fees-structure/${schoolId}/${selectedYear}`,
          {},
          true
        );
        setFeeStructures(feeRes?.data?.data || []);

        const classRes = await getAPI(
          `/get-class-and-section/${schoolId}`,
          {},
          true
        );
        const classMap = {};
        const sectionMap = {};
        classRes?.data?.data?.forEach((cls) => {
          classMap[cls._id] = cls.className;
          cls.sections?.forEach((section) => {
            sectionMap[section._id] = section.name;
          });
        });

        setClassMap(classMap);
        setSectionMap(sectionMap);

        const feesTypeRes = await getAPI(
          `/getall-fess-type/${schoolId}`,
          {},
          true
        );
        const feesMap = {};
        feesTypeRes?.data?.data?.forEach((ft) => {
          feesMap[ft._id] = ft.feesTypeName;
        });
        setFeesTypeMap(feesMap);
      } catch (error) {
        toast.error("Error fetching data.");
      }
    };

    fetchData();
  }, [schoolId, selectedYear]);

  const handleImportSuccess = async () => {
    try {
      const feeRes = await getAPI(
        `/get-fees-structure/${schoolId}/${selectedYear}`,
        {},
        true
      );
      setFeeStructures(feeRes?.data?.data || []);
    } catch (error) {
      toast.error("Error refreshing fee structures.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feeStructures.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(feeStructures.length / itemsPerPage);

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handlePageClick = (page) => setCurrentPage(page);

  const openDeleteDialog = (item) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
    setDeleteType("feesstructure");
  };

  const handleDeleteCancel = () => setIsDeleteDialogOpen(false);
  const handleDeleteConfirmed = (_id) => {
    setFeeStructures((prev) => prev.filter((item) => item._id !== _id));
  };

  const navigateToAddNew = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/fees-module/admin-setting/fees-structure/school-fees/add-school-fees`
    );
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-end mb-2 gap-2">
          <Link onClick={navigateToAddNew} className="btn btn-sm btn-primary">
            Create Fee Structure
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
                <h4 className="card-title flex-grow-1">All School Fees</h4>
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
                      <th style={{ width: 20 }}>
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </th>
                      <th>Class</th>
                      <th>Section(s)</th>
                      <th>Total Amount</th>
                      <th># Installments</th>
                      <th className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((structure) => (
                      <tr key={structure._id}>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </div>
                        </td>
                        <td>{classMap[structure.classId] || "N/A"}</td>
                        <td>
                          {structure.sectionIds
                            ?.map((id) => sectionMap[id] || "N/A")
                            .join(", ") || "N/A"}
                        </td>
                        <td>
                          ₹
                          {Array.isArray(structure.installments)
                            ? structure.installments.reduce(
                                (sum, inst) =>
                                  sum +
                                  (inst.fees?.reduce(
                                    (subSum, fee) => subSum + fee.amount,
                                    0
                                  ) || 0),
                                0
                              )
                            : 0}
                        </td>
                        <td>{structure.installments?.length || 0}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  "/school-dashboard/fees-module/admin-setting/fees-structure/school-fees/view-school-fees",
                                  {
                                    state: { structure },
                                  }
                                )
                              }
                              className="btn btn-light btn-sm"
                            >
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                            <button
                              className="btn btn-soft-primary btn-sm"
                              onClick={() =>
                                navigate(
                                  "/school-dashboard/fees-module/admin-setting/fees-structure/school-fees/update-school-fees",
                                  {
                                    state: { structure },
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
                                openDeleteDialog(structure);
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
                    {Array.from(
                      { length: Math.min(3, totalPages) },
                      (_, i) => currentPage - 1 + i
                    )
                      .filter((p) => p >= 1 && p <= totalPages)
                      .map((page) => (
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
          id={selectedItem._id}
          onDeleted={() => handleDeleteConfirmed(selectedItem._id)}
        />
      )}
    </>
  );
};

export default FeeStructureList;
