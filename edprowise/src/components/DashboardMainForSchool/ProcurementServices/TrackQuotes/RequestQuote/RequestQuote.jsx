// EdProwise_Frontend\edprowise\src\components\DashboardMainForSchool\ProcurementServices\TrackQuotes\RequestQuote\RequestQuote.js

import React, { useState, useEffect } from "react";
import getAPI from "../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AddressModal from "./AddressModal.jsx";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const RequestQuote = () => {
  const unitOptions = [
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
    { value: "Quarterly", label: "Quarterly" },
    { value: "Project", label: "Project" },
    { value: "BAG - BAGS", label: "BAG - BAGS" },
    { value: "BAL - BALE", label: "BAL - BALE" },
    { value: "BDL - BUNDLES", label: "BDL - BUNDLES" },
    { value: "BKL - BUCKLES", label: "BKL - BUCKLES" },
    { value: "BOU - BILLION OF UNITS", label: "BOU - BILLION OF UNITS" },
    { value: "BOX - BOX", label: "BOX - BOX" },
    { value: "BTL - BOTTLES", label: "BTL - BOTTLES" },
    { value: "BUN - BUNCHES", label: "BUN - BUNCHES" },
    { value: "CAN - CANS", label: "CAN - CANS" },
    { value: "CBM - CUBIC METERS", label: "CBM - CUBIC METERS" },
    { value: "CCM - CUBIC CENTIMETERS", label: "CCM - CUBIC CENTIMETERS" },
    { value: "CMS - CENTIMETERS", label: "CMS - CENTIMETERS" },
    { value: "CTN - CARTONS", label: "CTN - CARTONS" },
    { value: "DOZ - DOZENS", label: "DOZ - DOZENS" },
    { value: "DRM - DRUMS", label: "DRM - DRUMS" },
    { value: "GGK - GREAT GROSS", label: "GGK - GREAT GROSS" },
    { value: "GMS - GRAMMES", label: "GMS - GRAMMES" },
    { value: "GRS - GROSS", label: "GRS - GROSS" },
    { value: "GYD - GROSS YARDS", label: "GYD - GROSS YARDS" },
    { value: "KGS - KILOGRAMS", label: "KGS - KILOGRAMS" },
    { value: "KLR - KILOLITRE", label: "KLR - KILOLITRE" },
    { value: "KME - KILOMETRE", label: "KME - KILOMETRE" },
    { value: "LTR - LITRES", label: "LTR - LITRES" },
    { value: "MLT - MILILITRE", label: "MLT - MILILITRE" },
    { value: "MTR - METERS", label: "MTR - METERS" },
    { value: "MTS - METRIC TON", label: "MTS - METRIC TON" },
    { value: "NOS - NUMBERS", label: "NOS - NUMBERS" },
    { value: "OTH - OTHERS", label: "OTH - OTHERS" },
    { value: "PAC - PACKS", label: "PAC - PACKS" },
    { value: "PCS - PIECES", label: "PCS - PIECES" },
    { value: "PRS - PAIRS", label: "PRS - PAIRS" },
    { value: "QTL - QUINTAL", label: "QTL - QUINTAL" },
    { value: "ROL - ROLLS", label: "ROL - ROLLS" },
    { value: "SET - SETS", label: "SET - SETS" },
    { value: "SQF - SQUARE FEET", label: "SQF - SQUARE FEET" },
    { value: "SQM - SQUARE METERS", label: "SQM - SQUARE METERS" },
    { value: "SQY - SQUARE YARDS", label: "SQY - SQUARE YARDS" },
    { value: "TBS - TABLETS", label: "TBS - TABLETS" },
    { value: "TGM - TEN GROSS", label: "TGM - TEN GROSS" },
    { value: "THD - THOUSANDS", label: "THD - THOUSANDS" },
    { value: "TON - TONNES", label: "TON - TONNES" },
    { value: "TUB - TUBES", label: "TUB - TUBES" },
    { value: "UGS - US GALLONS", label: "UGS - US GALLONS" },
    { value: "UNT - UNITS", label: "UNT - UNITS" },
    { value: "YDS - YARDS", label: "YDS - YARDS" },
  ];

  const [selectedUnitOption, setSelectedUnitOption] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleUnitChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      unit: selectedOption.value,
    }));

    setSelectedUnitOption(selectedOption);
  };

  const [formData, setFormData] = useState({
    categoryId: "",
    subCategoryId: "",
    description: "",
    productImages: [],
    unit: "",
    quantity: "",
  });
  const [cart, setCart] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productImages") {
      const newImages = Array.from(files).slice(
        0,
        4 - formData.productImages.length
      );
      setFormData((prev) => ({
        ...prev,
        productImages: [...prev.productImages, ...newImages].slice(0, 4),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      productImages: prev.productImages.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (
      !formData.categoryId ||
      !formData.subCategoryId ||
      !formData.unit ||
      !formData.quantity
    ) {
      toast.error("Please fill all required fields");
      setIsFormValid(false);
      return;
    }

    const selectedCategory = categories.find(
      (cat) => cat.id === formData.categoryId
    );

    const selectedSubCategory = subCategories.find(
      (subCat) => subCat.id === formData.subCategoryId
    );

    setCart((prevCart) => [
      ...prevCart,
      {
        ...formData,
        id: prevCart.length + 1,
        categoryName: selectedCategory ? selectedCategory.categoryName : "",
        subCategoryName: selectedSubCategory
          ? selectedSubCategory.subCategoryName
          : "",
      },
    ]);

    setFormData({
      categoryId: "",
      subCategoryId: "",
      description: "",
      productImages: [],
      unit: "",
      quantity: "",
    });

    setSelectedUnitOption(null);
    document.getElementById("productImages").value = "";
    setSubCategories([]);

    toast.success("Product added to cart!");
    setIsFormValid(true);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.success("Product removed from cart!");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAPI(
          `${process.env.REACT_APP_PROCUREMENT_SERVICE}/category`,
          {},
          true
        );
        if (!response.hasError && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error("Error fetching categories.");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      categoryId: selectedCategoryId,
      subCategoryId: "",
    }));

    if (selectedCategoryId) {
      try {
        const response = await getAPI(
          `${process.env.REACT_APP_PROCUREMENT_SERVICE}/sub-category/${selectedCategoryId}`,
          {},
          true
        );
        if (!response.hasError && Array.isArray(response.data.data)) {
          setSubCategories(response.data.data);
        } else {
          console.error("Error fetching subcategories.");
          setSubCategories([]);
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err);
        setSubCategories([]);
      }
    } else {
      setSubCategories([]);
    }
  };

  // Image slider component for each product
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

  const ProductImagePreview = ({ images, onImageClick }) => {
    if (!images || images.length === 0) {
      return <span>No images</span>;
    }

    return (
      <div
        className="position-relative"
        style={{
          width: "40px",
          height: "40px",
          border: "1px solid #d8dfe7",
          cursor: "pointer",
        }}
        onClick={() => onImageClick(images)}
      >
        <img
          src={
            images[0] instanceof Blob
              ? URL.createObjectURL(images[0])
              : `${process.env.REACT_APP_API_URL_FOR_PROCUREMENT_IMAGE}${images[0]}`
          }
          alt="Product preview"
          className="img-fluid h-100"
          style={{ objectFit: "cover" }}
        />
        {images.length > 1 && (
          <span
            className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle"
            style={{
              width: "15px",
              height: "15px",
              fontSize: "10px",
              lineHeight: "15px",
            }}
          >
            +{images.length - 1}
          </span>
        )}
      </div>
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
                      Request For Quote
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleAddToCart}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                          Product Required – Select category{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          id="category"
                          name="categoryId"
                          className="form-control"
                          value={formData.categoryId}
                          onChange={handleCategoryChange}
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="subCategory" className="form-label">
                          Product Required – Select sub category{" "}
                          <span className="text-danger">*</span>
                        </label>

                        <select
                          id="subCategory"
                          name="subCategoryId"
                          className="form-control"
                          value={formData.subCategoryId}
                          onChange={handleChange}
                          required
                          disabled={subCategories.length === 0}
                        >
                          <option value="">Select Sub Category</option>
                          {subCategories.map((subCategory) => (
                            <option key={subCategory.id} value={subCategory.id}>
                              {subCategory.subCategoryName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="productDescription"
                          className="form-label"
                        >
                          Product Description (Any Comments)
                        </label>
                        <input
                          type="text"
                          id="productDescription"
                          name="description"
                          className="form-control"
                          value={formData.description}
                          placeholder="Example : I want high quality product"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="productImages" className="form-label">
                          Product Images (Max 4)
                        </label>
                        <input
                          type="file"
                          id="productImages"
                          name="productImages"
                          className="form-control"
                          accept="image/*"
                          onChange={handleChange}
                          multiple
                          disabled={formData.productImages.length >= 4}
                        />
                        <div className="d-flex flex-wrap gap-2 mt-2">
                          {formData.productImages.map((image, index) => (
                            <div
                              key={index}
                              className="position-relative"
                              style={{
                                width: "40px",
                                height: "40px",
                                borderColor: "#d8dfe7 !important",
                                borderWidth: "1px",
                                borderStyle: "solid",
                              }}
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                                className="img-fluid h-100"
                                style={{ objectFit: "cover" }}
                              />
                              <button
                                type="button"
                                className="position-absolute top-0 end-0 btn btn-sm btn-danger p-0"
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  fontSize: "10px",
                                  lineHeight: "15px",
                                }}
                                onClick={() => removeImage(index)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        {formData.productImages.length >= 4 && (
                          <small className="text-muted">
                            Maximum 4 images reached
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="unit" className="form-label">
                          Unit <span className="text-danger">*</span>
                        </label>

                        <Select
                          id="unit"
                          name="unit"
                          options={unitOptions}
                          value={selectedUnitOption}
                          onChange={handleUnitChange}
                          isSearchable
                          placeholder="Select Unit"
                          classNamePrefix="react-select"
                          className="custom-react-select"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">
                          Quantity <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          className="form-control"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                          min="1"
                          placeholder="Example : 10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Add To Cart
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {isFormValid && (
          <div className="row p-2">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className="card-title flex-grow-1">Cart</h4>
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={handleOpenModal}
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
                <div>
                  <div className="table-responsive">
                    <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                      <thead className="bg-light-subtle">
                        <tr>
                          <th>Product Required – Category</th>
                          <th>Product Required – Sub category</th>
                          <th>Product Description</th>
                          <th>Product Image</th>
                          <th>Unit</th>
                          <th>Quantity</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item, index) => (
                          <tr key={index}>
                            <td>{item.categoryName} </td>
                            <td>{item.subCategoryName}</td>
                            <td>{item.description || "Not Provided"}</td>
                            <td>
                              <ProductImagePreview
                                images={item.productImages}
                                onImageClick={handleImageClick}
                              />
                            </td>
                            <td>{item.unit}</td>
                            <td>{item.quantity}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary custom-submit-button"
                                onClick={() => handleRemoveFromCart(item.id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isModalOpen && (
          <AddressModal
            onClose={handleCloseModal}
            cart={cart}
            formData={formData}
          />
        )}
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
                  src={
                    selectedQuoteImages[currentImageIndex] instanceof Blob
                      ? URL.createObjectURL(
                          selectedQuoteImages[currentImageIndex]
                        )
                      : `${process.env.REACT_APP_API_URL_FOR_PROCUREMENT_IMAGE}${selectedQuoteImages[currentImageIndex]}`
                  }
                  alt={`Product ${currentImageIndex + 1}`}
                  style={{
                    maxWidth: "100%",
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

export default RequestQuote;
