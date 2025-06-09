import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../../export-excel.jsx";
import getAPI from "../../../../../api/getAPI.jsx";
import ConfirmationDialog from "../../../../ConfirmationDialog.jsx";
import { toast } from "react-toastify";

const MainCategoryTable = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const fetchSubCategoryData = async () => {
    try {
      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_CATEGORY_SERVICE}/sub-category`,
        {},
        true
      );
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSubCategories(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Sub category List:", err);
    }
  };

  useEffect(() => {
    fetchSubCategoryData();
  }, []);

  const navigate = useNavigate();

  const navigateToAddNewSubCategory = (event) => {
    event.preventDefault();
    navigate(
      `/admin-dashboard/procurement-services/good-services/add-goods-services`
    );
  };

  const navigateToUpdateSubCategory = (event, subCategory) => {
    event.preventDefault();
    navigate(
      `/admin-dashboard/procurement-services/good-services/update-goods-services`,
      {
        state: { subCategory },
      }
    );
  };

  const handleExport = () => {
    if (!subCategories.length) {
      toast.error("No data available to export");
      return;
    }

    const formattedData = subCategories.map((subCategory) => ({
      id: subCategory.id,
      Sub_Category_Id: subCategory.subCategoryId,
      Sub_Category_Name: subCategory.subCategoryName,
      Category_Id: subCategory.categoryId,
      Category_Name: subCategory.categoryName,
      MainCategory_Id: subCategory.mainCategoryId,
      MainCategory_Name: subCategory.mainCategoryName,
      Edprowise_Margin: subCategory.edprowiseMargin,
    }));

    exportToExcel(formattedData, "SubCategory", "SubCategory");
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");

  const openDeleteDialog = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setIsDeleteDialogOpen(true);
    setDeleteType("subCategory");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedSubCategory(null);
  };

  const handleDeleteConfirmed = (id) => {
    setSubCategories((prevSubCategories) =>
      prevSubCategories.filter((subCategory) => subCategory.id !== id)
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [subCategoriesPerPage] = useState(10);

  const indexOfLastSubCategory = currentPage * subCategoriesPerPage;
  const indexOfFirstSubCategory = indexOfLastSubCategory - subCategoriesPerPage;
  const currentSubCategory = subCategories.slice(
    indexOfFirstSubCategory,
    indexOfLastSubCategory
  );

  const totalPages = Math.ceil(subCategories.length / subCategoriesPerPage);

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
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  All Sub Category List
                </h4>
                <Link
                  className="btn btn-sm btn-primary"
                  onClick={(event) => navigateToAddNewSubCategory(event)}
                >
                  Add New Sub Category
                </Link>

                <div className="text-end">
                  <Link onClick={handleExport} class="text-primary">
                    Export
                    <i class="bx bx-export ms-1"></i>
                  </Link>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
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
                        <th>Main Category </th>
                        <th>Category </th>
                        <th>Edprowise Margin</th>
                        <th>Sub Category</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSubCategory.map((subCategory) => (
                        <tr key={subCategory.id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`customCheck${subCategory.id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`customCheck${subCategory.id}`}
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>{subCategory.mainCategoryName}</td>
                          <td>{subCategory.categoryName}</td>
                          <td>{subCategory.edprowiseMargin}</td>
                          <td>{subCategory.subCategoryName}</td>

                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                className="btn btn-soft-primary btn-sm"
                                title="Update"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                                onClick={(event) =>
                                  navigateToUpdateSubCategory(
                                    event,
                                    subCategory
                                  )
                                }
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-danger btn-sm"
                                title="Delete"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                                onClick={(e) => {
                                  e.preventDefault();
                                  openDeleteDialog(subCategory);
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
                {/* end table-responsive */}
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
          id={selectedSubCategory.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default MainCategoryTable;
