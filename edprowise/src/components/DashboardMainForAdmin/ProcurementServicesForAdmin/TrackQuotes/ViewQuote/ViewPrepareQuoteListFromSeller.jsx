import { useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAPI from "../../../../../api/getAPI.jsx";
import putAPI from "../../../../../api/putAPI.jsx";
import { Modal } from "react-bootstrap";
import { formatCost } from "../../../../CommonFunction.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const ViewPrepareQuoteListFromSeller = ({ onQuoteUpdated }) => {
  const location = useLocation();

  const enquiryNumber =
    location.state?.enquiryNumber || location.state?.searchEnquiryNumber;
  const sellerId = location.state?.sellerId || location.state?.searchSellerId;

  const [preparedQuotes, setPreparedQuotes] = useState([]);
  const [editedQuote, setEditedQuote] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!sellerId || !enquiryNumber) return;

    fetchQuoteData();
  }, [sellerId, enquiryNumber]);

  const [locationData, setLocationData1] = useState({
    schoolState: null,
    sellerState: null,
    edprowiseState: null,
  });

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

        const response = await getAPI(
          `/get-location?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}`,
          {},
          true
        );
        if (!response.hasError && response.data) {
          setLocationData1({
            schoolState: response.data.data.schoolState,
            sellerState: response.data.data.sellerState,
            edprowiseState: response.data.data.edprowiseState,
          });
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Location:", err);
      }
    };

    fetchLocationData();
  }, [enquiryNumber, sellerId]);

  const shouldShowCGST_SGST = () => {
    if (!locationData) return false;
    const { schoolState, sellerState, edprowiseState } = locationData;

    if (schoolState === edprowiseState && edprowiseState === sellerState) {
      return true;
    } else if (
      schoolState === edprowiseState &&
      edprowiseState !== sellerState
    ) {
      return true;
    }
    return false;
  };

  const shouldShowIGST = () => {
    if (!locationData) return false;
    const { schoolState, sellerState, edprowiseState } = locationData;

    if (schoolState !== edprowiseState && edprowiseState === sellerState) {
      return true;
    } else if (
      schoolState !== edprowiseState &&
      edprowiseState !== sellerState
    ) {
      return true;
    }
    return false;
  };

  const fetchQuoteData = async () => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await getAPI(
        `prepare-quote?sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}`,
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

  const handleInputChange = (id, e) => {
    const { name, value } = e.target;
    setEditedQuote((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value,
      },
    }));
  };

  const [sending, setSending] = useState(null);

  const handleUpdate = async (id) => {
    const formDataToSend = new FormData();

    for (const key in editedQuote[id]) {
      formDataToSend.append(key, editedQuote[id][key]);
    }

    setSending(id);

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await putAPI(
        `/prepare-quote?sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}&id=${id}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.data.hasError) {
        toast.success("Quote updated successfully!");
        setEditedQuote((prev) => ({ ...prev, [id]: null }));
        fetchQuoteData();
        onQuoteUpdated();
      } else {
        toast.error("Failed to update quote.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSending(null);
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
                        <th>Listing Rate</th>
                        <th>EdProwise Margin %</th>
                        <th>Quantity</th>
                        <th>Final Rate Before Discount</th>
                        <th>Discount %</th>
                        <th>Final Rate</th>
                        <th>Taxable Value</th>
                        <th>CGST Rate</th>
                        <th>CGST Amount</th>
                        <th>SGST Rate</th>
                        <th>SGST Amount</th>
                        <th>IGST Rate</th>
                        <th>IGST Amount</th>
                        <th>CGST Rate For Edprowise</th>
                        <th>CGST Amount For EdProwise</th>
                        <th>SGST Rate For EdProwise</th>
                        <th>SGST Amount For EdProwise</th>
                        <th>IGST Rate For EdProwise</th>
                        <th>IGST Amount For EdProwise</th>
                        <th>Amount Before GST & Discount</th>
                        <th>Discount Amount</th>
                        <th>GST Amount</th>
                        <th>Total Amount</th>
                        <th>
                          {preparedQuotes.length > 0 &&
                          (preparedQuotes[0].supplierStatus ===
                            "Quote Submitted" ||
                            preparedQuotes[0].supplierStatus ===
                              "Quote Rejected")
                            ? "Action"
                            : null}
                        </th>
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
                            ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${firstImage}`
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
                                  {editedQuote[quote._id] ? (
                                    <input
                                      type="text"
                                      name="subcategoryName"
                                      value={
                                        editedQuote[quote._id].subcategoryName
                                      }
                                      onChange={(e) =>
                                        handleInputChange(quote._id, e)
                                      }
                                      className="form-control"
                                      required
                                    />
                                  ) : (
                                    <>
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
                                    </>
                                  )}
                                </div>
                              </td>
                              <td>
                                {editedQuote[quote._id] ? (
                                  <input
                                    type="text"
                                    name="hsnSacc"
                                    value={editedQuote[quote._id].hsnSacc}
                                    onChange={(e) =>
                                      handleInputChange(quote._id, e)
                                    }
                                    className="form-control"
                                    required
                                  />
                                ) : (
                                  quote.hsnSacc
                                )}
                              </td>
                              <td>
                                {editedQuote[quote._id] ? (
                                  <input
                                    type="number"
                                    name="listingRate"
                                    value={editedQuote[quote._id].listingRate}
                                    onChange={(e) =>
                                      handleInputChange(quote._id, e)
                                    }
                                    className="form-control"
                                    required
                                  />
                                ) : (
                                  formatCost(quote.listingRate)
                                )}
                              </td>
                              <td>{quote.edprowiseMargin}</td>
                              <td>
                                {editedQuote[quote._id] ? (
                                  <input
                                    type="number"
                                    name="quantity"
                                    value={editedQuote[quote._id].quantity}
                                    onChange={(e) =>
                                      handleInputChange(quote._id, e)
                                    }
                                    className="form-control"
                                    required
                                  />
                                ) : (
                                  quote.quantity
                                )}
                              </td>
                              <td>
                                {formatCost(quote.finalRateBeforeDiscount)}
                              </td>
                              <td>
                                {editedQuote[quote._id] ? (
                                  <input
                                    type="number"
                                    name="discount"
                                    value={editedQuote[quote._id].discount}
                                    onChange={(e) =>
                                      handleInputChange(quote._id, e)
                                    }
                                    className="form-control"
                                    required
                                  />
                                ) : (
                                  quote.discount
                                )}
                              </td>
                              <td>{formatCost(quote.finalRate)}</td>
                              <td>{formatCost(quote.taxableValue)}</td>

                              {shouldShowCGST_SGST() &&
                              quote?.cgstRate !== 0 ? (
                                <td>
                                  {editedQuote[quote._id] ? (
                                    <input
                                      type="number"
                                      name="cgstRate"
                                      value={
                                        editedQuote[quote._id].cgstRate || ""
                                      }
                                      onChange={(e) =>
                                        handleInputChange(quote._id, e)
                                      }
                                      className="form-control"
                                      required
                                    />
                                  ) : (
                                    quote?.cgstRate
                                  )}
                                </td>
                              ) : (
                                <td>{quote?.cgstRate}</td>
                              )}

                              <td>{formatCost(quote.cgstAmount)}</td>

                              {shouldShowCGST_SGST() &&
                              quote?.sgstRate !== 0 ? (
                                <td>
                                  {editedQuote[quote._id] ? (
                                    <input
                                      type="number"
                                      name="sgstRate"
                                      value={
                                        editedQuote[quote._id].sgstRate || ""
                                      }
                                      onChange={(e) =>
                                        handleInputChange(quote._id, e)
                                      }
                                      className="form-control"
                                      required
                                    />
                                  ) : (
                                    quote?.sgstRate
                                  )}
                                </td>
                              ) : (
                                <td>{quote?.sgstRate}</td>
                              )}

                              <td>{formatCost(quote.sgstAmount)}</td>

                              {shouldShowIGST() && quote?.igstRate !== 0 ? (
                                <td>
                                  {editedQuote[quote._id] ? (
                                    <input
                                      type="number"
                                      name="igstRate"
                                      value={
                                        editedQuote[quote._id].igstRate || ""
                                      }
                                      onChange={(e) =>
                                        handleInputChange(quote._id, e)
                                      }
                                      className="form-control"
                                      required
                                    />
                                  ) : (
                                    quote?.igstRate
                                  )}
                                </td>
                              ) : (
                                <td>{quote?.igstRate}</td>
                              )}

                              <td>{formatCost(quote.igstAmount)}</td>
                              <td>{quote?.cgstRateForEdprowise}</td>
                              <td>
                                {formatCost(quote.sgstAmountForEdprowise)}
                              </td>
                              <td>{quote?.sgstRateForEdprowise}</td>
                              <td>
                                {formatCost(quote.sgstAmountForEdprowise)}
                              </td>

                              <td>{quote?.igstRateForEdprowise}</td>
                              <td>
                                {formatCost(quote.igstAmountForEdprowise)}
                              </td>

                              <td>
                                {formatCost(quote.amountBeforeGstAndDiscount)}
                              </td>
                              <td>{formatCost(quote.discountAmount)}</td>
                              <td>{formatCost(quote.gstAmount)}</td>
                              <td>{formatCost(quote.totalAmount)}</td>

                              <td>
                                {quote.supplierStatus === "Quote Rejected" ||
                                quote.supplierStatus === "Quote Submitted" ? (
                                  <button
                                    className="btn btn-primary"
                                    disabled={sending === quote._id}
                                    onClick={() => {
                                      if (editedQuote[quote._id]) {
                                        handleUpdate(quote._id);
                                      } else {
                                        setEditedQuote((prev) => ({
                                          ...prev,
                                          [quote._id]: {
                                            subcategoryName:
                                              quote.subcategoryName,
                                            hsnSacc: quote.hsnSacc,
                                            listingRate: quote.listingRate,
                                            edprowiseMargin:
                                              quote.edprowiseMargin,
                                            quantity: quote.quantity,
                                            discount: quote.discount,
                                            cgstRate: quote.cgstRate,
                                            sgstRate: quote.sgstRate,
                                            igstRate: quote.igstRate,
                                          },
                                        }));
                                      }
                                    }}
                                  >
                                    {sending === quote._id
                                      ? "Saving..."
                                      : editedQuote[quote._id]
                                      ? "Save"
                                      : "Edit"}
                                  </button>
                                ) : null}
                              </td>
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
                  src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${selectedQuoteImages[currentImageIndex]}`}
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
