import { useLocation } from "react-router-dom";

import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import getAPI from "../../../../../api/getAPI.jsx";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { formatCost } from "../../../../CommonFunction.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewOrderHistory = () => {
  const location = useLocation();

  const orderNumber =
    location.state?.orderNumber || location.state?.searchOrderNumber;

  const [order, setOrderDetails] = useState([]);
  const [schoolId, setSchoolId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [enquiryNumber, setEnquiryNumber] = useState("");

  const fetchOrderData = async () => {
    try {
      const encodedOrderNumber = encodeURIComponent(orderNumber);

      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/order-details-by-orderNumber/${encodedOrderNumber}`,
        {},
        true
      );
      if (!response.hasError && response.data.data) {
        setOrderDetails(response.data.data);
        setSchoolId(response.data.data.schoolId);
        setSellerId(response.data.data.sellerId);
        setEnquiryNumber(response.data.data.enquiryNumber);
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

  const navigate = useNavigate();

  const [quote, setQuote] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchRequestedQuoteData();
  }, [enquiryNumber]);

  const fetchRequestedQuoteData = async () => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/get-quote/${encodedEnquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data.data.products) {
        setQuote(response.data.data.products);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const encodedOrderNumber = encodeURIComponent(orderNumber);

      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/order-from-buyer/${encodedOrderNumber}/${sellerId}`,
        {},
        true
      );

      if (!response.hasError && response.data.data) {
        setOrders(response.data.data);
        console.log("order from buyer", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [enquiryNumber]);

  const [sending, setSending] = useState(false);
  const [sendingForBuyer, setSendingForBuyer] = useState(false);

  const StarRating = ({ rating }) => {
    const maxStars = 5;
    const filledStars = Math.min(Math.max(0, rating), maxStars);

    return (
      <div className="d-flex">
        {[...Array(maxStars)].map((_, index) => (
          <span
            key={index}
            style={{
              fontSize: "1.5rem",
              color: index < filledStars ? "#ffc107" : "#e4e5e9",
              lineHeight: 1,
            }}
          >
            {index < filledStars ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  const generateInvoicePDFForEdprowise = async () => {
    const missingFields = [];
    if (!sellerId) missingFields.push("Seller ID");
    if (!enquiryNumber) missingFields.push("Enquiry Number");
    if (!schoolId) missingFields.push("School ID");

    if (missingFields.length > 0) {
      toast.error(`Missing: ${missingFields.join(", ")}`);
      return;
    }

    setSending(true);

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/generate-edprowise-invoice-pdf?schoolId=${schoolId}&sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}`,
        { responseType: "blob" },
        true
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;

      const filename = order?.invoiceForEdprowise || "edprowise-invoice";
      link.download = `${filename}.pdf`;

      link.click();

      if (!response.hasError && response.data) {
      } else {
        toast.error(response.message || "Failed to fetch invoice data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("An error occurred while fetching invoice data");
    } finally {
      setSending(false);
    }
  };

  const generateInvoicePDFForBuyer = async () => {
    const missingFields = [];
    if (!sellerId) missingFields.push("Seller ID");
    if (!enquiryNumber) missingFields.push("Enquiry Number");
    if (!schoolId) missingFields.push("School ID");

    if (missingFields.length > 0) {
      toast.error(`Missing: ${missingFields.join(", ")}`);
      return;
    }

    setSendingForBuyer(true);

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/generate-buyer-invoice-pdf?schoolId=${schoolId}&sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}`,
        { responseType: "blob" },
        true
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;

      const filename = order?.invoiceForSchool || "buyer-invoice";
      link.download = `${filename}.pdf`;

      link.click();

      if (!response.hasError && response.data) {
      } else {
        toast.error(response.message || "Failed to fetch invoice data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("An error occurred while fetching invoice data");
    } finally {
      setSendingForBuyer(false);
    }
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (images, index = 0) => {
    setSelectedImages(images);
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  const [selectedOrderImages, setSelectedOrderImages] = useState([]);
  const [currentOrderImageIndex, setCurrentOrderImageIndex] = useState(0);

  const handleOrderImageClick = (images, index = 0) => {
    setSelectedOrderImages(images);
    setCurrentOrderImageIndex(index);
    setShowOrderModal(true);
  };

  const handleNextOrderImage = () => {
    setCurrentOrderImageIndex((prevIndex) =>
      prevIndex === selectedOrderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevOrderImage = () => {
    setCurrentOrderImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedOrderImages.length - 1 : prevIndex - 1
    );
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Order Details
                    </h4>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="nameOfSupplier" className="form-label">
                        Name Of Supplier
                      </label>
                      <p className="form-control">{order?.companyName}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="orderNumber" className="form-label">
                        Order Number
                      </label>
                      <p className="form-control">{order?.orderNumber}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="orderDate" className="form-label">
                        Order Date
                      </label>
                      <p className="form-control">
                        {formatDate(order?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="expectedDeliveryDate"
                        className="form-label"
                      >
                        Expected Delivery Date
                      </label>
                      <p className="form-control">
                        {formatDate(order?.expectedDeliveryDate)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="actualDeliveryDate"
                        className="form-label"
                      >
                        Actual Delivery Date
                      </label>
                      <p className="form-control">
                        {order?.actualDeliveryDate
                          ? formatDate(order?.actualDeliveryDate)
                          : "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="feedbackComment" className="form-label">
                        Feedback Comment
                      </label>
                      <p className="form-control">
                        {order?.feedbackComment || "Not Provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="rating" className="form-label">
                        Rating
                      </label>
                      <div
                        className=" d-flex align-items-center"
                        style={{
                          gap: "0.5rem",
                        }}
                      >
                        {order?.rating ? (
                          <>
                            <StarRating rating={order.rating} />
                            <span
                              className="text-muted"
                              style={{ fontSize: "0.875rem" }}
                            >
                              ({order.rating}/5)
                            </span>
                          </>
                        ) : (
                          <span className="text-muted">Not rated yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Invoice To Buyer
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="taxableValue" className="form-label">
                        Taxable Value
                      </label>
                      <p className="form-control">
                        {formatCost(order?.totalTaxableValue)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gstAmount" className="form-label">
                        GST Amount
                      </label>
                      <p className="form-control">
                        {formatCost(order?.totalGstAmount)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="totalInvoiceAmount"
                        className="form-label"
                      >
                        Total Invoice Amount
                      </label>
                      <p className="form-control">
                        {formatCost(order?.totalAmount)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="tdsValue" className="form-label">
                        TDS Amount
                      </label>
                      <p className="form-control">
                        {formatCost(order?.tdsValue)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="advanceAdjustment" className="form-label">
                        Advance Adjustment
                      </label>
                      <p className="form-control">
                        {formatCost(order?.advanceAdjustment)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="deliveryCharges" className="form-label">
                        Delivery Charges
                      </label>
                      <p className="form-control">
                        {formatCost(order?.deliveryCharges)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="finalPayableAmountWithTDS"
                        className="form-label"
                      >
                        Balance Amount
                      </label>
                      <p className="form-control">
                        {formatCost(order?.finalPayableAmountWithTDS)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {["Ready For Transit", "In-Transit", "Delivered"].includes(
                      order?.supplierStatus
                    ) && (
                      <>
                        <button
                          onClick={() => generateInvoicePDFForBuyer()}
                          className="btn btn-soft-info btn-sm"
                          title="Download PDF Invoice For Buyer"
                          data-bs-toggle="popover"
                          data-bs-trigger="hover"
                        >
                          {sendingForBuyer ? (
                            "Downloading..."
                          ) : (
                            <>
                              Download Invoice For Buyer
                              <iconify-icon
                                icon="solar:download-broken"
                                className="align-middle fs-18"
                              />
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Invoice To EdProwise
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="taxableValue" className="form-label">
                        Taxable Value
                      </label>
                      <p className="form-control">
                        {formatCost(order?.totalTaxableValueForEdprowise)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gstAmount" className="form-label">
                        GST Amount
                      </label>
                      <p className="form-control">
                        {formatCost(order?.totalGstAmountForEdprowise)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="totalInvoiceAmount"
                        className="form-label"
                      >
                        Total Invoice Amount
                      </label>
                      <p className="form-control">
                        {formatCost(order?.totalAmountForEdprowise)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="tdsValueForEdprowise"
                        className="form-label"
                      >
                        TDS Amount
                      </label>
                      <p className="form-control">
                        {formatCost(order?.tdsValueForEdprowise)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="advanceAdjustment" className="form-label">
                        Advance Adjustment
                      </label>
                      <p className="form-control">
                        {formatCost(order?.advanceAdjustment)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="deliveryCharges" className="form-label">
                        Delivery Charges
                      </label>
                      <p className="form-control">
                        {formatCost(order?.deliveryCharges)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="finalPayableAmountWithTDS"
                        className="form-label"
                      >
                        Balance Amount
                      </label>
                      <p className="form-control">
                        {formatCost(
                          order?.finalPayableAmountWithTDSForEdprowise
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {["Ready For Transit", "In-Transit", "Delivered"].includes(
                      order?.supplierStatus
                    ) && (
                      <>
                        <button
                          onClick={() => generateInvoicePDFForEdprowise()}
                          className="btn btn-soft-info btn-sm me-2"
                          title="Download PDF Invoice For Edprowise"
                          data-bs-toggle="popover"
                          data-bs-trigger="hover"
                        >
                          {sending ? (
                            "Downloading..."
                          ) : (
                            <>
                              Download Invoice For Edprowise
                              <iconify-icon
                                icon="solar:download-broken"
                                className="align-middle fs-18"
                              />
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                    >
                      Pay Online
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Requested Quote Details
                    </h4>
                  </div>
                </div>

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
                        <th>Enquiry No.</th>
                        <th>Product Required Image & Name</th>
                        <th>Product Required (Category)</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Product Description</th>
                        <th>Quote Requested Date</th>
                        <th>Delivery Expected Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quote.length > 0 ? (
                        quote.map((product) => {
                          const firstAvailableImage =
                            product?.productImages?.find((img) => img);
                          const imageUrl = firstAvailableImage
                            ? `${process.env.REACT_APP_API_URL_FOR_PROCUREMENT_IMAGE}${firstAvailableImage}`
                            : null;

                          return (
                            <tr key={product.id}>
                              <td>
                                <div className="form-check ms-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`customCheck${product.id}`}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`customCheck${product.id}`}
                                  >
                                    &nbsp;
                                  </label>
                                </div>
                              </td>
                              <td>{product.enquiryNumber}</td>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  {imageUrl && (
                                    <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                      <img
                                        className="avatar-md"
                                        alt={product.subCategoryName}
                                        src={imageUrl}
                                        onClick={() =>
                                          handleImageClick(
                                            product.productImages
                                          )
                                        }
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <Link className="text-dark fw-medium">
                                      {product.subCategoryName}
                                    </Link>
                                  </div>
                                </div>
                              </td>
                              <td>{product.categoryName}</td>
                              <td>{product.quantity}</td>
                              <td>{product.unit}</td>
                              <td>{product.description}</td>
                              <td>{formatDate(product.createdAt)}</td>
                              <td>
                                {formatDate(product.expectedDeliveryDate)}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Order From Buyer
                    </h4>
                  </div>
                </div>

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
                        <th>Product Required Image & Name</th>
                        <th>Quantity</th>
                        <th>Listing Rate</th>
                        <th>Discount</th>
                        <th>Final Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 ? (
                        orders.map((order) => {
                          const firstAvailableOrderImage =
                            order?.cartImages?.find((img) => img);
                          const orderImageUrl = firstAvailableOrderImage
                            ? `${process.env.REACT_APP_API_URL_FOR_PROCUREMENT_IMAGE}${firstAvailableOrderImage}`
                            : null;

                          return (
                            <tr key={order._id}>
                              <td>
                                <div className="form-check ms-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`customCheck${order._id}`}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`customCheck${order._id}`}
                                  >
                                    &nbsp;
                                  </label>
                                </div>
                              </td>
                              <td>{order.orderNumber}</td>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  {/* why i am not able to see any image */}
                                  {orderImageUrl && (
                                    <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                      <img
                                        className="avatar-md"
                                        alt={order.subCategoryName}
                                        src={orderImageUrl}
                                        onClick={() =>
                                          handleOrderImageClick(
                                            order.cartImages
                                          )
                                        }
                                      />
                                    </div>
                                  )}
                                  <div>{order.subcategoryName}</div>
                                </div>
                              </td>

                              <td>{order.quantity}</td>
                              <td>{formatCost(order.listingRate)}</td>
                              <td>{order.discount}</td>
                              <td>{formatCost(order.finalRate)}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* end table-responsive */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body
          className="text-center p-0 position-relative"
          style={{ minHeight: "250px" }}
        >
          {selectedImages.length > 0 && (
            <>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "300px", overflow: "hidden" }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL_FOR_PROCUREMENT_IMAGE}${selectedImages[currentImageIndex]}`}
                  alt={`Product ${currentImageIndex + 1}`}
                  style={{
                    maxWidth: "95%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  className="img-fluid"
                />
              </div>

              {selectedImages.length > 1 && (
                <div className="mt-2">
                  {currentImageIndex + 1} / {selectedImages.length}
                </div>
              )}
            </>
          )}
        </Modal.Body>

        {selectedImages.length > 1 && (
          <>
            <button
              className="position-absolute top-50 translate-middle-y btn btn-primary rounded-circle"
              onClick={handlePrevImage}
              style={{
                left: "20px",
                width: "40px",
                height: "40px",
                padding: 0,
              }}
            >
              <FaArrowLeft />
            </button>
            <button
              className="position-absolute top-50 translate-middle-y btn btn-primary rounded-circle"
              onClick={handleNextImage}
              style={{
                right: "20px",
                width: "40px",
                height: "40px",
                padding: 0,
              }}
            >
              <FaArrowRight />
            </button>
          </>
        )}
      </Modal>
      <Modal
        show={showOrderModal}
        onHide={() => setShowOrderModal(false)}
        centered
      >
        <Modal.Body
          className="text-center p-0 position-relative"
          style={{ minHeight: "250px" }}
        >
          {selectedOrderImages.length > 0 && (
            <>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "300px", overflow: "hidden" }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL_FOR_PROCUREMENT_IMAGE}${selectedOrderImages[currentOrderImageIndex]}`}
                  alt={`Product ${currentOrderImageIndex + 1}`}
                  style={{
                    maxWidth: "95%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  className="img-fluid"
                />
              </div>

              {selectedOrderImages.length > 1 && (
                <div className="mt-2">
                  {currentOrderImageIndex + 1} / {selectedOrderImages.length}
                </div>
              )}
            </>
          )}
        </Modal.Body>

        {selectedOrderImages.length > 1 && (
          <>
            <button
              className="position-absolute top-50 translate-middle-y btn btn-primary rounded-circle"
              onClick={handlePrevOrderImage}
              style={{
                left: "20px",
                width: "40px",
                height: "40px",
                padding: 0,
              }}
            >
              <FaArrowLeft />
            </button>
            <button
              className="position-absolute top-50 translate-middle-y btn btn-primary rounded-circle"
              onClick={handleNextOrderImage}
              style={{
                right: "20px",
                width: "40px",
                height: "40px",
                padding: 0,
              }}
            >
              <FaArrowRight />
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default ViewOrderHistory;
