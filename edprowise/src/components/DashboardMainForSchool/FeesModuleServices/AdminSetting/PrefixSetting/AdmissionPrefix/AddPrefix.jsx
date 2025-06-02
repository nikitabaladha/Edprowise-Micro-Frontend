import React, { useState } from "react";
import postAPI from "../../../../../../api/postAPI.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddShifts = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [numericValue, setNumericValue] = useState("");
  const [alphaPrefix, setAlphaPrefix] = useState("");
  const [alphaNumber, setAlphaNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (value) => {
    setType((prev) => (prev === value ? "" : value));
    setNumericValue("");
    setAlphaPrefix("");
    setAlphaNumber("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (type === "numeric" && !numericValue) {
      toast.error("Please enter a numeric value.");
      return;
    }

    if (type === "alphanumeric" && (!alphaPrefix || !alphaNumber)) {
      toast.error("Please enter both prefix and number.");
      return;
    }

    const payload =
      type === "numeric"
        ? { type, value: numericValue }
        : { type, prefix: alphaPrefix, number: alphaNumber };

    try {
      const response = await postAPI(
        "/create-admission-prefix",
        payload,
        {},
        true
      );

      if (!response.hasError) {
        toast.success("Prefix saved successfully!");
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to save prefix.");
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        "An error occurred while saving prefix.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header text-center">
          <h4>Select Prefix Type</h4>
        </div>
        <div className="card-body">
          <p className="text-muted">
            Note: Choose <strong>Numeric</strong> to enter a number only. Choose{" "}
            <strong>Alphanumeric</strong> to enter a prefix and a number.
          </p>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="numeric"
              checked={type === "numeric"}
              onChange={() => handleCheckboxChange("numeric")}
            />
            <label className="form-check-label" htmlFor="numeric">
              Numeric
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="alphanumeric"
              checked={type === "alphanumeric"}
              onChange={() => handleCheckboxChange("alphanumeric")}
            />
            <label className="form-check-label" htmlFor="alphanumeric">
              Alphanumeric
            </label>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            {type === "numeric" && (
              <>
                <div className="mb-2">
                  <small className="text-muted">
                    <strong>Note:</strong> Enter a starting number (e.g.,{" "}
                    <code>1000</code>). The registration numbers will be
                    generated like <code>1000, 1001, 1002</code>, and so on.
                  </small>
                </div>

                <div className="mb-3">
                  <div className="col-md-8">
                    <label className="form-label">Enter Number</label>
                    <input
                      type="number"
                      className="form-control"
                      value={numericValue}
                      onChange={(e) => setNumericValue(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {type === "alphanumeric" && (
              <>
                <div className="mb-2">
                  <small className="text-muted">
                    <strong>Note:</strong> Enter a prefix (e.g.,{" "}
                    <code>ABC</code>) and a starting number (e.g.,{" "}
                    <code>100</code>). The registration numbers will be
                    generated like <code>ABC100, ABC101, ABC102</code>, and so
                    on.
                  </small>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      Enter Prefix (e.g. ABC, XYZ)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={alphaPrefix}
                      onChange={(e) => setAlphaPrefix(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Enter Number</label>
                    <input
                      type="number"
                      className="form-control"
                      value={alphaNumber}
                      onChange={(e) => setAlphaNumber(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
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

export default AddShifts;
