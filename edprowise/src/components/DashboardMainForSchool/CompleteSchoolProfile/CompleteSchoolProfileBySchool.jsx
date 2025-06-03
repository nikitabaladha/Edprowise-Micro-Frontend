import React, { useState, useEffect, useRef } from "react";

import getAPI from "../../../api/getAPI.jsx";
import postAPI from "../../../api/postAPI.jsx";

import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import CountryStateCityData from "../../CountryStateCityData.json";
import CreatableSelect from "react-select/creatable";
import EmailVerificationModal from "./EmailVerificationModal.jsx";

const countryData = CountryStateCityData;

const CompleteSchoolProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schoolName: "",
    panFile: null,
    panNo: "",
    schoolAddress: "",
    landMark: "",
    schoolPincode: "",
    schoolMobileNo: "",
    schoolEmail: "",
    profileImage: null,
    affiliationCertificate: null,
    affiliationUpto: "",
    deliveryAddress: "",
    deliveryLandMark: "",
    deliveryPincode: "",
    contactPersonName: "",
    numberOfStudents: "",
    principalName: "",
    schoolAlternateContactNo: "",
    sameAsSchoolAddress: false,
    country: "",
    state: "",
    city: "",
    isCustomCountry: false,
    isCustomState: false,
    isCustomCity: false,
    deliveryCountry: "",
    deliveryState: "",
    deliveryCity: "",
    isCustomDeliveryCountry: false,
    isCustomDeliveryState: false,
    isCustomDeliveryCity: false,
  });

  const [timer, setTimer] = useState(0);

  const [isVerificationSuccessful, setIsVerificationSuccessful] =
    useState(false);

  const [emailVerificationState, setEmailVerificationState] =
    useState("unverified"); // 'unverified', 'pending', 'verified'

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [verifyingOTP, setVerifyingOTP] = useState(false); // For verifying OTP

  const [otpData, setOtpData] = useState({
    email: "",

    otp: "",
  });

  useEffect(() => {
    let interval;

    if (emailVerificationState === "pending" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [emailVerificationState, timer]);

  const handleSendOTP = async () => {
    if (
      !formData.schoolEmail.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      toast.error("Please enter a valid email address");

      return;
    }

    setSending(true);

    try {
      const response = await postAPI(
        `${process.env.REACT_APP_EMAIL_SERVICE}/send-otp-email-verification`,
        {
          email: formData.schoolEmail,
        }
      );

      setSending(true);

      if (!response.data.hasError) {
        setEmailVerificationState("pending");
        setOtpData((prev) => ({ ...prev, email: formData.schoolEmail }));
        setIsModalOpen(true);
        setTimer(60);
        toast.success("OTP sent to your email!");
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setVerifyingOTP(true);

      const response = await postAPI(
        `${process.env.REACT_APP_EMAIL_SERVICE}/verify-email-code`,
        {
          email: otpData.email,
          verificationCode: otpData.otp,
        }
      );

      if (!response.data.hasError) {
        setEmailVerificationState("verified");
        setIsVerificationSuccessful(true);
        setIsModalOpen(false);
        setTimer(0);

        toast.success("Email verified successfully!");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setVerifyingOTP(false);
    }
  };

  const handleResendOTP = async () => {
    await handleSendOTP();
  };

  const handleOTPChange = (e) => {
    setOtpData((prev) => ({
      ...prev,

      otp: e.target.value,
    }));
  };

  const profileImageRef = useRef(null);
  const affiliationCertificateRef = useRef(null);
  const panFileRef = useRef(null);

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
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        ...(checked
          ? {
              deliveryAddress: prev.schoolAddress,
              deliveryCity: prev.city,
              deliveryState: prev.state,
              deliveryCountry: prev.country,
              deliveryLandMark: prev.landMark,
              deliveryPincode: prev.schoolPincode,
            }
          : {
              deliveryAddress: "",
              deliveryCity: "",
              deliveryState: "",
              deliveryCountry: "",
              deliveryLandMark: "",
              deliveryPincode: "",
            }),
      }));
    } else if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      const updatedValue = ["panNo"].includes(name)
        ? value.replace(/[a-z]/g, (char) => char.toUpperCase())
        : value;
      setFormData((prev) => ({
        ...prev,
        [name]: updatedValue,
      }));
    }
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

    const userId = userDetails?.id;
    const formDataToSend = new FormData();

    const allowedFields = [
      "schoolName",
      "panFile",
      "panNo",
      "schoolAddress",
      "city",
      "state",
      "country",
      "landMark",
      "schoolPincode",
      "schoolMobileNo",
      "schoolEmail",
      "profileImage",
      "affiliationCertificate",
      "affiliationUpto",
      "deliveryAddress",
      "deliveryCity",
      "deliveryState",
      "deliveryCountry",
      "deliveryLandMark",
      "deliveryPincode",
      "contactPersonName",
      "numberOfStudents",
      "principalName",
      "schoolAlternateContactNo",
    ];

    // Append only allowed fields to formDataToSend
    for (const key of allowedFields) {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key] || "");
      }
    }

    if (!isVerificationSuccessful) {
      return toast.error("Email verification not done");
    }

    setSending(true);

    try {
      const response = await postAPI(
        `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/school-profile/${schoolId}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.data.hasError) {
        const storedUserResponse = await getAPI(
          `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/get-user-by-id/${userId}`
        );

        if (!storedUserResponse.hasError) {
          localStorage.setItem(
            "userDetails",
            JSON.stringify(storedUserResponse.data.data)
          );
        }

        // Reset formData state
        setFormData({
          schoolName: "",
          schoolMobileNo: "",
          schoolEmail: "",
          schoolAddress: "",
          affiliationUpto: "",
          panNo: "",
          profileImage: null,
          affiliationCertificate: null,
          panFile: null,
          landMark: "",
          schoolPincode: "",
          deliveryAddress: "",
          deliveryLandMark: "",
          deliveryPincode: "",
          contactPersonName: "",
          numberOfStudents: "",
          principalName: "",
          schoolAlternateContactNo: "",
          sameAsSchoolAddress: false,
          country: "",
          state: "",
          city: "",
          isCustomCountry: false,
          isCustomState: false,
          isCustomCity: false,
          deliveryCountry: "",
          deliveryState: "",
          deliveryCity: "",
          isCustomDeliveryCountry: false,
          isCustomDeliveryState: false,
          isCustomDeliveryCity: false,
        });

        toast.success("School Profile successfully created!");
        navigate("/school/go-to-dashboard");
        //
      } else {
        toast.error("Failed to update School.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("An unexpected error occurred. Please try again.");
      }
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
                      Complete Your Profile
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
                    School Details
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-4">
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
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="contactPersonName"
                          className="form-label"
                        >
                          Contact Person Name
                        </label>
                        <input
                          type="text"
                          id="contactPersonName"
                          name="contactPersonName"
                          className="form-control"
                          value={formData.contactPersonName}
                          onChange={handleChange}
                          // required
                          placeholder="Example : John Doe"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="principalName" className="form-label">
                          Principal Name
                        </label>
                        <input
                          type="text"
                          id="principalName"
                          name="principalName"
                          className="form-control"
                          value={formData.principalName}
                          onChange={handleChange}
                          // required
                          placeholder="Example : Jane Doe"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
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
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="schoolAlternateContactNo"
                          className="form-label"
                        >
                          Alternate Contact Number
                        </label>
                        <input
                          type="tel"
                          id="mobileNo"
                          name="schoolAlternateContactNo"
                          className="form-control"
                          value={formData.schoolAlternateContactNo}
                          onChange={handleChange}
                          // required
                          placeholder="Example : 1234567890"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          School Email <span className="text-danger">*</span>
                        </label>
                        <span
                          style={{
                            display: "flex",

                            alignItems: "center",

                            justifyContent: "end",
                          }}
                        >
                          <input
                            type="email"
                            id="email"
                            name="schoolEmail"
                            className="form-control position-relative"
                            value={formData.schoolEmail}
                            onChange={handleChange}
                            required
                            disabled={emailVerificationState === "verified"}
                            placeholder="Example : example@gmail.com"
                          />

                          <div
                            className="form-label"
                            style={{
                              position: "absolute",

                              margin: "0 0.9rem 0 0",
                            }}
                          >
                            <div
                              className={`d-inline-block px-2 py-1 rounded ${
                                emailVerificationState === "verified"
                                  ? "text-success"
                                  : "text-black"
                              } ${!formData.schoolEmail ? "text-muted" : ""}`}
                              style={{
                                cursor:
                                  emailVerificationState === "verified" ||
                                  !formData.schoolEmail
                                    ? "default"
                                    : "pointer",

                                opacity:
                                  emailVerificationState === "verified" ||
                                  !formData.schoolEmail
                                    ? 0.7
                                    : 1,
                              }}
                              onClick={async () => {
                                if (
                                  emailVerificationState !== "verified" &&
                                  formData.schoolEmail
                                ) {
                                  await handleSendOTP();
                                }
                              }}
                            >
                              {emailVerificationState === "verified" ? (
                                <>
                                  <i className="fas fa-check-circle me-1"></i>
                                </>
                              ) : sending ? (
                                "Verifying..."
                              ) : (
                                "Verify"
                              )}
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="card-title text-center custom-heading-font">
                    School Address Details
                  </h4>
                  <hr></hr>

                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="schoolAddress" className="form-label">
                        School Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="schoolAddress"
                        name="schoolAddress"
                        rows={3}
                        value={formData.schoolAddress}
                        onChange={handleChange}
                        required
                        placeholder="Example : 123, ABC Street"
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
                        <label htmlFor="panNo" className="form-label">
                          Land Mark <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="landMark"
                          name="landMark"
                          className="form-control"
                          value={formData.landMark}
                          onChange={handleChange}
                          required
                          placeholder="Example : Near ABC Market"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="panNo" className="form-label">
                          School Pin Code <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="schoolPincode"
                          name="schoolPincode"
                          className="form-control"
                          value={formData.schoolPincode}
                          onChange={handleChange}
                          required
                          placeholder="Example : 560045"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center gap-1">
                    <h4 className="card-title flex-grow-1 custom-heading-font mb-3">
                      Delivery Address Details
                    </h4>
                    <h4 className="mb-3"> Same As Above</h4>

                    <div className="form-check ms-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="sameAsSchoolAddress"
                        name="sameAsSchoolAddress"
                        checked={formData.sameAsSchoolAddress}
                        onChange={handleChange}
                      />{" "}
                      <label
                        className="form-check-label"
                        htmlFor="sameAsSchoolAddress"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="deliveryAddress" className="form-label">
                        Delivery Address <span className="text-danger">*</span>
                      </label>
                      {formData.sameAsSchoolAddress ? (
                        <input
                          type="text"
                          id="deliveryAddress"
                          name="deliveryAddress"
                          className="form-control"
                          rows={3}
                          value={formData.schoolAddress}
                          onChange={handleChange}
                          required
                          disabled
                          placeholder="Example : ABC Street"
                        />
                      ) : (
                        <input
                          type="text"
                          id="deliveryAddress"
                          name="deliveryAddress"
                          className="form-control"
                          rows={3}
                          value={formData.deliveryAddress}
                          onChange={handleChange}
                          required
                          placeholder="Example : ABC Street"
                        />
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="deliveryLandMark"
                          className="form-label"
                        >
                          Delivery LandMark{" "}
                          <span className="text-danger">*</span>
                        </label>
                        {formData.sameAsSchoolAddress ? (
                          <input
                            type="text"
                            id="deliveryLandMark"
                            name="deliveryLandMark"
                            className="form-control"
                            value={formData.landMark}
                            onChange={handleChange}
                            required
                            disabled
                            placeholder="Example : Near ABC Market"
                          />
                        ) : (
                          <input
                            type="text"
                            id="deliveryLandMark"
                            name="deliveryLandMark"
                            className="form-control"
                            value={formData.deliveryLandMark}
                            onChange={handleChange}
                            required
                            placeholder="Example : Near ABC Market"
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="deliveryPincode" className="form-label">
                          Delivery Pincode{" "}
                          <span className="text-danger">*</span>
                        </label>
                        {formData.sameAsSchoolAddress ? (
                          <input
                            type="text"
                            id="deliveryPincode"
                            name="deliveryPincode"
                            className="form-control"
                            value={formData.schoolPincode}
                            onChange={handleChange}
                            required
                            disabled
                            placeholder="Example : 560045"
                          />
                        ) : (
                          <input
                            type="text"
                            id="deliveryPincode"
                            name="deliveryPincode"
                            className="form-control"
                            value={formData.deliveryPincode}
                            onChange={handleChange}
                            required
                            placeholder="Example : 560045"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="deliveryCountry" className="form-label">
                          Delivery Country{" "}
                          <span className="text-danger">*</span>
                        </label>
                        {formData.sameAsSchoolAddress ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.country}
                            readOnly
                            disabled
                          />
                        ) : (
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
                              const isCustom = !countryOptions.some(
                                (option) =>
                                  option.value === selectedOption?.value
                              );
                              setFormData((prev) => ({
                                ...prev,
                                deliveryCountry: selectedOption?.value || "",
                                deliveryState: "",
                                deliveryCity: "",
                                isCustomDeliveryCountry: isCustom,
                                isCustomDeliveryState: false,
                                isCustomDeliveryCity: false,
                              }));
                            }}
                            onCreateOption={(inputValue) => {
                              setFormData((prev) => ({
                                ...prev,
                                deliveryCountry: inputValue,
                                deliveryState: "",
                                deliveryCity: "",
                                isCustomDeliveryCountry: true,
                                isCustomDeliveryState: false,
                                isCustomDeliveryCity: false,
                              }));
                            }}
                            placeholder="Select or type country"
                            isSearchable
                            required
                            classNamePrefix="react-select"
                            className="custom-react-select"
                          />
                        )}
                      </div>
                    </div>

                    {/* Delivery State */}
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="deliveryState" className="form-label">
                          Delivery State <span className="text-danger">*</span>
                        </label>
                        {formData.sameAsSchoolAddress ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.state}
                            readOnly
                            disabled
                          />
                        ) : formData.isCustomDeliveryCountry ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.deliveryState}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                deliveryState: e.target.value,
                                deliveryCity: "",
                                isCustomDeliveryState: true,
                                isCustomDeliveryCity: false,
                              }))
                            }
                            required
                          />
                        ) : (
                          <CreatableSelect
                            id="deliveryState"
                            name="deliveryState"
                            options={Object.keys(
                              countryData[formData.deliveryCountry] || {}
                            ).map((state) => ({
                              value: state,
                              label: state,
                            }))}
                            value={
                              formData.deliveryState
                                ? {
                                    value: formData.deliveryState,
                                    label: formData.deliveryState,
                                  }
                                : null
                            }
                            onChange={(selectedOption) => {
                              const isCustom = !Object.keys(
                                countryData[formData.deliveryCountry] || {}
                              ).includes(selectedOption?.value);
                              setFormData((prev) => ({
                                ...prev,
                                deliveryState: selectedOption?.value || "",
                                deliveryCity: "",
                                isCustomDeliveryState: isCustom,
                                isCustomDeliveryCity: false,
                              }));
                            }}
                            onCreateOption={(inputValue) => {
                              setFormData((prev) => ({
                                ...prev,
                                deliveryState: inputValue,
                                deliveryCity: "",
                                isCustomDeliveryState: true,
                                isCustomDeliveryCity: false,
                              }));
                            }}
                            placeholder="Select or type state"
                            isSearchable
                            required
                            isDisabled={!formData.deliveryCountry}
                            classNamePrefix="react-select"
                            className="custom-react-select"
                          />
                        )}
                      </div>
                    </div>

                    {/* Delivery City */}
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="deliveryCity" className="form-label">
                          Delivery City <span className="text-danger">*</span>
                        </label>
                        {formData.sameAsSchoolAddress ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.city}
                            readOnly
                            disabled
                          />
                        ) : formData.isCustomDeliveryState ||
                          formData.isCustomDeliveryCountry ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.deliveryCity}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                deliveryCity: e.target.value,
                                isCustomDeliveryCity: true,
                              }))
                            }
                            required
                          />
                        ) : (
                          <CreatableSelect
                            id="deliveryCity"
                            name="deliveryCity"
                            options={(
                              countryData[formData.deliveryCountry]?.[
                                formData.deliveryState
                              ] || []
                            ).map((city) => ({
                              value: city,
                              label: city,
                            }))}
                            value={
                              formData.deliveryCity
                                ? {
                                    value: formData.deliveryCity,
                                    label: formData.deliveryCity,
                                  }
                                : null
                            }
                            onChange={(selectedOption) => {
                              const isCustom = !(
                                countryData[formData.deliveryCountry]?.[
                                  formData.deliveryState
                                ] || []
                              ).includes(selectedOption?.value);
                              setFormData((prev) => ({
                                ...prev,
                                deliveryCity: selectedOption?.value || "",
                                isCustomDeliveryCity: isCustom,
                              }));
                            }}
                            onCreateOption={(inputValue) => {
                              setFormData((prev) => ({
                                ...prev,
                                deliveryCity: inputValue,
                                isCustomDeliveryCity: true,
                              }));
                            }}
                            placeholder="Select or type city"
                            isSearchable
                            required
                            isDisabled={!formData.deliveryState}
                            classNamePrefix="react-select"
                            className="custom-react-select"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <h4 className="card-title text-center custom-heading-font">
                    School Certificate Details
                  </h4>
                  <hr></hr>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="principalName" className="form-label">
                          Number Of Students
                        </label>
                        <input
                          type="number"
                          id="numberOfStudents"
                          name="numberOfStudents"
                          className="form-control"
                          value={formData.numberOfStudents}
                          onChange={handleChange}
                          placeholder="Example : 500"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
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
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
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
                        <label htmlFor="panNo" className="form-label">
                          PAN Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="panNo"
                          name="panNo"
                          className="form-control"
                          value={formData.panNo}
                          onChange={handleChange}
                          required
                          placeholder="Example : AAAAA0000A"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
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

                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                      disabled={sending}
                    >
                      {sending ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EmailVerificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          otpData={otpData}
          onOtpChange={(e) =>
            setOtpData((prev) => ({ ...prev, otp: e.target.value }))
          }
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
          timer={timer}
          emailVerificationState={emailVerificationState}
          sending={sending}
          verifyingOTP={verifyingOTP}
        />
      )}
    </>
  );
};

export default CompleteSchoolProfile;
