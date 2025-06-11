import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel.jsx";
import getAPI from "../../../../api/getAPI.jsx";
import { toast } from "react-toastify";
import UpdateTDSModal from "./UpdateTDSModal.jsx";
import putAPI from "../../../../api/putAPI.jsx";

import { format } from "date-fns";
import { formatCost } from "../../../CommonFunction.jsx";
import { Modal, Button } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";
import { TbShoppingCartX } from "react-icons/tb";
import { TbGardenCartOff } from "react-icons/tb";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const TrackOrderHistoryTable = () => {
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedTds, setSelectedTds] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        console.log("Order Details", response.data.data);
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

  const handleTDSUpdated = () => {
    fetchOrderData();
    closeUpdateTDSModal();
  };

  const openUpdateTDSModal = (event, enquiryNumber, quoteNumber, sellerId) => {
    event.preventDefault();
    setSelectedTds({ enquiryNumber, quoteNumber, sellerId });
    setIsModalOpen(true);
  };

  const closeUpdateTDSModal = () => {
    setIsModalOpen(false);
  };

  const navigateToViewOrder = (
    event,
    order,
    orderNumber,
    enquiryNumber,
    schoolId,
    sellerId
  ) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/view-order-history`, {
      state: { order, orderNumber, enquiryNumber, schoolId, sellerId },
    });
  };

  const handleOrderStatusUpdate = async (
    sellerId,
    enquiryNumber,
    newStatus
  ) => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await putAPI(
        `${process.env.REACT_APP_PROCUREMENT_ORDER_SERVICE}/update-order-status?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}`,
        { orderStatus: newStatus },
        true
      );

      if (!response.hasError) {
        toast.success(`Order status updated to "${newStatus}" successfully!`);
        fetchOrderData();
      } else {
        toast.error(response.message || "Failed to update Order status");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const [showBuyerModal, setShowBuyerModal] = useState(false);
  const [cancelCommentFromBuyer, setCancelCommentFromBuyer] = useState("");
  const [cancelCommentFromSeller, setCancelCommentFromSeller] = useState("");

  const closeBuyerModal = () => {
    setShowBuyerModal(false);
    setCancelCommentFromBuyer("");
    setCancelCommentFromSeller("");
  };

  const openCancelReasonModal = (order) => {
    const buyerReason =
      order.buyerStatus === "Requested For Cancel"
        ? order.cancelReasonFromBuyer
        : null;

    const sellerReason =
      order.supplierStatus === "Requested For Cancel"
        ? order.cancelReasonFromSeller
        : null;

    // Only open modal if at least one reason exists
    if (buyerReason || sellerReason) {
      setCancelCommentFromBuyer(buyerReason || "No reason provided by buyer");
      setCancelCommentFromSeller(
        sellerReason || "No reason provided by seller"
      );
      setShowBuyerModal(true);
    }
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
        `${process.env.REACT_APP_PROCUREMENT_ORDER_SERVICE}/cancel-order-by-edprowise?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}&schoolId=${schoolId}`,
        { edprowiseStatus: newStatus },
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrderDetails.map((order) => {
                        const isCancelRequested =
                          order.buyerStatus === "Requested For Cancel" ||
                          order.supplierStatus === "Requested For Cancel";

                        return (
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

                            <td
                              style={
                                isCancelRequested
                                  ? {
                                      backgroundColor: "#ff6c2f",
                                      color: "#ffffff",
                                    }
                                  : {}
                              }
                            >
                              {order.orderNumber}
                            </td>
                            <td>{order.enquiryNumber}</td>
                            <td>{order.companyName}</td>
                            <td>{formatDate(order.expectedDeliveryDate)}</td>
                            <td>
                              {order.actualDeliveryDate
                                ? formatDate(order.actualDeliveryDate)
                                : "Not Provided"}
                            </td>
                            <td>{formatCost(order.totalAmount)}</td>
                            <td>{order.edprowiseStatus}</td>
                            <td>{order.tDSAmount}</td>
                            <td>
                              <div className="d-flex gap-2">
                                {order.buyerStatus === "Requested For Cancel" ||
                                order.supplierStatus ===
                                  "Requested For Cancel" ? (
                                  <button
                                    onClick={() => openCancelReasonModal(order)}
                                    className="btn btn-light btn-sm"
                                    title="Order Cancel Reason"
                                    data-bs-toggle="popover"
                                    data-bs-trigger="hover"
                                  >
                                    <TbShoppingCartX className="align-middle fs-18" />
                                  </button>
                                ) : null}
                                {order.edprowiseStatus !== "Cancelled" &&
                                  order.edprowiseStatus !== "Delivered" && (
                                    <button
                                      onClick={(event) =>
                                        openUpdateTDSModal(
                                          event,
                                          order.enquiryNumber,
                                          order.quoteNumber,
                                          order.sellerId
                                        )
                                      }
                                      className="btn btn-soft-primary btn-sm"
                                      title="Edit TDS"
                                      data-bs-toggle="popover"
                                      data-bs-trigger="hover"
                                    >
                                      <iconify-icon
                                        icon="solar:pen-2-broken"
                                        className="align-middle fs-18"
                                      />
                                    </button>
                                  )}

                                <Link
                                  onClick={(event) =>
                                    navigateToViewOrder(
                                      event,
                                      order,
                                      order.orderNumber,
                                      order.enquiryNumber,
                                      order.schoolId,
                                      order.sellerId
                                    )
                                  }
                                  className="btn btn-light btn-sm"
                                >
                                  <iconify-icon
                                    icon="solar:eye-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                                {order.edprowiseStatus !== "Cancelled" && (
                                  <button
                                    className="btn btn-soft-primary btn-sm"
                                    title="Cancel Order"
                                    data-bs-toggle="popover"
                                    data-bs-trigger="hover"
                                    onClick={() =>
                                      handleCancelOrder(
                                        order.enquiryNumber,
                                        order.sellerId,
                                        order.schoolId,
                                        "Cancelled"
                                      )
                                    }
                                  >
                                    <TbGardenCartOff
                                      icon="solar:pen-2-broken"
                                      className="align-middle fs-18"
                                    />
                                  </button>
                                )}
                                {["Delivered"].includes(
                                  order?.edprowiseStatus
                                ) && (
                                  <>
                                    {order.orderStatus !== "Close" ? (
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                          handleOrderStatusUpdate(
                                            order.sellerId,
                                            order.enquiryNumber,
                                            "Close"
                                          )
                                        }
                                      >
                                        Close
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-success btn-sm"
                                        onClick={() =>
                                          handleOrderStatusUpdate(
                                            order.sellerId,
                                            order.enquiryNumber,
                                            "Open"
                                          )
                                        }
                                      >
                                        Open
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
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
        <UpdateTDSModal
          isOpen={isModalOpen}
          onClose={closeUpdateTDSModal}
          onTDSUpdated={handleTDSUpdated}
          enquiryNumber={selectedTds?.enquiryNumber}
          quoteNumber={selectedTds?.quoteNumber}
          sellerId={selectedTds?.sellerId}
        />
      )}

      <Modal
        show={showBuyerModal}
        onHide={closeBuyerModal}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Body className="modal-body-scrollable">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <div className="text-end">
                      <RxCross1 onClick={closeBuyerModal} className="ms-2" />
                    </div>

                    {cancelCommentFromBuyer &&
                      cancelCommentFromBuyer !==
                        "No reason provided by buyer" && (
                        <div className="col-md-12">
                          <div className="mb-2">
                            <label
                              htmlFor="cancelReasonFromBuyer"
                              className="form-label"
                            >
                              Order Cancel Reason By Buyer
                            </label>
                            <input
                              type="text"
                              name="cancelReasonFromBuyer"
                              value={cancelCommentFromBuyer}
                              readOnly
                              className="form-control"
                            />
                          </div>
                        </div>
                      )}

                    {cancelCommentFromSeller &&
                      cancelCommentFromSeller !==
                        "No reason provided by seller" && (
                        <div className="col-md-12">
                          <div className="mb-2">
                            <label
                              htmlFor="cancelReasonFromSeller"
                              className="form-label"
                            >
                              Order Cancel Reason By Seller
                            </label>
                            <input
                              type="text"
                              name="cancelReasonFromSeller"
                              value={cancelCommentFromSeller}
                              readOnly
                              className="form-control"
                            />
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TrackOrderHistoryTable;
