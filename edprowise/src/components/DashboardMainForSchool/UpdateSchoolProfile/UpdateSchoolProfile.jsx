import React, { useState, useEffect, useRef } from "react";
import getAPI from "../../../api/getAPI.jsx";
import putAPI from "../../../api/putAPI.jsx";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";
import CountryStateCityData from "../../CountryStateCityData.json";
import CreatableSelect from "react-select/creatable";
const countryData = CountryStateCityData;

const UpdateSchoolProfile = () => {
  const location = useLocation();
  const schoolId = location.state?.schoolId;
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);

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
    sameAsSchoolAddress: false,
  });

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

  // Preview states
  const [previewProfileImage, setPreviewProfileImage] = useState(null);
  const [previewAffiliationCertificate, setPreviewAffiliationCertificate] =
    useState(null);
  const [previewPanFile, setPreviewPanFile] = useState(null);
  const [isAffiliationCertificatePDF, setIsAffiliationCertificatePDF] =
    useState(false);
  const [isPanFilePDF, setIsPanFilePDF] = useState(false);

  useEffect(() => {
    if (schoolId) {
      fetchSchoolData();
    } else {
      console.error("No school ID provided");
    }
  }, [schoolId]);

  useEffect(() => {
    return () => {
      // Clean up object URLs to avoid memory leaks
      if (previewProfileImage) URL.revokeObjectURL(previewProfileImage);
      if (previewAffiliationCertificate)
        URL.revokeObjectURL(previewAffiliationCertificate);
      if (previewPanFile) URL.revokeObjectURL(previewPanFile);
    };
  }, [previewProfileImage, previewAffiliationCertificate, previewPanFile]);

  const fetchSchoolData = async () => {
    try {
      const response = await getAPI(`/school-profile/${schoolId}`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        const schoolData = response.data.data;
        setSchool(schoolData);

        // Check if existing files are PDFs
        const isAffiliationPDF =
          schoolData.affiliationCertificate?.endsWith(".pdf");
        const isPanPDF = schoolData.panFile?.endsWith(".pdf");

        setIsAffiliationCertificatePDF(isAffiliationPDF);
        setIsPanFilePDF(isPanPDF);

        setFormData({
          schoolName: schoolData.schoolName,
          schoolMobileNo: schoolData.schoolMobileNo,
          schoolEmail: schoolData.schoolEmail,
          schoolAddress: schoolData.schoolAddress,

          affiliationUpto: schoolData.affiliationUpto,
          panNo: schoolData.panNo,
          profileImage: schoolData.profileImage,
          affiliationCertificate: schoolData.affiliationCertificate,
          panFile: schoolData.panFile,
          landMark: schoolData.landMark,
          schoolPincode: schoolData.schoolPincode,
          deliveryAddress: schoolData.deliveryAddress,

          deliveryLandMark: schoolData.deliveryLandMark,
          deliveryPincode: schoolData.deliveryPincode,
          contactPersonName: schoolData.contactPersonName,
          numberOfStudents: schoolData.numberOfStudents,
          principalName: schoolData.principalName,
          schoolAlternateContactNo: schoolData.schoolAlternateContactNo,

          country: schoolData.country,
          state: schoolData.state,
          city: schoolData.city,

          deliveryCountry: schoolData.deliveryCountry,
          deliveryState: schoolData.deliveryState,
          deliveryCity: schoolData.deliveryCity,
        });

        // Set previews for existing files
        if (schoolData.profileImage) {
          setPreviewProfileImage(
            `${process.env.REACT_APP_API_URL_FOR_IMAGE}${schoolData.profileImage}`
          );
        }
        if (schoolData.affiliationCertificate) {
          setPreviewAffiliationCertificate(
            `${process.env.REACT_APP_API_URL_FOR_IMAGE}${schoolData.affiliationCertificate}`
          );
        }
        if (schoolData.panFile) {
          setPreviewPanFile(
            `${process.env.REACT_APP_API_URL_FOR_IMAGE}${schoolData.panFile}`
          );
        }
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Handle previews based on file type
      if (file) {
        const fileUrl = URL.createObjectURL(file);

        if (name === "profileImage") {
          setPreviewProfileImage(fileUrl);
        } else if (name === "affiliationCertificate") {
          setPreviewAffiliationCertificate(fileUrl);
          setIsAffiliationCertificatePDF(file.type === "application/pdf");
        } else if (name === "panFile") {
          setPreviewPanFile(fileUrl);
          setIsPanFilePDF(file.type === "application/pdf");
        }
      }
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        ...(checked
          ? {
              deliveryAddress: prev.schoolAddress,
              deliveryLandMark: prev.landMark,
              deliveryPincode: prev.schoolPincode,
              deliveryCity: prev.city,
              deliveryState: prev.state,
              deliveryCountry: prev.country,
            }
          : {
              deliveryAddress: "",
              deliveryLandMark: "",
              deliveryPincode: "",
              deliveryCity: "",
              deliveryState: "",
              deliveryCountry: "",
            }),
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

  const handleUpdate = async (e) => {
    e.preventDefault();

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

    setSending(true);

    try {
      const response = await putAPI(
        `/school-profile/${school.schoolId}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.data.hasError) {
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

        profileImageRef.current.value = "";
        affiliationCertificateRef.current.value = "";
        panFileRef.current.value = "";

        toast.success("School Profile successfully updated!");
        navigate(-1);
      } else {
        toast.error("Failed to update School.");
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

  const renderFilePreview = (preview, isPDF, defaultPreview, altText) => {
    const fileUrl = preview || defaultPreview;
    const isPdfFile =
      isPDF ||
      (defaultPreview && defaultPreview.toLowerCase().endsWith(".pdf"));

    // Fixed size container style
    const containerStyle = {
      width: "100%",
      height: "300px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
      marginBottom: "10px",
    };

    // Fixed size for both image and PDF content
    const contentStyle = {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    if (fileUrl) {
      if (isPdfFile) {
        return (
          <div style={containerStyle}>
            <Worker
              workerUrl={
                process.env.REACT_APP_WORKER_URL ||
                "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
              }
            >
              <div style={contentStyle}>
                <Viewer
                  fileUrl={fileUrl}
                  defaultScale={SpecialZoomLevel.PageFit}
                  initialPage={0}
                  scrollMode="none"
                  renderError={(error) => (
                    <div className="text-danger">
                      Failed to load PDF: {error.message}
                    </div>
                  )}
                />
              </div>
            </Worker>
          </div>
        );
      } else {
        return (
          <div style={containerStyle}>
            <div style={contentStyle}>
              <img
                src={fileUrl}
                alt={altText}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        );
      }
    } else {
      return (
        <div style={containerStyle}>
          <div className="text-muted">No file uploaded</div>
        </div>
      );
    }
  };

  return (
    <>
      {school && (
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
                    <h4 className="card-title text-center custom-heading-font mb-3">
                      School Details
                    </h4>

                    <div className="row">
                      <div className="col-md-4">
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
                            ref={profileImageRef}
                          />
                          <div className="d-flex justify-content-center mt-2">
                            {renderFilePreview(
                              previewProfileImage,
                              false,
                              formData.profileImage
                                ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.profileImage}`
                                : null,
                              "Profile Preview"
                            )}
                          </div>
                        </div>
                      </div>
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
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="principalName" className="form-label">
                            Principal Name
                          </label>
                          <input
                            type="text"
                            id="principalName"
                            name="principalName"
                            className="form-control"
                            value={formData.principalName || "Not Provided"}
                            onChange={handleChange}
                          />
                        </div>
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
                            value={formData.contactPersonName || "Not Provided"}
                            onChange={handleChange}
                          />
                        </div>
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
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="schoolAlternateContactNo"
                            className="form-label"
                          >
                            School Alternate Contact Number
                          </label>
                          <input
                            type="tel"
                            id="mobileNo"
                            name="schoolAlternateContactNo"
                            className="form-control"
                            value={
                              formData.schoolAlternateContactNo ||
                              "Not Provided"
                            }
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <h4 className="card-title text-center custom-heading-font">
                      School Address Details
                    </h4>
                    <hr></hr>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="address" className="form-label">
                            School Address{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            id="address"
                            name="schoolAddress"
                            value={formData.schoolAddress}
                            onChange={handleChange}
                            required
                          />
                        </div>
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
                                (option) =>
                                  option.value === selectedOption?.value
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
                          {formData.isCustomState ||
                          formData.isCustomCountry ? (
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
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="schoolPinCode" className="form-label">
                            School Pin Code{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="schoolPincode"
                            name="schoolPincode"
                            className="form-control"
                            value={formData.schoolPincode}
                            onChange={handleChange}
                            required
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
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="deliveryAddress"
                            className="form-label"
                          >
                            Delivery Address{" "}
                            <span className="text-danger">*</span>
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
                              placeholder="Example : ABC Building , XYZ Street"
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
                              placeholder="Example : ABC Building , XYZ Street"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="deliveryCountry"
                            className="form-label"
                          >
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
                            Delivery State{" "}
                            <span className="text-danger">*</span>
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
                              placeholder="Example : Near Bus Stand"
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
                              placeholder="Example : Near Bus Stand"
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="deliveryPincode"
                            className="form-label"
                          >
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
                              placeholder="Example : 518345"
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
                              placeholder="Example : 518345"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Rest of your form remains the same until the file preview sections */}

                    <h4 className="card-title text-center custom-heading-font">
                      School Certificate Details
                    </h4>
                    <hr></hr>
                    <div className="row">
                      <div className="col-md-4">
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
                            placeholder="Not Provided"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="affiliationUpto"
                            className="form-label"
                          >
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
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
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
                            ref={affiliationCertificateRef}
                          />

                          <div className="d-flex justify-content-center mt-2">
                            {renderFilePreview(
                              previewAffiliationCertificate,
                              isAffiliationCertificatePDF,
                              formData.affiliationCertificate
                                ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.affiliationCertificate}`
                                : null,
                              "Affiliation Certificate"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
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
                            ref={panFileRef}
                          />

                          <div className="d-flex justify-content-center mt-2">
                            {renderFilePreview(
                              previewPanFile,
                              isPanFilePDF,
                              formData.panFile
                                ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.panFile}`
                                : null,
                              "PAN File"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                        disabled={sending}
                      >
                        {sending ? "Updating..." : "Update School"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateSchoolProfile;
