import React, { useState, useEffect } from "react";

import getAPI from "../../../api/getAPI.jsx";

import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";

import "react-toastify/dist/ReactToastify.css";

const ViewSellerProfile = () => {
  const location = useLocation();

  const profileId = location.state?._id;

  const navigate = useNavigate();

  useEffect(() => {
    if (profileId) {
      fetchSellerProfileData();
    } else {
      console.error("No profile ID provided");
    }
  }, [profileId]);

  const [sellerProfile, setSellerProfile] = useState(null);

  const fetchSellerProfileData = async () => {
    try {
      const response = await getAPI(`/seller-profile`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setSellerProfile(response.data.data);
        console.log("Seller Profile", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Seller data:", err);
    }
  };

  useEffect(() => {
    fetchSellerProfileData();
  }, []);

  const navigateToUpdateSellerProfile = (event, sellerProfile) => {
    event.preventDefault();
    navigate(`/seller-dashboard/update-seller-profile`, {
      state: { sellerProfile },
    });
  };

  const StarRating = ({ rating }) => {
    const maxStars = 5;
    const filledStars = Math.min(Math.max(0, rating), maxStars);

    return (
      <div className="d-flex">
        {[...Array(maxStars)].map((_, index) => (
          <span
            key={index}
            style={{
              fontSize: "1.5rem",
              color: index < filledStars ? "#ffc107" : "#e4e5e9",
              lineHeight: 1,
            }}
          >
            {index < filledStars ? "★" : "☆"}
          </span>
        ))}
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
                  <div className="card-header mb-2 d-flex justify-content-between align-items-center">
                    <h4 className="card-title custom-heading-font mb-0">
                      Seller Details
                    </h4>

                    {sellerProfile?.averageRating && (
                      <div
                        className="d-flex align-items-center"
                        style={{ gap: "0.5rem" }}
                      >
                        <label
                          htmlFor="rating"
                          className="form-label mb-0 me-2"
                        >
                          Rating :
                        </label>
                        <StarRating rating={sellerProfile.averageRating} />
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.875rem" }}
                        >
                          ({sellerProfile.averageRating}/5)
                        </span>
                        <span style={{ fontSize: "0.875rem" }}>
                          {sellerProfile?.totalCount} Reviews
                        </span>
                      </div>
                    )}
                    <Link
                      onClick={(event) =>
                        navigateToUpdateSellerProfile(event, sellerProfile)
                      }
                      className="btn btn-soft-primary btn-sm"
                    >
                      <iconify-icon
                        icon="solar:pen-2-broken"
                        className="align-middle fs-18"
                      />
                    </Link>
                  </div>
                </div>
                <h4 className="card-title text-center custom-heading-font mb-3">
                  Company Detail
                </h4>

                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="sellerProfile" className="form-label">
                      Seller Profile
                    </label>
                    <div className="mb-3 d-flex justify-content-center">
                      <div className="rounded bg-light d-flex align-items-center justify-content-center">
                        <img
                          src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.sellerProfile}`}
                          alt={`${sellerProfile?.companyName} Profile`}
                          className="avatar-md"
                          style={{
                            objectFit: "cover",
                            width: "200px",
                            height: "200px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="signature" className="form-label">
                      Seller Signature
                    </label>
                    <div className="mb-3 d-flex justify-content-center">
                      <div className="rounded bg-light d-flex align-items-center justify-content-center">
                        <img
                          src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.signature}`}
                          alt="Seller Signature"
                          className="avatar-md"
                          style={{
                            objectFit: "cover",
                            width: "200px",
                            height: "200px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="randomId" className="form-label">
                        Seller Id
                      </label>
                      <p className="form-control">{sellerProfile?.randomId}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="companyName" className="form-label">
                        Company Name
                      </label>
                      <p className="form-control">
                        {sellerProfile?.companyName}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gstin" className="form-label">
                        GSTIN
                      </label>
                      <p className="form-control">{sellerProfile?.gstin}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tan" className="form-label">
                        TAN Number
                      </label>
                      <p className="form-control">
                        {sellerProfile?.tan || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="userId" className="form-label">
                        User Id
                      </label>
                      <p className="form-control">{sellerProfile?.userId}</p>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="companyType" className="form-label">
                        Company Type
                      </label>
                      <p className="form-control">
                        {sellerProfile?.companyType}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pan" className="form-label">
                        PAN Number
                      </label>
                      <p className="form-control">{sellerProfile?.pan}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cin" className="form-label">
                        CIN Number
                      </label>
                      <p className="form-control">
                        {sellerProfile?.cin || "Not Provided"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="panFile" className="form-label">
                        PAN File
                      </label>
                      {sellerProfile?.panFile ? (
                        sellerProfile?.panFile?.endsWith(".pdf") ? (
                          <Worker workerUrl={process.env.REACT_APP_WORKER_URL}>
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                              }}
                            >
                              <Viewer
                                fileUrl={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.panFile}`}
                              />
                            </div>
                          </Worker>
                        ) : (
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.panFile}`}
                              alt="Affiliation Certificate"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        )
                      ) : (
                        <h5>No PAN File available</h5>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="gstFile" className="form-label">
                        GST File
                      </label>
                      {sellerProfile?.gstFile ? (
                        sellerProfile?.gstFile?.endsWith(".pdf") ? (
                          <Worker workerUrl={process.env.REACT_APP_WORKER_URL}>
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                              }}
                            >
                              <Viewer
                                fileUrl={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.gstFile}`}
                              />
                            </div>
                          </Worker>
                        ) : (
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.gstFile}`}
                              alt="Affiliation Certificate"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        )
                      ) : (
                        <h5>No GST File available</h5>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="tanFile" className="form-label">
                        TAN File
                      </label>
                      {sellerProfile?.tanFile ? (
                        sellerProfile?.tanFile?.endsWith(".pdf") ? (
                          <Worker workerUrl={process.env.REACT_APP_WORKER_URL}>
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                              }}
                            >
                              <Viewer
                                fileUrl={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.tanFile}`}
                              />
                            </div>
                          </Worker>
                        ) : (
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.tanFile}`}
                              alt="TAN Certificate"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        )
                      ) : (
                        <h5>No TAN File available</h5>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="cinFile" className="form-label">
                        CIN File
                      </label>
                      {sellerProfile?.cinFile ? (
                        sellerProfile?.cinFile?.endsWith(".pdf") ? (
                          <Worker workerUrl={process.env.REACT_APP_WORKER_URL}>
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                              }}
                            >
                              <Viewer
                                fileUrl={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.cinFile}`}
                              />
                            </div>
                          </Worker>
                        ) : (
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.cinFile}`}
                              alt="TAN Certificate"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        )
                      ) : (
                        <h5>No CIN File available</h5>
                      )}
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
                        Address
                      </label>
                      <p className="form-control">{sellerProfile?.address}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <p className="form-control">{sellerProfile?.country}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <p className="form-control">{sellerProfile?.state}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <p className="form-control">{sellerProfile?.city}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="landmark" className="form-label">
                        Land Mark
                      </label>
                      <p className="form-control">{sellerProfile?.landmark}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="pincode" className="form-label">
                        Pin Code
                      </label>
                      <p className="form-control">{sellerProfile?.pincode}</p>
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
                        Contact Number
                      </label>
                      <p className="form-control">{sellerProfile?.contactNo}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="alternateContactNo"
                        className="form-label"
                      >
                        Alternate Contact Number
                      </label>
                      <p className="form-control">
                        {sellerProfile?.alternateContactNo || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="emailId" className="form-label">
                        Email ID
                      </label>
                      <p className="form-control">{sellerProfile?.emailId}</p>
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
                        Bank Account Number
                      </label>
                      <p className="form-control">{sellerProfile?.accountNo}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="ifsc" className="form-label">
                        IFSC Code
                      </label>
                      <p className="form-control">{sellerProfile?.ifsc}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="bankName" className="form-label">
                        Bank Name
                      </label>
                      <p className="form-control">{sellerProfile?.bankName}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="accountHolderName" className="form-label">
                        Account Holder Name
                      </label>
                      <p className="form-control">
                        {sellerProfile?.accountHolderName}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="branchName" className="form-label">
                        Branch Name
                      </label>
                      <p className="form-control">
                        {sellerProfile?.branchName}
                      </p>
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
                        Number Of Employees
                      </label>
                      <p className="form-control">
                        {sellerProfile?.noOfEmployees}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="ceoName" className="form-label">
                        CEO Name
                      </label>
                      <p className="form-control">
                        {sellerProfile?.ceoName || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="turnover" className="form-label">
                        Company Turnover
                      </label>
                      <p className="form-control">
                        {sellerProfile?.turnover || "Not Provided"}
                      </p>
                    </div>
                  </div>
                </div>
                <h4 className="card-title text-center custom-heading-font">
                  Dealing Products
                </h4>
                <hr></hr>

                {sellerProfile?.dealingProducts &&
                  sellerProfile.dealingProducts.map((product, index) => (
                    <div key={index} className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="categoryName" className="form-label">
                            Category Name
                          </label>
                          <h5>{product.categoryId.categoryName}</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="subCategoryName"
                            className="form-label"
                          >
                            Subcategory Name
                          </label>
                          <ul>
                            {product.subCategoryIds.map(
                              (subCategory, subIndex) => (
                                <li key={subIndex}>
                                  {subCategory.subCategoryName}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => window.history.back()}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSellerProfile;
