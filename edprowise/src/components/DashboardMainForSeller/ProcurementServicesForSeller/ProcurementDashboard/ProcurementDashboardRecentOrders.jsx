import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import getAPI from "../../../../api/getAPI.jsx";
import { format } from "date-fns";
import { formatCost } from "../../../CommonFunction.jsx";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const SellerDashboardRecentOrders = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrderData = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const sellerId = userDetails?.id;

    if (!sellerId) {
      console.error("Seller ID is missing");
      return;
    }

    try {
      const response = await getAPI(
        `/order-details-by-seller-id/${sellerId}`,
        {},
        true
      );
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setOrderDetails(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Order details:", err);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [schoolsPerPage] = useState(10);

  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentOrderDetails = orderDetails.slice(
    indexOfFirstSchool,
    indexOfLastSchool
  );

  const totalPages = Math.ceil(orderDetails.length / schoolsPerPage);

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
                <h4 className="card-title flex-grow-1">All Orders List</h4>
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
                        <th>Order Number</th>
                        <th>Enquiry Number</th>
                        <th>Status</th>
                        <th>Expected Delivery Date</th>
                        <th>Total Invoice Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrderDetails.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`customCheck${order.id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`customCheck${order.id}`}
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>{order.orderNumber}</td>
                          <td>{order.enquiryNumber}</td>
                          <td>{order.supplierStatus}</td>
                          <td>{formatDate(order.expectedDeliveryDate)}</td>
                          <td>{formatCost(order.totalAmount)}</td>
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
            {/* end card */}
          </div>
          {/* end col */}
        </div>
        {/* end row */}
      </div>
    </>
  );
};

export default SellerDashboardRecentOrders;
