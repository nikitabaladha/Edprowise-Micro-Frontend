import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { Modal } from "react-bootstrap";

import getAPI from "../../../../../api/getAPI.jsx";
import ViewAllQuoteTable from "../ViewAllQuoteTable/ViewAllQuoteTable.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewRequestedQuote = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const enquiryNumber =
    location.state?.enquiryNumber || location.state?.searchEnquiryNumber;
  const schoolId = location.state?.schoolId;

  const [quotes, setQuotes] = useState([]);
  const [isQuoteTableVisible, setIsQuoteTableVisible] = useState(false);
  const [submittedQuotes, setSubmittedQuotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchRequestedQuoteData();
  }, [enquiryNumber]);

  const fetchRequestedQuoteData = async () => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_QUOTE_REQUEST_SERVICE}/get-quote/${encodedEnquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data.data.products) {
        setQuotes(response.data.data.products);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };

  useEffect(() => {
    if (!quotes.length) return;
    quotes.forEach((quote) => {
      if (quote.enquiryNumber) {
        fetchAllQuoteData(quote.enquiryNumber);
      }
    });
  }, [quotes]);

  const fetchAllQuoteData = async (enquiryNumber) => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_QUOTE_PROPOSAL_SERVICE}/submit-quote/${encodedEnquiryNumber}`,
        {},
        true
      );

      if (
        !response.hasError &&
        response.data &&
        response.data.data.length > 0
      ) {
        setSubmittedQuotes((prev) => ({
          ...prev,
          [enquiryNumber]: response.data.data,
        }));
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching submitted-quote:", err);
    }
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (images, index = 0) => {
    setSelectedImages(images);
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
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
                      Requested Quote Details
                    </h4>
                  </div>
                </div>

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
                        <th>Enquiry No.</th>
                        <th>Product Required Image & Name</th>
                        <th>Product Required (Category)</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Product Description</th>
                        <th>Quote Requested Date</th>
                        <th>Delivery Expected Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.length > 0 ? (
                        quotes.map((quote) => {
                          const firstAvailableImage =
                            quote?.productImages?.find((img) => img);
                          const imageUrl = firstAvailableImage
                            ? `${process.env.REACT_APP_API_URL_FOR_PROCUREMENT_IMAGE}${firstAvailableImage}`
                            : null;

                          return (
                            <tr key={quote.id}>
                              <td>
                                <div className="form-check ms-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`customCheck${quote.id}`}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`customCheck${quote.id}`}
                                  >
                                    &nbsp;
                                  </label>
                                </div>
                              </td>
                              <td>{quote.enquiryNumber}</td>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  {imageUrl && (
                                    <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                      <img
                                        className="avatar-md"
                                        alt={quote.subCategoryName}
                                        src={imageUrl}
                                        onClick={() =>
                                          handleImageClick(quote.productImages)
                                        }
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <Link className="text-dark fw-medium">
                                      {quote.subCategoryName}
                                    </Link>
                                  </div>
                                </div>
                              </td>
                              <td>{quote.categoryName}</td>
                              <td>{quote.quantity}</td>
                              <td>{quote.unit}</td>
                              <td>{quote.description}</td>
                              <td>{formatDate(quote.createdAt)}</td>
                              <td>{formatDate(quote.expectedDeliveryDate)}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  {Object.values(submittedQuotes).some(
                    (quotes) => quotes.length > 0
                  ) && (
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={() =>
                        setIsQuoteTableVisible(!isQuoteTableVisible)
                      }
                    >
                      {isQuoteTableVisible ? "Hide Quote" : "View Quote"}
                    </button>
                  )}
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
        </div>

        {isQuoteTableVisible && quotes.length > 0 ? (
          <ViewAllQuoteTable />
        ) : (
          <div className="row"></div>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body
          className="text-center p-0 position-relative"
          style={{ minHeight: "250px" }}
        >
          {selectedImages.length > 0 && (
            <>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "300px", overflow: "hidden" }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL_FOR_PROCUREMENT_IMAGE}${selectedImages[currentImageIndex]}`}
                  alt={`Product ${currentImageIndex + 1}`}
                  style={{
                    maxWidth: "95%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  className="img-fluid"
                />
              </div>

              {selectedImages.length > 1 && (
                <div className="mt-2">
                  {currentImageIndex + 1} / {selectedImages.length}
                </div>
              )}
            </>
          )}
        </Modal.Body>

        {selectedImages.length > 1 && (
          <>
            <button
              className="position-absolute top-50 translate-middle-y btn btn-primary rounded-circle"
              onClick={handlePrevImage}
              style={{
                left: "20px",
                width: "40px",
                height: "40px",
                padding: 0,
              }}
            >
              <FaArrowLeft />
            </button>
            <button
              className="position-absolute top-50 translate-middle-y btn btn-primary rounded-circle"
              onClick={handleNextImage}
              style={{
                right: "20px",
                width: "40px",
                height: "40px",
                padding: 0,
              }}
            >
              <FaArrowRight />
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default ViewRequestedQuote;
