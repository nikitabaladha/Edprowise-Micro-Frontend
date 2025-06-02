import React from "react";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
const EmployerResignationApproval = () => {
  const navigate = useNavigate();
  const reasonForLeaving = [
    { label: "Absconding", value: "Absconding" },
    {
      label: "Better opportunity & Remuneration",
      value: "Better opportunity & Remuneration",
    },
    { label: "End of Contract", value: "End of Contract" },
    { label: "Family reason", value: "Family reason" },
    { label: "Health Issues", value: "Health Issues" },
    { label: "Higher Studies", value: "Higher Studies" },
    { label: "Marriage", value: "Marriage" },
    {
      label: "Performance below expectation",
      value: "Performance below expectation  ",
    },
    { label: "Relocation ", value: "Relocation" },
    { label: "Role clarity", value: "Role clarity" },
    { label: "Starting own Venture", value: "Starting own Venture" },
    { label: "Worklife Balance", value: "Worklife Balance " },
  ];

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2 d-flex align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Resignation Approval
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
                </div>
                <form onSubmit="">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label">
                          Reason of Leaving by Employee
                        </label>
                        <input
                          type="text"
                          id="contactNumber"
                          name="contactNumber"
                          className="form-control"
                          value={"Family reason"}
                          // onChange={handleChange}
                          required
                          placeholder="Example : 1234567890"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="employeeRemarks" className="form-label">
                          Employee Remarks
                        </label>
                        <input
                          type="text"
                          id="employeeRemarks"
                          name="employeeRemarks"
                          className="form-control"
                          value={"Employee Remark"}
                          // onChange={handleChange}
                          required
                          placeholder="Employee Remark"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="dateOfBirth" className="form-label">
                          Notice Period as per policy
                        </label>
                        <input
                          type="text"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          className="form-control"
                          value={"90"}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="gender" className="form-label">
                          Earned Leave Balance
                        </label>
                        <input
                          type="text"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          className="form-control"
                          value={"10"}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="categoryOfEmployees"
                          className="form-label"
                        >
                          Applicable Notice Period (Notice period-leave balance)
                        </label>
                        <input
                          type="text"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          className="form-control"
                          value={"79.5"}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="grade" className="form-label">
                          LWD as per system
                        </label>
                        <input
                          type="date"
                          id="grade"
                          name="grade"
                          className="form-control"
                          // value={formData.grade}
                          // onChange={handleChange}
                          required
                          placeholder="Grade"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="jobDesignation" className="form-label">
                          Final LWD
                        </label>
                        <input
                          type="date"
                          id="jobDesignation"
                          name="jobDesignation"
                          className="form-control"
                          // value={formData.jobDesignation}
                          // onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="joiningDate" className="form-label">
                          Unserved Notice Period (In Days)
                        </label>
                        <input
                          type="text"
                          id="joiningDate"
                          name="joiningDate"
                          className="form-control"
                          value={"33"}
                          // onChange={handleChange}
                          required
                          placeholder="joiningDate"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="joiningDate" className="form-label">
                          Action to be taken for unserved notice period (In
                          Days) <span className="text-danger">*</span>
                        </label>
                        <select
                          id="categoryOfEmployees"
                          name="categoryOfEmployees"
                          className="form-control"
                          // value={"Waive off"}
                          // onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Teaching Staff">Waive off</option>
                          <option value="Non Teaching Staff"></option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="joiningDate" className="form-label">
                          Resignation Type{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          id="categoryOfEmployees"
                          name="categoryOfEmployees"
                          className="form-control"
                          // value={"Voluntary"}
                          // onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Teaching Staff">Voluntary</option>
                          <option value="Non Teaching Staff"></option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="joiningDate" className="form-label">
                          Waiving off Remark By Principal{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="joiningDate"
                          name="joiningDate"
                          className="form-control"
                          value={"Will complete allocated assignment"}
                          // onChange={handleChange}
                          required
                          placeholder="joiningDate"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="joiningDate" className="form-label">
                          Reason for leaving by Principal{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <CreatableSelect
                          options={reasonForLeaving}
                          placeholder="Select Reason for Leaving"
                          isSearchable
                          classNamePrefix="react-select"
                          className="custom-react-select"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="joiningDate" className="form-label">
                          Do you want to retain the employee{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          id="categoryOfEmployees"
                          name="categoryOfEmployees"
                          className="form-control"
                          // onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="joiningDate" className="form-label">
                          Principal Remark (if any)
                        </label>
                        <input
                          type="text"
                          id="joiningDate"
                          name="joiningDate"
                          className="form-control"
                          // value={formData.joiningDate}
                          // onChange={handleChange}
                          required
                          placeholder="Enter Principal Remark"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Accept Registartion
                    </button>

                    <button
                      type="button "
                      className="btn btn-primary ms-2 custom-submit-button"
                    >
                      Retained
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerResignationApproval;
