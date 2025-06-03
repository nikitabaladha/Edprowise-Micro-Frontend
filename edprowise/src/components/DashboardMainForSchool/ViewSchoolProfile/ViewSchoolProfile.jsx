import React, { useState, useEffect } from "react";

import getAPI from "../../../api/getAPI.jsx";

import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";

import "react-toastify/dist/ReactToastify.css";

const ViewSchoolProfile = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const schoolId = location.state?.schoolId;

  const [school, setSchool] = useState(null);
  const [users, setUsers] = useState([]);
  const [subscription, setSubscription] = useState([]);

  const fetchSchoolData = async () => {
    try {
      const response = await getAPI(
        `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/school-profile/${schoolId}`,
        {},
        true
      );

      if (!response.hasError && response.data && response.data.data) {
        setSchool(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School:", err);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await getAPI(
        `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/get-all-user-by-school-id/${schoolId}`,
        {},
        true
      );
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setUsers(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching User:", err);
    }
  };

  const fetchSubscriptionData = async () => {
    try {
      const response = await getAPI(`/subscription/${schoolId}`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSubscription(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching User:", err);
    }
  };

  useEffect(() => {
    if (schoolId) {
      fetchSchoolData();
      fetchUserData();
      fetchSubscriptionData();
    } else {
      console.error("No school ID provided");
    }
  }, [schoolId]);

  const navigateToUpdateSchoolProfile = (event, _id, schoolId) => {
    event.preventDefault();
    navigate(`/school-dashboard/update-school-profile`, {
      state: { _id, schoolId },
    });
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
                    <div className="card-header mb-2 d-flex justify-content-between align-items-center">
                      <h4 className="card-title text-center custom-heading-font card-title">
                        Your Profile Details
                      </h4>
                      <Link
                        onClick={(event) =>
                          navigateToUpdateSchoolProfile(
                            event,
                            school?._id,
                            school?.schoolId
                          )
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
                    School Details
                  </h4>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3 d-flex justify-content-center">
                        <div className="rounded bg-light d-flex align-items-center justify-content-center">
                          <img
                            src={`${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${school.profileImage}`}
                            alt={`${school.schoolName} Profile`}
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
                        <label htmlFor="schoolId" className="form-label">
                          School ID
                        </label>
                        <p className="form-control">{school.schoolId}</p>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="principalName" className="form-label">
                          Principal Name
                        </label>
                        <p className="form-control">
                          {school.principalName || "Not Provided"}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="schoolMobileNo" className="form-label">
                          School Mobile Number
                        </label>
                        <p className="form-control">{school.schoolMobileNo}</p>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="userId" className="form-label">
                          User Id
                        </label>
                        <p className="form-control">{school?.userId}</p>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="schoolName" className="form-label">
                          School Name
                        </label>
                        <p className="form-control">{school.schoolName}</p>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="contactPersonName"
                          className="form-label"
                        >
                          Contact Person Name
                        </label>
                        <p className="form-control">
                          {school.contactPersonName || "Not Provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="schoolEmail" className="form-label">
                          School Email
                        </label>
                        <p className="form-control">{school.schoolEmail}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="numberOfStudents"
                          className="form-label"
                        >
                          Number Of Students
                        </label>
                        <p className="form-control">
                          {school.numberOfStudents || "Not Provided"}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="schoolAlternateContactNo"
                          className="form-label"
                        >
                          School Alter Nate Contact Number
                        </label>
                        <p className="form-control">
                          {school.schoolAlternateContactNo || "Not Provided"}
                        </p>
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
                        <label htmlFor="schoolAddress" className="form-label">
                          School Address
                        </label>
                        <p className="form-control">{school.schoolAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <p className="form-control">{school.country}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <p className="form-control">{school.state}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                        <p className="form-control">{school.city}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="landMark" className="form-label">
                          School Land Mark
                        </label>
                        <p className="form-control">{school.landMark}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="schoolPincode" className="form-label">
                          School Pin Code
                        </label>
                        <p className="form-control">{school.schoolPincode}</p>
                      </div>
                    </div>
                  </div>

                  <h4 className="card-title text-center custom-heading-font">
                    Delivery Address Details
                  </h4>
                  <hr></hr>

                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="deliveryAddress" className="form-label">
                        School Delivery Address
                      </label>
                      <p className="form-control">{school.deliveryAddress}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="deliveryCountry" className="form-label">
                          Delivery Country
                        </label>
                        <p className="form-control">{school.deliveryCountry}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="deliveryState" className="form-label">
                          Delivery State
                        </label>
                        <p className="form-control">{school.deliveryState}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="deliveryCity" className="form-label">
                          Delivery City
                        </label>
                        <p className="form-control">{school.deliveryCity}</p>
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
                          Delivery Land Mark
                        </label>
                        <p className="form-control">
                          {school.deliveryLandMark}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="deliveryPincode" className="form-label">
                          Delivery Pin Code
                        </label>
                        <p className="form-control">{school.deliveryPincode}</p>
                      </div>
                    </div>
                  </div>

                  <h4 className="card-title text-center custom-heading-font">
                    School Certificate Details
                  </h4>
                  <hr></hr>

                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="affiliationUpto" className="form-label">
                          Affiliation Upto
                        </label>
                        <p className="form-control">{school.affiliationUpto}</p>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="panNo" className="form-label">
                          PAN Number
                        </label>
                        <p className="form-control">{school.panNo}</p>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="affiliationCertificate"
                          className="form-label"
                        >
                          Affiliation Certificate
                        </label>
                        {school.affiliationCertificate ? (
                          school.affiliationCertificate.endsWith(".pdf") ? (
                            <Worker
                              workerUrl={process.env.REACT_APP_WORKER_URL}
                            >
                              <div
                                style={{
                                  border: "1px solid #ccc",
                                  borderRadius: "10px",
                                }}
                              >
                                <Viewer
                                  fileUrl={`${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${school.affiliationCertificate}`}
                                />
                              </div>
                            </Worker>
                          ) : (
                            <div className="mb-3 d-flex justify-content-center">
                              <div className="rounded bg-light d-flex align-items-center justify-content-center">
                                <img
                                  src={`${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${school.affiliationCertificate}`}
                                  alt="Affiliation Certificate"
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
                          )
                        ) : (
                          <p>No affiliation certificate available</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="panFile" className="form-label">
                          PAN File
                        </label>
                        {school.panFile ? (
                          school.panFile.endsWith(".pdf") ? (
                            <Worker
                              workerUrl={process.env.REACT_APP_WORKER_URL}
                            >
                              <div
                                style={{
                                  border: "1px solid #ccc",
                                  borderRadius: "10px",
                                }}
                              >
                                <Viewer
                                  fileUrl={`${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${school.panFile}`}
                                />
                              </div>
                            </Worker>
                          ) : (
                            <div className="mb-3 d-flex justify-content-center">
                              <div className="rounded bg-light d-flex align-items-center justify-content-center">
                                <img
                                  src={`${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${school.panFile}`}
                                  alt="Pan File"
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
                          )
                        ) : (
                          <p>No PAN File available</p>
                        )}
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

          <div className="row p-2">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className="card-title flex-grow-1">
                    Users of {school?.schoolName}{" "}
                  </h4>
                </div>

                <div>
                  <div className="table-responsive">
                    <table className="table align-middle mb-0 table-hover table-centered text-center">
                      <thead className="bg-light-subtle">
                        <tr>
                          <th style={{ width: 20 }}>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customCheck1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customCheck1"
                              />
                            </div>
                          </th>
                          <th>Role</th>
                          <th>User Id</th>
                          <th>Password</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.map((user) => (
                          <tr key={user?._id}>
                            <td style={{ width: 20 }}>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="customCheck1"
                                />
                              </div>
                            </td>
                            <td>{user?.role}</td>
                            <td>{user?.userId}</td>
                            <td>******</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {subscription?.length > 0 ? (
            <div className="row p-2">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center gap-1">
                    <h4 className="card-title flex-grow-1">
                      All Subscription List
                    </h4>
                  </div>
                  <div>
                    <div className="table-responsive">
                      <table className="table align-middle mb-0 table-hover table-centered text-center">
                        <thead className="bg-light-subtle">
                          <tr>
                            <th style={{ width: 20 }}>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="customCheck1"
                                />
                              </div>
                            </th>
                            <th>Subscription Module</th>
                            <th>Subscription Start Date</th>
                            <th>No. Of Months</th>
                            <th>Monthly Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscription?.map((subscriptions) => (
                            <tr key={subscriptions.id}>
                              <td>
                                <div className="form-check ms-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customCheck2"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="customCheck2"
                                  >
                                    &nbsp;
                                  </label>
                                </div>
                              </td>
                              <td>{subscriptions?.subscriptionFor}</td>
                              <td>
                                {new Date(
                                  subscriptions?.subscriptionStartDate
                                ).toLocaleDateString()}
                              </td>
                              <td>{subscriptions?.subscriptionNoOfMonth}</td>
                              <td>{subscriptions?.monthlyRate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row"></div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewSchoolProfile;
