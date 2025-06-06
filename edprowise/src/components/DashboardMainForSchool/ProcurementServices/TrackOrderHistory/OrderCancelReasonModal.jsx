import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Modal, Button } from "react-bootstrap";
import putAPI from "../../../../api/putAPI.jsx";

const OrderCancelReasonModal = ({
  onClose,
  sellerId,
  schoolId,
  enquiryNumber,
  fetchOrderData,
}) => {
  const [cancelReasonFromBuyer, setCancelReasonFromBuyer] = useState("");

  const handleInputChange = (e) => {
    setCancelReasonFromBuyer(e.target.value);
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      cancelReasonFromBuyer,
    };

    setSending(true);

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await putAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/request-cancel-order-by-buyer?sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}&schoolId=${schoolId}`,
        formDataToSend,
        true
      );

      if (!response.hasError) {
        toast.success("Order Cancel Requested Successfully.");
        fetchOrderData();
        onClose();
      } else {
        toast.error(response.message || "Failed requesting order cancellation");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Body className="modal-body-scrollable">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body custom-heading-padding">
                  <div className="container">
                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        If you want to reject give reason
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-2">
                        <label
                          htmlFor="cancelReasonFromBuyer"
                          className="form-label"
                        >
                          Reason for Order Cancel
                        </label>
                        <input
                          type="text"
                          name="cancelReasonFromBuyer"
                          value={cancelReasonFromBuyer}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="text-end">
                      <Button
                        type="submit"
                        variant="success"
                        onClick={handleSubmit}
                        disabled={sending}
                        aria-busy={sending}
                      >
                        {sending ? "Submitting..." : "Submit"}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={onClose}
                        className="ms-2"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderCancelReasonModal;
