import React, { useState } from "react";
import postAPI from "../../../../api/postAPI.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CountryStateCityData from "../../../CountryStateCityData.json";
import CreatableSelect from "react-select/creatable";

// Use the consolidated country data
const countryData = CountryStateCityData;

const AddNewSchool = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolMobileNo: "",
    schoolEmail: "",
    schoolAddress: "",
    affiliationUpto: "",
    panNo: "",
    profileImage: null,
    affiliationCertificate: null,
    panFile: null,
    country: "",
    state: "",
    city: "",
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
      const updatedValue = ["panNo"].includes(name)
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
    setSending(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (
          !["isCustomCountry", "isCustomState", "isCustomCity"].includes(key)
        ) {
          data.append(key, formData[key]);
        }
      });

      const response = await postAPI(
        "/school",
        data,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.hasError) {
        toast.success("School added successfully");
        // Reset form
        setFormData({
          schoolName: "",
          schoolMobileNo: "",
          schoolEmail: "",
          schoolAddress: "",
          country: "",
          state: "",
          city: "",
          affiliationUpto: "",
          panNo: "",
          profileImage: null,
          affiliationCertificate: null,
          panFile: null,
          isCustomCountry: false,
          isCustomState: false,
          isCustomCity: false,
        });
        // Reset file inputs
        ["profileImage", "affiliationCertificate", "panFile"].forEach((id) => {
          document.getElementById(id) &&
            (document.getElementById(id).value = "");
        });
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to add school");
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
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Add New School
                  </h4>
                </div>
              </div>

              <div className="card-body custom-heading-padding">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-3">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="schoolName" className="form-label">
                          School Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="schoolName"
                          name="schoolName"
                          className="form-control"
                          value={formData.schoolName}
                          onChange={handleChange}
                          required
                          placeholder="Example : ABC School"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="profileImage" className="form-label">
                          Profile Image
                        </label>
                        <input
                          type="file"
                          id="profileImage"
                          name="profileImage"
                          className="form-control"
                          accept="image/*"
                          onChange={handleChange}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="mobileNo" className="form-label">
                          School Mobile Number{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          id="mobileNo"
                          name="schoolMobileNo"
                          className="form-control"
                          value={formData.schoolMobileNo}
                          onChange={handleChange}
                          required
                          placeholder="Example : 1234567890"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          School Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="schoolEmail"
                          className="form-control"
                          value={formData.schoolEmail}
                          onChange={handleChange}
                          required
                          placeholder="Example : example@gmail.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        School Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="schoolAddress"
                        rows={3}
                        value={formData.schoolAddress}
                        onChange={handleChange}
                        required
                        placeholder="Example :  ABC Building , 123 Street"
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
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="affiliationUpto" className="form-label">
                          Affiliation Upto{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          id="affiliationUpto"
                          name="affiliationUpto"
                          className="form-control"
                          value={formData.affiliationUpto}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Affiliation</option>
                          <option value="Pre-Primary">Pre-Primary</option>
                          <option value="Primary (Upto Class 5)">
                            Primary (Upto Class 5)
                          </option>
                          <option value="Secondary (Upto Class 10)">
                            Secondary (Upto Class 10)
                          </option>
                          <option value="Senior Secondary (Upto Class 12)">
                            Senior Secondary (Upto Class 12)
                          </option>
                          <option value="College">College</option>
                          <option value="University">University</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      {" "}
                      <div className="mb-3">
                        <label
                          htmlFor="affiliationCertificate"
                          className="form-label"
                        >
                          Affiliation Certificate{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          id="affiliationCertificate"
                          name="affiliationCertificate"
                          className="form-control"
                          accept="image/*,application/pdf"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="panNumber" className="form-label">
                          PAN Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="panNumber"
                          name="panNo"
                          className="form-control"
                          value={formData.panNo}
                          onChange={handleChange}
                          required
                          placeholder="Example : ABCDE1234F"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="panFile" className="form-label">
                          PAN File <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          id="panFile"
                          name="panFile"
                          className="form-control"
                          accept="image/*,application/pdf"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rest of your form fields */}
                  <div className="row">
                    <div className="col-md-12 text-end">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={sending}
                      >
                        {sending ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewSchool;
