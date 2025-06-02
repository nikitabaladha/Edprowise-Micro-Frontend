import React, { useState } from "react";
import { Link } from "react-router-dom";
const EmployeeDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [experiences, setExperiences] = useState([{ id: 1 }]);

  const handleProceed = () => {
    setShowForm(true);
  };

  const addExperience = () => {
    const newExperience = { id: experiences.length + 1 };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Employee Details
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="employeeID" className="form-label">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        id="employeeID"
                        name="employeeID"
                        className="form-control"
                        // value={formData.employeeID}
                        // onChange={handleChange}
                        required
                        placeholder="Enter Employee ID"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="password" className="form-label">
                        password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        // value={formData.password}
                        // onChange={handleChange}
                        required
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={handleProceed}
                  >
                    Proceed
                  </button>
                </div>

                {showForm && (
                  <>
                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Personal Information
                      </h4>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="mb-6">
                          <label htmlFor="employeeID" className="form-label">
                            Employee ID
                          </label>
                          <input
                            type="text"
                            id="employeeID"
                            name="employeeID"
                            className="form-control"
                            // value={formData.employeeID}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-6">
                          <label htmlFor="name" className="form-label">
                            Name Of Employee
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            // value={formData.name}
                            // onChange={handleChange}
                            required
                            placeholder="Enter Employee Name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
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
                            required
                            placeholder="joiningDate"
                          />
                        </div>
                      </div>

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
                            <option value="Teaching Staff">
                              Teaching Staff
                            </option>
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
                          <label
                            htmlFor="jobDesignation"
                            className="form-label"
                          >
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

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="dateOfBirth" className="form-label">
                            Date OF Birth
                          </label>
                          <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            className="form-control"
                            // value={formData.dateOfBirth}
                            required
                            placeholder="Date Of Birth"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-6">
                          <label htmlFor="fatherName" className="form-label">
                            Father Name
                          </label>
                          <input
                            type="text"
                            id="fatherName"
                            name="fatherName"
                            className="form-control"
                            // value={formData.fatherName}
                            // onChange={handleChange}
                            required
                            placeholder="Enter Father Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-6">
                          <label htmlFor="spouseName" className="form-label">
                            Spouse Name
                          </label>
                          <input
                            type="text"
                            id="spouseName"
                            name="spouseName"
                            className="form-control"
                            // value={formData.spouseName}
                            // onChange={handleChange}
                            placeholder="Enter Spouse Name"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="mb-3 mt-2">
                          <label
                            htmlFor="currentAddress"
                            className="form-label"
                          >
                            Current Address
                          </label>
                          <textarea
                            className="form-control"
                            id="currentAddress"
                            name="currentAddress"
                            rows={3}
                            //   value={formData.currentAddress}
                            //   onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
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

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="emergencyContactNumber"
                            className="form-label"
                          >
                            Emergency Contact No
                          </label>
                          <input
                            type="tel"
                            id="emergencyContactNumber"
                            name="emergencyContactNumber"
                            className="form-control"
                            // value={formData.emergencyContactNumber}
                            // onChange={handleChange}
                            placeholder="Example : 1234567890"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
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

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="nationality" className="form-label">
                            Nationality
                          </label>
                          <select
                            id="nationality"
                            name="nationality"
                            className="form-control"
                            // value={formData.nationality}
                            // onChange={handleChange}
                            required
                          >
                            <option value="">Select Nationality</option>
                            <option value="Indian">Indian</option>
                            <option value="Nepalese">Nepalese</option>
                            <option value="Bhutanese">Bhutanese</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-6">
                          <label htmlFor="religion" className="form-label">
                            Religion
                          </label>
                          <input
                            type="text"
                            id="religion"
                            name="religion"
                            className="form-control"
                            // value={formData.religion}
                            // onChange={handleChange}
                            placeholder="Enter Religion"
                          />
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
                            // value={formData.gender}
                            // onChange={handleChange}
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="maritalStatus" className="form-label">
                            Marital Status
                          </label>
                          <select
                            id="maritalStatus"
                            name="maritalStatus"
                            className="form-control"
                            // value={formData.maritalStatus}
                            // onChange={handleChange}
                            required
                          >
                            <option value="">Select Status</option>
                            <option value="Married">Married</option>
                            <option value="Un-Married">Un-Married</option>
                            <option value="Widower">Widower</option>
                            <option value="Divorcee">Divorcee</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="higherQualification"
                            className="form-label"
                          >
                            Higher Qualification
                          </label>
                          <select
                            id="higherQualification"
                            name="higherQualification"
                            className="form-control"
                            // value={formData.higherQualification}
                            // onChange={handleChange}
                            required
                          >
                            <option value="">
                              Select Higher Qualification
                            </option>
                            <option value="Below Class 12">
                              Below Class 12
                            </option>
                            <option value="Upto Class 12">Upto Class 12</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Post Graduate">Post Graduate</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="physicalHandicap"
                            className="form-label"
                          >
                            Physical Handicap
                          </label>
                          <select
                            id="physicalHandicap"
                            name="physicalHandicap"
                            className="form-control"
                            // value={formData.physicalHandicap}
                            // onChange={handleChange}
                            required
                          >
                            <option value="">
                              Select Physical Handicap Status
                            </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
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
                            // value={formData.aadharPassportNumber}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="aadharPassportFile"
                            className="form-label"
                          >
                            Aadhar/Passport Upload
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

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="panNumber" className="form-label">
                            PAN No
                          </label>
                          <input
                            type="text"
                            id="panNumber"
                            name="panNumber"
                            className="form-control"
                            // value={formData.panNumber}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="panFile" className="form-label">
                            PAN Upload
                          </label>
                          <input
                            type="file"
                            id="panFile"
                            name="panFile"
                            className="form-control"
                            accept="image/*,application/pdf"
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="UANNumber" className="form-label">
                            UAN No
                          </label>
                          <input
                            type="text"
                            id="UANNumber"
                            name="UANNumber"
                            className="form-control"
                            // value={formData.panNumber}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="ESICNumber" className="form-label">
                            ESIC No
                          </label>
                          <input
                            type="text"
                            id="ESICNumber"
                            name="ESICNumber"
                            className="form-control"
                            // value={formData.ESICNumber}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Bank Account Information
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="nameOfAccountholder"
                            className="form-label"
                          >
                            Name Of Accountholder
                          </label>
                          <input
                            type="text"
                            id="nameOfAccountholder"
                            name="nameOfAccountholder"
                            className="form-control"
                            // value={formData.nameOfAccountholder}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="nameOfBank" className="form-label">
                            Name Of Bank
                          </label>
                          <input
                            type="text"
                            id="nameOfBank"
                            name="nameOfBank"
                            className="form-control"
                            // value={formData.nameOfBank}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="IFSCCode" className="form-label">
                            IFSC Code
                          </label>
                          <input
                            type="text"
                            id="IFSCCode"
                            name="IFSCCode"
                            className="form-control"
                            // value={formData.IFSCCode}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="accountNumber" className="form-label">
                            Account Number
                          </label>
                          <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            className="form-control"
                            // value={formData.accountNumber}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="accountType" className="form-label">
                            Account Type
                          </label>
                          <input
                            type="text"
                            id="accountType"
                            name="accountType"
                            className="form-control"
                            // value={formData.accountType}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Document Upload
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="class12Certificate"
                            className="form-label"
                          >
                            Class 12 Certificate (Upload)
                          </label>
                          <input
                            type="file"
                            id="class12Certificate"
                            name="class12Certificate"
                            className="form-control"
                            accept="image/*,application/pdf"
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="degreeCertificate"
                            className="form-label"
                          >
                            Degree Certificate (Upload)
                          </label>
                          <input
                            type="file"
                            id="degreeCertificate"
                            name="degreeCertificate"
                            className="form-control"
                            accept="image/*,application/pdf"
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="resume" className="form-label">
                            Resume (Upload)
                          </label>
                          <input
                            type="file"
                            id="resume"
                            name="resume"
                            className="form-control"
                            accept="image/*,application/pdf"
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="experienceLetter"
                            className="form-label"
                          >
                            Experience Letter, If Applicable (Upload)
                          </label>
                          <input
                            type="file"
                            id="experienceLetter"
                            name="experienceLetter"
                            className="form-control"
                            accept="image/*,application/pdf"
                            // onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Others
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="securityDepositAmount"
                            className="form-label"
                          >
                            Security Deposit Amount
                          </label>
                          <input
                            type="number"
                            id="securityDepositAmount"
                            name="securityDepositAmount"
                            className="form-control"
                            // value={formData.securityDepositAmount}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="voluntaryPFContribution"
                            className="form-label"
                          >
                            Voluntary PF Contribution (Amt)
                          </label>
                          <input
                            type="number"
                            id="voluntaryPFContribution"
                            name="voluntaryPFContribution"
                            className="form-control"
                            // value={formData.voluntaryPFContribution}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="taxSystem" className="form-label">
                            Tax System
                          </label>
                          <select
                            id="taxSystem"
                            name="taxSystem"
                            className="form-control"
                            // value={formData.physicalHandicap}
                            // onChange={handleChange}
                            required
                          >
                            <option value="">Select Tax System</option>
                            <option value="old">Old</option>
                            <option value="New">New</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Nomination For Gratuity & Others
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="nomineeName" className="form-label">
                            Nominee Name
                          </label>
                          <input
                            type="text"
                            id="nomineeName"
                            name="nomineeName"
                            className="form-control"
                            // value={formData.nomineeName}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="nomineeRelation"
                            className="form-label"
                          >
                            Relation
                          </label>
                          <input
                            type="text"
                            id="nomineeRelation"
                            name="nomineeRelation"
                            className="form-control"
                            // value={formData.nomineeRelation}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="nomineeAadharNumber"
                            className="form-label"
                          >
                            Aadhar Number
                          </label>
                          <input
                            type="text"
                            id="nomineeAadharNumber"
                            name="nomineeAadharNumber"
                            className="form-control"
                            // value={formData.nomineeAadharNumber}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="nomineeAadharCardOrPassportFile"
                            className="form-label"
                          >
                            Aadhar Card/ Passport (Upload)
                          </label>
                          <input
                            type="file"
                            id="nomineeAadharCardOrPassportFile"
                            name="nomineeAadharCardOrPassportFile"
                            className="form-control"
                            accept="image/*,application/pdf"
                            required
                            // onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex  justify-content-between align-item-center">
                      <div className="card-header mt-1"></div>
                      <div className="card-header mt-1">
                        <h4 className="card-title text-center custom-heading-font">
                          Previous Employment
                        </h4>
                      </div>
                      <div className="text-end card-header">
                        <button
                          type="button"
                          className="btn btn-primary custom-submit-button"
                          onClick={addExperience}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    {/* <div className='row'>
                                        <h4 className="card-title text-center ">
                                               Experience 1
                                            </h4>
                                           <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="previousSchoolName" className="form-label">
                                                        School Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="previousSchoolName"
                                                        name="previousSchoolName"
                                                        className="form-control"
                                                        // value={formData.previousSchoolName}
                                                        // onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="previousSchoolAddress" className="form-label">
                                                       Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="previousSchoolAddress"
                                                        name="previousSchoolAddress"
                                                        className="form-control"
                                                        // value={formData.previousSchoolAddress}
                                                        // onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="previousSchoolJoiningDate" className="form-label">
                                                       From
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="previousSchoolJoiningDate"
                                                        name="previousSchoolJoiningDate"
                                                        className="form-control"
                                                        // value={formData.previousSchoolJoiningDate}
                                                        // onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="previousSchoolLastDate" className="form-label">
                                                       To
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="previousSchoolLastDate"
                                                        name="previousSchoolLastDate"
                                                        className="form-control"
                                                        // value={formData.previousSchoolLastDate}
                                                        // onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div> */}
                    {experiences.map((exp, index) => (
                      <div key={exp.id} className="row">
                        <div className="d-flex justify-content-between">
                          <div
                            className="card-header mt-0"
                            style={{ padding: "0.50rem" }}
                          >
                            <h4 className="card-title text-center">
                              Experience {index + 1}
                            </h4>
                          </div>
                          <div className="card-header p-0">
                            <Link
                              className="btn btn-soft-danger btn-sm"
                              onClick={() => removeExperience(exp.id)}
                            >
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor={`previousSchoolName-${exp.id}`}
                              className="form-label"
                            >
                              School Name
                            </label>
                            <input
                              type="text"
                              id={`previousSchoolName-${exp.id}`}
                              name={`previousSchoolName-${exp.id}`}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor={`previousSchoolAddress-${exp.id}`}
                              className="form-label"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              id={`previousSchoolAddress-${exp.id}`}
                              name={`previousSchoolAddress-${exp.id}`}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor={`previousSchoolJoiningDate-${exp.id}`}
                              className="form-label"
                            >
                              From
                            </label>
                            <input
                              type="date"
                              id={`previousSchoolJoiningDate-${exp.id}`}
                              name={`previousSchoolJoiningDate-${exp.id}`}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor={`previousSchoolLastDate-${exp.id}`}
                              className="form-label"
                            >
                              To
                            </label>
                            <input
                              type="date"
                              id={`previousSchoolLastDate-${exp.id}`}
                              name={`previousSchoolLastDate-${exp.id}`}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                      >
                        Submit
                      </button>
                    </div>
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

export default EmployeeDetails;
