import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";

import getAPI from "../../../../api/getAPI.jsx";
import putAPI from "../../../../api/putAPI.jsx";

const UpdateTDSModal = ({
  isOpen,
  onClose,
  enquiryNumber,
  quoteNumber,
  sellerId,
  onTDSUpdated,
}) => {
  const [tdsDetails, setTdsDetails] = useState({
    tDSAmount: "",
  });

  useEffect(() => {
    if (isOpen) {
      const fetchTDSAmount = async () => {
        const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
        const encodedQuoteNumber = encodeURIComponent(quoteNumber);

        try {
          const response = await getAPI(
            `/tds-amount?enquiryNumber=${encodedEnquiryNumber}&quoteNumber=${encodedQuoteNumber}&sellerId=${sellerId}`
          );
          if (!response.hasError && response.data && response.data.data) {
            const tDSAmount = response.data.data;

            setTdsDetails({
              tDSAmount: tDSAmount || 0,
            });
          } else {
            console.error("Invalid response format or error in response");
          }
        } catch (err) {
          console.error("Error fetching TDS Amount:", err);
        }
      };

      fetchTDSAmount();
    }
  }, [isOpen, enquiryNumber, quoteNumber, sellerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTdsDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { tDSAmount } = tdsDetails;

    const dataToSend = {
      tDSAmount,
    };

    setSending(true);
    const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
    const encodedQuoteNumber = encodeURIComponent(quoteNumber);

    try {
      const response = await putAPI(
        `/update-tds?enquiryNumber=${encodedEnquiryNumber}&quoteNumber=${encodedQuoteNumber}&sellerId=${sellerId}`,
        dataToSend,
        true
      );

      if (!response.hasError) {
        toast.success("TDS Updated successfully");
        setTdsDetails({ tDSAmount });
        onTDSUpdated();
        onClose();
      } else {
        toast.error(response.message || "Failed to update TDS");
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
              <div className="card">
                <div className="card-body custom-heading-padding">
                  <div className="container">
                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Update TDS Amount
                      </h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label htmlFor="tDSAmount" className="form-label">
                        TDS %
                      </label>
                      <input
                        type="number"
                        name="tDSAmount"
                        value={tdsDetails.tDSAmount}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Example : 2"
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

export default UpdateTDSModal;
