import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel.jsx";
import { toast } from "react-toastify";
import getAPI from "../../../../api/getAPI.jsx";

const BankDetailsTable = () => {
  const [bankDetails, setBankDetails] = useState([]);

  const [selectedBankDetails, setSelectedBankDetails] = useState(null);

  const fetchBankDetailData = async () => {
    try {
      const response = await getAPI(`/bank-detail`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setBankDetails(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Bank Detail List:", err);
    }
  };

  useEffect(() => {
    fetchBankDetailData();
  }, []);

  const handleExport = () => {
    const filteredData = bankDetails.map((bankDetail) => ({
      AccountNumber: bankDetail.accountNumber,
      BankName: bankDetail.bankName,
      IFSCCode: bankDetail.ifscCode,
      TypeOfAccount: bankDetail.accountType,
    }));

    exportToExcel(filteredData, "BankDetails", "Bank Detail Data");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [bankDetailsPerPage] = useState(10);

  const indexOfLastBankDetail = currentPage * bankDetailsPerPage;
  const indexOfFirstBankDetail = indexOfLastBankDetail - bankDetailsPerPage;
  const currentBankDetails = bankDetails.slice(
    indexOfFirstBankDetail,
    indexOfLastBankDetail
  );

  const totalPages = Math.ceil(bankDetails.length / bankDetailsPerPage);

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
                <h4 className="card-title flex-grow-1">All Bank Details</h4>
                <Link className="btn btn-sm btn-primary">Pay Online</Link>
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
                        <th>Account No.</th>
                        <th>Bank Name</th>
                        <th>IFSC Code</th>
                        <th>Type of Account</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBankDetails.map((bankDetail) => (
                        <tr key={bankDetail._id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`customCheck${bankDetail._id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`customCheck${bankDetail._id}`}
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>{bankDetail.accountNumber}</td>
                          <td>{bankDetail.bankName}</td>
                          <td>{bankDetail.ifscCode}</td>
                          <td>{bankDetail.accountType}</td>
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
    </>
  );
};

export default BankDetailsTable;
