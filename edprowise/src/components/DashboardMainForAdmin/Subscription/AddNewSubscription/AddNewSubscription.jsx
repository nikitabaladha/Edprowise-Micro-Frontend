import React, { useState } from "react";

import postAPI from "../../../../api/postAPI.jsx";
import getAPI from "../../../../api/getAPI.jsx";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const AddNewSubscription = ({ addSubscription, schools }) => {
  const [formData, setFormData] = useState({
    schoolId: "",
    subscriptionFor: "",
    subscriptionStartDate: "",
    subscriptionNoOfMonth: "",
    monthlyRate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,

      [name]: value,
    }));
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.subscriptionNoOfMonth <= 0 || formData.monthlyRate <= 0) {
      toast.error(
        "Please enter valid values for number of months and monthly rate."
      );
      return;
    }
    setSending(true);

    try {
      const response = await postAPI(
        "/subscription",
        {
          schoolId: formData.schoolId,
          subscriptionFor: formData.subscriptionFor,
          subscriptionStartDate: formData.subscriptionStartDate,
          subscriptionNoOfMonth: formData.subscriptionNoOfMonth,
          monthlyRate: formData.monthlyRate,
        },
        true
      );

      if (!response.hasError) {
        toast.success(response.message || "Subscription added successfully");

        const schoolId = response.data.data.schoolId;
        const schoolDetails = await getAPI(`/school/${schoolId}`, {}, true);

        if (!schoolDetails.hasError) {
          const schoolData = schoolDetails.data.data;
          const newSubscription = {
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

          addSubscription(newSubscription);
          setFormData({
            schoolId: "",
            subscriptionFor: "",
            subscriptionStartDate: "",
            subscriptionNoOfMonth: "",
            monthlyRate: "",
          });

          navigate(-1);
        } else {
          toast.error("Failed to fetch school details");
        }
      } else {
        toast.error(response.message || "Failed to add subscription");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Add Subscription
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
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
                        <option value="">Select School</option>

                        {schools.map((school) => (
                          <option key={school.schoolId} value={school.schoolId}>
                            ({school.schoolId}) {school.schoolName}
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
                        placeholder="Example : 12"
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
                        placeholder="Example : 1000"
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
                    {sending ? "Adding Subscription..." : "Add Subscription"}
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

export default AddNewSubscription;
