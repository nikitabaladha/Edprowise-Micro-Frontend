import React, { useState } from "react";
import postAPI from "../../../api/postAPI.jsx";
import getAPI from "../../../api/getAPI.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import CountryStateCityData from "../../CountryStateCityData.json";
import CreatableSelect from "react-select/creatable";
const countryData = CountryStateCityData;

const CompleteEdprowiseProfile = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    edprowiseProfile: null,
    gstin: "",
    pan: "",
    tan: "",
    cin: "",
    address: "",
    country: "",
    state: "",
    city: "",
    landmark: "",
    pincode: "",
    contactNo: "",
    alternateContactNo: "",
    emailId: "",
    isCustomCountry: false,
    isCustomState: false,
    isCustomCity: false,
  });

  const navigate = useNavigate();

  // Get countries from countryData keys
  const countryOptions = Object.keys(countryData).map((country) => ({
    value: country,
    label: country,
  }));

  // Get states based on selected country
  const stateOptions =
    formData.country && !formData.isCustomCountry
      ? Object.keys(countryData[formData.country]).map((state) => ({
          value: state,
          label: state,
        }))
      : [];

  // Get cities based on selected state and country
  const cityOptions =
    formData.state && !formData.isCustomState && formData.country
      ? (countryData[formData.country][formData.state] || []).map((city) => ({
          value: city,
          label: city,
        }))
      : [];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      const updatedValue = ["gstin", "pan", "tan", "cin"].includes(name)
        ? value.replace(/[a-z]/g, (char) => char.toUpperCase())
        : value;
      setFormData((prevState) => ({
        ...prevState,
        [name]: updatedValue,
      }));
    }
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (!["isCustomCountry", "isCustomState", "isCustomCity"].includes(key)) {
        data.append(key, formData[key]);
      }
    });

    setSending(true);

    try {
      const response = await postAPI(
        `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/edprowise-profile`,
        data,
        { "Content-Type": "multipart/form-data" },
        true
      );

      if (!response.hasError) {
        const userId = response.data.data.userId;

        setFormData({
          companyName: "",
          companyType: "",
          edprowiseProfile: null,
          gstin: "",
          pan: "",
          tan: "",
          cin: "",
          address: "",
          country: "",
          state: "",
          city: "",
          landmark: "",
          pincode: "",
          contactNo: "",
          alternateContactNo: "",
          emailId: "",
          isCustomCountry: false,
          isCustomState: false,
          isCustomCity: false,
        });
        document.getElementById("edprowiseProfile").value = "";

        const updatedUserResponse = await getAPI(
          `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/get-admin-by-id/${userId}`
        );

        if (!updatedUserResponse.hasError) {
          localStorage.setItem(
            "userDetails",
            JSON.stringify(updatedUserResponse.data.data)
          );
        }

        toast.success("Admin Profile added successfully");
        navigate("/admin-dashboard");
      } else {
        toast.error(response.message || "Failed to add admin profile");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setSending(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2 d-flex justify-content-between align-items-center">
                    <h4 className="card-title custom-heading-font">
                      Add Your Profile
                    </h4>

                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <h4 className="card-title text-center custom-heading-font">
                    Company Detail
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">
                          Company Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          className="form-control"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                          placeholder="ABC Company"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="companyType" className="form-label">
                          Company Type <span className="text-danger">*</span>
                        </label>
                        <select
                          id="companyType"
                          name="companyType"
                          className="form-control"
                          value={formData.companyType}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Company Type</option>
                          <option value="Public Limited">Public Limited</option>
                          <option value="Private Limited">
                            Private Limited
                          </option>
                          <option value="Partnership">Partnership</option>
                          <option value="Sole Proprietor">
                            Sole Proprietor
                          </option>
                          <option value="HUF">HUF</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="gstin" className="form-label">
                          GSTIN <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="gstin"
                          name="gstin"
                          className="form-control"
                          value={formData.gstin}
                          onChange={handleChange}
                          required
                          placeholder="Example : 22AAAAA0000A1Z5"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="pan" className="form-label">
                          PAN Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="pan"
                          name="pan"
                          className="form-control"
                          value={formData.pan}
                          onChange={handleChange}
                          required
                          placeholder="Example : AAAA0000A"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="tan" className="form-label">
                          TAN Number
                        </label>
                        <input
                          type="text"
                          id="tan"
                          name="tan"
                          className="form-control"
                          value={formData.tan}
                          onChange={handleChange}
                          placeholder="Example : AAAAPL1234C"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="cin" className="form-label">
                          CIN Number
                        </label>
                        <input
                          type="text"
                          id="cin"
                          name="cin"
                          className="form-control"
                          value={formData.cin}
                          onChange={handleChange}
                          placeholder="Example : U74999KA2022PTC123456"
                        />
                      </div>
                    </div>
                  </div>

                  <h4 className="card-title text-center custo m-heading-font">
                    Address Details
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Example : 123 Building, ABC Street"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="country" className="form-label">
                          Country <span className="text-danger">*</span>
                        </label>
                        <CreatableSelect
                          id="country"
                          name="country"
                          options={countryOptions}
                          value={
                            formData.country
                              ? {
                                  value: formData.country,
                                  label: formData.country,
                                }
                              : null
                          }
                          onChange={(selectedOption) => {
                            const isCustom = !countryOptions.some(
                              (option) => option.value === selectedOption?.value
                            );

                            setFormData((prev) => ({
                              ...prev,
                              country: selectedOption?.value || "",
                              state: "",
                              city: "",
                              isCustomCountry: isCustom,
                              isCustomState: false,
                              isCustomCity: false,
                            }));
                          }}
                          onCreateOption={(inputValue) => {
                            setFormData((prev) => ({
                              ...prev,
                              country: inputValue,
                              state: "",
                              city: "",
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

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="state" className="form-label">
                          State <span className="text-danger">*</span>
                        </label>
                        {formData.isCustomCountry ? (
                          <input
                            type="text"
                            id="state"
                            name="state"
                            className="form-control"
                            value={formData.state}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                state: e.target.value,
                                city: "",
                                isCustomState: true,
                                isCustomCity: false,
                              }));
                            }}
                            placeholder="Enter state name"
                            required
                          />
                        ) : (
                          <CreatableSelect
                            id="state"
                            name="state"
                            options={stateOptions}
                            value={
                              formData.state
                                ? {
                                    value: formData.state,
                                    label: formData.state,
                                  }
                                : null
                            }
                            onChange={(selectedOption) => {
                              const isCustom = !stateOptions.some(
                                (option) =>
                                  option.value === selectedOption?.value
                              );

                              setFormData((prev) => ({
                                ...prev,
                                state: selectedOption?.value || "",
                                city: "",
                                isCustomState: isCustom,
                                isCustomCity: false,
                              }));
                            }}
                            onCreateOption={(inputValue) => {
                              setFormData((prev) => ({
                                ...prev,
                                state: inputValue,
                                city: "",
                                isCustomState: true,
                                isCustomCity: false,
                              }));
                            }}
                            placeholder="Select or type a state"
                            isSearchable
                            required
                            isDisabled={!formData.country}
                            classNamePrefix="react-select"
                            className="custom-react-select"
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="city" className="form-label">
                          City <span className="text-danger">*</span>
                        </label>
                        {formData.isCustomState || formData.isCustomCountry ? (
                          <input
                            type="text"
                            id="city"
                            name="city"
                            className="form-control"
                            value={formData.city}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                city: e.target.value,
                                isCustomCity: true,
                              }));
                            }}
                            placeholder="Enter city name"
                            required
                          />
                        ) : (
                          <CreatableSelect
                            id="city"
                            name="city"
                            options={cityOptions}
                            value={
                              formData.city
                                ? {
                                    value: formData.city,
                                    label: formData.city,
                                  }
                                : null
                            }
                            onChange={(selectedOption) => {
                              const isCustom =
                                selectedOption &&
                                !cityOptions.some(
                                  (option) =>
                                    option.value === selectedOption.value
                                );

                              setFormData((prev) => ({
                                ...prev,
                                city: selectedOption?.value || "",
                                isCustomCity: isCustom,
                              }));
                            }}
                            onCreateOption={(inputValue) => {
                              setFormData((prev) => ({
                                ...prev,
                                city: inputValue,
                                isCustomCity: true,
                              }));
                            }}
                            placeholder="Select or type a city"
                            isSearchable
                            required
                            isDisabled={!formData.state}
                            classNamePrefix="react-select"
                            className="custom-react-select"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="landmark" className="form-label">
                          Land Mark <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="landmark"
                          name="landmark"
                          className="form-control"
                          value={formData.landmark}
                          onChange={handleChange}
                          required
                          placeholder="Example : Near ABC Market"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="pincode" className="form-label">
                          Pin Code <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          className="form-control"
                          value={formData.pincode}
                          onChange={handleChange}
                          required
                          placeholder="Example : 560045"
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="card-title text-center custom-heading-font">
                    Contact Details
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="contactNo" className="form-label">
                          Contact Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          id="contactNo"
                          name="contactNo"
                          className="form-control"
                          value={formData.contactNo}
                          onChange={handleChange}
                          required
                          placeholder="Example : 9876543210"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="alternateContactNo"
                          className="form-label"
                        >
                          Alternate Contact Number
                        </label>
                        <input
                          type="tel"
                          id="alternateContactNo"
                          name="alternateContactNo"
                          className="form-control"
                          value={formData.alternateContactNo}
                          onChange={handleChange}
                          // required
                          placeholder="Example : 9876543210"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="emailId" className="form-label">
                          Email ID <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          id="emailId"
                          name="emailId"
                          className="form-control"
                          value={formData.emailId}
                          onChange={handleChange}
                          required
                          placeholder="Example : example@gmail.com"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="edprowiseProfile"
                          className="form-label"
                        >
                          Profile Image
                        </label>
                        <input
                          type="file"
                          id="edprowiseProfile"
                          name="edprowiseProfile"
                          className="form-control"
                          accept="image/*"
                          onChange={handleChange}
                          // required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                      disabled={sending}
                    >
                      {sending ? "Submitting..." : "Submit Profile"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteEdprowiseProfile;
