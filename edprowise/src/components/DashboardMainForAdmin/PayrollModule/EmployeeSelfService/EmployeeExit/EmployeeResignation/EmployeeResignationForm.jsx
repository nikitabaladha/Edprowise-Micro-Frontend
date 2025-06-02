import React, { useState } from "react";
import CountryStateCityData from "../../../../../CountryStateCityData.json";
import CreatableSelect from "react-select/creatable";
const EmployeeResignationForm = () => {
  const countryData = CountryStateCityData;
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    isCustomCountry: false,
    isCustomState: false,
    isCustomCity: false,
  });
  const daysOfWeek = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];

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

  const countryOptions = Object.keys(countryData).map((country) => ({
    value: country,
    label: country,
  }));

  // Get states based on selected country
  const stateOptions =
    formData.country && !formData.isCustomCountry
      ? Object.keys(countryData[formData.country]).map((state) => ({
          value: state,
          label: state,
        }))
      : [];

  // Get cities based on selected state and country
  const cityOptions =
    formData.state && !formData.isCustomState && formData.country
      ? (countryData[formData.country][formData.state] || []).map((city) => ({
          value: city,
          label: city,
        }))
      : [];

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="payroll-title mb-0 text-center">
                    Employee Resignation Form
                  </h4>
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
                      <CreatableSelect
                        id="country"
                        name="country"
                        options={countryOptions}
                        //   value={
                        //     formData.country
                        //       ? {
                        //           value: formData.country,
                        //           label: formData.country,
                        //         }
                        //       : null
                        //   }
                        //   onChange={(selectedOption) => {
                        //     const isCustom = !countryOptions.some(
                        //       (option) => option.value === selectedOption?.value
                        //     );

                        //     setFormData((prev) => ({
                        //       ...prev,
                        //       country: selectedOption?.value || "",
                        //       state: "",
                        //       city: "",
                        //       isCustomCountry: isCustom,
                        //       isCustomState: false,
                        //       isCustomCity: false,
                        //     }));
                        //   }}
                        //   onCreateOption={(inputValue) => {
                        //     setFormData((prev) => ({
                        //       ...prev,
                        //       country: inputValue,
                        //       state: "",
                        //       city: "",
                        //       isCustomCountry: true,
                        //       isCustomState: false,
                        //       isCustomCity: false,
                        //     }));
                        //   }}
                        placeholder="Select or type a country"
                        isSearchable
                        required
                        classNamePrefix="react-select"
                        className="custom-react-select"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State <span className="text-danger">*</span>
                      </label>
                      {formData.isCustomCountry ? (
                        <input
                          type="text"
                          id="state"
                          name="state"
                          className="form-control"
                          // value={formData.state}
                          // onChange={(e) => {
                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     state: e.target.value,
                          //     city: "",
                          //     isCustomState: true,
                          //     isCustomCity: false,
                          //   }));
                          // }}
                          placeholder="Enter state name"
                          required
                        />
                      ) : (
                        <CreatableSelect
                          id="state"
                          name="state"
                          options={stateOptions}
                          // value={
                          //   formData.state
                          //     ? {
                          //         value: formData.state,
                          //         label: formData.state,
                          //       }
                          //     : null
                          // }
                          // onChange={(selectedOption) => {
                          //   const isCustom = !stateOptions.some(
                          //     (option) =>
                          //       option.value === selectedOption?.value
                          //   );

                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     state: selectedOption?.value || "",
                          //     city: "",
                          //     isCustomState: isCustom,
                          //     isCustomCity: false,
                          //   }));
                          // }}
                          // onCreateOption={(inputValue) => {
                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     state: inputValue,
                          //     city: "",
                          //     isCustomState: true,
                          //     isCustomCity: false,
                          //   }));
                          // }}
                          placeholder="Select or type a state"
                          isSearchable
                          required
                          // isDisabled={!formData.country}
                          classNamePrefix="react-select"
                          className="custom-react-select"
                        />
                      )}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City <span className="text-danger">*</span>
                      </label>
                      {formData.isCustomState || formData.isCustomCountry ? (
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className="form-control"
                          // value={formData.city}
                          // onChange={(e) => {
                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     city: e.target.value,
                          //     isCustomCity: true,
                          //   }));
                          // }}
                          placeholder="Enter city name"
                          required
                        />
                      ) : (
                        <CreatableSelect
                          id="city"
                          name="city"
                          options={cityOptions}
                          // value={
                          //   formData.city
                          //     ? {
                          //         value: formData.city,
                          //         label: formData.city,
                          //       }
                          //     : null
                          // }
                          // onChange={(selectedOption) => {
                          //   const isCustom =
                          //     selectedOption &&
                          //     !cityOptions.some(
                          //       (option) =>
                          //         option.value === selectedOption.value
                          //     );

                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     city: selectedOption?.value || "",
                          //     isCustomCity: isCustom,
                          //   }));
                          // }}
                          // onCreateOption={(inputValue) => {
                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     city: inputValue,
                          //     isCustomCity: true,
                          //   }));
                          // }}
                          placeholder="Select or type a city"
                          isSearchable
                          required
                          // isDisabled={!formData.state}
                          classNamePrefix="react-select"
                          className="custom-react-select"
                        />
                      )}
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
                        // value={formData.jobDesignation}
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
                      {/* <CreatableSelect
                                                options={daysOfWeek}
                                                placeholder="Select or enter LWD"
                                                isSearchable
                                                required
                                                classNamePrefix="react-select"
                                                className="custom-react-select"
                                            /> */}
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
                        // value={formData.contactNumber}
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
                        // value={formData.emailId}
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
                        //   value={formData.currentAddress}
                        //   onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      {formData.isCustomCountry ? (
                        <input
                          type="text"
                          id="state"
                          name="state"
                          className="form-control"
                          // value={formData.state}
                          // onChange={(e) => {
                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     state: e.target.value,
                          //     city: "",
                          //     isCustomState: true,
                          //     isCustomCity: false,
                          //   }));
                          // }}
                          placeholder="Enter state name"
                        />
                      ) : (
                        <CreatableSelect
                          id="state"
                          name="state"
                          options={stateOptions}
                          // value={
                          //   formData.state
                          //     ? {
                          //         value: formData.state,
                          //         label: formData.state,
                          //       }
                          //     : null
                          // }
                          // onChange={(selectedOption) => {
                          //   const isCustom = !stateOptions.some(
                          //     (option) =>
                          //       option.value === selectedOption?.value
                          //   );

                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     state: selectedOption?.value || "",
                          //     city: "",
                          //     isCustomState: isCustom,
                          //     isCustomCity: false,
                          //   }));
                          // }}
                          // onCreateOption={(inputValue) => {
                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     state: inputValue,
                          //     city: "",
                          //     isCustomState: true,
                          //     isCustomCity: false,
                          //   }));
                          // }}
                          placeholder="Select or type a state"
                          isSearchable
                          // isDisabled={!formData.country}
                          classNamePrefix="react-select"
                          className="custom-react-select"
                        />
                      )}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      {formData.isCustomState || formData.isCustomCountry ? (
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className="form-control"
                          // value={formData.city}
                          // onChange={(e) => {
                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     city: e.target.value,
                          //     isCustomCity: true,
                          //   }));
                          // }}
                          placeholder="Enter city name"
                        />
                      ) : (
                        <CreatableSelect
                          id="city"
                          name="city"
                          options={cityOptions}
                          // value={
                          //   formData.city
                          //     ? {
                          //         value: formData.city,
                          //         label: formData.city,
                          //       }
                          //     : null
                          // }
                          // onChange={(selectedOption) => {
                          //   const isCustom =
                          //     selectedOption &&
                          //     !cityOptions.some(
                          //       (option) =>
                          //         option.value === selectedOption.value
                          //     );

                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     city: selectedOption?.value || "",
                          //     isCustomCity: isCustom,
                          //   }));
                          // }}
                          // onCreateOption={(inputValue) => {
                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     city: inputValue,
                          //     isCustomCity: true,
                          //   }));
                          // }}
                          placeholder="Select or type a city"
                          isSearchable
                          // isDisabled={!formData.state}
                          classNamePrefix="react-select"
                          className="custom-react-select"
                        />
                      )}
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
                        // value={formData.currentPinCode}
                        placeholder="Enter Pin Code"
                      />
                    </div>
                  </div>

                  <div className="py-2 d-flex justify-content-end align-items-center gap-1">
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
                  </div>

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
                        //   value={formData.permanentAddress}
                        //   onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      {formData.isCustomCountry ? (
                        <input
                          type="text"
                          id="state"
                          name="state"
                          className="form-control"
                          // value={formData.state}
                          // onChange={(e) => {
                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     state: e.target.value,
                          //     city: "",
                          //     isCustomState: true,
                          //     isCustomCity: false,
                          //   }));
                          // }}
                          placeholder="Enter state name"
                        />
                      ) : (
                        <CreatableSelect
                          id="state"
                          name="state"
                          options={stateOptions}
                          // value={
                          //   formData.state
                          //     ? {
                          //         value: formData.state,
                          //         label: formData.state,
                          //       }
                          //     : null
                          // }
                          // onChange={(selectedOption) => {
                          //   const isCustom = !stateOptions.some(
                          //     (option) =>
                          //       option.value === selectedOption?.value
                          //   );

                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     state: selectedOption?.value || "",
                          //     city: "",
                          //     isCustomState: isCustom,
                          //     isCustomCity: false,
                          //   }));
                          // }}
                          // onCreateOption={(inputValue) => {
                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     state: inputValue,
                          //     city: "",
                          //     isCustomState: true,
                          //     isCustomCity: false,
                          //   }));
                          // }}
                          placeholder="Select or type a state"
                          isSearchable
                          // isDisabled={!formData.country}
                          classNamePrefix="react-select"
                          className="custom-react-select"
                        />
                      )}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      {formData.isCustomState || formData.isCustomCountry ? (
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className="form-control"
                          // value={formData.city}
                          // onChange={(e) => {
                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     city: e.target.value,
                          //     isCustomCity: true,
                          //   }));
                          // }}
                          placeholder="Enter city name"
                        />
                      ) : (
                        <CreatableSelect
                          id="city"
                          name="city"
                          options={cityOptions}
                          // value={
                          //   formData.city
                          //     ? {
                          //         value: formData.city,
                          //         label: formData.city,
                          //       }
                          //     : null
                          // }
                          // onChange={(selectedOption) => {
                          //   const isCustom =
                          //     selectedOption &&
                          //     !cityOptions.some(
                          //       (option) =>
                          //         option.value === selectedOption.value
                          //     );

                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     city: selectedOption?.value || "",
                          //     isCustomCity: isCustom,
                          //   }));
                          // }}
                          // onCreateOption={(inputValue) => {
                          //   setFormData((prev) => ({
                          //     ...prev,
                          //     city: inputValue,
                          //     isCustomCity: true,
                          //   }));
                          // }}
                          placeholder="Select or type a city"
                          isSearchable
                          // isDisabled={!formData.state}
                          classNamePrefix="react-select"
                          className="custom-react-select"
                        />
                      )}
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
                        // value={formData.permanentPinCode}
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
                      <CreatableSelect
                        options={reasonForLeaving}
                        placeholder="Select Reason for Leaving"
                        isSearchable
                        classNamePrefix="react-select"
                        className="custom-react-select"
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
                        // value={formData.employeeRemarks}
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

export default EmployeeResignationForm;
