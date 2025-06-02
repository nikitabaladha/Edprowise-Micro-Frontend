import React, { useState, useEffect, useRef } from "react";
import putAPI from "../../../api/putAPI.jsx";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import getAPI from "../../../api/getAPI.jsx";
import Select from "react-select";

import CountryStateCityData from "../../CountryStateCityData.json";
import CreatableSelect from "react-select/creatable";

const UpdateAdminProfile = () => {
  const location = useLocation();
  const profileId = location.state?._id;

  const countryData = CountryStateCityData;

  const navigate = useNavigate();

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
    // insuranceCharges: "",
  });

  const edprowiseProfileRef = useRef(null);

  useEffect(() => {
    if (profileId) {
      fetchProfileData();
    } else {
      console.error("No ProfileId provided");
    }
  }, [profileId]);

  const fetchProfileData = async () => {
    try {
      const response = await getAPI(`/edprowise-profile`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        const profileData = response.data.data;

        const country = profileData.country || "";
        const state = profileData.state || "";
        const city = profileData.city || "";

        // Check if values are custom - more defensive checks
        const isCustomCountry = country && !countryData.hasOwnProperty(country);
        const isCustomState =
          state &&
          (isCustomCountry || !countryData[country]?.hasOwnProperty(state));
        const isCustomCity =
          city &&
          (isCustomState || !countryData[country]?.[state]?.includes(city));

        setFormData({
          companyName: profileData.companyName || "",
          companyType: profileData.companyType || "",
          edprowiseProfile: profileData.edprowiseProfile || null,
          gstin: profileData.gstin || "",
          pan: profileData.pan || "",
          tan: profileData.tan || "",
          cin: profileData.cin || "",
          address: profileData.address || "",
          country: country,
          state: state,
          city: city,
          isCustomCountry, // Set these flags
          isCustomState,
          isCustomCity,
          landmark: profileData.landmark || "",
          pincode: profileData.pincode || "",
          contactNo: profileData.contactNo || "",
          alternateContactNo: profileData.alternateContactNo || "",
          emailId: profileData.emailId || "",
          // insuranceCharges: profileData.insuranceCharges || "",
        });
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Profile:", err);
    }
  };

  const [sending, setSending] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const formDataToSend = new FormData();

      // Only include fields that should be sent to the API
      const fieldsToSend = [
        "companyName",
        "companyType",
        "edprowiseProfile",
        "gstin",
        "pan",
        "tan",
        "cin",
        "address",
        "country",
        "state",
        "city",
        "landmark",
        "pincode",
        "contactNo",
        "alternateContactNo",
        "emailId",
        // "insuranceCharges",
      ];

      fieldsToSend.forEach((key) => {
        const value = formData[key];
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });

      const response = await putAPI(
        `/edprowise-profile/${profileId}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.data.hasError) {
        toast.success("Admin Profile successfully updated!");
        navigate(-1);
      } else {
        toast.error("Failed to update Admin Profile.");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSending(false);
    }
  };

  const countryOptions = Object.keys(countryData).map((country) => ({
    value: country,
    label: country,
  }));

  const stateOptions =
    formData.country && !formData.isCustomCountry
      ? Object.keys(countryData[formData.country]).map((state) => ({
          value: state,
          label: state,
        }))
      : [];

  const cityOptions =
    formData.state && !formData.isCustomState && formData.country
      ? (countryData[formData.country][formData.state] || []).map((city) => ({
          value: city,
          label: city,
        }))
      : [];

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      const updatedValue = ["gstin", "pan", "tan", "cin"].includes(name)
        ? value.replace(/[a-z]/g, (char) => char.toUpperCase())
        : value;
      setFormData((prev) => ({
        ...prev,
        [name]: updatedValue,
      }));
    }
  };

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title custom-heading-font">
                    Update Your Profile
                  </h4>
                </div>
              </div>
              <form onSubmit={handleUpdate}>
                <h4 className="card-title text-center custom-heading-font">
                  Company Detail
                </h4>
                <hr></hr>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="edprowiseProfile" className="form-label">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        id="edprowiseProfile"
                        name="edprowiseProfile"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                        ref={edprowiseProfileRef}
                      />
                      <div className="d-flex justify-content-center">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="New Profile Preview"
                            className="img-thumbnail"
                            style={{ maxWidth: "150px" }}
                          />
                        ) : formData.edprowiseProfile ? (
                          <img
                            src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData?.edprowiseProfile}`}
                            alt={`${formData?.companyName} Profile`}
                            className="avatar-md"
                            style={{
                              objectFit: "cover",
                              width: "200px",
                              height: "200px",
                              borderRadius: "10px",
                              backgroundColor: "#f0f0f0",
                            }}
                          />
                        ) : (
                          <small>No profile image uploaded</small>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="companyName" className="form-label">
                        Company Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gstin" className="form-label">
                        Company GSTIN Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="gstin"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tan" className="form-label">
                        Company TAN Number
                      </label>
                      <input
                        type="text"
                        id="tan"
                        name="tan"
                        value={formData.tan}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Example : AAAAPL1234C"
                      />
                    </div>

                    {/* <div className="mb-3">
                      <label htmlFor="insuranceCharges" className="form-label">
                        Insurance Charges <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        id="insuranceCharges"
                        name="insuranceCharges"
                        className="form-control"
                        value={formData.insuranceCharges}
                        onChange={handleChange}
                        placeholder="Example : 1%"
                      />
                    </div> */}
                  </div>
                  <div className="col-md-4">
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
                        <option value="Private Limited">Private Limited</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Sole Proprietor">Sole Proprietor</option>
                        <option value="HUF">HUF</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="pan" className="form-label">
                        Company PAN Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="pan"
                        name="pan"
                        value={formData.pan}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="cin" className="form-label">
                        Company CIN Number
                      </label>
                      <input
                        type="text"
                        id="cin"
                        name="cin"
                        value={formData.cin}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Example : U74999KA2022PTC123456"
                      />
                    </div>
                  </div>
                </div>

                <h4 className="card-title text-center custom-heading-font">
                  Address Details
                </h4>
                <hr></hr>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">
                        Country
                        <span className="text-danger">*</span>
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
                        placeholder="Select or type country"
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
                          required
                        />
                      ) : (
                        <CreatableSelect
                          id="state"
                          name="state"
                          options={stateOptions}
                          value={
                            formData.state
                              ? { value: formData.state, label: formData.state }
                              : null
                          }
                          onChange={(selectedOption) => {
                            const isCustom = !stateOptions.some(
                              (option) => option.value === selectedOption?.value
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
                          placeholder="Select or type state"
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
                          required
                        />
                      ) : (
                        <CreatableSelect
                          id="city"
                          name="city"
                          options={cityOptions}
                          value={
                            formData.city
                              ? { value: formData.city, label: formData.city }
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
                          placeholder="Select or type city"
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
                        Landmark <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="pincode" className="form-label">
                        Pincode <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                <h4 className="card-title text-center custom-heading-font">
                  Contact Details
                </h4>
                <hr></hr>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="contactNo" className="form-label">
                        Contact No <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="contactNo"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label
                        htmlFor="alternateContactNo"
                        className="form-label"
                      >
                        Alternate Contact No
                      </label>
                      <input
                        type="text"
                        id="alternateContactNo"
                        name="alternateContactNo"
                        value={formData.alternateContactNo}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Example : 9876543210"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="emailId" className="form-label">
                        Email ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="emailId"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={sending}
                  >
                    {sending ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdminProfile;
