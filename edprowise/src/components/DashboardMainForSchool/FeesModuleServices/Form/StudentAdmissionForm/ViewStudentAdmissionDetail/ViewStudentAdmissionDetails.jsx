import React from "react";
import CreatableSelect from "react-select/creatable";

import UseUpdateAdmissionForm from "../UpdateAdmissionDetail/UseUpdateAdmissionForm.jsx";

const ViewAdmissionForm = () => {
  const {
    formData,
    handleChange,
    showAdditionalData,
    classes,
    shifts,
    getFileNameFromPath,
    isNursery,
    cityOptions,
    countryOptions,
    stateOptions,
    student,
    sections,
  } = UseUpdateAdmissionForm();

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
              <form>
                <div className="row">
                  <div className="col-md-4 d-flex flex-column align-items-center">
                    <div
                      className="border rounded d-flex justify-content-center align-items-center mb-2"
                      style={{
                        width: "150px",
                        height: "180px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.studentPhoto}`}
                        alt="Student"
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="row">
                      <div className="mb-3">
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
                          value={formData.registrationNumber}
                          disabled
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="firstName" className="form-label">
                            First Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            value={formData.firstName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="middleName" className="form-label">
                            Middle Name
                          </label>
                          <input
                            type="text"
                            id="middleName"
                            name="middleName"
                            className="form-control"
                            value={formData.middleName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="lastName" className="form-label">
                            Last Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-control"
                            value={formData.lastName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="dateOfBirth" className="form-label">
                            Date Of Birth <span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            className="form-control"
                            value={formData.dateOfBirth}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="age" className="form-label">
                            Age <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            id="age"
                            name="age"
                            className="form-control"
                            value={formData.age}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="nationality" className="form-label">
                        Nationality
                      </label>
                      <select
                        id="nationality"
                        name="nationality"
                        className="form-control"
                        value={formData.nationality}
                        disabled
                      >
                        <option value="">Select Nationality</option>
                        <option value="India">India</option>
                        <option value="International">International</option>
                        <option value="SAARC Countries">SAARC Countries</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        className="form-control"
                        value={formData.gender}
                        disabled
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="bloodGroup" className="form-label">
                        Blood Group
                      </label>
                      <select
                        id="bloodGroup"
                        name="bloodGroup"
                        className="form-control"
                        value={formData.bloodGroup}
                        disabled
                      >
                        <option value="">Select Blood Group</option>
                        <option value="AB-">AB-</option>
                        <option value="AB+">AB+</option>
                        <option value="O-">O-</option>
                        <option value="O+">O+</option>
                        <option value="B-">B-</option>
                        <option value="B+">B+</option>
                        <option value="A-">A-</option>
                        <option value="A+">A+</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="masterDefineClass" className="form-label">
                        Class <span className="text-danger">*</span>
                      </label>
                      <select
                        id="masterDefineClass"
                        name="masterDefineClass"
                        className="form-control"
                        value={formData.masterDefineClass}
                        disabled
                        required
                      >
                        <option value="">Select Class</option>
                        {classes.map((classItem) => (
                          <option key={classItem._id} value={classItem._id}>
                            {classItem.className}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="masterDefineShift" className="form-label">
                        Shift<span className="text-danger">*</span>
                      </label>
                      <select
                        id="masterDefineShift"
                        name="masterDefineShift"
                        className="form-control"
                        value={formData.masterDefineShift}
                        disabled
                        required
                      >
                        <option value="">Select Master Define Shift</option>
                        {shifts.map((shift) => (
                          <option key={shift._id} value={shift._id}>
                            {shift.masterDefineShiftName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="section" className="form-label">
                        Section<span className="text-danger">*</span>
                      </label>
                      <select
                        id="section"
                        name="section"
                        className="form-control"
                        value={formData.section}
                        required
                        disabled
                      >
                        <option value="">Select Section</option>
                        {sections.map((section) => (
                          <option key={section._id} value={section._id}>
                            {section.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="currentAddress" className="form-label">
                      Current Address
                    </label>
                    <textarea
                      className="form-control"
                      id="currentAddress"
                      name="currentAddress"
                      rows={3}
                      value={formData.currentAddress}
                      disabled
                    />
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
                        value={
                          formData.country
                            ? {
                                value: formData.country,
                                label: formData.country,
                              }
                            : null
                        }
                        isDisabled
                        isClearable
                        isSearchable
                        placeholder="Select or type a country"
                        formatCreateLabel={(inputValue) =>
                          `Use "${inputValue}"`
                        }
                        noOptionsMessage={() => "Type to add a new country"}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        id="state"
                        name="state"
                        options={stateOptions}
                        value={
                          formData.state
                            ? { value: formData.state, label: formData.state }
                            : null
                        }
                        isDisabled
                        isClearable
                        isSearchable
                        placeholder="Select or type a state"
                        formatCreateLabel={(inputValue) =>
                          `Use "${inputValue}"`
                        }
                        noOptionsMessage={() =>
                          formData.country
                            ? "Type to add a new state"
                            : "Select a country first"
                        }
                        isValidNewOption={(inputValue) => inputValue.length > 0}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        id="city"
                        name="city"
                        options={cityOptions}
                        value={
                          formData.city
                            ? { value: formData.city, label: formData.city }
                            : null
                        }
                        isDisabled
                        isClearable
                        isSearchable
                        placeholder="Select or type a city"
                        formatCreateLabel={(inputValue) =>
                          `Use "${inputValue}"`
                        }
                        noOptionsMessage={() =>
                          formData.state
                            ? "Type to add a new city"
                            : "Select a state first"
                        }
                        isValidNewOption={(inputValue) => inputValue.length > 0}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="pincode" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="number"
                        id="pincode"
                        name="pincode"
                        className="form-control"
                        value={formData.pincode}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="parentContactNumber"
                        className="form-label"
                      >
                        Parent Contact No.
                      </label>
                      <input
                        type="tel"
                        id="parentContactNumber"
                        name="parentContactNumber"
                        className="form-control"
                        value={formData.parentContactNumber}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="motherTongue" className="form-label">
                        Mother Tongue
                      </label>
                      <input
                        type="text"
                        id="motherTongue"
                        name="motherTongue"
                        className="form-control"
                        value={formData.motherTongue}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {!isNursery && (
                  <>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="previousSchoolName"
                            className="form-label"
                          >
                            Previous School Name
                          </label>
                          <input
                            type="text"
                            id="previousSchoolName"
                            name="previousSchoolName"
                            className="form-control"
                            value={formData.previousSchoolName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="addressOfPreviousSchool"
                            className="form-label"
                          >
                            Address Of Previous School
                          </label>
                          <input
                            type="text"
                            id="addressOfPreviousSchool"
                            name="addressOfPreviousSchool"
                            className="form-control"
                            value={formData.addressOfPreviousSchool}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="previousSchoolBoard"
                            className="form-label"
                          >
                            Previous School Board
                          </label>
                          <input
                            type="text"
                            id="previousSchoolBoard"
                            name="previousSchoolBoard"
                            className="form-control"
                            value={formData.previousSchoolBoard}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="previousSchoolResult"
                            className="form-label"
                          >
                            Result Of Previous School
                          </label>
                          {typeof formData.previousSchoolResult ===
                            "string" && (
                            <div className="mt-2">
                              {formData.previousSchoolResult.match(
                                /\.(jpeg|jpg|png|gif)$/i
                              ) ? (
                                <img
                                  src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.previousSchoolResult}`}
                                  alt="Previous School Result"
                                  style={{
                                    maxWidth: "200px",
                                    borderRadius: "8px",
                                    marginTop: "5px",
                                  }}
                                />
                              ) : formData.previousSchoolResult.match(
                                  /\.pdf$/i
                                ) ? (
                                <iframe
                                  src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.previousSchoolResult}`}
                                  title="Previous School Result PDF Preview"
                                  // width="100%"
                                  // height="400px"
                                  style={{
                                    border: "1px solid #ccc",
                                    marginTop: "5px",
                                  }}
                                ></iframe>
                              ) : (
                                <div className="text-muted small mt-1">
                                  Existing file:{" "}
                                  {getFileNameFromPath(
                                    formData.previousSchoolResult
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="tcCertificate" className="form-label">
                            TC Certificate
                          </label>

                          {typeof formData.tcCertificate === "string" && (
                            <div className="mt-2">
                              {formData.tcCertificate.match(
                                /\.(jpeg|jpg|png|gif)$/i
                              ) ? (
                                <img
                                  src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.tcCertificate}`}
                                  alt="TC Certificate"
                                  style={{
                                    maxWidth: "200px",
                                    borderRadius: "8px",
                                    marginTop: "5px",
                                  }}
                                />
                              ) : formData.tcCertificate.match(/\.pdf$/i) ? (
                                <iframe
                                  src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.tcCertificate}`}
                                  title="TC Certificate PDF Preview"
                                  // width="100%"
                                  // height="400px"
                                  style={{
                                    border: "1px solid #ccc",
                                    marginTop: "5px",
                                  }}
                                ></iframe>
                              ) : (
                                <div className="text-muted small mt-1">
                                  Existing file:{" "}
                                  {getFileNameFromPath(formData.tcCertificate)}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="aadharPassportNumber"
                        className="form-label"
                      >
                        Aadhar/Passport Number
                      </label>
                      <input
                        type="text"
                        id="aadharPassportNumber"
                        name="aadharPassportNumber"
                        className="form-control"
                        value={formData.aadharPassportNumber}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="proofOfResidence" className="form-label">
                        Proof Of Residence
                      </label>
                      {typeof formData.proofOfResidence === "string" && (
                        <div className="mt-2">
                          {formData.proofOfResidence.match(
                            /\.(jpeg|jpg|png|gif)$/i
                          ) ? (
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.proofOfResidence}`}
                              alt="Proof of Residence"
                              style={{
                                maxWidth: "200px",
                                borderRadius: "8px",
                                marginTop: "5px",
                              }}
                            />
                          ) : formData.proofOfResidence.match(/\.pdf$/i) ? (
                            <iframe
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.proofOfResidence}`}
                              title="Proof of Residence PDF Preview"
                              // width="100%"
                              // height="400px"
                              style={{
                                border: "1px solid #ccc",
                                marginTop: "5px",
                              }}
                            ></iframe>
                          ) : (
                            <div className="text-muted small mt-1">
                              Existing file:{" "}
                              {getFileNameFromPath(formData.proofOfResidence)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="aadharPassportFile"
                        className="form-label"
                      >
                        Aadhar/Passport Upload
                      </label>
                      {typeof formData.aadharPassportFile === "string" && (
                        <div className="mt-2">
                          {formData.aadharPassportFile.match(
                            /\.(jpeg|jpg|png|gif)$/i
                          ) ? (
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.aadharPassportFile}`}
                              alt="Aadhar or Passport"
                              style={{
                                maxWidth: "200px",
                                borderRadius: "8px",
                                marginTop: "5px",
                              }}
                            />
                          ) : formData.aadharPassportFile.match(/\.pdf$/i) ? (
                            <iframe
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.aadharPassportFile}`}
                              title="Aadhar or Passport PDF Preview"
                              // width="100%"
                              // height="400px"
                              style={{
                                border: "1px solid #ccc",
                                marginTop: "5px",
                              }}
                            ></iframe>
                          ) : (
                            <div className="text-muted small mt-1">
                              {getFileNameFromPath(formData.aadharPassportFile)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="studentCategory" className="form-label">
                        Category
                      </label>
                      <select
                        id="studentCategory"
                        name="studentCategory"
                        className="form-control"
                        value={formData.studentCategory}
                        onChange={handleChange}
                        // disabled={formData.nationality === 'SAARC Countries' || formData.nationality === 'International'}
                        required
                        disabled
                      >
                        <option value="">Select Category</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="ST">ST</option>
                        <option value="SC">SC</option>
                      </select>
                    </div>
                  </div>

                  {formData.studentCategory !== "General" && (
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="castCertificate" className="form-label">
                          Caste Certificate
                        </label>
                        {typeof formData.castCertificate === "string" && (
                          <div className="mt-2">
                            <div className="text-muted small">
                              Existing file:
                            </div>

                            {formData.castCertificate.match(
                              /\.(jpeg|jpg|png|gif)$/i
                            ) ? (
                              <img
                                src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.castCertificate}`}
                                alt="Caste Certificate"
                                style={{
                                  maxWidth: "200px",
                                  borderRadius: "8px",
                                  marginTop: "5px",
                                }}
                              />
                            ) : formData.castCertificate.match(/\.pdf$/i) ? (
                              <iframe
                                src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.castCertificate}`}
                                title="Caste Certificate PDF Preview"
                                style={{
                                  border: "1px solid #ccc",
                                  marginTop: "5px",
                                }}
                                // width="100%"
                                // height="400px"
                              ></iframe>
                            ) : (
                              <div className="text-muted small mt-1">
                                {getFileNameFromPath(formData.castCertificate)}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Sibling Information Study In Same School
                  </h4>
                </div>
                <div className="row">
                  <div className="form-check ms-1 mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customCheck1"
                      name="siblingInfoChecked"
                      checked={formData.siblingInfoChecked}
                      disabled
                    />
                    <label className="form-check-label" htmlFor="customCheck1">
                      Incase of no sibling Click here.
                    </label>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="relationType" className="form-label">
                        Relation Type
                      </label>
                      <select
                        id="relationType"
                        name="relationType"
                        className="form-control"
                        value={formData.relationType || ""}
                        disabled
                      >
                        <option value="">Select Relation</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="siblingName" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="siblingName"
                        name="siblingName"
                        className="form-control"
                        value={formData.siblingName}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="idCardFile" className="form-label">
                        ID Card
                      </label>
                      {typeof formData.idCardFile === "string" && (
                        <div className="mt-2">
                          <div className="text-muted small">Existing file:</div>

                          {formData.idCardFile.match(
                            /\.(jpeg|jpg|png|gif)$/i
                          ) ? (
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.idCardFile}`}
                              alt="ID Card"
                              style={{
                                maxWidth: "200px",
                                borderRadius: "8px",
                                marginTop: "5px",
                              }}
                            />
                          ) : formData.idCardFile.match(/\.pdf$/i) ? (
                            <iframe
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.idCardFile}`}
                              title="ID Card PDF Preview"
                              style={{
                                border: "1px solid #ccc",
                                marginTop: "5px",
                              }}
                              // width="100%"
                              // height="400px"
                            ></iframe>
                          ) : (
                            <div className="text-muted small mt-1">
                              {getFileNameFromPath(formData.idCardFile)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Family Information
                  </h4>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="parentalStatus" className="form-label">
                        Parental Status
                      </label>
                      <select
                        id="parentalStatus"
                        name="parentalStatus"
                        className="form-control"
                        value={formData.parentalStatus}
                        disabled
                      >
                        <option value="">Select </option>
                        <option value="Single Father">Single Father</option>
                        <option value="Single Mother">Single Mother</option>
                        <option value="Parents">Parents</option>
                      </select>
                    </div>
                  </div>
                </div>

                {formData.parentalStatus !== "Single Mother" && (
                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="fatherName" className="form-label">
                          Father Name
                        </label>
                        <input
                          type="text"
                          id="fatherName"
                          name="fatherName"
                          className="form-control"
                          value={formData.fatherName}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="fatherContactNo" className="form-label">
                          Father Contact Number
                        </label>
                        <input
                          type="tel"
                          id="fatherContactNo"
                          name="fatherContactNo"
                          className="form-control"
                          value={formData.fatherContactNo}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="fatherQualification"
                          className="form-label"
                        >
                          Father Higher Qualification
                        </label>
                        <input
                          type="text"
                          id="fatherQualification"
                          name="fatherQualification"
                          className="form-control"
                          value={formData.fatherQualification}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="fatherProfession"
                          className="form-label"
                        >
                          Father Profession
                        </label>
                        <input
                          type="text"
                          id="fatherProfession"
                          name="fatherProfession"
                          className="form-control"
                          value={formData.fatherProfession}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.parentalStatus !== "Single Father" && (
                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="motherName" className="form-label">
                          Mother Name
                        </label>
                        <input
                          type="text"
                          id="motherName"
                          name="motherName"
                          className="form-control"
                          value={formData.motherName}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="motherContactNo" className="form-label">
                          Mother Contact Number
                        </label>
                        <input
                          type="tel"
                          id="motherContactNo"
                          name="motherContactNo"
                          className="form-control"
                          value={formData.motherContactNo}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="motherQualification"
                          className="form-label"
                        >
                          Mother Higher Qualification
                        </label>
                        <input
                          type="text"
                          id="motherQualification"
                          name="motherQualification"
                          className="form-control"
                          value={formData.motherQualification}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="motherProfession"
                          className="form-label"
                        >
                          Mother Profession
                        </label>
                        <input
                          type="text"
                          id="motherProfession"
                          name="motherProfession"
                          className="form-control"
                          value={formData.motherProfession}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                )}

                {!showAdditionalData ? null : (
                  <>
                    <div className="row">
                      <div className="card-header mb-2">
                        <h4 className="card-title text-center custom-heading-font">
                          Understanding
                        </h4>
                      </div>
                      <div className="form-check ms-1 mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheck1"
                          name="agreementChecked"
                          checked={formData.agreementChecked}
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customCheck1"
                        >
                          I Understand & agree that the registration of my word
                          does not guarantee admission to the school & the
                          registration fee is neither transferable not
                          refundable.
                        </label>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="admissionFees" className="form-label">
                            Admission Fees{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            id="admissionFees"
                            name="admissionFees"
                            className="form-control"
                            value={formData.admissionFees}
                            disabled
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="concessionamount"
                            className="form-label"
                          >
                            Concession
                          </label>
                          <input
                            type="number"
                            id="concessionamount"
                            name="concessionamount"
                            className="form-control"
                            value={formData.concessionAmount}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="finalamount" className="form-label">
                            Final Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            id="finalamount"
                            name="finalamount"
                            className="form-control"
                            value={formData.finalAmount}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Name of Person Filling the Form
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="paymentMode" className="form-label">
                            Payment Option{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            id="paymentMode"
                            name="paymentMode"
                            className="form-control"
                            value={formData.paymentMode}
                            disabled
                          >
                            <option value="">Select </option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Online">Online</option>
                          </select>
                        </div>
                      </div>

                      {formData.paymentMode === "Cheque" && (
                        <>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                htmlFor="chequeNumber"
                                className="form-label"
                              >
                                Cheque Number{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                id="chequeNumber"
                                name="chequeNumber"
                                className="form-control"
                                value={formData.chequeNumber}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="bankName" className="form-label">
                                Bank Name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                id="bankName"
                                name="bankName"
                                className="form-control"
                                value={formData.bankName}
                                disabled
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        For Official Use Only
                      </h4>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="dateOfApplicatopnReceive"
                            className="form-label"
                          >
                            Application Received on
                          </label>
                          <input
                            type="date"
                            id="dateOfApplicatopnReceive"
                            name="dateOfApplicatopnReceive"
                            className="form-control"
                            value={
                              student?.applicationDate
                                ? student.applicationDate.substring(0, 10)
                                : ""
                            }
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="receiptNumber" className="form-label">
                            Receipts No.
                          </label>
                          <input
                            type="text"
                            id="receiptNumber"
                            name="receiptNumber"
                            className="form-control"
                            value={student?.receiptNumber || ""}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="registrationNumber"
                            className="form-label"
                          >
                            Admission No.
                          </label>
                          <input
                            type="text"
                            id="registrationNumber"
                            name="registrationNumber"
                            className="form-control"
                            value={student?.AdmissionNumber || ""}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="receivedBy" className="form-label">
                            Payment Mode
                          </label>
                          <input
                            type="text"
                            id="receivedBy"
                            name="receivedBy"
                            className="form-control"
                            value={formData.paymentMode}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="receivedBy" className="form-label">
                            Payment Date
                          </label>
                          <input
                            type="text"
                            id="receivedBy"
                            name="receivedBy"
                            className="form-control"
                            value={
                              student?.paymentDate
                                ? new Date(
                                    student.paymentDate
                                  ).toLocaleDateString("en-GB")
                                : ""
                            }
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="transationOrChequetNumber"
                            className="form-label"
                          >
                            Transaction No./ Cheque No.
                          </label>
                          <input
                            type="text"
                            id="transationOrChequetNumber"
                            name="transationOrChequetNumber"
                            className="form-control"
                            value={
                              student?.chequeNumber
                                ? student.chequeNumber
                                : student?.transactionNumber || ""
                            }
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="text" style={{ marginLeft: "2px" }}></div>
                    </div>
                    <div className="text-end"></div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdmissionForm;
