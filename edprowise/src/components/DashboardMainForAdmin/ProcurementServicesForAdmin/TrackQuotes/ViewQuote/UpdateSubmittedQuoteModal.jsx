import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import getAPI from "../../../../../api/getAPI.jsx";
import putAPI from "../../../../../api/putAPI.jsx";
import { format, parseISO } from "date-fns";

const UpdateSubmittedQuoteModal = ({
  isOpen,
  onClose,
  enquiryNumber,
  sellerId,
  onQuoteUpdated,
}) => {
  const [submittedQuote, setSubmittedQuote] = useState({
    quotedAmount: "",
    description: "",
    remarksFromSupplier: "",
    expectedDeliveryDateBySeller: "",
    paymentTerms: "",
    advanceRequiredAmount: "",
  });

  useEffect(() => {
    if (isOpen) {
      const fetchSubmittedQuoteData = async () => {
        try {
          const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
          const response = await getAPI(
            `${process.env.REACT_APP_PROCUREMENT_SERVICE}/submit-quote?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}`
          );
          if (!response.hasError && response.data && response.data.data) {
            const {
              quotedAmount,
              description,
              remarksFromSupplier,
              expectedDeliveryDateBySeller,
              paymentTerms,
              advanceRequiredAmount,
            } = response.data.data;

            const formattedDate = format(
              parseISO(expectedDeliveryDateBySeller),
              "yyyy-MM-dd"
            );

            setSubmittedQuote({
              quotedAmount,
              description,
              remarksFromSupplier,
              expectedDeliveryDateBySeller: formattedDate,
              paymentTerms,
              advanceRequiredAmount,
            });
          } else {
            console.error("Invalid response format or error in response");
          }
        } catch (err) {
          console.error("Error fetching Submitted quote data:", err);
        }
      };

      fetchSubmittedQuoteData();
    }
  }, [isOpen, enquiryNumber, sellerId]);

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
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/submit-quote?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}`,
        dataToSend,
        true
      );

      if (!response.hasError) {
        toast.success("Quote Updated successfully");
        setSubmittedQuote({
          quotedAmount: "",
          description: "",
          remarksFromSupplier: "",
          expectedDeliveryDateBySeller: "",
          paymentTerms: "",
          advanceRequiredAmount: "",
        });
        onQuoteUpdated();
        onClose();
      } else {
        toast.error(response.message || "Failed to update submitted quote");
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

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Body className="modal-body-scrollable">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card m-2">
                <div className="card-body custom-heading-padding">
                  <div className="container">
                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Update Submitted Quote
                      </h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="quotedAmount" className="form-label">
                        Quoted Amount <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="quotedAmount"
                        value={submittedQuote.quotedAmount}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={submittedQuote.description}
                        onChange={handleInputChange}
                        className="form-control"
                        // required
                        placeholder="Example : Good Products"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="remarksFromSupplier"
                        className="form-label"
                      >
                        Remarks from Supplier
                      </label>
                      <input
                        type="text"
                        name="remarksFromSupplier"
                        value={submittedQuote.remarksFromSupplier}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Example : Good Products"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="expectedDeliveryDateBySeller"
                        className="form-label"
                      >
                        Expected Delivery Date{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        name="expectedDeliveryDateBySeller"
                        value={submittedQuote.expectedDeliveryDateBySeller}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
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
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="advanceRequiredAmount"
                        className="form-label"
                      >
                        Advance Required Amount
                      </label>
                      <input
                        type="text"
                        name="advanceRequiredAmount"
                        value={submittedQuote.advanceRequiredAmount}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="text-end">
                      <Button
                        variant="success"
                        type="submit"
                        disabled={sending}
                      >
                        {sending ? "Updating..." : "Update"}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={onClose}
                        className="ms-2"
                      >
                        Close
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateSubmittedQuoteModal;
