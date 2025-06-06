import { useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAPI from "../../../../../api/getAPI.jsx";
import { formatCost } from "../../../../CommonFunction.jsx";
import { Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const ViewPrepareQuoteListFromSeller = () => {
  const location = useLocation();

  const enquiryNumber =
    location.state?.enquiryNumber || location.state?.searchEnquiryNumber;
  const sellerId = location.state?.sellerId || location.state?.searchSellerId;

  const [preparedQuotes, setPreparedQuotes] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!sellerId || !enquiryNumber) return;

    fetchQuoteData();
  }, [sellerId, enquiryNumber]);

  const fetchQuoteData = async () => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/prepare-quote?sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data.data) {
        setPreparedQuotes(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching prepared-quote:", err);
    }
  };

  const [selectedQuoteImages, setSelectedQuoteImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (images, index = 0) => {
    setSelectedQuoteImages(images);
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedQuoteImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedQuoteImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">Prepared Quote List</h4>
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
                        <th>Product Subcategory</th>
                        <th>HSN/SACC</th>
                        {/* <th>Listing Rate</th> */}
                        <th>Quantity</th>
                        <th>Final Rate Before Discount</th>
                        <th>Discount %</th>
                        <th>Final Rate</th>
                        <th>Taxable Value</th>
                        {preparedQuotes.some(
                          (quote) => quote.cgstRate !== 0
                        ) ? (
                          <th>CGST Rate</th>
                        ) : (
                          <></>
                        )}

                        {preparedQuotes.some(
                          (quote) => quote.cgstAmount !== 0
                        ) ? (
                          <th>CGST Amount</th>
                        ) : (
                          <></>
                        )}

                        {preparedQuotes.some(
                          (quote) => quote.sgstRate !== 0
                        ) ? (
                          <th>SGST Rate</th>
                        ) : (
                          <></>
                        )}

                        {preparedQuotes.some(
                          (quote) => quote.sgstAmount !== 0
                        ) ? (
                          <th>SGST Amount</th>
                        ) : (
                          <></>
                        )}

                        {preparedQuotes.some(
                          (quote) => quote.igstRate !== 0
                        ) ? (
                          <th>IGST Rate</th>
                        ) : (
                          <></>
                        )}

                        {preparedQuotes.some(
                          (quote) => quote.igstAmount !== 0
                        ) ? (
                          <th>IGST Amount</th>
                        ) : (
                          <></>
                        )}
                        <th>Amount Before GST & Discount</th>
                        <th>Discount Amount</th>
                        <th>GST Amount</th>
                        <th>Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preparedQuotes.length > 0 ? (
                        preparedQuotes.map((quote) => {
                          const availableImages =
                            quote?.prepareQuoteImages?.filter((img) => img) ||
                            [];
                          const firstImage = availableImages[0];
                          const imageUrl = firstImage
                            ? `${process.env.REACT_APP_API_URL_FOR_PROCUREMENT_IMAGE}${firstImage}`
                            : null;

                          return (
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

                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  {imageUrl && (
                                    <div
                                      className="rounded bg-light avatar-md d-flex align-items-center justify-content-center"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleImageClick(availableImages)
                                      }
                                    >
                                      <img
                                        className="avatar-md"
                                        alt={quote.subcategoryName}
                                        src={imageUrl}
                                      />
                                    </div>
                                  )}
                                  <span>{quote.subcategoryName}</span>
                                </div>
                              </td>
                              <td>{quote.hsnSacc}</td>
                              <td>{quote.quantity}</td>
                              <td>
                                {formatCost(quote.finalRateBeforeDiscount)}
                              </td>
                              <td>{quote.discount}</td>
                              <td>{formatCost(quote.finalRate)}</td>
                              <td>{formatCost(quote.taxableValue)}</td>
                              {quote?.cgstRate !== 0 ? (
                                <td>{quote?.cgstRate}</td>
                              ) : null}

                              {quote.cgstAmount !== 0 ? (
                                <td>{formatCost(quote.cgstAmount)}</td>
                              ) : (
                                <></>
                              )}

                              {quote?.sgstRate !== 0 ? (
                                <td>{quote?.sgstRate}</td>
                              ) : null}

                              {quote.sgstAmount !== 0 ? (
                                <td>{formatCost(quote.sgstAmount)}</td>
                              ) : (
                                <></>
                              )}

                              {quote?.igstRate !== 0 ? (
                                <td>{quote?.igstRate}</td>
                              ) : null}

                              {quote.igstAmount !== 0 ? (
                                <td>{formatCost(quote.igstAmount)}</td>
                              ) : (
                                <></>
                              )}
                              <td>
                                {formatCost(quote.amountBeforeGstAndDiscount)}
                              </td>
                              <td>{formatCost(quote.discountAmount)}</td>
                              <td>{formatCost(quote.gstAmount)}</td>
                              <td>{formatCost(quote.totalAmount)}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body
          className="text-center p-0 position-relative"
          style={{ minHeight: "250px" }}
        >
          {selectedQuoteImages.length > 0 && (
            <>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "300px", overflow: "hidden" }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL_FOR_PROCUREMENT_IMAGE}${selectedQuoteImages[currentImageIndex]}`}
                  alt={`Product ${currentImageIndex + 1}`}
                  style={{
                    maxWidth: "95%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  className="img-fluid"
                />
              </div>

              {selectedQuoteImages.length > 1 && (
                <div className="mt-2">
                  {currentImageIndex + 1} / {selectedQuoteImages.length}
                </div>
              )}
            </>
          )}
        </Modal.Body>

        {selectedQuoteImages.length > 1 && (
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

export default ViewPrepareQuoteListFromSeller;
