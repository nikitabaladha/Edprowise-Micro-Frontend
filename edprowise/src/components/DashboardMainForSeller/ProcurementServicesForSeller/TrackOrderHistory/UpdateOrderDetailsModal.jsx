import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";

import getAPI from "../../../../api/getAPI.jsx";
import putAPI from "../../../../api/putAPI.jsx";

import { format, parseISO } from "date-fns";

const UpdateOrderDetailsModal = ({
  isOpen,
  onClose,
  orderNumber,
  onOrderDetailsUpdated,
}) => {
  const [orderDetailsFromSeller, setOrderDetailsFromSeller] = useState({
    actualDeliveryDate: "",
  });

  useEffect(() => {
    if (isOpen) {
      const fetchOrderDetailsFromSeller = async () => {
        try {
          const encodedOrderNumber = encodeURIComponent(orderNumber);
          const response = await getAPI(
            `${process.env.REACT_APP_PROCUREMENT_SERVICE}/get-by-order-number?orderNumber=${encodedOrderNumber}`
          );
          if (!response.hasError && response.data && response.data.data) {
            const { actualDeliveryDate } = response.data.data;

            const formattedDate = format(
              parseISO(actualDeliveryDate),
              "yyyy-MM-dd"
            );

            setOrderDetailsFromSeller({
              actualDeliveryDate: formattedDate,
            });
          } else {
            console.error("Invalid response format or error in response");
          }
        } catch (err) {
          console.error("Error fetching Order Details from Seller:", err);
        }
      };

      fetchOrderDetailsFromSeller();
    }
  }, [isOpen, orderNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetailsFromSeller((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { actualDeliveryDate } = orderDetailsFromSeller;

    const dataToSend = {
      actualDeliveryDate,
    };

    setSending(true);

    try {
      const encodedOrderNumber = encodeURIComponent(orderNumber);

      const response = await putAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/order-details?orderNumber=${encodedOrderNumber}&sellerId`,
        dataToSend,
        true
      );

      if (!response.hasError) {
        toast.success("Quote Updated successfully");
        setOrderDetailsFromSeller({
          actualDeliveryDate,
        });
        onOrderDetailsUpdated();
        onClose();
      } else {
        toast.error(response.message || "Failed to update Order Details");
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
                        Update Order Details
                      </h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label
                        htmlFor="actualDeliveryDate"
                        className="form-label"
                      >
                        Actual Delivery Date
                      </label>
                      <input
                        type="date"
                        name="actualDeliveryDate"
                        value={orderDetailsFromSeller.actualDeliveryDate}
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

export default UpdateOrderDetailsModal;
