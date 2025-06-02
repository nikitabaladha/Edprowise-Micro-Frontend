import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import getAPI from "../../../../../api/getAPI.jsx";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../../../../ConfirmationDialog.jsx";
import OrderPlaceModal from "./OrderPlaceModal.jsx";

import { formatCost } from "../../../../CommonFunction.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const ViewCart = () => {
  const location = useLocation();
  const { enquiryNumber } = location.state || {};
  const buyerStaus = location?.state?.buyerStatus;

  const [carts, setCarts] = useState({});
  const [items, setItems] = useState({});
  const [selectedCart, setSelectedCart] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [modalEnquiryNumber, setModalEnquiryNumber] = useState(null);

  const [latestDeliveryDate, setLatestDeliveryDate] = useState("");

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchCartData();
  }, [enquiryNumber]);

  const fetchCartData = async () => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await getAPI(
        `cart?enquiryNumber=${encodedEnquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data.data) {
        setCarts(response.data.data.groupedData || {});
        console.log("cart data", response.data.data.groupedData);
        setLatestDeliveryDate(response.data.data.latestDeliveryDate);
      } else {
        console.error("Invalid response format or error in response");
        setCarts({});
      }
    } catch (err) {
      console.error("Error fetching cart data:", err);
      setCarts({});
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const handleImageClick = (imageUrl) => {
  //   setSelectedImage(imageUrl);
  //   setShowModal(true);
  // };

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

  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");

  const openBulkDeleteDialog = (enquiryNumber, sellerId) => {
    setSelectedCart({ enquiryNumber, sellerId });
    setIsBulkDeleteDialogOpen(true);
    setDeleteType("cart");
  };

  const handleBulkDeleteCancel = () => {
    setIsBulkDeleteDialogOpen(false);
    setSelectedCart(null);
  };

  const handleBulkDeleteConfirmed = ({ enquiryNumber, sellerId }) => {
    setCarts((prevCarts) => {
      const updatedCarts = { ...prevCarts };
      Object.keys(updatedCarts).forEach((companyName) => {
        updatedCarts[companyName] = updatedCarts[companyName].filter(
          (item) =>
            !(
              item.enquiryNumber === enquiryNumber && item.sellerId === sellerId
            )
        );
        if (updatedCarts[companyName].length === 0) {
          delete updatedCarts[companyName];
        }
      });
      return updatedCarts;
    });
  };

  const openDeleteDialog = (cart) => {
    setSelectedCart({ cart });
    setIsDeleteDialogOpen(true);
    setDeleteType("singleCart");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCart(null);
  };

  const handleSingleDeleteConfirmed = (_id) => {
    setCarts((prevCarts) => {
      const updatedCarts = { ...prevCarts };
      Object.keys(updatedCarts).forEach((companyName) => {
        updatedCarts[companyName] = updatedCarts[companyName].filter(
          (item) => item._id !== _id
        );
        if (updatedCarts[companyName].length === 0) {
          delete updatedCarts[companyName];
        }
      });
      return updatedCarts;
    });
  };

  const handleOpenOrderPlaceModal = () => {
    if (!enquiryNumber) {
      console.error("Enquiry number is missing!");
      return;
    }
    setModalEnquiryNumber(enquiryNumber);

    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container">
        <>
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className="card-title flex-grow-1">Cart List</h4>{" "}
                  <button
                    className="btn btn-soft-danger btn-sm d-flex align-items-center gap-2"
                    onClick={handleOpenOrderPlaceModal}
                  >
                    <iconify-icon
                      icon="solar:cart-check-broken"
                      className="align-middle fs-18"
                    />
                    <span>Place Order</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>

        {carts && Object.keys(carts).length === 0 ? (
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <p className="card-title text-center mb-0 fs-3 text-muted">
                    No Cart Data Found
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          Object.entries(carts).map(([companyName, items]) => (
            <div className="row">
              <div className="col-xl-12">
                <div key={companyName} className="card">
                  <div className="card-header d-flex justify-content-between align-items-center gap-1">
                    <h4 className="card-title flex-grow-1">{companyName}</h4>
                    {(buyerStaus === "Quote Requested" ||
                      buyerStaus === "Quote Received") && (
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          openBulkDeleteDialog(
                            enquiryNumber,
                            items[0]?.sellerId
                          );
                        }}
                        className="btn btn-soft-danger btn-sm"
                      >
                        <iconify-icon
                          icon="solar:trash-bin-minimalistic-2-broken"
                          className="align-middle fs-18"
                        />
                      </Link>
                    )}
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
                            <th>Sr</th>
                            <th>Product Subcategory</th>
                            <th>HSN/SACC</th>
                            <th>Quantity</th>
                            <th>Final Rate Before Discount</th>
                            <th>Discount %</th>
                            <th>Final Rate</th>
                            <th>Taxable Value</th>
                            {items.some((item) => item?.cgstRate !== 0) ? (
                              <th>CGST Rate</th>
                            ) : (
                              <></>
                            )}

                            {items.some((item) => item?.cgstAmount !== 0) ? (
                              <th>CGST Amount</th>
                            ) : (
                              <></>
                            )}

                            {items.some((item) => item?.sgstRate !== 0) ? (
                              <th>SGST Rate</th>
                            ) : (
                              <></>
                            )}

                            {items.some((item) => item?.sgstAmount !== 0) ? (
                              <th>SGST Amount</th>
                            ) : (
                              <></>
                            )}

                            {items.some((item) => item.igstRate !== 0) ? (
                              <th>IGST Rate</th>
                            ) : (
                              <></>
                            )}

                            {items.some((item) => item?.igstAmount !== 0) ? (
                              <th>IGST Amount</th>
                            ) : (
                              <></>
                            )}
                            <th>Amount Before GST & Discount</th>
                            <th>Discount Amount</th>
                            <th>GST Amount</th>
                            <th>Total Amount</th>
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {items.length > 0 ? (
                            items.map((item, index) => {
                              const availableImages =
                                item?.cartImages?.filter((img) => img) || [];
                              const firstImage = availableImages[0];
                              const imageUrl = firstImage
                                ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${firstImage}`
                                : null;

                              return (
                                <tr key={item._id}>
                                  <td style={{ width: 20 }}>
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
                                  </td>
                                  <td>{index + 1}</td>
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
                                            alt={item.subcategoryName}
                                            src={imageUrl}
                                          />
                                        </div>
                                      )}
                                      <span>{item.subcategoryName}</span>
                                    </div>
                                  </td>
                                  <td>{item.hsnSacc}</td>
                                  {/* <td>{item.listingRate}</td> */}
                                  <td>{item.quantity}</td>
                                  <td>{item.finalRateBeforeDiscount}</td>
                                  <td>{item.discount}</td>
                                  <td>{item.finalRate}</td>
                                  <td>{item.taxableValue}</td>
                                  {item?.cgstRate !== 0 ? (
                                    <td>{item?.cgstRate}</td>
                                  ) : null}

                                  {item.cgstAmount !== 0 ? (
                                    <td>{formatCost(item.cgstAmount)}</td>
                                  ) : (
                                    <></>
                                  )}

                                  {item?.sgstRate !== 0 ? (
                                    <td>{item?.sgstRate}</td>
                                  ) : null}

                                  {item.sgstAmount !== 0 ? (
                                    <td>{formatCost(item.sgstAmount)}</td>
                                  ) : (
                                    <></>
                                  )}

                                  {item?.igstRate !== 0 ? (
                                    <td>{item?.igstRate}</td>
                                  ) : null}

                                  {item.igstAmount !== 0 ? (
                                    <td>{formatCost(item.igstAmount)}</td>
                                  ) : (
                                    <></>
                                  )}
                                  <td>{item.amountBeforeGstAndDiscount}</td>
                                  <td>{item.discountAmount}</td>
                                  <td>{item.gstAmount}</td>
                                  <td>{item.totalAmount}</td>

                                  {/* <td>
                                                                <Link
                                                                  className="btn btn-soft-danger btn-sm"
                                                                  onClick={(e) => {
                                                                    e.preventDefault();
                                                                    openDeleteDialog(item);
                                                                  }}
                                                                >
                                                                  <iconify-icon
                                                                    icon="solar:trash-bin-minimalistic-2-broken"
                                                                    className="align-middle fs-18"
                                                                  />
                                                                </Link>
                                                              </td> */}
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
          ))
        )}

        {/* Image Modal */}
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
      {/* it will open delete dialoge  */}
      {isBulkDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleBulkDeleteCancel}
          deleteType={deleteType}
          id={selectedCart}
          onDeleted={handleBulkDeleteConfirmed}
        />
      )}

      {/* {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedCart.cart._id}
          onDeleted={handleSingleDeleteConfirmed}
        />
      )} */}

      {isModalOpen && (
        <OrderPlaceModal
          onClose={handleCloseModal}
          enquiryNumber={modalEnquiryNumber}
          carts={carts}
          fetchCartData={fetchCartData}
          latestDeliveryDate={latestDeliveryDate}
        />
      )}
    </>
  );
};

export default ViewCart;
