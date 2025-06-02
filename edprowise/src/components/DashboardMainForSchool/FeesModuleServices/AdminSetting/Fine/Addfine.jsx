import React, { useState } from "react";
import postAPI from "../../../../../api/postAPI.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddFine = () => {
  const navigate = useNavigate();

  const [feeType, setFeeType] = useState("fixed");
  const [frequency, setFrequency] = useState("");
  const [amountOrPercentage, setAmountOrPercentage] = useState("");
  const [maxCapFee, setMaxCapFee] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!amountOrPercentage) {
      toast.error("Please enter a value for amount or percentage.");
      return;
    }

    if (!frequency) {
      toast.error("Please select a frequency.");
      return;
    }

    const maxCapFeeValue = maxCapFee ? parseFloat(maxCapFee) : null;
    const academicYear = localStorage.getItem("selectedAcademicYear");

    const payload = {
      feeType,
      frequency,
      value: parseFloat(amountOrPercentage),
      maxCapFee: maxCapFeeValue,
      academicYear,
    };

    try {
      const response = await postAPI("/create-fine", payload, {}, true);

      if (!response.hasError) {
        toast.success("Fine saved successfully!");
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to save fine.");
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "An error occurred while saving fine.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header text-center">
          <h4>Enter Fine Details</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="mt-3 row">
            <div className="mb-3 col-md-6">
              <label className="form-label">Fine Type</label>
              <br />
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="fixed"
                  name="feeType"
                  value="fixed"
                  className="form-check-input"
                  checked={feeType === "fixed"}
                  onChange={() => setFeeType("fixed")}
                />
                <label className="form-check-label" htmlFor="fixed">
                  Fixed Amount
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="percentage"
                  name="feeType"
                  value="percentage"
                  className="form-check-input"
                  checked={feeType === "percentage"}
                  onChange={() => setFeeType("percentage")}
                />
                <label className="form-check-label" htmlFor="percentage">
                  Percentage
                </label>
              </div>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Late Fee Frequency</label>
              <select
                className="form-select"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="">Select Frequency</option>
                <option value="Fixed">Fixed</option>
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
                <option value="Annually">Annually</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">
                {feeType === "fixed" ? "Amount" : "Percentage"}
              </label>
              <input
                type="number"
                className="form-control"
                value={amountOrPercentage}
                min={feeType === "percentage" ? 1 : undefined}
                max={feeType === "percentage" ? 100 : undefined}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);

                  if (feeType === "percentage") {
                    if (value < 1 || value > 100) {
                      return;
                    }
                  }

                  setAmountOrPercentage(e.target.value);
                }}
                placeholder={
                  feeType === "fixed"
                    ? "Enter amount"
                    : "Enter percentage (1-100)"
                }
              />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Maximum Cap Fee (Amount)</label>
              <input
                type="number"
                className="form-control"
                value={maxCapFee}
                onChange={(e) => setMaxCapFee(e.target.value)}
                placeholder="Enter maximum fee cap"
              />
            </div>

            <div className="text-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFine;
