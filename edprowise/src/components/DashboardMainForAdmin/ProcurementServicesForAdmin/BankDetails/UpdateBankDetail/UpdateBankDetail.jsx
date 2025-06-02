import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import putAPI from "../../../../../api/putAPI.jsx";

const UpdateBankDetail = () => {
  const location = useLocation();
  const bankDetail = location.state?.bankDetail;
  const bankDetailId = location.state?.bankDetail?._id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    accountType: "",
  });

  useEffect(() => {
    if (bankDetail) {
      setFormData({
        accountNumber: bankDetail.accountNumber || "",
        bankName: bankDetail.bankName || "",
        ifscCode: bankDetail.ifscCode || "",
        accountType: bankDetail.accountType || "",
      });
    }
  }, [bankDetail]);

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
        `/bank-detail/${bankDetailId}`,
        formDataToSend,
        true
      );

      if (!response.data.hasError) {
        toast.success("Admin updated successfully!");

        navigate(-1);
      } else {
        toast.error(response.data.message || "Failed to update Bank Detail.");
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
                    Update Bank Detail
                  </h4>
                </div>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="accountNumber" className="form-label">
                        Account Number
                      </label>
                      <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        className="form-control"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="bankName" className="form-label">
                        Bank Name
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
                      <label htmlFor="ifscCode" className="form-label">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        id="ifscCode"
                        name="ifscCode"
                        className="form-control"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="accountType" className="form-label">
                        Type of Account
                      </label>
                      <select
                        id="accountType"
                        name="accountType"
                        className="form-control"
                        value={formData.accountType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Account Type</option>
                        <option value="Current">Current</option>
                        <option value="Saving">Saving</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                    disabled={sending}
                  >
                    {sending ? "Updating..." : "Update Bank Detail"}
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

export default UpdateBankDetail;
