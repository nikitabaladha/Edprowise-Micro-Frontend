import React, { useState } from "react";
import postAPI from "../../../../../api/postAPI.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddShifts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shifts, setShifts] = useState([
    { shiftName: "", startTime: "", endTime: "" },
  ]);

  const handleAddShift = () => {
    setShifts([...shifts, { shiftName: "", startTime: "", endTime: "" }]);
  };

  const handleDeleteShift = (index) => {
    setShifts(shifts.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedShifts = [...shifts];
    updatedShifts[index][field] = value;
    setShifts(updatedShifts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    for (const shift of shifts) {
      if (!shift.shiftName || !shift.startTime || !shift.endTime) {
        toast.error("Please fill in all fields before submitting.");
        return;
      }
    }

    let allSuccessful = true;

    for (const shift of shifts) {
      const payload = {
        masterDefineShiftName: shift.shiftName,
        startTime: shift.startTime,
        endTime: shift.endTime,
      };

      try {
        const response = await postAPI(
          "/master-define-shift",
          payload,
          {},
          true
        );

        if (response.hasError) {
          allSuccessful = false;
          toast.error(response.message || "Failed to create shift");
        }
      } catch (err) {
        allSuccessful = false;
        const errorText =
          err.response?.data?.message || err.message || "Something went wrong!";
        toast.error(errorText);
      } finally {
        setLoading(false);
      }
    }

    if (allSuccessful) {
      toast.success("shifts created successfully!");
      navigate(-1);
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
                    Add Shift
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                {shifts.map((shift, index) => (
                  <div className="row align-items-end mb-3" key={index}>
                    <div className="col-md-3">
                      <label className="form-label">
                        Shift Name {index + 1}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={shift.shiftName}
                        onChange={(e) =>
                          handleInputChange(index, "shiftName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Start Time</label>
                      <input
                        type="time"
                        className="form-control"
                        value={shift.startTime}
                        onChange={(e) =>
                          handleInputChange(index, "startTime", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">End Time</label>
                      <input
                        type="time"
                        className="form-control"
                        value={shift.endTime}
                        onChange={(e) =>
                          handleInputChange(index, "endTime", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-3 d-flex flex-row gap-2 mt-3">
                      {index === shifts.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleAddShift}
                        >
                          Add
                        </button>
                      )}
                      {index !== 0 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDeleteShift(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
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

export default AddShifts;
