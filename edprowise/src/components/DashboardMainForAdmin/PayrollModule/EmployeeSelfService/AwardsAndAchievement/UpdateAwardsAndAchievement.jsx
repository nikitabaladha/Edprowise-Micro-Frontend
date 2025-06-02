import React from "react";
import { useNavigate } from "react-router-dom";

const UpdateAwardsAndAchievement = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="card-header d-flex  align-items-center">
                <h4 className="payroll-title text-center mb-0 flex-grow-1">
                  Update Awards And Achievement
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
              <form>
                <div className="border p-2 mb-3 rounded">
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label className="form-label">
                        Achievement Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Title Name"
                        value={"Best Teacher"}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        Date of Receive <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={"17-05-2025"}
                      />
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
                        value={"i get the best teacher Award"}
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
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Update
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

export default UpdateAwardsAndAchievement;
