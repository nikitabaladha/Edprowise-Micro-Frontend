import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel.jsx";
import getAPI from "../../../../api/getAPI.jsx";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const TrackQuoteTable = ({}) => {
  const [quotes, setQuotes] = useState([]);
  const [preparedQuotes, setPreparedQuotes] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const response = await getAPI(
          `${process.env.REACT_APP_PROCUREMENT_QUOTE_REQUEST_SERVICE}/get-quote-list-for-seller`,
          {},
          true
        );
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setQuotes(response.data.data);
          console.log("quote", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };

    fetchQuoteData();
  }, []);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const sellerId = userDetails?.id;

  useEffect(() => {
    if (!quotes.length || !sellerId) return;

    quotes.forEach((quote) => {
      if (quote.enquiryNumber) {
        fetchQuoteProposal(quote.enquiryNumber);
      }
    });
  }, [quotes, sellerId]);

  const fetchQuoteProposal = async (enquiryNumber) => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_QUOTE_PROPOSAL_SERVICE}/quote-proposal?enquiryNumber=${encodedEnquiryNumber}&sellerId=${sellerId}`,
        {},
        true
      );

      if (!response.hasError && response.data.data) {
        setPreparedQuotes((prev) => ({
          ...prev,
          [enquiryNumber]: response.data.data,
        }));
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching quote proposal:", err);
    }
  };

  const navigateToViewRequestedQuote = (
    event,
    enquiryNumber,
    supplierStatus
  ) => {
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/view-requested-quote`, {
      state: { enquiryNumber, supplierStatus },
    });
  };

  const handleExport = () => {
    if (!quotes.length) {
      console.error("No data available to export");
      return;
    }

    const filteredData = quotes.map((quote) => ({
      ID: quote.id,
      School_ID: quote.schoolId,
      Category_ID: quote.categoryId,
      Category_Name: quote.categoryName,
      Sub_Category_ID: quote.subCategoryId,
      Sub_Category_Name: quote.subCategoryName,
      Description: quote.description,
      Product_Image: quote.productImage,
      Unit: quote.unit,
      Quantity: quote.quantity,
      Enquiry_Number: quote.enquiryNumber,
      Quote_Request_ID: quote.quoteRequestId,
      Delivery_Address: quote.deliveryAddress,
      Delivery_Location: quote.deliveryLocation,
      Delivery_Landmark: quote.deliveryLandMark,
      Delivery_Pincode: quote.deliveryPincode,
      Expected_Delivery_Date: quote.expectedDeliveryDate,
      Buyer_Status: quote.buyerStatus,
      Supplier_Status: quote.supplierStatus,
      Edprowise_Status: quote.edprowiseStatus,
      Created_At: new Date(quote.createdAt).toLocaleString(),
      Updated_At: new Date(quote.updatedAt).toLocaleString(),
    }));

    exportToExcel(filteredData, "Requested Quotes", "Requested_Quotes");
  };
  const [downloadingQuotes, setDownloadingQuotes] = useState({});

  const generateQuotePDF = async (enquiryNumber, schoolId) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const sellerId = userDetails?.id;

    const missingFields = [];
    if (!sellerId) missingFields.push("Seller ID");
    if (!enquiryNumber) missingFields.push("Enquiry Number");
    if (!schoolId) missingFields.push("School ID");

    if (missingFields.length > 0) {
      toast.error(`Missing: ${missingFields.join(", ")}`);
      return;
    }

    const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

    setDownloadingQuotes((prev) => ({ ...prev, [enquiryNumber]: true }));

    try {
      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/generate-quote-pdf?schoolId=${schoolId}&sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}`,
        { responseType: "blob" },
        true
      );

      const quoteData = preparedQuotes[enquiryNumber];
      const quoteNumber = quoteData?.quoteNumber || "quote";

      // write your code here
      const blob = new Blob([response.data], { type: "application/pdf" });
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `${quoteNumber}.pdf`;

      link.click();

      if (!response.hasError && response.data) {
      } else {
        toast.error(response.message || "Failed to fetch quote data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("An error occurred while fetching quote data");
    } finally {
      setDownloadingQuotes((prev) => ({ ...prev, [enquiryNumber]: false }));
    }
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (images, index = 0) => {
    if (!images || !images.length) return;

    // Ensure we have proper image URLs
    const formattedImages = images.map((img) =>
      img instanceof Blob
        ? URL.createObjectURL(img)
        : `${process.env.REACT_APP_API_URL_FOR_PROCUREMENT_IMAGE}${img}`
    );

    setSelectedImages(formattedImages);
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

  const [currentPage, setCurrentPage] = useState(1);
  const [schoolsPerPage] = useState(10);

  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentQuotes = quotes.slice(indexOfFirstSchool, indexOfLastSchool);

  const totalPages = Math.ceil(quotes.length / schoolsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageRange = 1;

  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);

  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  All Requested Quote List
                </h4>
                <div className="text-end">
                  <Link onClick={handleExport} class="text-primary">
                    Export
                    <i class="bx bx-export ms-1"></i>
                  </Link>
                </div>
              </div>

              <div>
                {quotes.length > 0 ? (
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
                          <th className="text-start">
                            Product Required Image & Name
                          </th>
                          <th>Product Required (Category)</th>
                          <th>Quantity</th>
                          <th>Unit</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentQuotes.length > 0 ? (
                          currentQuotes.map((quote) => {
                            const availableImages =
                              quote?.productImages?.filter((img) => img) || [];
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
                                    {availableImages.length > 0 && (
                                      <div
                                        className="rounded bg-light avatar-md d-flex align-items-center justify-content-center"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          handleImageClick(availableImages)
                                        }
                                      >
                                        <img
                                          className="avatar-md"
                                          alt={quote?.subCategoryName}
                                          src={`${process.env.REACT_APP_API_URL_FOR_PROCUREMENT_IMAGE}${availableImages[0]}`}
                                        />
                                      </div>
                                    )}
                                    <div>{quote.subCategoryName}</div>
                                  </div>
                                </td>
                                <td>{quote.categoryName}</td>
                                <td>{quote.quantity}</td>
                                <td>{quote.unit}</td>
                                <td>
                                  {preparedQuotes[quote.enquiryNumber]
                                    ? preparedQuotes[quote.enquiryNumber]
                                        .supplierStatus
                                    : "Quote Requested"}
                                </td>

                                <td>
                                  <div className="d-flex gap-2">
                                    <Link
                                      className="btn btn-light btn-sm"
                                      title="View Requested Quote"
                                      data-bs-toggle="popover"
                                      data-bs-trigger="hover"
                                      onClick={(event) =>
                                        navigateToViewRequestedQuote(
                                          event,
                                          quote?.enquiryNumber,
                                          quote?.supplierStatus
                                        )
                                      }
                                    >
                                      <iconify-icon
                                        icon="solar:eye-broken"
                                        className="align-middle fs-18"
                                      />
                                    </Link>

                                    {preparedQuotes[quote.enquiryNumber] ? (
                                      <button
                                        onClick={() =>
                                          generateQuotePDF(
                                            quote.enquiryNumber,
                                            quote.schoolId
                                          )
                                        }
                                        className="btn btn-soft-info btn-sm"
                                        title="Download PDF"
                                        data-bs-toggle="popover"
                                        data-bs-trigger="hover"
                                        disabled={
                                          downloadingQuotes[quote.enquiryNumber]
                                        }
                                      >
                                        {downloadingQuotes[
                                          quote.enquiryNumber
                                        ] ? (
                                          "Downloading..."
                                        ) : (
                                          <iconify-icon
                                            icon="solar:download-broken"
                                            className="align-middle fs-18"
                                          />
                                        )}
                                      </button>
                                    ) : null}

                                    {preparedQuotes[
                                      quote.enquiryNumber
                                    ] ? null : (
                                      <button
                                        type="button"
                                        className="btn btn-primary custom-submit-button"
                                        onClick={(event) =>
                                          navigateToViewRequestedQuote(
                                            event,
                                            quote?.enquiryNumber,
                                            quote?.supplierStatus
                                          )
                                        }
                                      >
                                        Prepare Quote
                                      </button>
                                    )}
                                  </div>
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
                ) : (
                  <tr></tr>
                )}
              </div>
              <div className="card-footer border-top">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {pagesToShow.map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className={`page-link pagination-button ${
                            currentPage === page ? "active" : ""
                          }`}
                          onClick={() => handlePageClick(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
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
          {selectedImages.length > 0 && (
            <>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "300px", overflow: "hidden" }}
              >
                <img
                  src={selectedImages[currentImageIndex]}
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

export default TrackQuoteTable;
