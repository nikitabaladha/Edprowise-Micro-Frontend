import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import putAPI from "../../../../api/putAPI.jsx";

const RatingModal = ({
  onClose,
  sellerId,
  schoolId,
  enquiryNumber,
  fetchOrderData,
}) => {
  const [feedbackComment, setFeedbackComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [sending, setSending] = useState(false);

  const handleInputChange = (e) => {
    setFeedbackComment(e.target.value);
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleStarHover = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate rating
    if (rating < 1 || rating > 5) {
      toast.error("Please select a rating between 1 to 5 stars");
      return;
    }

    const formDataToSend = {
      feedbackComment,
      rating,
    };

    setSending(true);

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await putAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/feedback-for-order?sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}&schoolId=${schoolId}`,
        formDataToSend,
        true
      );

      if (!response.hasError) {
        toast.success("Rating and feedback submitted successfully!");
        fetchOrderData();
        onClose();
      } else {
        toast.error(response.message || "Failed to submit rating and feedback");
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
                        Give Ratings
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {rating > 0 ? (
                        <label htmlFor="feedbackComment" className="form-label">
                          You rated: {rating} star{rating !== 1 ? "s" : ""}
                        </label>
                      ) : (
                        <label htmlFor="feedbackComment" className="form-label">
                          Please select a rating
                        </label>
                      )}

                      <div className="star-rating" style={{ display: "flex" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className="star"
                            style={{
                              cursor: "pointer",
                              fontSize: "2rem",
                              color:
                                star <= (hoverRating || rating)
                                  ? "#ffc107"
                                  : "#e4e5e9",
                              transition: "color 0.2s",
                            }}
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => handleStarHover(star)}
                            onMouseLeave={handleStarLeave}
                          >
                            {star <= (hoverRating || rating) ? "★" : "☆"}
                          </span>
                        ))}
                      </div>

                      <div className="col-md-12">
                        <div className="mb-2">
                          <label
                            htmlFor="feedbackComment"
                            className="form-label"
                          >
                            Give Your Feedback (Optional)
                          </label>
                          <textarea
                            name="feedbackComment"
                            value={feedbackComment}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-end">
                      <Button
                        type="submit"
                        variant="success"
                        onClick={handleSubmit}
                        disabled={sending || rating === 0}
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

export default RatingModal;
