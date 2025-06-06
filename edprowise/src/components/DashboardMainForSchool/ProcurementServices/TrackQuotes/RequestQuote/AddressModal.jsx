import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import getAPI from "../../../../../api/getAPI.jsx";
import postAPI from "../../../../../api/postAPI.jsx";
import CountryStateCityData from "../../../../CountryStateCityData.json";
import CreatableSelect from "react-select/creatable";

const countryData = CountryStateCityData;

const AddressModal = ({ onClose, cart }) => {
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [sending, setSending] = useState(false);

  // Initialize formData with proper structure
  const [formData, setFormData] = useState({
    deliveryAddress: "",
    deliveryLandMark: "",
    deliveryPincode: "",
    deliveryCountry: "",
    deliveryState: "",
    deliveryCity: "",
    isCustomCountry: false,
    isCustomState: false,
    isCustomCity: false,
  });

  const fetchSchoolData = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

    if (!schoolId) {
      console.error("School ID not found in localStorage");
      return;
    }

    try {
      const response = await getAPI(
        `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/school-profile/${schoolId}`,
        {},
        true
      );

      if (!response.hasError && response.data && response.data.data) {
        const schoolData = response.data.data;
        setSchool(schoolData);

        // Initialize formData with school data
        const country = schoolData.deliveryCountry || "";
        const state = schoolData.deliveryState || "";
        const city = schoolData.deliveryCity || "";

        // Check if values are custom
        const isCustomCountry = country && !countryData.hasOwnProperty(country);
        const isCustomState =
          state &&
          (isCustomCountry || !countryData[country]?.hasOwnProperty(state));
        const isCustomCity =
          city &&
          (isCustomState || !countryData[country]?.[state]?.includes(city));

        setFormData({
          deliveryAddress: schoolData.deliveryAddress || "",
          deliveryCountry: country,
          deliveryState: state,
          deliveryCity: city,
          deliveryLandMark: schoolData.deliveryLandMark || "",
          deliveryPincode: schoolData.deliveryPincode || "",
          isCustomCountry,
          isCustomState,
          isCustomCity,
        });
      }
    } catch (err) {
      console.error("Error fetching School:", err);
    }
  };

  useEffect(() => {
    fetchSchoolData();
    setExpectedDeliveryDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setExpectedDeliveryDate(e.target.value);
  };

  // Get countries from countryData keys
  const countryOptions = Object.keys(countryData).map((country) => ({
    value: country,
    label: country,
  }));

  // Get states based on selected country
  const stateOptions =
    formData.deliveryCountry && !formData.isCustomCountry
      ? Object.keys(countryData[formData.deliveryCountry] || {}).map(
          (state) => ({
            value: state,
            label: state,
          })
        )
      : [];

  // Get cities based on selected state and country
  const cityOptions =
    formData.deliveryState &&
    !formData.isCustomState &&
    formData.deliveryCountry
      ? (
          countryData[formData.deliveryCountry]?.[formData.deliveryState] || []
        ).map((city) => ({
          value: city,
          label: city,
        }))
      : [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const products = cart.map((item) => {
      return {
        categoryId: item.categoryId,
        subCategoryId: item.subCategoryId,
        description: item.description,
        unit: item.unit,
        quantity: item.quantity,
      };
    });

    const data = {
      deliveryAddress: formData.deliveryAddress,
      deliveryCountry: formData.deliveryCountry,
      deliveryState: formData.deliveryState,
      deliveryCity: formData.deliveryCity,
      deliveryLandMark: formData.deliveryLandMark,
      deliveryPincode: formData.deliveryPincode,
      expectedDeliveryDate: expectedDeliveryDate,
    };

    const formDataToSend = new FormData();
    formDataToSend.append("products", JSON.stringify(products));
    formDataToSend.append("data", JSON.stringify(data));

    cart.forEach((item, index) => {
      if (item.productImages && item.productImages.length > 0) {
        item.productImages.forEach((image, imgIndex) => {
          formDataToSend.append(
            `products[${index}][productImages][${imgIndex}]`,
            image
          );
        });
      }
    });

    setSending(true);

    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      const response = await postAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/request-quote`,
        formDataToSend,
        { "Content-Type": "multipart/form-data" },
        true
      );

      if (!response.hasError) {
        toast.success("Quote Requested successfully");
        onClose();
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to request quote");
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
                        Your Current Address Details
                      </h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-2">
                          <label
                            htmlFor="deliveryAddress"
                            className="form-label"
                          >
                            Delivery Address{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="deliveryAddress"
                            value={formData.deliveryAddress}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="deliveryCountry"
                            className="form-label"
                          >
                            Country <span className="text-danger">*</span>
                          </label>
                          <CreatableSelect
                            id="deliveryCountry"
                            name="deliveryCountry"
                            options={countryOptions}
                            value={
                              formData.deliveryCountry
                                ? {
                                    value: formData.deliveryCountry,
                                    label: formData.deliveryCountry,
                                  }
                                : null
                            }
                            onChange={(selectedOption) => {
                              const isCustom = selectedOption
                                ? !countryData.hasOwnProperty(
                                    selectedOption.value
                                  )
                                : false;

                              setFormData((prev) => ({
                                ...prev,
                                deliveryCountry: selectedOption?.value || "",
                                deliveryState: "",
                                deliveryCity: "",
                                isCustomCountry: isCustom,
                                isCustomState: false,
                                isCustomCity: false,
                              }));
                            }}
                            onCreateOption={(inputValue) => {
                              setFormData((prev) => ({
                                ...prev,
                                deliveryCountry: inputValue,
                                deliveryState: "",
                                deliveryCity: "",
                                isCustomCountry: true,
                                isCustomState: false,
                                isCustomCity: false,
                              }));
                            }}
                            placeholder="Select or type a country"
                            isSearchable
                            required
                            classNamePrefix="react-select"
                            className="custom-react-select"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="deliveryState" className="form-label">
                            State <span className="text-danger">*</span>
                          </label>
                          {formData.isCustomCountry ? (
                            <input
                              type="text"
                              id="deliveryState"
                              name="deliveryState"
                              className="form-control"
                              value={formData.deliveryState}
                              onChange={(e) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  deliveryState: e.target.value,
                                  deliveryCity: "",
                                  isCustomState: true,
                                  isCustomCity: false,
                                }));
                              }}
                              placeholder="Enter state name"
                              required
                            />
                          ) : (
                            <CreatableSelect
                              id="deliveryState"
                              name="deliveryState"
                              options={stateOptions}
                              value={
                                formData.deliveryState
                                  ? {
                                      value: formData.deliveryState,
                                      label: formData.deliveryState,
                                    }
                                  : null
                              }
                              onChange={(selectedOption) => {
                                const isCustom = selectedOption
                                  ? !stateOptions.some(
                                      (opt) =>
                                        opt.value === selectedOption.value
                                    )
                                  : false;

                                setFormData((prev) => ({
                                  ...prev,
                                  deliveryState: selectedOption?.value || "",
                                  deliveryCity: "",
                                  isCustomState: isCustom,
                                  isCustomCity: false,
                                }));
                              }}
                              onCreateOption={(inputValue) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  deliveryState: inputValue,
                                  deliveryCity: "",
                                  isCustomState: true,
                                  isCustomCity: false,
                                }));
                              }}
                              placeholder="Select or type a state"
                              isSearchable
                              required
                              isDisabled={!formData.deliveryCountry}
                              classNamePrefix="react-select"
                              className="custom-react-select"
                            />
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="deliveryCity" className="form-label">
                            City <span className="text-danger">*</span>
                          </label>
                          {formData.isCustomState ||
                          formData.isCustomCountry ? (
                            <input
                              type="text"
                              id="deliveryCity"
                              name="deliveryCity"
                              className="form-control"
                              value={formData.deliveryCity}
                              onChange={(e) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  deliveryCity: e.target.value,
                                  isCustomCity: true,
                                }));
                              }}
                              placeholder="Enter city name"
                              required
                            />
                          ) : (
                            <CreatableSelect
                              id="deliveryCity"
                              name="deliveryCity"
                              options={cityOptions}
                              value={
                                formData.deliveryCity
                                  ? {
                                      value: formData.deliveryCity,
                                      label: formData.deliveryCity,
                                    }
                                  : null
                              }
                              onChange={(selectedOption) => {
                                const isCustom = selectedOption
                                  ? !cityOptions.some(
                                      (opt) =>
                                        opt.value === selectedOption.value
                                    )
                                  : false;

                                setFormData((prev) => ({
                                  ...prev,
                                  deliveryCity: selectedOption?.value || "",
                                  isCustomCity: isCustom,
                                }));
                              }}
                              onCreateOption={(inputValue) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  deliveryCity: inputValue,
                                  isCustomCity: true,
                                }));
                              }}
                              placeholder="Select or type a city"
                              isSearchable
                              required
                              isDisabled={!formData.deliveryState}
                              classNamePrefix="react-select"
                              className="custom-react-select"
                            />
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-2">
                          <label
                            htmlFor="deliveryLandMark"
                            className="form-label"
                          >
                            Landmark <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="deliveryLandMark"
                            value={formData.deliveryLandMark}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-2">
                          <label
                            htmlFor="deliveryPincode"
                            className="form-label"
                          >
                            Pin Code <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="deliveryPincode"
                            value={formData.deliveryPincode}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-2">
                          <label
                            htmlFor="expectedDeliveryDate"
                            className="form-label"
                          >
                            Expected Delivery Date{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            name="expectedDeliveryDate"
                            onChange={handleDateChange}
                            className="form-control"
                            value={expectedDeliveryDate}
                            required
                          />
                        </div>
                      </div>

                      <div className="text-end">
                        <Button
                          type="submit"
                          variant="success"
                          disabled={sending}
                          aria-busy={sending}
                        >
                          {sending ? "Quote Requesting..." : "Request Quote"}
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

export default AddressModal;
