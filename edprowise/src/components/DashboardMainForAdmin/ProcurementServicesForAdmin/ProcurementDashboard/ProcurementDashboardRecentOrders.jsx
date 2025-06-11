import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel.jsx";
import getAPI from "../../../../api/getAPI.jsx";
import { toast } from "react-toastify";
import putAPI from "../../../../api/putAPI.jsx";

import { format } from "date-fns";
import { formatCost } from "../../../CommonFunction.jsx";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const TrackOrderHistoryTable = () => {
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrderData = async () => {
    try {
      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_ORDER_SERVICE}/order-details`,
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

  const handleExport = () => {
    if (!orderDetails.length) {
      toast.error("No data available to export");
      return;
    }

    const formattedData = orderDetails.map((order) => ({
      Order_ID: order._id,
      Order_Number: order.orderNumber,
      Enquiry_Number: order.enquiryNumber,
      Seller_ID: order.sellerId,
      School_ID: order.schoolId,
      Company_Name: order.companyName,
      Other_Charges: order.otherCharges,
      Final_Receivable_From_Edprowise: order.finalReceivableFromEdprowise,
      Expected_Delivery_Date: formatDate(order.expectedDeliveryDate),
      Supplier_Status: order.supplierStatus,
      Buyer_Status: order.buyerStatus,
      Edprowise_Status: order.edprowiseStatus,
      Total_Amount_Before_GST_And_Discount:
        order.totalAmountBeforeGstAndDiscount,
      Total_Amount: order.totalAmount,
      Total_Taxable_Value: order.totalTaxableValue,
      Total_GST_Amount: order.totalGstAmount,
      Advance_Adjustment: order.advanceAdjustment,
      Final_Payable_Amount_Without_TDS: order.finalPayableAmountWithoutTDS,
      Final_Payable_Amount_With_TDS: order.finalPayableAmountWithTDS,
      TDS_Amount: order.tDSAmount,
      Created_At: formatDate(order.createdAt),
    }));

    exportToExcel(formattedData, "Order Details", "Order_Details");
  };

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
                <h4 className="card-title flex-grow-1">View All Orders List</h4>
                <div className="text-end">
                  <Link
                    onClick={handleExport}
                    class="text-primary"
                    title="Export Excel File"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover"
                  >
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
                        <th>Order Number</th>
                        <th>Enquiry Number</th>
                        <th>Name of Supplier</th>
                        <th>Expected Delivery Date</th>
                        <th>Actual Delivery Date</th>
                        <th>Invoice Amount</th>
                        <th>Status</th>
                        <th>TDS Amount</th>
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
                          <td>{order.companyName}</td>
                          <td>{formatDate(order.expectedDeliveryDate)}</td>
                          <td>
                            {order.actualDeliveryDate
                              ? formatDate(order.actualDeliveryDate)
                              : "Null"}
                          </td>
                          <td>
                            {formatCost(order.totalAmountBeforeGstAndDiscount)}
                          </td>
                          <td>{order.edprowiseStatus}</td>
                          <td>{order.tDSAmount}</td>
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
    </>
  );
};

export default TrackOrderHistoryTable;
