import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.jsx";
import postAPI from "../../../../api/postAPI.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Select from "react-select";

import CountryStateCityData from "../../../CountryStateCityData.json";
import CreatableSelect from "react-select/creatable";

const AddNewSeller = () => {
  const countryData = CountryStateCityData;

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
    country: "",
    state: "",
    city: "",
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
    isCustomCountry: false,
    isCustomState: false,
    isCustomCity: false,
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [dealingProducts, setDealingProducts] = useState([
    { categoryId: "", subCategoryIds: [] },
  ]);
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAPI("/category", {}, true);
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

  const handleCategoryChange = async (categoryId) => {
    if (subCategories[categoryId]) return;

    try {
      const response = await getAPI(`/sub-category/${categoryId}`, {}, true);
      if (!response.hasError && Array.isArray(response.data.data)) {
        setSubCategories((prev) => ({
          ...prev,
          [categoryId]: response.data.data,
        }));
      } else {
        console.error("Error fetching subcategories.");
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
      updatedProducts[index] = { categoryId: value, subCategoryIds: [] };
      handleCategoryChange(value);
    } else if (field === "subCategoryIds") {
      updatedProducts[index].subCategoryIds = value;
    }
    setDealingProducts(updatedProducts);
  };

  const removeDealingProduct = (index) => {
    const updatedProducts = [...dealingProducts];
    updatedProducts.splice(index, 1);
    setDealingProducts(updatedProducts);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      const updatedValue = ["gstin", "pan", "tan", "cin"].includes(name)
        ? value.replace(/[a-z]/g, (char) => char.toUpperCase())
        : value;
      setFormData((prevState) => ({ ...prevState, [name]: updatedValue }));
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

    dealingProducts.forEach((product, index) => {
      data.append(`dealingProducts[${index}][categoryId]`, product.categoryId);
      product.subCategoryIds.forEach((subCategoryId, subIndex) => {
        data.append(
          `dealingProducts[${index}][subCategoryIds][${subIndex}]`,
          subCategoryId
        );
      });
    });

    setSending(true);

    try {
      const response = await postAPI(
        "/seller-profile-by-admin",
        data,
        { "Content-Type": "multipart/form-data" },
        true
      );
      if (!response.hasError) {
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
          isCustomCountry: false,
          isCustomState: false,
          isCustomCity: false,
        });
        setDealingProducts([]);
        toast.success("Seller added successfully");
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to add seller profile");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setSending(false);
    }
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
                    <h4 className="card-title custom-heading-font">
                      Add New Seller
                    </h4>
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
                          // required
                          placeholder="Example : ABC Company"
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
                          // required
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
                          // required
                          placeholder="Example : 22AAAAA0000A1Z5"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="panFile" className="form-label">
                          GST File <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          id="gstFile"
                          name="gstFile"
                          className="form-control"
                          accept="image/*,application/pdf"
                          onChange={handleChange}
                          // required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
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
                          placeholder="Example : AAAAPL1234C"
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
                          // required
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
                          // required
                          placeholder="Example : AAAAPL1234C"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="tanFile" className="form-label">
                          TAN File
                        </label>
                        <input
                          type="file"
                          id="tanFile"
                          name="tanFile"
                          className="form-control"
                          accept="image/*,application/pdf"
                          onChange={handleChange}
                          // required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
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
                          // required
                          placeholder="Example : AAAAPL1234C"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="panFile" className="form-label">
                          CIN File
                        </label>
                        <input
                          type="file"
                          id="cinFile"
                          name="cinFile"
                          className="form-control"
                          accept="image/*,application/pdf"
                          onChange={handleChange}
                          // required
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="card-title text-center custom-heading-font">
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
                        // required
                        placeholder="Example : ABC Building, XYZ Street"
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
                          // required
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
                          // required
                          placeholder="Example : 560097"
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
                          // required
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
                          placeholder="Example : 0987654321"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
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
                          // required
                          placeholder="Example : example@gmail.com"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
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
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
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
                          // required
                          placeholder="Example : 123456789012"
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
                          // required
                          placeholder="Example : SBIN0001234"
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
                          // required
                          placeholder="ABC Bank"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="accountHolderName"
                          className="form-label"
                        >
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
                          // required
                          placeholder="Example : John Due"
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
                          // required
                          placeholder="Example : ABC Branch"
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
                          // required
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
                          <option value="More than 100 Employees">
                            More than 100 Employees
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
                          // required
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
                  <hr></hr>
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
                            <label
                              htmlFor="subCategories"
                              className="form-label"
                            >
                              Subcategories{" "}
                              <span className="text-danger">*</span>
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
                    className="btn btn-secondary mb-3"
                    onClick={addDealingProduct}
                  >
                    Add Another Product
                  </button>

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
    </>
  );
};

export default AddNewSeller;
