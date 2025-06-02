import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../../ConfirmationDialog.jsx";
import getAPI from "../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";

const OneTimeFeesTable = () => {
  const navigate = useNavigate();

  const [oneTimeFeesList, setOneTimeFeesList] = useState([]);
  const [classMap, setClassMap] = useState({});
  const [sectionMap, setSectionMap] = useState({});
  const [feesTypeMap, setFeesTypeMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [schoolId, setSchoolId] = useState("");

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

    const fetchData = async () => {
      try {
        const feeRes = await getAPI(`/get-one-time-fees/${schoolId}`, {}, true);
        setOneTimeFeesList(feeRes?.data?.data || []);

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
  }, [schoolId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = oneTimeFeesList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(oneTimeFeesList.length / itemsPerPage);

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handlePageClick = (page) => setCurrentPage(page);

  const openDeleteDialog = (item) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
    setDeleteType("onetimesfees");
  };

  const handleDeleteCancel = () => setIsDeleteDialogOpen(false);
  const handleDeleteConfirmed = (_id) => {
    setOneTimeFeesList((prev) => prev.filter((item) => item._id !== _id));
  };

  const navigateToAddNew = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/admin-setting/add-one-time-fees`);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">One Time Fees</h4>
                <Link
                  onClick={navigateToAddNew}
                  className="btn btn-sm btn-primary"
                >
                  Create One Time Fee
                </Link>
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
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </th>
                      <th>Class</th>
                      <th>Section(s)</th>
                      <th>Fee Type</th>
                      <th>Amount</th>
                      <th className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((fee) => (
                      <tr key={fee._id}>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </div>
                        </td>
                        <td>{classMap[fee.classId] || "N/A"}</td>
                        <td>
                          {fee.sectionIds
                            ?.map((id) => sectionMap[id] || "N/A")
                            .join(", ") || "N/A"}
                        </td>
                        <td>
                          ₹
                          {Array.isArray(fee.installments)
                            ? fee.installments.reduce(
                                (sum, inst) =>
                                  sum +
                                  (inst.fees?.reduce(
                                    (subSum, f) => subSum + f.amount,
                                    0
                                  ) || 0),
                                0
                              )
                            : 0}
                        </td>
                        <td>{fee.installments?.length || 0}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  "/school-dashboard/fees-module/admin-setting/view-one-time-fees",
                                  {
                                    state: { structure: fee },
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
                                  "/school-dashboard/fees-module/admin-setting/update-one-time-fees",
                                  {
                                    state: { structure: fee },
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
                                openDeleteDialog(fee);
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

export default OneTimeFeesTable;
