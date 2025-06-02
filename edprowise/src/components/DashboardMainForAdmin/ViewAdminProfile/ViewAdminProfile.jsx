import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import getAPI from "../../../api/getAPI.jsx";

const ViewAdminProfile = () => {
  const location = useLocation();
  const profileId = location.state?._id;

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const email = userDetails.email;

  const navigate = useNavigate();

  const [adminProfile, setAdminProfile] = useState(null);

  useEffect(() => {
    if (profileId) {
      fetchProfileData();
    } else {
      console.error("No profile ID provided");
    }
  }, [profileId]);

  const fetchProfileData = async () => {
    try {
      const response = await getAPI(`/edprowise-profile`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setAdminProfile(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Admin Profile:", err);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const navigateToUpdateAdminProfile = (event, _id) => {
    event.preventDefault();
    navigate(`/admin-dashboard/update-admin-profile`, {
      state: { _id },
    });
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
                    <h4 className="card-title text-center custom-heading-font card-title">
                      Your Profile Details
                    </h4>

                    {email === "edprowise@gmail.com" && (
                      <Link
                        onClick={(event) =>
                          navigateToUpdateAdminProfile(event, adminProfile?._id)
                        }
                        className="btn btn-soft-primary btn-sm"
                      >
                        <iconify-icon
                          icon="solar:pen-2-broken"
                          className="align-middle fs-18"
                        />
                      </Link>
                    )}
                  </div>
                </div>
                <h4 className="card-title text-center custom-heading-font">
                  Company Detail
                </h4>
                <hr></hr>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3 d-flex justify-content-center">
                      <div className="rounded bg-light d-flex align-items-center justify-content-center">
                        <img
                          src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${adminProfile?.edprowiseProfile}`}
                          alt={`${adminProfile?.companyName} Profile`}
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
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="companyName" className="form-label">
                        Company Name
                      </label>
                      <p className="form-control">
                        {adminProfile?.companyName}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gstin" className="form-label">
                        Company GSTIN
                      </label>
                      <p className="form-control">{adminProfile?.gstin}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tan" className="form-label">
                        Company TAN Number
                      </label>
                      <p className="form-control">
                        {adminProfile?.tan || "Not Provided"}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tan" className="form-label">
                        Insurance Charges
                      </label>
                      <p className="form-control">
                        {adminProfile?.insuranceCharges || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="companyType" className="form-label">
                        Company Type
                      </label>
                      <p className="form-control">
                        {adminProfile?.companyType}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pan" className="form-label">
                        Company PAN Number
                      </label>
                      <p className="form-control">{adminProfile?.pan}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cin" className="form-label">
                        Company CIN Number
                      </label>
                      <p className="form-control">
                        {adminProfile?.cin || "Not Provided"}
                      </p>
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
                      <p className="form-control">{adminProfile?.address}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <p className="form-control">{adminProfile?.country}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <p className="form-control">{adminProfile?.state}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <p className="form-control">{adminProfile?.city}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="landmark" className="form-label">
                        Land Mark
                      </label>
                      <p className="form-control">{adminProfile?.landmark}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="pincode" className="form-label">
                        Pin Code
                      </label>
                      <p className="form-control">{adminProfile?.pincode}</p>
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
                      <p className="form-control">{adminProfile?.contactNo}</p>
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
                        {adminProfile?.alternateContactNo || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="emailId" className="form-label">
                        Email ID
                      </label>
                      <p className="form-control">{adminProfile?.emailId}</p>
                    </div>
                  </div>
                </div>
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

export default ViewAdminProfile;
