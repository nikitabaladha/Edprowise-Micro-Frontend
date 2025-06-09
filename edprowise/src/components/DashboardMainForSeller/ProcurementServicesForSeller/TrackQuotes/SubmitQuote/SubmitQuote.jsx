import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useLocation } from "react-router-dom";
import putAPI from "../../../../../api/putAPI.jsx";
import getAPI from "../../../../../api/getAPI.jsx";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import WarningDialog from "./WarningDialog.jsx";

const SubmitQuote = () => {
  const location = useLocation();
  const enquiryNumber = location.state?.enquiryNumber;

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const sellerId = userDetails?.id;

  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [venderStatusFromBuyer, setVenderStatusFromBuyer] = useState("");

  const [submittedQuote, setSubmittedQuote] = useState({
    quotedAmount: "",
    description: "",
    remarksFromSupplier: "",
    expectedDeliveryDateBySeller: "",
    paymentTerms: "",
    advanceRequiredAmount: "",
  });

  useEffect(() => {
    const fetchSubmittedQuoteData = async () => {
      try {
        const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
        const response = await getAPI(
          `${process.env.REACT_APP_PROCUREMENT_QUOTE_PROPOSAL_SERVICE}/submit-quote?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}`
        );
        if (!response.hasError && response.data && response.data.data) {
          const {
            quotedAmount,
            description,
            remarksFromSupplier,
            expectedDeliveryDateBySeller,
            paymentTerms,
            advanceRequiredAmount,
            venderStatusFromBuyer: statusFromAPI,
          } = response.data.data;

          const formattedDate = expectedDeliveryDateBySeller
            ? format(parseISO(expectedDeliveryDateBySeller), "yyyy-MM-dd")
            : "";

          setSubmittedQuote({
            quotedAmount,
            description,
            remarksFromSupplier,
            expectedDeliveryDateBySeller: formattedDate,
            paymentTerms,
            advanceRequiredAmount,
          });

          setVenderStatusFromBuyer(statusFromAPI);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Submitted quote data:", err);
      }
    };

    fetchSubmittedQuoteData();
  }, [enquiryNumber, sellerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmittedQuote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      quotedAmount,
      description,
      remarksFromSupplier,
      expectedDeliveryDateBySeller,
      paymentTerms,
      advanceRequiredAmount,
    } = submittedQuote;

    const dataToSend = {
      quotedAmount,
      description,
      remarksFromSupplier,
      expectedDeliveryDateBySeller,
      paymentTerms,
      advanceRequiredAmount,
    };

    setSending(true);

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
      const response = await putAPI(
        `${process.env.REACT_APP_PROCUREMENT_QUOTE_PROPOSAL_SERVICE}/submit-quote?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}`,
        dataToSend,
        true
      );

      if (!response.hasError) {
        toast.success("Quote Submitted successfully");
        setSubmittedQuote({
          quotedAmount: "",
          description: "",
          remarksFromSupplier: "",
          expectedDeliveryDateBySeller: "",
          paymentTerms: "",
          advanceRequiredAmount: "",
        });

        setShowWarning(true);
      } else {
        toast.error(response.message || "Failed to Prepare quote");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  const handleWarningClose = () => {
    setShowWarning(false);
    navigate("/seller-dashboard/procurement-services/view-requested-quote", {
      state: { enquiryNumber },
    });
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
                      Submit Quote
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="quotedAmount" className="form-label">
                          Quoted Amount <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          name="quotedAmount"
                          value={submittedQuote.quotedAmount}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="expectedDeliveryDateBySeller"
                          className="form-label"
                        >
                          Expected Delivery Date by Seller{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          required
                          type="date"
                          name="expectedDeliveryDateBySeller"
                          value={submittedQuote.expectedDeliveryDateBySeller}
                          onChange={handleInputChange}
                          className="form-control"
                          readOnly={
                            !(
                              venderStatusFromBuyer === "Quote Not Accepted" ||
                              venderStatusFromBuyer === "Pending"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <textarea
                          type="text"
                          name="description"
                          value={submittedQuote.description}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Example : All Products are good"
                          readOnly={
                            !(
                              venderStatusFromBuyer === "Quote Not Accepted" ||
                              venderStatusFromBuyer === "Pending"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="remarksFromSupplier"
                          className="form-label"
                        >
                          Remarks from Supplier
                        </label>

                        <textarea
                          type="text"
                          name="remarksFromSupplier"
                          value={submittedQuote.remarksFromSupplier}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Example : All Products are good"
                          readOnly={
                            !(
                              venderStatusFromBuyer === "Quote Not Accepted" ||
                              venderStatusFromBuyer === "Pending"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="paymentTerms" className="form-label">
                          Payment Terms <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          name="paymentTerms"
                          value={submittedQuote.paymentTerms}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Ex : 45"
                          required
                          readOnly={
                            !(
                              venderStatusFromBuyer === "Quote Not Accepted" ||
                              venderStatusFromBuyer === "Pending"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="advanceRequiredAmount"
                          className="form-label"
                        >
                          Advances Required Amount
                        </label>
                        <input
                          type="text"
                          name="advanceRequiredAmount"
                          value={submittedQuote.advanceRequiredAmount}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Ex : 1000"
                          readOnly={
                            !(
                              venderStatusFromBuyer === "Quote Not Accepted" ||
                              venderStatusFromBuyer === "Pending"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {(venderStatusFromBuyer === "Quote Not Accepted" ||
                    venderStatusFromBuyer === "Pending") && (
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                        disabled={sending}
                      >
                        {sending ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showWarning && <WarningDialog onClose={handleWarningClose} />}
    </>
  );
};

export default SubmitQuote;
