import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import getAPI from "../../../../../api/getAPI.jsx";
import putAPI from "../../../../../api/putAPI.jsx";

const UpdateDeliveryChargesModal = ({
  isOpen,
  onClose,
  enquiryNumber,
  sellerId,
  onQuoteUpdated,
}) => {
  const [submittedQuote, setSubmittedQuote] = useState({
    deliveryCharges: "",
  });

  useEffect(() => {
    if (isOpen) {
      const fetchSubmittedQuoteData = async () => {
        try {
          const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
          const response = await getAPI(
            `/submit-quote?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}`
          );
          if (!response.hasError && response.data && response.data.data) {
            const { deliveryCharges } = response.data.data;

            setSubmittedQuote({
              deliveryCharges,
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

    const { deliveryCharges } = submittedQuote;

    const dataToSend = {
      deliveryCharges,
    };

    setSending(true);

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await putAPI(
        `/submit-quote-update-delivery-charges?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}`,
        dataToSend,
        true
      );

      if (!response.hasError) {
        toast.success("Delivery Charges added successfully");
        setSubmittedQuote({
          deliveryCharges: "",
        });

        await onQuoteUpdated();
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
                        Update Delivery Charges
                      </h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="deliveryCharges" className="form-label">
                        Delivery Charges <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        name="deliveryCharges"
                        value={submittedQuote.deliveryCharges}
                        onChange={handleInputChange}
                        className="form-control"
                        required
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

export default UpdateDeliveryChargesModal;
