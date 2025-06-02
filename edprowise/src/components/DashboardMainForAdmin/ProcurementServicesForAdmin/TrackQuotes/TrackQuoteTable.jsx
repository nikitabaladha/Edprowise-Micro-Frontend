import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel.jsx";
import getAPI from "../../../../api/getAPI.jsx";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const TrackQuoteTable = () => {
  const [quotes, setQuotes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [submittedQuotes, setSubmittedQuotes] = useState([]);

  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const response = await getAPI(`/get-quote-for-admin`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setQuotes(response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };

    fetchQuoteData();
  }, []);

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
        `/submit-quote/${encodedEnquiryNumber}`,
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

  const navigate = useNavigate();

  const navigateToViewRequestedQuote = (event, enquiryNumber, schoolId) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/view-requested-quote`, {
      state: { enquiryNumber, schoolId },
    });
  };

  const navigateToViewQuoteTable = (event, enquiryNumber, schoolId) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/view-quote-table`, {
      state: { enquiryNumber, schoolId },
    });
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (images, index = 0) => {
    if (!images || !images.length) return;

    // Ensure we have proper image URLs
    const formattedImages = images.map((img) =>
      img instanceof Blob
        ? URL.createObjectURL(img)
        : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${img}`
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

  const handleExport = () => {
    if (!quotes.length) {
      toast.error("No data available to export");
      return;
    }

    const formattedData = quotes.map((quote) => ({
      ID: quote.id || "N/A",
      School_ID: quote.schoolId || "N/A",
      Enquiry_Number: quote.enquiryNumber || "N/A",
      Delivery_Address: quote.deliveryAddress || "N/A",
      Delivery_Location: quote.deliveryLocation || "N/A",
      Delivery_Landmark: quote.deliveryLandMark || "N/A",
      Delivery_Pincode: quote.deliveryPincode || "N/A",
      Expected_Delivery_Date: quote.expectedDeliveryDate
        ? new Date(quote.expectedDeliveryDate).toLocaleDateString()
        : "N/A",
      Buyer_Status: quote.buyerStatus || "N/A",
      Supplier_Status: quote.supplierStatus || "N/A",
      Edprowise_Status: quote.edprowiseStatus || "N/A",
      Created_At: quote.createdAt
        ? new Date(quote.createdAt).toLocaleDateString()
        : "N/A",
      Updated_At: quote.updatedAt
        ? new Date(quote.updatedAt).toLocaleDateString()
        : "N/A",
      Category_ID: quote.categoryId || "N/A",
      Category_Name: quote.categoryName || "N/A",
      Sub_Categor_ID: quote.subCategoryId || "N/A",
      Sub_Category_Name: quote.subCategoryName || "N/A",
      Description: quote.description || "N/A",
      Product_Image: quote.productImages || "N/A",
      Unit: quote.unit || "N/A",
      Quantity: quote.quantity || 0,
      Product_Enquiry_Number: quote.productEnquiryNumber || "N/A",
      Product_Created_At: quote.productCreatedAt
        ? new Date(quote.productCreatedAt).toLocaleDateString()
        : "N/A",
      Product_Updated_At: quote.productUpdatedAt
        ? new Date(quote.productUpdatedAt).toLocaleDateString()
        : "N/A",
    }));

    exportToExcel(formattedData, "Requested Quotes", "Requested_Quotes");
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
                  All Request Quote List
                </h4>

                <div className="text-end">
                  <Link onClick={handleExport} class="text-primary">
                    Export
                    <i class="bx bx-export ms-1"></i>
                  </Link>
                </div>
              </div>
              <div>
                {quotes.length === 0 ? (
                  <p className="text-center mt-3">No quotes found.</p>
                ) : (
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
                                          src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${availableImages[0]}`}
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
                                  {submittedQuotes[quote.enquiryNumber]
                                    ? submittedQuotes[quote.enquiryNumber][0]
                                        .edprowiseStatus
                                    : quote.edprowiseStatus}
                                </td>

                                <td>
                                  <div className="d-flex gap-2">
                                    <Link
                                      className="btn btn-light btn-sm"
                                      onClick={(event) =>
                                        navigateToViewRequestedQuote(
                                          event,
                                          quote?.enquiryNumber,
                                          quote?.schoolId
                                        )
                                      }
                                    >
                                      <iconify-icon
                                        icon="solar:eye-broken"
                                        className="align-middle fs-18"
                                      />
                                    </Link>

                                    {submittedQuotes[quote.enquiryNumber] && (
                                      <button
                                        type="button"
                                        className="btn btn-primary custom-submit-button"
                                        onClick={(event) =>
                                          navigateToViewQuoteTable(
                                            event,
                                            quote?.enquiryNumber,
                                            quote?.schoolId
                                          )
                                        }
                                      >
                                        View Quote
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
                )}
                {/* end table-responsive */}
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
              </div>{" "}
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
