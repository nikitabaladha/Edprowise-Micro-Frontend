import React from "react";

const AddEmployeeRegistration = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Registration Form
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <div className="mb-6">
                      <label htmlFor="name" className="form-label">
                        Name Of Teacher (As Per Aadhar)
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        // value={formData.name}
                        // onChange={handleChange}
                        required
                        placeholder="Name"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="contactNumber" className="form-label">
                        Contact No
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        className="form-control"
                        // value={formData.contactNumber}
                        // onChange={handleChange}
                        required
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
                        // value={formData.emailId}
                        // onChange={handleChange}
                        required
                        placeholder="Example : xyz@gmail.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="categoryOfEmployees"
                        className="form-label"
                      >
                        Category OF Employees
                      </label>
                      <select
                        id="categoryOfEmployees"
                        name="categoryOfEmployees"
                        className="form-control"
                        // value={formData.categoryOfEmployee}
                        // onChange={handleChange}
                        required
                      >
                        <option value="">Select Employee Category</option>
                        <option value="Teaching Staff">Teaching Staff</option>
                        <option value="Non Teaching Staff">
                          Non Teaching Staff
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="grade" className="form-label">
                        Grade
                      </label>
                      <input
                        type="text"
                        id="grade"
                        name="grade"
                        className="form-control"
                        // value={formData.grade}
                        // onChange={handleChange}
                        required
                        placeholder="grade"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="jobDesignation" className="form-label">
                        Job Designation
                      </label>
                      <input
                        type="text"
                        id="jobDesignation"
                        name="jobDesignation"
                        className="form-control"
                        // value={formData.jobDesignation}
                        // onChange={handleChange}
                        required
                        placeholder="job Designation"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="joiningDate" className="form-label">
                        Joining Date
                      </label>
                      <input
                        type="date"
                        id="joiningDate"
                        name="joiningDate"
                        className="form-control"
                        // value={formData.joiningDate}
                        // onChange={handleChange}
                        required
                        placeholder="joiningDate"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
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

export default AddEmployeeRegistration;
