import React from "react";
import { useLocation } from "react-router-dom";
export const ViewRequestDemoDetails = () => {
  const location = useLocation();
  const request = location.state?.request; // Get request data from state

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
                    Request Demo Details
                  </h4>
                </div>
              </div>
              <form onSubmit={""}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <p className="form-control">{request.name}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="schoolName" className="form-label">
                        School Name
                      </label>
                      <p className="form-control">{request.schoolName}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="designation" className="form-label">
                        Designation
                      </label>
                      <p className="form-control">{request.designation}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <p className="form-control">{request.email}</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone No.
                      </label>
                      <p className="form-control">{request.phone}</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="dateOfBirth" className="form-label">
                        Date & Time Of Demo
                      </label>
                      <p className="form-control">
                        {new Date(request.demoDateTime).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Selected Services</label>
                      <ul className="form-control">
                        {request.selectedServices.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-12">
                    {" "}
                    <div className="mb-3">
                      <label className="form-label">Note</label>
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
