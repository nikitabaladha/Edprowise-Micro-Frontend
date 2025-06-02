import { useLocation } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../../export-excel.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ViewPrepareQuoteListFromSeller from "./ViewPrepareQuoteListFromSeller";
import UpdateSubmittedQuoteModal from "./UpdateSubmittedQuoteModal";
import getAPI from "../../../../../api/getAPI";
import putAPI from "../../../../../api/putAPI";

import UpdateDeliveryChargesModal from "../ViewAllQuoteTable/UpdateDeliveryChargesModal";

import { format } from "date-fns";
import { formatCost } from "../../../../CommonFunction";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewQuote = () => {
  const location = useLocation();

  const { quote, schoolId } = location.state || {};

  const enquiryNumber =
    location.state?.enquiryNumber || location.state?.searchEnquiryNumber;
  const sellerId = location.state?.sellerId || location.state?.searchSellerId;

  const [currentQuote, setCurrentQuote] = useState(quote);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeliveryChargesModalOpen, setIsDeliveryChargesModalOpen] =
    useState(false);

  const fetchQuoteData = async () => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await getAPI(
        `/submit-quote?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}`
      );
      if (!response.hasError && response.data && response.data.data) {
        setCurrentQuote(response.data.data);
        // from submitted quote i am getting quote number so tell me how to redirect to this page
        console.log("submit-quote", response.data.data);
      } else {
        console.error("Error fetching quote data");
      }
    } catch (err) {
      console.error("Error fetching quote data:", err);
    }
  };

  useEffect(() => {
    fetchQuoteData();
  }, [enquiryNumber, sellerId]);

  const navigate = useNavigate();

  const openUpdateSubmittedQuoteModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeUpdateSubmittedQuoteModal = () => {
    setIsModalOpen(false);
  };

  const handleQuoteUpdated = () => {
    fetchQuoteData();
    closeUpdateSubmittedQuoteModal();
  };

  const handleVenderStatusUpdate = async (newStatus) => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await putAPI(
        `/update-vender-status?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}`,
        { venderStatus: newStatus },
        true
      );

      if (!response.hasError) {
        toast.success(`Quote status updated to "${newStatus}" successfully!`);
        return fetchQuoteData();
      } else {
        toast.error(response.message || "Failed to update vender status");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const [sending, setSending] = useState(false);

  const generateQuotePDF = async (enquiryNumber, sellerId) => {
    if (!sellerId || !enquiryNumber || !schoolId) {
      console.error("Seller ID, Enquiry Number, or School ID is missing");
      toast.error("Required information is missing");
      return;
    }

    setSending(true);

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await getAPI(
        `/generate-quote-pdf?schoolId=${schoolId}&sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}`,
        { responseType: "blob" },
        true
      );

      // write your code here
      const blob = new Blob([response.data], { type: "application/pdf" });
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `${currentQuote?.quoteNumber || "quote"}.pdf`;
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

  const [selectedSellerId, setSelectedSellerId] = useState(null);

  const openUpdateDeliveryChargesModal = (event, sellerId) => {
    event.preventDefault();
    setSelectedSellerId(sellerId);
    setIsDeliveryChargesModalOpen(true);
  };

  const closeUpdateDeliveryChargesModal = () => {
    setIsDeliveryChargesModalOpen(false);
    setSelectedSellerId(null);
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
                    <div className="d-flex justify-content-between">
                      <h4 className="card-title text-center custom-heading-font align-content-center">
                        Submitted Quote Details
                      </h4>
                      <div className="">
                        <button
                          onClick={() =>
                            generateQuotePDF(
                              quote?.enquiryNumber,
                              quote?.sellerId
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

                        {[
                          "Quote Requested",
                          "Quote Received",
                          "Pending",
                        ].includes(currentQuote?.venderStatusFromBuyer) && (
                          <>
                            <Link
                              onClick={openUpdateSubmittedQuoteModal}
                              className="btn btn-soft-primary btn-sm"
                              title="Edit"
                              data-bs-toggle="popover"
                              data-bs-trigger="hover"
                            >
                              <iconify-icon
                                icon="solar:pen-2-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                            {currentQuote?.venderStatus === "Pending" && (
                              <>
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={(e) =>
                                    openUpdateDeliveryChargesModal(
                                      e,
                                      currentQuote?.sellerId
                                    )
                                  }
                                >
                                  Accept
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    handleVenderStatusUpdate(
                                      "Quote Not Accepted"
                                    )
                                  }
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {currentQuote?.venderStatus ===
                              "Quote Accepted" && (
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  handleVenderStatusUpdate("Quote Not Accepted")
                                }
                              >
                                Reject
                              </button>
                            )}
                            {currentQuote?.venderStatus ===
                              "Quote Not Accepted" && (
                              <button
                                className="btn btn-success btn-sm"
                                onClick={(e) =>
                                  openUpdateDeliveryChargesModal(
                                    e,
                                    currentQuote?.sellerId
                                  )
                                }
                              >
                                Accept
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="supplierName" className="form-label">
                        Supplier Name
                      </label>
                      <p className="form-control">
                        {currentQuote?.companyName}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="paymentTerms" className="form-label">
                        Payment Terms
                      </label>
                      <p className="form-control">
                        {currentQuote?.paymentTerms}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="dateOfQuoteSubmitted"
                        className="form-label"
                      >
                        Date of Quote Submitted
                      </label>

                      <p className="form-control">
                        {formatDate(currentQuote?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="expectedDeliveryDateBySeller"
                        className="form-label"
                      >
                        Expected Delivery Date
                      </label>
                      <p className="form-control">
                        {formatDate(currentQuote?.expectedDeliveryDateBySeller)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="quotedAmount" className="form-label">
                        Quoted Amount
                      </label>
                      <p className="form-control">
                        {formatCost(currentQuote?.quotedAmount)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label
                        htmlFor="advanceRequiredAmount"
                        className="form-label"
                      >
                        Advances Required Amount
                      </label>
                      <p className="form-control">
                        {formatCost(currentQuote?.advanceRequiredAmount) ||
                          "Not Provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="remarksFromSupplier"
                        className="form-label"
                      >
                        Remarks from Supplier
                      </label>
                      <p className="form-control">
                        {currentQuote?.remarksFromSupplier || "Not Provided"}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <p className="form-control">
                        {currentQuote?.description || "Not Provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="deliveryCharges" className="form-label">
                        Delivery Charges
                      </label>
                      <p className="form-control">
                        {currentQuote?.deliveryCharges || "Not Provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => window.history.back()}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
          <></>
        </div>

        <ViewPrepareQuoteListFromSeller onQuoteUpdated={fetchQuoteData} />
      </div>

      <UpdateSubmittedQuoteModal
        isOpen={isModalOpen}
        onClose={closeUpdateSubmittedQuoteModal}
        enquiryNumber={enquiryNumber}
        sellerId={sellerId}
        onQuoteUpdated={handleQuoteUpdated}
      />

      <UpdateDeliveryChargesModal
        isOpen={isDeliveryChargesModalOpen}
        onClose={closeUpdateDeliveryChargesModal}
        enquiryNumber={enquiryNumber}
        sellerId={selectedSellerId}
        onQuoteUpdated={async () => {
          try {
            // First update the status to "Quote Accepted"
            await handleVenderStatusUpdate("Quote Accepted");
            // Then refresh the data
            await fetchQuoteData();
          } catch (error) {
            toast.error("Failed to update quote status");
          }
        }}
      />
    </>
  );
};

export default ViewQuote;
