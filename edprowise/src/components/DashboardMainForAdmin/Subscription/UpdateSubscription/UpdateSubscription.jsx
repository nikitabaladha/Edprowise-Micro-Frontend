import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import putAPI from "../../../../api/putAPI.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import getAPI from "../../../../api/getAPI.jsx";

const UpdateSubscription = ({ schools, updatedSubscription }) => {
  const location = useLocation();
  const subscription = location.state?.subscriptions;
  console.log("subscription", subscription);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schoolId: "",
    subscriptionFor: "",
    subscriptionStartDate: "",
    subscriptionNoOfMonth: "",
    monthlyRate: "",
  });

  useEffect(() => {
    if (subscription) {
      setFormData({
        schoolId: subscription.schoolId || "",
        subscriptionFor: subscription.subscriptionFor || "",
        subscriptionStartDate: subscription.subscriptionStartDate
          ? new Date(subscription.subscriptionStartDate)
              .toISOString()
              .split("T")[0]
          : "",
        subscriptionNoOfMonth: subscription.subscriptionNoOfMonth || "",
        monthlyRate: subscription.monthlyRate || "",
      });
    }
  }, [subscription]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [sending, setSending] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key] || "");
      }
    }

    setSending(true);

    try {
      const response = await putAPI(
        `/subscription/${subscription.id}`,
        formDataToSend,
        true
      );

      if (!response.data.hasError) {
        toast.success("Subscription updated successfully!");

        // Fetch school details using the schoolId
        const schoolResponse = await getAPI(
          `/school/${formData.schoolId}`,
          {},
          true
        );
        if (!schoolResponse.hasError) {
          const schoolData = schoolResponse.data.data;

          const newUpdatedSubscription = {
            id: response.data.data._id,
            subscriptionFor: response.data.data.subscriptionFor,
            subscriptionStartDate: response.data.data.subscriptionStartDate,
            subscriptionNoOfMonth: response.data.data.subscriptionNoOfMonth,
            monthlyRate: response.data.data.monthlyRate,
            schoolMobileNo: schoolData.schoolMobileNo,
            profileImage: schoolData.profileImage,
            schoolName: schoolData.schoolName,
            sID: schoolData.schoolId,
            schoolEmail: schoolData.schoolEmail,
            schoolId: schoolData.schoolId,
          };

          updatedSubscription(newUpdatedSubscription);
          navigate(-1);
        } else {
          toast.error("Failed to fetch school details.");
        }
      } else {
        toast.error(response.data.message || "Failed to update subscription.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
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
                    Update Subscription
                  </h4>
                </div>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <div className="mb-6">
                      <label htmlFor="schoolId" className="form-label">
                        School List <span className="text-danger">*</span>
                      </label>

                      <select
                        id="schoolId"
                        name="schoolId"
                        className="form-control"
                        value={formData.schoolId}
                        onChange={handleChange}
                        required
                      >
                        {schools.map((school) => (
                          <option key={school._id} value={school.schoolId}>
                            {school.schoolName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="subscriptionFor" className="form-label">
                        Subscription Module{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        id="subscriptionFor"
                        name="subscriptionFor"
                        className="form-control"
                        value={formData.subscriptionFor}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Module</option>
                        <option value="Fees">Fees</option>
                        <option value="Payroll">Payroll</option>
                        <option value="Finance">Finance</option>
                        <option value="School Management">
                          School Management
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="subscriptionStartDate"
                        className="form-label"
                      >
                        Subscription Start Date{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="subscriptionStartDate"
                        name="subscriptionStartDate"
                        className="form-control"
                        value={formData.subscriptionStartDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="subscriptionNoOfMonth"
                        className="form-label"
                      >
                        No. Of Months <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        id="subscriptionNoOfMonth"
                        name="subscriptionNoOfMonth"
                        className="form-control"
                        value={formData.subscriptionNoOfMonth}
                        onChange={handleChange}
                        required
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="monthlyRate" className="form-label">
                        Monthly Rate <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        id="monthlyRate"
                        name="monthlyRate"
                        className="form-control"
                        value={formData.monthlyRate}
                        onChange={handleChange}
                        required
                        min="0"
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
                    {sending ? "Updating..." : "Update Subscription"}
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

export default UpdateSubscription;
