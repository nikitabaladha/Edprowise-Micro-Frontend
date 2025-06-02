import React, { useState, useEffect } from "react";
import putAPI from "../../../../../api/putAPI.jsx";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateFeesType = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [feeName, setFeeName] = useState("");
  const [groupOfFees, setGroupOfFees] = useState("School Fees");
  const [id, setId] = useState(null);

  useEffect(() => {
    const data = location.state?.feetype;

    if (!data) {
      toast.error("No fees type data provided.");
      navigate(-1);
      return;
    }

    setFeeName(data.feesTypeName || "");
    setGroupOfFees(data.groupOfFees || "School Fees");
    setId(data._id || null);
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!feeName.trim()) {
      toast.error("Fees Type name is required.");
      return;
    }

    if (!groupOfFees) {
      toast.error("Group of Fees is required.");
      return;
    }

    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

    if (!schoolId || !id) {
      toast.error("Missing data. Please try again.");
      return;
    }

    try {
      await putAPI(
        `/update-fess-type/${id}`,
        {
          feesTypeName: feeName.trim(),
          groupOfFees,
          schoolId,
        },
        true
      );
      toast.success("Fees Type updated successfully!");
      navigate(-1);
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        "An error occurred while updating the Fees Type.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="card-header mb-2">
                <h4 className="card-title text-center custom-heading-font">
                  Update Fees Type
                </h4>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Fees Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={feeName}
                    onChange={(e) => setFeeName(e.target.value)}
                    placeholder="Enter new Fees Type name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Group of Fees</label>
                  <select
                    className="form-select"
                    value={groupOfFees}
                    onChange={(e) => setGroupOfFees(e.target.value)}
                  >
                    <option value="School Fees">School Fees</option>
                    <option value="One Time Fees">One Time Fees</option>
                  </select>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
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

export default UpdateFeesType;
