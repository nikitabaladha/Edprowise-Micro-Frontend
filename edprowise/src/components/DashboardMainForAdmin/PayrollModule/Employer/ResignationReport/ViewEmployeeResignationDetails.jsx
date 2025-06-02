import React from "react";
import { useNavigate } from "react-router-dom";
const ViewEmployeeResignationDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title text-center flex-grow-1">
                    Employee Resignation Details
                  </h4>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form onSubmit="">
                <div className="row mb-3 ">
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="employeeID" className="form-label">
                        Employee ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="employeeID"
                        name="employeeID"
                        className="form-control"
                        value={"EMP-001"}
                        // onChange={handleChange}
                        required
                        placeholder="Enter Employee ID"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="name" className="form-label">
                        Employee Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={"Umesh Jadhav"}
                        // onChange={handleChange}
                        required
                        placeholder="Enter Employee Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">
                        Country <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={"India"}
                        // onChange={handleChange}
                        required
                        placeholder="Enter Employee Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="form-control"
                        value={"Maharashtra"}
                        placeholder="Enter state name"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        value={"Nashik"}
                        placeholder="Enter city name"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="jobDesignation" className="form-label">
                        Job Designation <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="jobDesignation"
                        name="jobDesignation"
                        className="form-control"
                        value={"Teacher"}
                        // onChange={handleChange}
                        required
                        placeholder="Job Designation"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="joiningDate" className="form-label">
                        Joining Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="joiningDate"
                        name="joiningDate"
                        className="form-control"
                        // value={formData.joiningDate}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="resignationDate" className="form-label">
                        Resignation Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="resignationDate"
                        name="resignationDate"
                        className="form-control"
                        // value={formData.resignationDate}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="contactNumber" className="form-label">
                        LWD <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="resignationDate"
                        name="resignationDate"
                        className="form-control"
                        // value={formData.resignationDate}
                        required
                      />
                    </div>
                  </div>

                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Personal Details
                    </h4>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="contactNumber" className="form-label">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        className="form-control"
                        value={"1234567890"}
                        // onChange={handleChange}
                        placeholder="Example : 1234567890"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="emailId" className="form-label">
                        Email ID
                      </label>
                      <input
                        type="email"
                        id="emailId"
                        name="emailId"
                        className="form-control"
                        value={"xyz@gmail.com"}
                        // onChange={handleChange}
                        placeholder="Example : xyz@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 mt-2">
                      <label htmlFor="currentAddress" className="form-label">
                        Current Address
                      </label>
                      <textarea
                        className="form-control"
                        id="currentAddress"
                        name="currentAddress"
                        rows={3}
                        value={"Nashik, maharashtra"}
                        //   onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="form-control"
                        value={"Maharashtra"}
                        placeholder="Enter state name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        value={"Nashik"}
                        placeholder="Enter city name"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="currentPinCode" className="form-label">
                        Pin Code
                      </label>
                      <input
                        type="text"
                        id="currentPinCode"
                        name="currentPinCode"
                        className="form-control"
                        value={"123456"}
                        placeholder="Enter Pin Code"
                      />
                    </div>
                  </div>

                  {/* <div className="py-2 d-flex justify-content-end align-items-center gap-1">
                                        <h4 className="mb-0 text-end"> Same As Above</h4>
                                        <div className="form-check ms-1">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="sameAsCurrentAddress"
                                                name="sameAsCurrentAddress"
                                            // checked={formData.sameAsCurrentAddress}
                                            // onChange={handleChange}
                                            />{" "}
                                            <label
                                                className="form-check-label"
                                                htmlFor="sameAsCurrentAddress"
                                            />
                                        </div>
                                    </div> */}

                  <div className="row">
                    <div className="mb-3 mt-2">
                      <label htmlFor="permanentAddress" className="form-label">
                        Permanent Address
                      </label>
                      <textarea
                        className="form-control"
                        id="permanentAddress"
                        name="permanentAddress"
                        rows={3}
                        value={"Mumbai, Maharashtra"}
                        //   onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="form-control"
                        value={"Maharashtra"}
                        placeholder="Enter state name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        value={"Mumbai"}
                        placeholder="Enter city name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="permanentPinCode" className="form-label">
                        Pin Code
                      </label>
                      <input
                        type="text"
                        id="permanentPinCode"
                        name="permanentPinCode"
                        className="form-control"
                        value={423565}
                        required
                        placeholder="Enter Pin Code"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="contactNumber" className="form-label">
                        Reason for Leaving{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="employeeRemarks"
                        name="employeeRemarks"
                        className="form-control"
                        value={"Family Reason"}
                        // onChange={handleChange}
                        required
                        placeholder="Enter Employee Remarks"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="employeeRemarks" className="form-label">
                        Employee Remarks <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="employeeRemarks"
                        name="employeeRemarks"
                        className="form-control"
                        value={"Good"}
                        // onChange={handleChange}
                        required
                        placeholder="Enter Employee Remarks"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="aadharPassportFile"
                        className="form-label"
                      >
                        Document Upload
                      </label>
                      <input
                        type="file"
                        id="aadharPassportFile"
                        name="aadharPassportFile"
                        className="form-control"
                        accept="image/*,application/pdf"
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Declaration
                    </h4>
                  </div>
                  <div className="row">
                    <div className="py-2 d-flex justify-content-start align-items-start gap-1">
                      <div
                        className="form-check ms-1"
                        style={{ marginTop: " 0.250rem" }}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="checkDeclaration"
                          name="checkDeclaration"
                          defaultChecked
                          // checked={formData.checkDeclaration}
                          // onChange={handleChange}
                          // style={{marginTop:" 0.125rem"}}
                        />{" "}
                        <label
                          className="form-check-label"
                          htmlFor="checkDeclaration"
                        />
                      </div>
                      <div>
                        <p
                          className="mb-0 fw-bold text-dark ps-2"
                          style={{ fontSize: "1rem" }}
                        >
                          I accept and agree to comply with the school policies
                          and will ensure to complete all the exit formalities
                          outlined by the school by my last working day. In case
                          i fail to comply, I authorize the school to make
                          necessary deductions from my Full & Final payment as
                          per the prevailing penalty outlined in the policy.
                        </p>
                        <p
                          className="mb-0 fw-bold text-dark ps-2"
                          style={{ fontSize: "1rem" }}
                        >
                          I have read and understood the Exit Policy. I agree to
                          comply with the same.{" "}
                        </p>
                      </div>
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

export default ViewEmployeeResignationDetails;
