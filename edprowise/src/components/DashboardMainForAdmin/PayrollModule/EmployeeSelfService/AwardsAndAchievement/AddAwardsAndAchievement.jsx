import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddAwardsAndAchievement = () => {
  const navigate = useNavigate();

  const [achievements, setAchievements] = useState([
    { title: "", certificate: null, description: "" },
  ]);

  const handleAddRow = () => {
    setAchievements([
      ...achievements,
      { title: "", certificate: null, description: "" },
    ]);
  };

  const handleChange = (index, field, value) => {
    const newAchievements = [...achievements];
    newAchievements[index][field] = value;
    setAchievements(newAchievements);
  };

  const removeAchievements = (indexToRemove) => {
    if (indexToRemove !== 0) {
      setAchievements(achievements.filter((_, i) => i !== indexToRemove));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Achievements:", achievements);
    // TODO: Submit to backend using FormData if including files
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="card-header d-flex  align-items-center">
                <h4 className="payroll-title text-center mb-0 flex-grow-1">
                  Awards And Achievement
                </h4>
                <button
                  type="button "
                  className="btn btn-primary ms-2 custom-submit-button"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                {achievements.map((item, index) => (
                  <div key={index} className="border p-2 mb-3 rounded">
                    {index !== 0 && (
                      <div className="text-end p-0 mb-2">
                        <Link
                          className="btn btn-soft-danger text-end btn-sm"
                          onClick={() => removeAchievements(index)}
                        >
                          <iconify-icon
                            icon="solar:trash-bin-minimalistic-2-broken"
                            className="align-middle fs-18"
                          />
                        </Link>
                      </div>
                    )}
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label className="form-label">
                          Achievement Title{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          placeholder="Enter Title Name"
                          value={item.title}
                          onChange={(e) =>
                            handleChange(index, "title", e.target.value)
                          }
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">
                          Date of Receive <span className="text-danger">*</span>
                        </label>
                        <input type="date" className="form-control" />
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label className="form-label">
                          Description <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          rows={3}
                          required
                          value={item.description}
                          onChange={(e) =>
                            handleChange(index, "description", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6">
                        <label className="form-label">
                          Upload Certificate{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*,application/pdf"
                          required={!item.certificate}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "certificate",
                              e.target.files[0]
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-3 text-end">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleAddRow}
                  >
                    Add Achievement
                  </button>
                </div>

                <div className="text-end mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit
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

export default AddAwardsAndAchievement;
