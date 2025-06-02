import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useLocation } from "react-router-dom";
import getAPI from "../../../../../api/getAPI.jsx";
import postAPI from "../../../../../api/postAPI.jsx";
import ReasonModal from "./ReasonModal.jsx";
import { formatCost } from "../../../../CommonFunction.jsx";
import { RxCross1 } from "react-icons/rx";

import { format } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewAllQuoteTable = () => {
  const location = useLocation();

  const [searchParams] = useSearchParams();

  const enquiryNumber =
    location.state?.enquiryNumber ||
    location.state?.searchEnquiryNumber ||
    searchParams.get("enquiryNumber");

  const navigate = useNavigate();

  const [submittedQuotes, setSubmittedQuotes] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [selectedEnquiryNumber, setSelectedEnquiryNumber] = useState(null);

  useEffect(() => {
    if (searchParams.has("enquiryNumber")) {
      navigate(location.pathname, {
        state: {
          enquiryNumber,
        },
        replace: true,
      });
    }
  }, []);

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchAllQuoteData();
    fetchCartData();
  }, [enquiryNumber]);

  const fetchAllQuoteData = async () => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await getAPI(
        `/submit-quote-by-status/${encodedEnquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data) {
        setSubmittedQuotes(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching submitted-quote:", err);
    }
  };

  const handleSubmit = async (e, quote) => {
    e.preventDefault();

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const preparedQuote = await getAPI(
        `prepare-quote?sellerId=${quote.sellerId}&enquiryNumber=${encodedEnquiryNumber}`,
        {},
        true
      );

      if (preparedQuote.hasError || !preparedQuote.data.data) {
        toast.error("Failed to fetch prepared quotes");
        return;
      }

      const cartData = preparedQuote.data.data.map((pq) => ({
        prepareQuoteId: pq._id,
      }));

      const response = await postAPI(
        "/cart",
        { enquiryNumber, products: cartData },
        true
      );

      if (!response.hasError) {
        toast.success("Cart data submitted successfully!");

        fetchCartData();
        fetchAllQuoteData();
      } else {
        toast.error(response.message || "Failed to add data to cart");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  const fetchCartData = async () => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await getAPI(
        `cart?enquiryNumber=${encodedEnquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data.data) {
        const groupedData = response.data.data.groupedData || {};

        // Count the number of company keys in groupedData
        const companyCount = Object.keys(groupedData).length;

        setCartCount(companyCount);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }
  };

  const navigateToViewQuote = (event, quote) => {
    event.preventDefault();

    navigate(`/school-dashboard/procurement-services/view-quote`, {
      state: {
        sellerId: quote.sellerId,
        enquiryNumber: quote.enquiryNumber,
        quote: quote,
      },
    });
  };

  const navigateToViewCart = (event, quote) => {
    event.preventDefault();

    navigate(`/school-dashboard/procurement-services/view-cart`, {
      state: {
        enquiryNumber: quote.enquiryNumber,
        buyerStatus: quote.buyerStatus,
      },
    });
  };

  const handleOpenModal = (event, enquiryNumber, sellerId) => {
    event.preventDefault();
    setSelectedEnquiryNumber(enquiryNumber);
    setSelectedSellerId(sellerId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [sending, setSending] = useState(false);

  const generateQuotePDF = async (enquiryNumber, sellerId, quoteNumber) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

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
        `/generate-quote-pdf-for-buyer?schoolId=${schoolId}&sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}`,
        { responseType: "blob" },
        true
      );

      // write your code here
      const blob = new Blob([response.data], { type: "application/pdf" });
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `${quoteNumber || "quote"}.pdf`;
      link.click();

      if (!response.hasError && response.data) {
      } else {
        toast.error(response.message || "Failed to fetch quote data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("An error occurred while fetching quote data");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">View All Quote List</h4>
                <div className="text-end">
                  <Link
                    className="btn btn-light btn-sm"
                    onClick={(event) => {
                      if (submittedQuotes.length > 0) {
                        navigateToViewCart(event, submittedQuotes[0]);
                      } else {
                        toast.error("No quotes available to view cart.");
                      }
                    }}
                    title="View Cart"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover"
                  >
                    <iconify-icon
                      icon="solar:cart-large-minimalistic-broken"
                      className="align-middle fs-18"
                    />
                    <span
                      className="position-absolute topbar-badge fs-10 translate-middle badge bg-danger rounded-pill"
                      style={{ top: "20px" }}
                    >
                      {cartCount}
                      <span className="visually-hidden">unread messages</span>
                    </span>
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
                        <th>Name of Supplier</th>
                        <th>Expected Delivery Date (Mention by Seller)</th>
                        <th>Quoted Amount</th>
                        <th>Remarks from Supplier</th>

                        <th>Status</th>

                        {submittedQuotes.some(
                          (quote) =>
                            quote.venderStatusFromBuyer !== "Quote Not Accepted"
                        ) && <th>Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {submittedQuotes.map((quote) => (
                        <tr key={quote._id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <label className="form-check-label">&nbsp;</label>
                            </div>
                          </td>
                          <td>{quote.companyName}</td>
                          <td>
                            {formatDate(quote.expectedDeliveryDateBySeller)}
                          </td>
                          <td>{formatCost(quote.quotedAmount)}</td>
                          <td>{quote.remarksFromSupplier || "Not Provided"}</td>

                          <td>{quote.venderStatusFromBuyer}</td>

                          <td>
                            <div className="d-flex gap-2">
                              {(quote.venderStatusFromBuyer ===
                                "Order Placed" ||
                                quote.venderStatusFromBuyer ===
                                  "Quote Accepted" ||
                                quote.venderStatusFromBuyer ===
                                  "Work In Progress" ||
                                quote.venderStatusFromBuyer ===
                                  "Ready For Transit" ||
                                quote.venderStatusFromBuyer === "In-Transit" ||
                                quote.venderStatusFromBuyer ===
                                  "Delivered") && (
                                <>
                                  <Link
                                    onClick={(event) =>
                                      navigateToViewQuote(event, quote)
                                    }
                                    title="View Quote"
                                    data-bs-toggle="popover"
                                    data-bs-trigger="hover"
                                    className="btn btn-light btn-sm"
                                  >
                                    <iconify-icon
                                      icon="solar:eye-broken"
                                      className="align-middle fs-18"
                                    />
                                  </Link>
                                  <button
                                    onClick={() =>
                                      generateQuotePDF(
                                        quote?.enquiryNumber,
                                        quote?.sellerId,
                                        quote?.quoteNumber
                                      )
                                    }
                                    className="btn btn-soft-info btn-sm"
                                    title="Download PDF"
                                    data-bs-toggle="popover"
                                    data-bs-trigger="hover"
                                  >
                                    {sending ? (
                                      "Downloading..."
                                    ) : (
                                      <iconify-icon
                                        icon="solar:download-broken"
                                        className="align-middle fs-18"
                                      />
                                    )}
                                  </button>
                                </>
                              )}
                              {quote.venderStatusFromBuyer === "Pending" && (
                                <>
                                  <Link
                                    onClick={(event) =>
                                      navigateToViewQuote(event, quote)
                                    }
                                    className="btn btn-light btn-sm"
                                    title="View Quote"
                                    data-bs-toggle="popover"
                                    data-bs-trigger="hover"
                                  >
                                    <iconify-icon
                                      icon="solar:eye-broken"
                                      className="align-middle fs-18"
                                    />
                                  </Link>
                                  <button
                                    onClick={() =>
                                      generateQuotePDF(
                                        quote?.enquiryNumber,
                                        quote?.sellerId,
                                        quote?.quoteNumber
                                      )
                                    }
                                    className="btn btn-soft-info btn-sm"
                                    title="Download PDF"
                                    data-bs-toggle="popover"
                                    data-bs-trigger="hover"
                                  >
                                    {sending ? (
                                      "Downloading..."
                                    ) : (
                                      <iconify-icon
                                        icon="solar:download-broken"
                                        className="align-middle fs-18"
                                      />
                                    )}
                                  </button>

                                  <button
                                    type="button"
                                    className="btn btn-primary custom-submit-button"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      handleSubmit(event, quote);
                                    }}
                                    title="Add to cart"
                                    data-bs-toggle="popover"
                                    data-bs-trigger="hover"
                                  >
                                    Add to cart
                                  </button>

                                  <Link
                                    className="btn btn-light btn-sm"
                                    onClick={(event) =>
                                      handleOpenModal(
                                        event,
                                        quote?.enquiryNumber,
                                        quote?.sellerId
                                      )
                                    }
                                    title="Reject Quote"
                                    data-bs-toggle="popover"
                                    data-bs-trigger="hover"
                                  >
                                    <RxCross1 className="align-middle fs-18" />
                                  </Link>
                                </>
                              )}

                              {quote.venderStatusFromBuyer ===
                                "Quote Not Accepted" || <></>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* end table-responsive */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ReasonModal
          onClose={handleCloseModal}
          sellerId={selectedSellerId}
          enquiryNumber={selectedEnquiryNumber}
          fetchAllQuoteData={fetchAllQuoteData}
        />
      )}
    </>
  );
};

export default ViewAllQuoteTable;
