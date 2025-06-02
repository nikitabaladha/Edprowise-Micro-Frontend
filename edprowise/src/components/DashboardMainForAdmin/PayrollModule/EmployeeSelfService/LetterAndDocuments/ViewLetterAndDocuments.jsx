import React from "react";
import { useNavigate } from "react-router-dom";
const ViewLetterAndDocuments = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="payroll-title text-center mb-0 flex-grow-1">
                  Letter And Documents
                </h4>
                <div className="mt-3 text-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form>
                <div className="border p-2 mb-3 rounded">
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label className="form-label">Document Title</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={"Aadhar Card"}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        required
                        value={"The document i upload "}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="form-label">Upload Document</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*,application/pdf"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLetterAndDocuments;
