import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../../../ConfirmationDialog.jsx";
import getAPI from "../../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";

const SchoolPrefixes = () => {
  const navigate = useNavigate();

  const [prefixes, setPrefixes] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [prefixesPerPage] = useState(5);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("prefix");
  const [selectedPrefix, setSelectedPrefix] = useState(null);

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

    const fetchPrefixes = async () => {
      try {
        const response = await getAPI(`/get-admission-prefix/${schoolId}`);
        if (!response.hasError) {
          const prefixArray = Array.isArray(response.data?.data)
            ? response.data.data
            : [];
          setPrefixes(prefixArray);
        } else {
          toast.error(response.message || "Failed to fetch prefixes.");
        }
      } catch (err) {
        toast.error("Error fetching prefix data.");
        console.error("Prefix Fetch Error:", err);
      }
    };

    fetchPrefixes();
  }, [schoolId]);

  const indexOfLast = currentPage * prefixesPerPage;
  const indexOfFirst = indexOfLast - prefixesPerPage;
  const currentPrefixes = prefixes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(prefixes.length / prefixesPerPage);

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

  const openDeleteDialog = (prefix) => {
    setSelectedPrefix(prefix);
    setIsDeleteDialogOpen(true);
    setDeleteType("admissionprefix");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleDeleteConfirmed = (_id) => {
    setPrefixes((prevRequests) =>
      prevRequests.filter((request) => request._id !== _id)
    );
  };
  const navigateToAddNewPrefix = (e) => {
    e.preventDefault();
    navigate(
      `/school-dashboard/fees-module/admin-setting/prefix-setting/admission-prefix/add-prefix`
    );
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">Admission Prefix</h4>
                {prefixes.length === 0 && (
                  <Link
                    onClick={navigateToAddNewPrefix}
                    className="btn btn-sm btn-primary"
                  >
                    Add Prefix
                  </Link>
                )}
                <div className="text-end">
                  <Link className="btn btn-sm btn-outline-light">Export</Link>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Numeric</th>
                      <th>Prefix</th>
                      <th>Alphanumeric</th>
                      <th className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPrefixes.length > 0 ? (
                      currentPrefixes.map((item, index) => (
                        <tr key={index}>
                          <td>{indexOfFirst + index + 1}</td>
                          <td>
                            {item.type.charAt(0).toUpperCase() +
                              item.type.slice(1)}
                          </td>
                          <td>{item.type === "numeric" ? item.value : "-"}</td>
                          <td>
                            {item.type === "alphanumeric" ? item.prefix : "-"}
                          </td>
                          <td>
                            {item.type === "alphanumeric" ? item.number : "-"}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              {/* <button
                              className="btn btn-soft-primary btn-sm"
                              onClick={() =>
                                navigate("/school-dashboard/fees-module/admin-setting/prefix-setting/update-prefix", {
                                  state: { prefix: item },
                                })
                              }
                            >
                              <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
                            </button> */}

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
          id={selectedPrefix._id}
          onDeleted={() => handleDeleteConfirmed(selectedPrefix._id)}
        />
      )}
    </>
  );
};

export default SchoolPrefixes;
