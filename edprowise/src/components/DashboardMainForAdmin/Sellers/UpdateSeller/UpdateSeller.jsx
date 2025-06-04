import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import getAPI from "../../../../api/getAPI.jsx";
import putAPI from "../../../../api/putAPI.jsx";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";

import CountryStateCityData from "../../../CountryStateCityData.json";
import CreatableSelect from "react-select/creatable";

const UpdateSeller = () => {
  const location = useLocation();
  const seller = location.state?.seller;
  const profileId = location.state?.seller?.sellerId;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    sellerProfile: null,
    signature: null,
    gstin: "",
    pan: "",
    tan: "",
    cin: "",
    address: "",
    isCustomCountry: false,
    isCustomState: false,
    isCustomCity: false,
    landmark: "",
    pincode: "",
    contactNo: "",
    alternateContactNo: "",
    emailId: "",
    accountNo: "",
    ifsc: "",
    accountHolderName: "",
    bankName: "",
    branchName: "",
    noOfEmployees: "",
    ceoName: "",
    turnover: "",
    panFile: null,
    tanFile: null,
    cinFile: null,
    gstFile: null,
    country: "",
    state: "",
    city: "",
    isCustomCountry: false,
    isCustomState: false,
    isCustomCity: false,
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [dealingProducts, setDealingProducts] = useState([]);
  const [sellerProfile, setSellerProfile] = useState(null);

  const countryData = CountryStateCityData || {};

  const sellerProfileRef = useRef(null);
  const signatureRef = useRef(null);
  const panFileRef = useRef(null);
  const gstFileRef = useRef(null);
  const tanFileRef = useRef(null);
  const cinFileRef = useRef(null);

  // Preview states
  const [previewSellerProfileImage, setPreviewSellerProfileImage] =
    useState(null);
  const [previewSellerSinatureImage, setPreviewSellerSignatureImage] =
    useState(null);
  const [previewPanFile, setPreviewPanFile] = useState(null);
  const [isPanFilePDF, setIsPanFilePDF] = useState(false);

  const [previewGstFile, setPreviewGstFile] = useState(null);
  const [isGstFilePDF, setIsGstFilePDF] = useState(false);

  const [previewTanFile, setPreviewTanFile] = useState(null);
  const [isTanFilePDF, setIsTanFilePDF] = useState(false);

  const [previewCinFile, setPreviewCinFile] = useState(null);
  const [isCinFilePDF, setIsCinFilePDF] = useState(false);

  useEffect(() => {
    if (profileId) {
      fetchSellerProfileData();
    }
  }, [profileId]);

  useEffect(() => {
    return () => {
      // Clean up object URLs to avoid memory leaks
      if (previewSellerProfileImage)
        URL.revokeObjectURL(previewSellerProfileImage);
      if (previewSellerSinatureImage)
        URL.revokeObjectURL(previewSellerSinatureImage);
      if (previewPanFile) URL.revokeObjectURL(previewPanFile);
      if (previewGstFile) URL.revokeObjectURL(previewGstFile);
      if (previewTanFile) URL.revokeObjectURL(previewTanFile);
      if (previewCinFile) URL.revokeObjectURL(previewCinFile);
    };
  }, [
    previewSellerProfileImage,
    previewSellerSinatureImage,
    previewPanFile,
    previewGstFile,
    previewTanFile,
    previewCinFile,
  ]);

  const fetchSellerProfileData = async () => {
    try {
      const response = await getAPI(
        `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/seller-profile-get-by-id/${profileId}`,
        {},
        true
      );
      if (!response.hasError && response.data && response.data.data) {
        const country = response.data.data.country || "";
        const state = response.data.data.state || "";
        const city = response.data.data.city || "";

        // Check if values are custom - more defensive checks
        const isCustomCountry = country && !countryData.hasOwnProperty(country);
        const isCustomState =
          state &&
          (isCustomCountry || !countryData[country]?.hasOwnProperty(state));
        const isCustomCity =
          city &&
          (isCustomState || !countryData[country]?.[state]?.includes(city));

        const isPanPDF = response.data.data.panFile?.endsWith(".pdf");
        setIsPanFilePDF(isPanPDF);

        const isGstPDF = response.data.data.gstFile?.endsWith(".pdf");
        setIsGstFilePDF(isGstPDF);

        const isTanPDF = response.data.data.tanFile?.endsWith(".pdf");
        setIsTanFilePDF(isTanPDF);

        const isCinPDF = response.data.data.cinFile?.endsWith(".pdf");
        setIsCinFilePDF(isCinPDF);

        setFormData({
          companyName: response.data.data.companyName,
          companyType: response.data.data.companyType,
          sellerProfile: response.data.data.sellerProfile,
          signature: response.data.data.signature,
          gstin: response.data.data.gstin,
          pan: response.data.data.pan,
          tan: response.data.data.tan,
          cin: response.data.data.cin,
          address: response.data.data.address,
          landmark: response.data.data.landmark,
          pincode: response.data.data.pincode,
          contactNo: response.data.data.contactNo,
          alternateContactNo: response.data.data.alternateContactNo,
          emailId: response.data.data.emailId,
          accountNo: response.data.data.accountNo,
          ifsc: response.data.data.ifsc,
          accountHolderName: response.data.data.accountHolderName,
          bankName: response.data.data.bankName,
          branchName: response.data.data.branchName,
          noOfEmployees: response.data.data.noOfEmployees,
          ceoName: response.data.data.ceoName,
          turnover: response.data.data.turnover,
          panFile: response.data.data.panFile,
          tanFile: response.data.data.tanFile,
          cinFile: response.data.data.cinFile,
          gstFile: response.data.data.gstFile,
          country,
          state,
          city,
          isCustomCountry,
          isCustomState,
          isCustomCity,
        });

        setSellerProfile(response.data.data);

        const normalizedProducts = response.data.data.dealingProducts.map(
          (product) => ({
            categoryId: product.categoryId,
            categoryName: product.categoryName,
            subCategoryIds: product.subCategoryIds,
            subCategoryNames: product.subCategoryNames,
          })
        );
        setDealingProducts(normalizedProducts);

        normalizedProducts.forEach((product) => {
          if (product.categoryId) {
            handleCategoryChange(product.categoryId, product.subCategoryIds);
          }
        });
      }
    } catch (err) {
      console.error("Error fetching Seller data:", err);
    }
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
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = async (
    categoryId,
    selectedSubCategoryIds = []
  ) => {
    if (subCategories[categoryId]) return;

    try {
      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_SERVICE}/sub-category/${categoryId}`,
        {},
        true
      );
      if (!response.hasError && Array.isArray(response.data.data)) {
        setSubCategories((prev) => ({
          ...prev,
          [categoryId]: response.data.data,
        }));

        const updatedProducts = [...dealingProducts];
        const productIndex = updatedProducts.findIndex(
          (product) => product.categoryId === categoryId
        );
        if (productIndex !== -1) {
          updatedProducts[productIndex].subCategoryIds = selectedSubCategoryIds;
          setDealingProducts(updatedProducts);
        }
      }
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  const addDealingProduct = () => {
    setDealingProducts((prev) => [
      ...prev,
      { categoryId: "", subCategoryIds: [] },
    ]);
  };

  const handleDealingProductChange = (index, field, value) => {
    const updatedProducts = [...dealingProducts];

    if (field === "categoryId") {
      // Find the category name for display
      const category = categories.find((cat) => cat._id === value);
      updatedProducts[index] = {
        categoryId: value,
        categoryName: category?.categoryName || "", // For display only
        subCategoryIds: [],
      };
      handleCategoryChange(value);
    } else if (field === "subCategoryIds") {
      // Find subcategory names for display
      const subCats = (subCategories[updatedProducts[index].categoryId] || [])
        .filter((sub) => value.includes(sub._id))
        .map((sub) => sub.subCategoryName);

      updatedProducts[index] = {
        ...updatedProducts[index],
        subCategoryIds: value,
        subCategoryNames: subCats, // For display only
      };
    }

    setDealingProducts(updatedProducts);
  };

  const removeDealingProduct = (index) => {
    const updatedProducts = [...dealingProducts];
    updatedProducts.splice(index, 1);
    setDealingProducts(updatedProducts);
  };

  // Get country/state/city options
  const countryOptions = Object.keys(countryData).map((country) => ({
    value: country,
    label: country,
  }));

  // Update state options with null checks
  const stateOptions =
    formData.country && !formData.isCustomCountry
      ? Object.keys(countryData[formData.country] ?? {}).map((state) => ({
          value: state,
          label: state,
        }))
      : [];

  // Update city options with optional chaining
  const cityOptions =
    formData.state && !formData.isCustomState && formData.country
      ? (countryData[formData.country]?.[formData.state] || []).map((city) => ({
          value: city,
          label: city,
        }))
      : [];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Handle previews based on file type
      if (file) {
        const fileUrl = URL.createObjectURL(file);

        if (name === "sellerProfile") {
          setPreviewSellerProfileImage(fileUrl);
        } else if (name === "signature") {
          setPreviewSellerSignatureImage(fileUrl);
        } else if (name === "panFile") {
          setPreviewPanFile(fileUrl);
          setIsPanFilePDF(file.type === "application/pdf");
        } else if (name === "tanFile") {
          setPreviewTanFile(fileUrl);
          setIsTanFilePDF(file.type === "application/pdf");
        } else if (name === "cinFile") {
          setPreviewCinFile(fileUrl);
          setIsCinFilePDF(file.type === "application/pdf");
        } else if (name === "gstFile") {
          setPreviewGstFile(fileUrl);
          setIsGstFilePDF(file.type === "application/pdf");
        }
      }
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

  const [sending, setSending] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("companyType", formData.companyType);
    formDataToSend.append("gstin", formData.gstin);
    formDataToSend.append("pan", formData.pan);
    formDataToSend.append("tan", formData.tan);
    formDataToSend.append("cin", formData.cin);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("landmark", formData.landmark);
    formDataToSend.append("pincode", formData.pincode);
    formDataToSend.append("contactNo", formData.contactNo);
    formDataToSend.append("alternateContactNo", formData.alternateContactNo);
    formDataToSend.append("emailId", formData.emailId);
    formDataToSend.append("accountNo", formData.accountNo);
    formDataToSend.append("ifsc", formData.ifsc);
    formDataToSend.append("accountHolderName", formData.accountHolderName);
    formDataToSend.append("bankName", formData.bankName);
    formDataToSend.append("branchName", formData.branchName);
    formDataToSend.append("noOfEmployees", formData.noOfEmployees);
    formDataToSend.append("ceoName", formData.ceoName);
    formDataToSend.append("turnover", formData.turnover);

    if (formData.sellerProfile instanceof File) {
      formDataToSend.append("sellerProfile", formData.sellerProfile);
    }
    if (formData.signature instanceof File) {
      formDataToSend.append("signature", formData.signature);
    }
    if (formData.panFile instanceof File) {
      formDataToSend.append("panFile", formData.panFile);
    }
    if (formData.tanFile instanceof File) {
      formDataToSend.append("tanFile", formData.tanFile);
    }
    if (formData.cinFile instanceof File) {
      formDataToSend.append("cinFile", formData.cinFile);
    }
    if (formData.gstFile instanceof File) {
      formDataToSend.append("gstFile", formData.gstFile);
    }

    const backendDealingProducts = dealingProducts.map((product) => ({
      categoryId: product.categoryId,
      subCategoryIds: product.subCategoryIds,
    }));

    formDataToSend.append(
      "dealingProducts",
      JSON.stringify(backendDealingProducts)
    );
    setSending(true);

    try {
      const response = await putAPI(
        `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/seller-profile/${profileId}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.data.hasError) {
        toast.success("Seller updated successfully!");

        setFormData({
          companyName: "",
          companyType: "",
          sellerProfile: null,
          signature: null,
          gstin: "",
          pan: "",
          tan: "",
          cin: "",
          address: "",
          country: "",
          state: "",
          city: "",
          isCustomCountry: false,
          isCustomState: false,
          isCustomCity: false,
          landmark: "",
          pincode: "",
          contactNo: "",
          alternateContactNo: "",
          emailId: "",
          accountNo: "",
          ifsc: "",
          accountHolderName: "",
          bankName: "",
          branchName: "",
          noOfEmployees: "",
          ceoName: "",
          turnover: "",
        });
        navigate(-1);
      } else {
        toast.error("Failed to update Seller.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
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
      height: "200px",
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
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title custom-heading-font">
                    Update Seller
                  </h4>
                </div>
              </div>
              <form onSubmit={handleUpdate}>
                <h4 className="card-title text-center custom-heading-font">
                  Company Detail
                </h4>
                <hr></hr>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="sellerProfile" className="form-label">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        id="sellerProfile"
                        name="sellerProfile"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                        ref={sellerProfileRef}
                      />
                      <div className="d-flex justify-content-center mt-2">
                        {renderFilePreview(
                          previewSellerProfileImage,
                          false,
                          formData.sellerProfile
                            ? `${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${formData.sellerProfile}`
                            : null,
                          "Profile Preview"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="signature" className="form-label">
                        Signature <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="signature"
                        name="signature"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                        ref={signatureRef}
                      />
                      <div className="d-flex justify-content-center mt-2">
                        {renderFilePreview(
                          previewSellerSinatureImage,
                          false,
                          formData.signature
                            ? `${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${formData.signature}`
                            : null,
                          "Signature Preview"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
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
                      />
                    </div>
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
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
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
                      />
                    </div>
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
                        placeholder="Example : 1234567890"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
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
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
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
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
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
                        placeholder="Example : PDES03028F "
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
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
                        placeholder="U12345MH2020PTC098765"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="gstFile" className="form-label">
                        GST File <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="gstFile"
                        name="gstFile"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        ref={gstFileRef}
                      />

                      <div className="d-flex justify-content-center mt-2">
                        {renderFilePreview(
                          previewGstFile,
                          isGstFilePDF,
                          formData.gstFile
                            ? `${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${formData.gstFile}`
                            : null,
                          "GST File"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
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
                            ? `${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${formData.panFile}`
                            : null,
                          "PAN File"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="tanFile" className="form-label">
                        TAN File <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="tanFile"
                        name="tanFile"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        ref={tanFileRef}
                      />

                      <div className="d-flex justify-content-center mt-2">
                        {renderFilePreview(
                          previewTanFile,
                          isTanFilePDF,
                          formData.tanFile
                            ? `${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${formData.tanFile}`
                            : null,
                          "TAN File"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="cinFile" className="form-label">
                        CIN File <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="cinFile"
                        name="cinFile"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        ref={cinFileRef}
                      />

                      <div className="d-flex justify-content-center mt-2">
                        {renderFilePreview(
                          previewCinFile,
                          isCinFilePDF,
                          formData.cinFile
                            ? `${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${formData.cinFile}`
                            : null,
                          "CIN File"
                        )}
                      </div>
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
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        rows={3}
                        value={formData.address}
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
                      />
                    </div>
                  </div>
                </div>
                <h4 className="card-title text-center custom-heading-font">
                  Bank Details
                </h4>
                <hr></hr>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="accountNo" className="form-label">
                        Bank Account Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="accountNo"
                        name="accountNo"
                        className="form-control"
                        value={formData.accountNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="ifsc" className="form-label">
                        IFSC Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="ifsc"
                        name="ifsc"
                        className="form-control"
                        value={formData.ifsc}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="bankName" className="form-label">
                        Bank Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="bankName"
                        name="bankName"
                        className="form-control"
                        value={formData.bankName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="accountHolderName" className="form-label">
                        Account Holder Name{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="accountHolderName"
                        name="accountHolderName"
                        className="form-control"
                        value={formData.accountHolderName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="branchName" className="form-label">
                        Branch Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="branchName"
                        name="branchName"
                        className="form-control"
                        value={formData.branchName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <h4 className="card-title text-center custom-heading-font">
                  Additional Details
                </h4>
                <hr></hr>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="noOfEmployees" className="form-label">
                        Number Of Employees{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        id="noOfEmployees"
                        name="noOfEmployees"
                        className="form-control"
                        value={formData.noOfEmployees}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Number Of Employees</option>
                        <option value="1 to 10 Employees">
                          1 to 10 Employees
                        </option>
                        <option value="11 to 25 Employees">
                          11 to 25 Employees
                        </option>
                        <option value="25 to 50 Employees">
                          25 to 50 Employees
                        </option>
                        <option value="50 to 100 Employees">
                          50 to 100 Employees
                        </option>
                        <option value="50 to 100 Employees">
                          50 to 100 Employees
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="ceoName" className="form-label">
                        CEO Name
                      </label>
                      <input
                        type="text"
                        id="ceoName"
                        name="ceoName"
                        className="form-control"
                        value={formData.ceoName}
                        onChange={handleChange}
                        // required
                        placeholder="Example : John Smith"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="turnover" className="form-label">
                        Company Turnover
                      </label>
                      <select
                        id="turnover"
                        name="turnover"
                        className="form-control"
                        value={formData.turnover}
                        onChange={handleChange}
                      >
                        <option value="">Select Company Turnover</option>
                        <option value="1 to 10 Lakh">1 to 10 Lakh</option>
                        <option value="10 to 50 Lakh">10 to 50 Lakh</option>
                        <option value="50 Lakh to 1 Crore">
                          50 Lakh to 1 Crore
                        </option>
                        <option value="More than 1 Crore">
                          More than 1 Crore
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <h4 className="card-title text-center custom-heading-font">
                  Dealing Products
                </h4>
                <hr />

                <div className="row">
                  {dealingProducts.map((product, index) => (
                    <div key={index} className="mb-3">
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="category" className="form-label">
                            Category <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-control"
                            value={product.categoryId}
                            onChange={(e) =>
                              handleDealingProductChange(
                                index,
                                "categoryId",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="subCategories" className="form-label">
                            Subcategories <span className="text-danger">*</span>
                          </label>
                          <div>
                            {(subCategories[product.categoryId] || []).map(
                              (subCategory) => (
                                <div
                                  key={subCategory.id}
                                  className="form-check ms-1"
                                >
                                  <input
                                    type="checkbox"
                                    id={`subCategory-${subCategory.id}`}
                                    value={subCategory.id}
                                    checked={product.subCategoryIds.includes(
                                      subCategory.id
                                    )}
                                    onChange={(e) => {
                                      const selectedSubCategories = e.target
                                        .checked
                                        ? [
                                            ...product.subCategoryIds,
                                            subCategory.id,
                                          ]
                                        : product.subCategoryIds.filter(
                                            (id) => id !== subCategory.id
                                          );
                                      handleDealingProductChange(
                                        index,
                                        "subCategoryIds",
                                        selectedSubCategories
                                      );
                                    }}
                                    className="form-check-input"
                                  />
                                  <label
                                    htmlFor={`subCategory-${subCategory.id}`}
                                    className="form-label"
                                  >
                                    {subCategory.subCategoryName}
                                  </label>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => removeDealingProduct(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={addDealingProduct}
                >
                  Add Dealing Product
                </button>
                <div className="text-end mt-4">
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
  );
};

export default UpdateSeller;
