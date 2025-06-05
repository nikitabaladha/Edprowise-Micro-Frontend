import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import getAPI from "../../../../api/getAPI.jsx";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { format } from "date-fns";

const ViewSubscriptions = () => {
  const location = useLocation();
  const subscriptionId = location?.state?.subscriptionId;
  const [subscription, setSubscription] = useState(null);

  const fetchSubscriptionData = async () => {
    try {
      const response = await getAPI(
        `${process.env.REACT_APP_SUBSCRIPTION_SERVICE}/subscription-by-id/${subscriptionId}`,
        {},
        true
      );
      if (!response.hasError && response.data) {
        setSubscription(response.data.data);
        console.log("subscription", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching User:", err);
    }
  };

  useEffect(() => {
    if (subscriptionId) {
      fetchSubscriptionData();
    } else {
      console.error("No subcription  provided");
    }
  }, [subscriptionId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font card-title,">
                    Subscription Details
                  </h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <div className="rounded bg-light d-flex align-items-center justify-content-center">
                      <img
                        src={`${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${subscription?.profileImage}`}
                        alt={`${subscription?.schoolName} Profile`}
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
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="mb-3">
                        <label htmlFor="schoolName" className="form-label">
                          School Name
                        </label>
                        <p className="form-control">
                          {subscription?.schoolName}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="mobileNo" className="form-label">
                          School Mobile Number
                        </label>
                        <p className="form-control">
                          {subscription?.schoolMobileNo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          School Email
                        </label>
                        <p className="form-control">
                          {subscription?.schoolEmail}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="subscriptionModule"
                          className="form-label"
                        >
                          Subscription Module
                        </label>
                        <p className="form-control">
                          {subscription?.subscriptionFor}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="noOfMonth" className="form-label">
                          Subscription No.Month
                        </label>
                        <p className="form-control">
                          {subscription?.subscriptionNoOfMonth}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">
                          Subscription Start Date
                        </label>
                        <p className="form-control">
                          {subscription?.subscriptionStartDate
                            ? format(
                                new Date(subscription?.subscriptionStartDate),
                                "dd-MM-yyyy"
                              )
                            : "Not Prowided"}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="monthlyRate" className="form-label">
                          Monthly Rate
                        </label>
                        <p className="form-control">
                          {subscription?.monthlyRate}
                        </p>
                      </div>
                    </div>
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
  );
};

export default ViewSubscriptions;
