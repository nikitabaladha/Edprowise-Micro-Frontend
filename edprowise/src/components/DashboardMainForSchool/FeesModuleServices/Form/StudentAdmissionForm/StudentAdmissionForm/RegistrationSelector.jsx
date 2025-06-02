// RegistrationSelector.jsx

import React from "react";

const RegistrationSelector = ({
  formData,
  handleChange,
  handleRegistrationSubmit,
  existingStudents,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Student Admission Form
                  </h4>
                </div>
              </div>
              <form onSubmit={handleRegistrationSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="registrationNumber"
                        className="form-label"
                      >
                        Registration No
                      </label>
                      <input
                        type="text"
                        id="registrationNumber"
                        name="registrationNumber"
                        className="form-control"
                        list="registrationNumbers"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        required
                        placeholder="Search or select registration number"
                      />
                      <datalist id="registrationNumbers">
                        {existingStudents.map((student, index) => (
                          <option
                            key={index}
                            value={student.registrationNumber}
                          >
                            {student.registrationNumber} - {student.firstName}{" "}
                            {student.lastName}
                          </option>
                        ))}
                      </datalist>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                      >
                        Submit
                      </button>
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

export default RegistrationSelector;
