import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel.jsx";
import getAPI from "../../../../api/getAPI.jsx";
import UpdateOrderDetailsModal from "./UpdateOrderDetailsModal.jsx";
import putAPI from "../../../../api/putAPI.jsx";
import { formatCost } from "../../../CommonFunction.jsx";

import { format } from "date-fns";
import OrderCancelReasonModal from "./OrderCancelReasonModal.jsx";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const TrackOrderHistoryTable = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/seller-dashboard/procurement-services/pay-to-edprowise");
  };

  const [orderDetails, setOrderDetails] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedOrderNumber, setSelectedOrderNumber] = useState(null);

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

  const handleOrderDetailsUpdated = () => {
    fetchOrderData();
    closeUpdateOrderDetailsModal();
  };

  const openUpdateOrderDetailsModal = (event, orderNumber) => {
    event.preventDefault();
    setSelectedOrderNumber(orderNumber);
    setIsModalOpen(true);
  };

  const closeUpdateOrderDetailsModal = () => {
    setIsModalOpen(false);
  };

  const navigateToViewOrder = (
    event,
    order,
    orderNumber,
    enquiryNumber,
    sellerId
  ) => {
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/view-order-history`, {
      state: { order, orderNumber, enquiryNumber, sellerId },
    });
  };

  const handleExport = () => {
    if (!orderDetails.length) {
      toast.error("No data available to export");
      return;
    }

    const formattedData = orderDetails.map((order) => ({
      Order_Number: order.orderNumber,
      Enquiry_Number: order.enquiryNumber,
      Seller_ID: order.sellerId,
      School_ID: order.schoolId,
      Company_Name: order.companyName,
      Supplier_Status: order.supplierStatus,
      Buyer_Status: order.buyerStatus,
      Edprowise_Status: order.edprowiseStatus,
      Total_Amount_BeforeGST: order.totalAmountBeforeGstAndDiscount,
      Total_Amount: order.totalAmount,
      Total_Taxable_Value: order.totalTaxableValue,
      Total_GST_Amount: order.totalGstAmount,
      Other_Charges: order.otherCharges,
      Final_Receivable_From_Edprowise: order.finalReceivableFromEdprowise,
      Advance_Adjustment: order.advanceAdjustment,
      Final_Payable_Without_TDS: order.finalPayableAmountWithoutTDS,
      Final_Payable_With_TDS: order.finalPayableAmountWithTDS,
      TDS_Amount: order.tDSAmount,
      Expected_Delivery_Date: formatDate(order.expectedDeliveryDate),
      Actual_Delivery_Date: formatDate(order.actualDeliveryDate),
      CreatedAt: formatDate(order.createdAt),
    }));

    exportToExcel(formattedData, "Ordered Products", "Ordered_Products");
  };

  const handleUpdateOrderStatus = async (enquiryNumber, newStatus) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const sellerId = userDetails?.id;

    if (!sellerId) {
      console.error("Seller ID is missing");
      return;
    }

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
      const response = await putAPI(
        `/order-progress-status?enquiryNumber=${encodedEnquiryNumber}&&sellerId=${sellerId}`,
        { supplierStatus: newStatus },
        true
      );

      if (!response.hasError) {
        toast.success(`Order status updated to "${newStatus}" successfully!`);
        fetchOrderData();
      } else {
        toast.error(response.message || "Failed to update status");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const [selectedEnquiryNumber, setSelectedEnquiryNumber] = useState(null);

  const handleOpenModal = (event, enquiryNumber, sellerId, schoolId) => {
    event.preventDefault();
    setSelectedEnquiryNumber(enquiryNumber);
    setSelectedSellerId(sellerId);
    setSelectedSchoolId(schoolId);
    setIsReasonModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsReasonModalOpen(false);
  };

  const [downloadingEdprowiseInvoices, setDownloadingEdprowiseInvoices] =
    useState({});
  const [downloadingBuyerInvoices, setDownloadingBuyerInvoices] = useState({});

  const generateInvoicePDFForEdprowise = async (
    enquiryNumber,
    schoolId,
    invoiceForEdprowise,
    orderNumber
  ) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const sellerId = userDetails?.id;

    const missingFields = [];
    if (!sellerId) missingFields.push("Seller ID");
    if (!enquiryNumber) missingFields.push("Enquiry Number");
    if (!schoolId) missingFields.push("School ID");

    if (missingFields.length > 0) {
      toast.error(`Missing: ${missingFields.join(", ")}`);
      return;
    }

    setDownloadingEdprowiseInvoices((prev) => ({
      ...prev,
      [orderNumber]: true,
    }));

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
      const response = await getAPI(
        `/generate-edprowise-invoice-pdf?schoolId=${schoolId}&sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}`,
        { responseType: "blob" },
        true
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;

      link.download = `${invoiceForEdprowise || "edprowise-invoice"}.pdf`;
      link.click();

      if (!response.hasError && response.data) {
      } else {
        toast.error(response.message || "Failed to fetch invoice data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("An error occurred while fetching invoice data");
    } finally {
      setDownloadingEdprowiseInvoices((prev) => ({
        ...prev,
        [orderNumber]: false,
      }));
    }
  };

  const generateInvoicePDFForBuyer = async (
    enquiryNumber,
    schoolId,
    invoiceForSchool,
    orderNumber
  ) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const sellerId = userDetails?.id;

    const missingFields = [];
    if (!sellerId) missingFields.push("Seller ID");
    if (!enquiryNumber) missingFields.push("Enquiry Number");
    if (!schoolId) missingFields.push("School ID");

    if (missingFields.length > 0) {
      toast.error(`Missing: ${missingFields.join(", ")}`);
      return;
    }

    setDownloadingBuyerInvoices((prev) => ({
      ...prev,
      [orderNumber]: true,
    }));

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
      const response = await getAPI(
        `/generate-buyer-invoice-pdf?schoolId=${schoolId}&sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}`,
        { responseType: "blob" },
        true
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `${invoiceForSchool || "buyer-invoice"}.pdf`;
      link.click();

      if (!response.hasError && response.data) {
      } else {
        toast.error(response.message || "Failed to fetch invoice data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("An error occurred while fetching invoice data");
    } finally {
      setDownloadingBuyerInvoices((prev) => ({
        ...prev,
        [orderNumber]: false,
      }));
    }
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
                <h4 className="card-title flex-grow-1">All Orders List</h4>
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
                        <th>EnquiryNumber</th>
                        <th>Status</th>
                        <th>Expected Delivery Date</th>
                        <th>Total Invoice Amount</th>
                        <th>Action</th>
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
                          <td>
                            {/* why is like when button increases or anything increase at thet time the search bar size dicrese which should not happen give me corrrect code so that what ever number of button i add but existing size of button should not decrease*/}
                            <div
                              className="d-flex gap-2"
                              style={{ flexShrink: 0 }}
                            >
                              <Link
                                onClick={(event) =>
                                  navigateToViewOrder(
                                    event,
                                    order,
                                    order.orderNumber,
                                    order.enquiryNumber,
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

                              <>
                                {order.orderStatus !== "Close" &&
                                order.supplierStatus !== "Cancelled" ? (
                                  <>
                                    <Link
                                      onClick={(event) =>
                                        openUpdateOrderDetailsModal(
                                          event,
                                          order.orderNumber
                                        )
                                      }
                                      className="btn btn-soft-primary btn-sm"
                                      title="Edit"
                                    >
                                      <iconify-icon
                                        icon="solar:pen-2-broken"
                                        className="align-middle fs-18"
                                      />
                                    </Link>
                                    <select
                                      id="supplierStatus"
                                      name="supplierStatus"
                                      className="form-control"
                                      value={order.supplierStatus}
                                      onChange={(e) =>
                                        handleUpdateOrderStatus(
                                          order.enquiryNumber,
                                          e.target.value
                                        )
                                      }
                                      required
                                    >
                                      <option value="">Select Status</option>
                                      <option value="Work In Progress">
                                        Work In Progress
                                      </option>
                                      <option value="Ready For Transit">
                                        Ready For Transit
                                      </option>
                                      <option value="In-Transit">
                                        In-Transit
                                      </option>
                                      <option value="Delivered">
                                        Delivered
                                      </option>
                                    </select>
                                  </>
                                ) : null}
                              </>

                              <>
                                {[
                                  "Ready For Transit",
                                  "In-Transit",
                                  "Delivered",
                                  "Cancelled by Buyer",
                                  "Cancelled",
                                ].includes(order.supplierStatus) && (
                                  <button
                                    onClick={() =>
                                      generateInvoicePDFForEdprowise(
                                        order?.enquiryNumber,
                                        order?.schoolId,
                                        order?.invoiceForEdprowise,
                                        order?.orderNumber
                                      )
                                    }
                                    className="btn btn-soft-info btn-sm"
                                    title="Download PDF Invoice For Edprowise"
                                    data-bs-toggle="popover"
                                    data-bs-trigger="hover"
                                    disabled={
                                      downloadingEdprowiseInvoices[
                                        order.orderNumber
                                      ]
                                    }
                                  >
                                    {downloadingEdprowiseInvoices[
                                      order.orderNumber
                                    ] ? (
                                      "Downloading..."
                                    ) : (
                                      <iconify-icon
                                        icon="solar:download-broken"
                                        className="align-middle fs-18"
                                      />
                                    )}
                                  </button>
                                )}
                              </>

                              <>
                                {[
                                  "Ready For Transit",
                                  "In-Transit",
                                  "Delivered",
                                  "Cancelled by Buyer",
                                  "Cancelled",
                                ].includes(order.supplierStatus) && (
                                  <button
                                    onClick={() =>
                                      generateInvoicePDFForBuyer(
                                        order?.enquiryNumber,
                                        order?.schoolId,
                                        order?.invoiceForSchool,
                                        order?.orderNumber
                                      )
                                    }
                                    className="btn btn-soft-info btn-sm"
                                    title="Download PDF Invoice For Buyer"
                                    data-bs-toggle="popover"
                                    data-bs-trigger="hover"
                                    disabled={
                                      downloadingBuyerInvoices[
                                        order.orderNumber
                                      ]
                                    }
                                  >
                                    {downloadingBuyerInvoices[
                                      order.orderNumber
                                    ] ? (
                                      "Downloading..."
                                    ) : (
                                      <iconify-icon
                                        icon="solar:download-broken"
                                        className="align-middle fs-18"
                                      />
                                    )}
                                  </button>
                                )}
                              </>

                              {order.supplierStatus === "Order Received" && (
                                <button
                                  className="btn btn-info btn-sm"
                                  title="Request For Cancel Order"
                                  data-bs-toggle="popover"
                                  data-bs-trigger="hover"
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

                              {/* <button
                                type="button"
                                className="btn btn-primary custom-submit-button"
                                onClick={handleNavigation}
                              >
                                Pay To EdProwise
                              </button> */}
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
            {/* end card */}
          </div>
          {/* end col */}
        </div>
        {/* end row */}
      </div>
      <UpdateOrderDetailsModal
        isOpen={isModalOpen}
        onClose={closeUpdateOrderDetailsModal}
        orderNumber={selectedOrderNumber} // Fix: Pass selected order number
        onOrderDetailsUpdated={handleOrderDetailsUpdated}
      />

      {isReasonModalOpen && (
        <OrderCancelReasonModal
          onClose={handleCloseModal}
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
