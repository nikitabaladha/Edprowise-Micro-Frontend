import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel.jsx";
import getAPI from "../../../../api/getAPI.jsx";
import putAPI from "../../../../api/putAPI.jsx";
import { formatCost } from "../../../CommonFunction.jsx";

import { toast } from "react-toastify";

import { format, differenceInHours, parseISO } from "date-fns";
import OrderCancelReasonModal from "./OrderCancelReasonModal.jsx";
import RatingModal from "./RatingModal.jsx";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const TrackOrderHistoryTable = () => {
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrderData = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

    if (!schoolId) {
      console.error("School ID is missing");
      return;
    }

    try {
      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_ORDER_SERVICE}/order-details-by-school-id/${schoolId}`,
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

  const canCancelOrder = (updatedAt) => {
    if (!updatedAt) return false;

    const updatedTime = parseISO(updatedAt);
    const currentTime = new Date();
    const hoursDifference = differenceInHours(currentTime, updatedTime);

    return hoursDifference <= 48;
  };

  const handleCancelOrder = async (
    enquiryNumber,
    sellerId,
    schoolId,
    newStatus
  ) => {
    const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

    try {
      const response = await putAPI(
        `${process.env.REACT_APP_PROCUREMENT_ORDER_SERVICE}/cancel-order-by-buyer?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}&schoolId=${schoolId}`,
        { buyerStatus: newStatus },
        true
      );

      if (!response.hasError) {
        toast.success(`Order Cancelled successfully!`);
        fetchOrderData();
      } else {
        toast.error(response.message || "Failed to Cancelled Order");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const [selectedEnquiryNumber, setSelectedEnquiryNumber] = useState(null);

  const handleOpenModal = (event, enquiryNumber, sellerId, schoolId) => {
    event.preventDefault();
    setSelectedEnquiryNumber(enquiryNumber);
    setSelectedSellerId(sellerId);
    setSelectedSchoolId(schoolId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const handleOpenRatingModal = (event, enquiryNumber, sellerId, schoolId) => {
    event.preventDefault();
    setSelectedEnquiryNumber(enquiryNumber);
    setSelectedSellerId(sellerId);
    setSelectedSchoolId(schoolId);
    setIsRatingModalOpen(true);
  };

  const handleCloseRatingModal = () => {
    setIsRatingModalOpen(false);
  };

  const navigateToViewOrder = (event, order, orderNumber, enquiryNumber) => {
    event.preventDefault();
    navigate(`/school-dashboard/procurement-services/view-order-history`, {
      state: { order, orderNumber, enquiryNumber },
    });
  };

  const handleNavigation = () => {
    navigate("/school-dashboard/procurement-services/pay-to-edprowise");
  };

  const handleExport = () => {
    if (!orderDetails.length) {
      toast.error("No data available to export");
      return;
    }

    const formattedData = orderDetails.map((order) => ({
      Order_Number: order.orderNumber || "N/A",
      Enquiry_Number: order.enquiryNumber || "N/A",
      Quote_Number: order.quoteNumber || "N/A",
      Company_Name: order.companyName || "N/A",
      Seller_ID: order.sellerId || "N/A",
      School_ID: order.schoolId || "N/A",
      Actual_Delivery_Date: formatDate(order.actualDeliveryDate),
      Expected_Delivery_Date: formatDate(order.expectedDeliveryDate),
      Supplier_Status: order.supplierStatus || "N/A",
      Buyer_Status: order.buyerStatus || "N/A",
      Edprowise_Status: order.edprowiseStatus || "N/A",
      Other_Charges: order.otherCharges || 0,
      Total_Amount_Before_GST: order.totalAmountBeforeGstAndDiscount || 0,
      Total_Amount: order.totalAmount || 0,
      Total_Taxable_Value: order.totalTaxableValue || 0,
      Total_GST_Amount: order.totalGstAmount || 0,
      Final_Payable_Amount_Without_TDS: order.finalPayableAmountWithoutTDS || 0,
      Final_Payable_Amount_With_TDS: order.finalPayableAmountWithTDS || 0,
      TDS_Amount: order.tDSAmount || 0,
      Advance_Adjustment: order.advanceAdjustment || 0,
    }));

    exportToExcel(formattedData, "Ordered Products", "Ordered_Products");
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
                        <th>Order Number</th>
                        <th>Enquiry Number</th>
                        <th>Name of Supplier</th>
                        <th>Expected Delivery Date</th>
                        <th>Actual Delivery Date</th>
                        <th>Invoice Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrderDetails.length > 0 ? (
                        currentOrderDetails.map((order) => (
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
                                : "Not Provided"}
                            </td>
                            <td>{formatCost(order?.totalAmount)}</td>
                            <td>{order.buyerStatus}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <Link
                                  onClick={(event) =>
                                    navigateToViewOrder(
                                      event,
                                      order,
                                      order.orderNumber,
                                      order.enquiryNumber
                                    )
                                  }
                                  className="btn btn-light btn-sm"
                                >
                                  <iconify-icon
                                    icon="solar:eye-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>

                                {order.buyerStatus === "Order Placed" &&
                                  canCancelOrder(order.updatedAt) && (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      title="Cancel Order"
                                      onClick={() =>
                                        handleCancelOrder(
                                          order.enquiryNumber,
                                          order.sellerId,
                                          order.schoolId,
                                          "Cancelled by Buyer"
                                        )
                                      }
                                    >
                                      Cancel Order
                                    </button>
                                  )}

                                {order.buyerStatus === "Work In Progress" && (
                                  <button
                                    className="btn btn-info btn-sm"
                                    title="Request For Cancel Order"
                                    onClick={(event) =>
                                      handleOpenModal(
                                        event,
                                        order?.enquiryNumber,
                                        order?.sellerId,
                                        order?.schoolId
                                      )
                                    }
                                  >
                                    Request For Cancel
                                  </button>
                                )}

                                {order.buyerStatus === "Delivered" &&
                                  (!order.rating || order.rating === 0) && (
                                    <button
                                      className="btn btn-info btn-sm"
                                      title="Give Ratings"
                                      onClick={(event) =>
                                        handleOpenRatingModal(
                                          event,
                                          order?.enquiryNumber,
                                          order?.sellerId,
                                          order?.schoolId
                                        )
                                      }
                                    >
                                      Give Ratings
                                    </button>
                                  )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="9"
                            className="text-center py-4 text-muted"
                          >
                            No Order Found
                          </td>
                        </tr>
                      )}
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

      {isModalOpen && (
        <OrderCancelReasonModal
          onClose={handleCloseModal}
          sellerId={selectedSellerId}
          schoolId={selectedSchoolId}
          enquiryNumber={selectedEnquiryNumber}
          fetchOrderData={fetchOrderData}
        />
      )}

      {isRatingModalOpen && (
        <RatingModal
          onClose={handleCloseRatingModal}
          sellerId={selectedSellerId}
          schoolId={selectedSchoolId}
          enquiryNumber={selectedEnquiryNumber}
          fetchOrderData={fetchOrderData}
        />
      )}
    </>
  );
};

export default TrackOrderHistoryTable;
