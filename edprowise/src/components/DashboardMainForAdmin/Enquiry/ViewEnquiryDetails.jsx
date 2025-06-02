import React from "react";
import { useLocation } from "react-router-dom";
const ViewEnquiryDetails = () => {
  const location = useLocation();
  const request = location.state?.request;

  if (!request) {
    return <p>No data available.</p>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Enquiry Details
                  </h4>
                </div>
              </div>
              <form onSubmit={""}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <p className="form-control">{request.name}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <p className="form-control">{request.email}</p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    {" "}
                    <div className="mb-3">
                      <label className="form-label">Query</label>
                      <p className="form-control">{request.query}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label className="form-label">Phone No.</label>
                      <p className="form-control">{request.phone}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label className="form-label">Service</label>
                      <p className="form-control">{request.service}</p>
                    </div>
                  </div>

                  <div className="col-md-12">
                    {" "}
                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <p className="form-control">{request.note}</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="text-end">
                    {" "}
                    <button
                      onClick={() => window.history.back()}
                      type="button"
                      className="btn btn-primary custom-submit-button"
                    >
                      Back
                    </button>
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

export default ViewEnquiryDetails;
