import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import getAPI from "../../../../../api/getAPI.jsx";
import putAPI from "../../../../../api/putAPI.jsx";
import { format } from "date-fns";
import { formatCost } from "../../../../CommonFunction.jsx";
import { Modal, Button } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";
import UpdateDeliveryChargesModal from "./UpdateDeliveryChargesModal.jsx";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewAllQuoteTable = () => {
  const location = useLocation();

  const enquiryNumber =
    location.state?.enquiryNumber || location.state?.searchEnquiryNumber;

  const schoolId = location.state?.schoolId;

  const navigate = useNavigate();

  const [submittedQuotes, setSubmittedQuotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rejectComment, setRejectComment] = useState("");
  const [isDeliveryChargesModalOpen, setIsDeliveryChargesModalOpen] =
    useState(false);

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchAllQuoteData();
  }, [enquiryNumber]);

  const fetchAllQuoteData = async () => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/submit-quote/${encodedEnquiryNumber}`,
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

  const handleVenderStatusUpdate = async (sellerId, newStatus) => {
    try {
      const response = await putAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/update-vender-status?enquiryNumber=${enquiryNumber}&sellerId=${sellerId}`,
        { venderStatus: newStatus },
        true
      );

      if (!response.hasError) {
        toast.success(`Quote status updated to "${newStatus}" successfully!`);
        return fetchAllQuoteData();
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

  const navigateToViewQuote = (event, quote) => {
    event.preventDefault();

    navigate(`/admin-dashboard/procurement-services/view-quote`, {
      state: {
        sellerId: quote.sellerId,
        enquiryNumber: quote.enquiryNumber,
        quote: quote,
        schoolId,
      },
    });
  };

  const handleExport = () => {};

  const [downloadingQuotes, setDownloadingQuotes] = useState({});

  const generateQuotePDF = async (enquiryNumber, sellerId, quoteNumber) => {
    const missingFields = [];
    if (!sellerId) missingFields.push("Seller ID");
    if (!enquiryNumber) missingFields.push("Enquiry Number");
    if (!schoolId) missingFields.push("School ID");

    if (missingFields.length > 0) {
      toast.error(`Missing: ${missingFields.join(", ")}`);
      return;
    }

    setDownloadingQuotes((prev) => ({
      ...prev,
      [sellerId]: true,
    }));

    try {
      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/generate-quote-pdf?schoolId=${schoolId}&sellerId=${sellerId}&enquiryNumber=${enquiryNumber}`,
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
      // Reset downloading state for this specific quote
      setDownloadingQuotes((prev) => ({
        ...prev,
        [sellerId]: false,
      }));
    }
  };

  const openRejectCommentModal = (comment) => {
    setRejectComment(comment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setRejectComment("");
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">View All Quote List</h4>
                <div className="text-end">
                  <Link
                    onClick={handleExport}
                    className="btn btn-sm btn-outline-light"
                  >
                    Export
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
                        <th>Action</th>
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
                                id={`customCheck${quote._id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`customCheck${quote._id}`}
                              >
                                &nbsp;
                              </label>
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
                              {quote.venderStatusFromBuyer ===
                                "Quote Not Accepted" && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    openRejectCommentModal(
                                      quote.rejectCommentFromBuyer
                                    )
                                  }
                                >
                                  Comment From Buyer
                                </button>
                              )}

                              <Link
                                onClick={(event) =>
                                  navigateToViewQuote(event, quote)
                                }
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
                                disabled={downloadingQuotes[quote.sellerId]}
                              >
                                {downloadingQuotes[quote.sellerId] ? (
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
                              ].includes(quote?.venderStatusFromBuyer) && (
                                <>
                                  {quote.venderStatus === "Pending" && (
                                    <>
                                      <button
                                        className="btn btn-success btn-sm"
                                        onClick={(e) =>
                                          openUpdateDeliveryChargesModal(
                                            e,
                                            quote.sellerId
                                          )
                                        }
                                      >
                                        Accept
                                      </button>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                          handleVenderStatusUpdate(
                                            quote.sellerId,
                                            "Quote Not Accepted"
                                          )
                                        }
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                  {quote.venderStatus === "Quote Accepted" && (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() =>
                                        handleVenderStatusUpdate(
                                          quote.sellerId,
                                          "Quote Not Accepted"
                                        )
                                      }
                                    >
                                      Reject
                                    </button>
                                  )}
                                  {quote.venderStatus ===
                                    "Quote Not Accepted" && (
                                    <button
                                      className="btn btn-success btn-sm"
                                      onClick={(e) =>
                                        openUpdateDeliveryChargesModal(
                                          e,
                                          quote.sellerId
                                        )
                                      }
                                    >
                                      Accept
                                    </button>
                                  )}
                                </>
                              )}
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

      <UpdateDeliveryChargesModal
        isOpen={isDeliveryChargesModalOpen}
        onClose={closeUpdateDeliveryChargesModal}
        enquiryNumber={enquiryNumber}
        sellerId={selectedSellerId}
        onQuoteUpdated={async () => {
          try {
            await handleVenderStatusUpdate(selectedSellerId, "Quote Accepted");
            await fetchAllQuoteData();
          } catch (error) {
            toast.error("Failed to update quote status");
          }
        }}
      />

      {/* Modal for Reject Comment From Buyer */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Body className="modal-body-scrollable">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body custom-heading-padding">
                    <div className="row">
                      <div className="text-end">
                        <RxCross1 onClick={closeModal} className="ms-2" />
                      </div>
                      <div className="col-md-12">
                        <div className="mb-2">
                          <label
                            htmlFor="rejectCommentFromBuyer"
                            className="form-label"
                          >
                            Reject Comment From Buyer
                          </label>
                          <input
                            type="text"
                            name="rejectCommentFromBuyer"
                            value={rejectComment}
                            readOnly
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
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

export default ViewAllQuoteTable;
