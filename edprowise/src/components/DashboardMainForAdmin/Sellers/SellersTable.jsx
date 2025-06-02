import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../export-excel.jsx";
import { toast } from "react-toastify";
import getAPI from "../../../api/getAPI.jsx";
import StatusDeleteConfirmDialog from "../../StatusDeleteConfirmDialog.jsx";

const SellersTable = () => {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [filterCompanyName, setFilterCompanyName] = useState("");

  const fetchSellersData = async () => {
    try {
      let url = "/seller-profile-get-all";
      if (filterCompanyName) {
        url += `?companyName=${encodeURIComponent(filterCompanyName)}`;
      }

      const response = await getAPI(url, {}, true);

      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSellers(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Seller List:", err);
    }
  };

  useEffect(() => {
    if (location.state?.filterCompanyName) {
      setFilterCompanyName(location.state.filterCompanyName);
    }
  }, [location]);

  useEffect(() => {
    fetchSellersData();
    setCurrentPage(1);
  }, [filterCompanyName]);

  const handleExport = () => {
    if (!sellers.length) {
      toast.error("No data available to export");
      return;
    }

    const formattedData = sellers.map((seller) => ({
      Seller_ID: seller.sellerId,
      Random_ID: seller.randomId,
      Company_Name: seller.companyName,
      Company_Type: seller.companyType,
      GSTIN: seller.gstin,
      PAN: seller.pan,
      TAN: seller.tan,
      CIN: seller.cin,
      Address: seller.address,
      City_State_Country: seller.cityStateCountry,
      Landmark: seller.landmark,
      Pincode: seller.pincode,
      Contact_No: seller.contactNo,
      Alternate_Contact_No: seller.alternateContactNo,
      Email_ID: seller.emailId,
      Bank_Account_No: seller.accountNo,
      IFSC_Code: seller.ifsc,
      Account_Holder_Name: seller.accountHolderName,
      Bank_Name: seller.bankName,
      Branch_Name: seller.branchName,
      No_of_Employees: seller.noOfEmployees,
      CEO_Name: seller.ceoName,
      Annual_Turnover: seller.turnover,
      Seller_Profile_Image: seller.sellerProfile,
      Created_At: seller.createdAt,
      Updated_At: seller.updatedAt,
    }));

    exportToExcel(formattedData, "Sellers", "Sellers");
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");

  const openDeleteDialog = (seller) => {
    setSelectedSeller(seller);
    setIsDeleteDialogOpen(true);
    setDeleteType("seller");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedSeller(null);
  };

  const handleDeleteConfirmed = async (sellerId) => {
    try {
      setSellers((prevSellers) =>
        prevSellers.filter((seller) => seller.sellerId !== sellerId)
      );
    } catch (error) {
      console.error("Error deleting seller:", error);
      toast.error("Failed to delete seller. Please try again.");

      fetchSellersData();
    }
  };

  const navigateToAddNewSeller = (event) => {
    event.preventDefault();
    navigate(`/admin-dashboard/sellers/add-new-seller`);
  };

  const navigateToViewSeller = (event, sellerId) => {
    event.preventDefault();
    navigate(`/admin-dashboard/sellers/view-seller`, { state: { sellerId } });
  };

  const navigateToUpdateSeller = (event, seller) => {
    event.preventDefault();
    navigate(`/admin-dashboard/sellers/update-seller`, { state: { seller } });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [sellersPerPage] = useState(10);

  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = sellers.slice(indexOfFirstSeller, indexOfLastSeller);

  const totalPages = Math.ceil(sellers.length / sellersPerPage);

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
      {" "}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">All Seller List</h4>
                <Link
                  onClick={(event) => navigateToAddNewSeller(event)}
                  className="btn btn-sm btn-primary"
                >
                  Add Seller
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
                        <th>SellerId</th>
                        <th className="text-start">Company Name</th>
                        <th>Seller Mobile No</th>
                        <th>Seller Email</th>
                        <th>Seller PAN</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSellers.map((seller) => (
                        <tr key={seller._id}>
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

                          <td>{seller.randomId}</td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="rounded bg-light d-flex align-items-center justify-content-center">
                                <img
                                  src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${seller.sellerProfile}`}
                                  alt={`${seller.companyName} Profile`}
                                  className="avatar-md"
                                  style={{
                                    objectFit: "cover",
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "10px",
                                  }}
                                />
                              </div>
                              <div>{seller.companyName}</div>
                            </div>
                          </td>
                          <td>{seller.contactNo}</td>
                          <td>{seller.emailId}</td>
                          <td>{seller.pan}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                onClick={(event) =>
                                  navigateToViewSeller(event, seller.sellerId)
                                }
                                className="btn btn-light btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                onClick={(event) =>
                                  navigateToUpdateSeller(event, seller)
                                }
                                className="btn btn-soft-primary btn-sm"
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
                                  openDeleteDialog(seller);
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
      {isDeleteDialogOpen && (
        <StatusDeleteConfirmDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedSeller.sellerId}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default SellersTable;
