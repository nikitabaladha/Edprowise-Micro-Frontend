import React, { useState, useEffect } from "react";
import putAPI from "../../../../../api/putAPI.jsx";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateShift = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.shift;
  const [loading, setLoading] = useState(false);
  const [shift, setShift] = useState({
    shiftName: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (data) {
      const extractTime = (isoTime) =>
        isoTime ? new Date(isoTime).toISOString().substring(11, 16) : "";

      setShift({
        shiftName: data.masterDefineShiftName || "",
        startTime: extractTime(data.startTime),
        endTime: extractTime(data.endTime),
      });
    }
  }, [data]);

  const handleInputChange = (field, value) => {
    setShift((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!shift.shiftName || !shift.startTime || !shift.endTime) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    const payload = {
      masterDefineShiftName: shift.shiftName,
      startTime: shift.startTime,
      endTime: shift.endTime,
    };

    try {
      const response = await putAPI(
        `/master-define-shift/${data._id}`,
        payload,
        {},
        true,
        "PUT"
      );

      if (response.hasError) {
        toast.error(response.message || "Failed to update shift");
      } else {
        toast.success("Shift updated successfully!");
        navigate(-1);
      }
    } catch (err) {
      const errorText =
        err.response?.data?.message || err.message || "Something went wrong!";
      toast.error(errorText);
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
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Update Shift
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row align-items-end mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Shift Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={shift.shiftName}
                      onChange={(e) =>
                        handleInputChange("shiftName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={shift.startTime}
                      onChange={(e) =>
                        handleInputChange("startTime", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={shift.endTime}
                      onChange={(e) =>
                        handleInputChange("endTime", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
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

export default UpdateShift;
