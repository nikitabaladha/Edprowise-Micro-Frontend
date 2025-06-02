import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const UpdateEmployeeDetails = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("");
  const [reasonForLeaving, setReasonForLeaving] = useState("");
  const [pfCode, setPfCode] = useState("");
  const [esiCode, setEsiCode] = useState("");
  const [experiences, setExperiences] = useState([{ id: 1 }]);
  const [nominees, setNominees] = useState([{ id: 1 }]);

  const handleProceed = () => {
    setShowForm(true);
  };

  const addExperience = () => {
    const newExperience = { id: experiences.length + 1 };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id) => {
    if (id !== 1) {
      setExperiences(experiences.filter((exp) => exp.id !== id));
    }
  };

  const addNominee = () => {
    const newNominee = { id: nominees.length + 1 };
    setNominees([...nominees, newNominee]);
  };

  const removeNominee = (id) => {
    if (id !== 1) {
      setNominees(nominees.filter((nom) => nom.id !== id));
    }
  };

  const validateEmployeeId = (id) => {
    return id.trim().length > 0;
  };

  const handleReasonChange = (e) => {
    const reason = e.target.value;
    setReasonForLeaving(reason);

    // Auto fill PF and ESI based on reason
    const codeMap = {
      "Left Service": { pf: "C", esi: "2" },
      Retirement: { pf: "R", esi: "3" },
      "Out of Coverage": { pf: "NA", esi: "4" },
      Death: { pf: "D", esi: "5" },
      Retrenchment: { pf: "C", esi: "10" },
      "Permanent Disable": { pf: "P", esi: "2" },
    };

    if (codeMap[reason]) {
      setPfCode(codeMap[reason].pf);
      setEsiCode(codeMap[reason].esi);
    } else {
      setPfCode("");
      setEsiCode("");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="payroll-title text-center">
                    Employee Details
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="row mb-3">
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
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                        placeholder="Enter Employee ID"
                      />
                    </div>
                  </div>
                  <div
                    className={`col-md-2 ${showForm ? "d-none" : ""}`}
                    style={{ alignContent: "end", textAlign: "center" }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={handleProceed}
                    >
                      Proceed
                    </button>
                  </div>
                </div>

                {showForm && (
                  <>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-6">
                          <label htmlFor="name" className="form-label">
                            Name of Employee{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            // value={formData.name}
                            // onChange={handleChange}
                            value={"Umesh Jadhav"}
                            required
                            placeholder="Enter Employee Name"
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
                    </div>

                    <div className="row">
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

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="categoryOfEmployees"
                            className="form-label"
                          >
                            Category of Employees{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            id="categoryOfEmployees"
                            name="categoryOfEmployees"
                            className="form-control"
                            // value={formData.categoryOfEmployee}
                            // onChange={handleChange}
                            value={"Teaching Staff"}
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
                            Grade <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="grade"
                            name="grade"
                            className="form-control"
                            // value={formData.grade}
                            // onChange={handleChange}
                            value={"A"}
                            required
                            placeholder="Enter Grade"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="jobDesignation"
                            className="form-label"
                          >
                            Job Designation{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="jobDesignation"
                            name="jobDesignation"
                            className="form-control"
                            // value={formData.jobDesignation}
                            // onChange={handleChange}
                            value={"Teacher"}
                            required
                            placeholder="Enter Job Designation"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="dateOfBirth" className="form-label">
                            Date of Birth <span className="text-danger">*</span>
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
                            Father Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="fatherName"
                            name="fatherName"
                            className="form-control"
                            // value={formData.fatherName}
                            // onChange={handleChange}
                            value={"Ram"}
                            required
                            placeholder="Enter Father Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-6">
                          <label htmlFor="spouseName" className="form-label">
                            Spouse Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="spouseName"
                            name="spouseName"
                            className="form-control"
                            // value={formData.spouseName}
                            // onChange={handleChange}
                            value={"Lili"}
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
                            Current Address{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            id="currentAddress"
                            name="currentAddress"
                            rows={3}
                            //   value={formData.currentAddress}
                            //   onChange={handleChange}
                            value={"At.post Nashik"}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="contactNumber" className="form-label">
                            Contact Number{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            className="form-control"
                            // value={formData.contactNumber}
                            // onChange={handleChange}
                            value={"1234567890"}
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
                            Emergency Contact Number{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="tel"
                            id="emergencyContactNumber"
                            name="emergencyContactNumber"
                            className="form-control"
                            // value={formData.emergencyContactNumber}
                            // onChange={handleChange}
                            value={"1234567890"}
                            placeholder="Example : 1234567890"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="emailId" className="form-label">
                            Email ID <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            id="emailId"
                            name="emailId"
                            className="form-control"
                            // value={formData.emailId}
                            // onChange={handleChange}
                            required
                            value={"xyz@gmail.com"}
                            placeholder="Example : xyz@gmail.com"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="nationality" className="form-label">
                            Nationality <span className="text-danger">*</span>
                          </label>
                          <select
                            id="nationality"
                            name="nationality"
                            className="form-control"
                            // value={formData.nationality}
                            // onChange={handleChange}
                            value={"Indian"}
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
                            Religion <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="religion"
                            name="religion"
                            className="form-control"
                            // value={formData.religion}
                            // onChange={handleChange}
                            value={"Hindu"}
                            placeholder="Enter Religion"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="gender" className="form-label">
                            Gender <span className="text-danger">*</span>
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            className="form-control"
                            // value={formData.gender}
                            // onChange={handleChange}
                            value={"Male"}
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
                            Marital Status{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            id="maritalStatus"
                            name="maritalStatus"
                            className="form-control"
                            // value={formData.maritalStatus}
                            // onChange={handleChange}
                            value={"Married"}
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
                            Higher Qualification{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            id="higherQualification"
                            name="higherQualification"
                            className="form-control"
                            // value={formData.higherQualification}
                            // onChange={handleChange}
                            value={"Below Class 12"}
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
                            Physical Handicap{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            id="physicalHandicap"
                            name="physicalHandicap"
                            className="form-control"
                            // value={formData.physicalHandicap}
                            // onChange={handleChange}
                            value={"No"}
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
                            Aadhar/Passport Number{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="aadharPassportNumber"
                            name="aadharPassportNumber"
                            className="form-control"
                            // value={formData.aadharPassportNumber}
                            // onChange={handleChange}
                            value={"147852369012"}
                            required
                            placeholder="Enter Aadhar/Passport Number"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="aadharPassportFile"
                            className="form-label"
                          >
                            Aadhar/Passport Upload{" "}
                            <span className="text-danger">*</span>
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
                            PAN Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="panNumber"
                            name="panNumber"
                            className="form-control"
                            // value={formData.panNumber}
                            // onChange={handleChange}
                            value={"CJKPJ1425"}
                            required
                            placeholder="Enter PAN Number"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="panFile" className="form-label">
                            PAN Upload <span className="text-danger">*</span>
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
                          <label htmlFor="UanNumber" className="form-label">
                            UAN Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="UanNumber"
                            name="UanNumber"
                            className="form-control"
                            // value={formData.panNumber}
                            // onChange={handleChange}
                            required
                            value={"12365478"}
                            placeholder="Enter UAN Number"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="ESICNumber" className="form-label">
                            ESIC Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="ESICNumber"
                            name="ESICNumber"
                            className="form-control"
                            // value={formData.ESICNumber}
                            // onChange={handleChange}
                            value={"12365478"}
                            required
                            placeholder="Enter ESIC Number"
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
                            Name of Accountholder{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="nameOfAccountholder"
                            name="nameOfAccountholder"
                            className="form-control"
                            // value={formData.nameOfAccountholder}
                            // onChange={handleChange}
                            required
                            value={"Umesh Jadhav"}
                            placeholder="Enter Name of Accountholder"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="nameOfBank" className="form-label">
                            Name of Bank <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="nameOfBank"
                            name="nameOfBank"
                            className="form-control"
                            // value={formData.nameOfBank}
                            // onChange={handleChange}
                            required
                            value={"SBI"}
                            placeholder="Enter Bank Name"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="IFSCCode" className="form-label">
                            IFSC Code <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="IFSCCode"
                            name="IFSCCode"
                            className="form-control"
                            // value={formData.IFSCCode}
                            // onChange={handleChange}
                            required
                            value={"SBI00001"}
                            placeholder="Enter IFSC Code"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="accountNumber" className="form-label">
                            Account Number{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            className="form-control"
                            // value={formData.accountNumber}
                            // onChange={handleChange}
                            required
                            value={"123456987"}
                            placeholder="Enter Account Number"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="accountType" className="form-label">
                            Account Type <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="accountType"
                            name="accountType"
                            className="form-control"
                            // value={formData.accountType}
                            // onChange={handleChange}
                            required
                            value={"Saving Account"}
                            placeholder="Enter Account Type"
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
                            Class 12 Certificate{" "}
                            <span className="text-danger">*</span>
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
                            Degree Certificate{" "}
                            <span className="text-danger">*</span>
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

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="resume" className="form-label">
                            Resume <span className="text-danger">*</span>
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

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="experienceLetter"
                            className="form-label"
                          >
                            Experience Letter
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

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="relievingLetter"
                            className="form-label"
                          >
                            Relieving Letter
                          </label>
                          <input
                            type="file"
                            id="relievingLetter"
                            name="relievingLetter"
                            className="form-control"
                            accept="image/*,application/pdf"
                            // onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Nomination For Gratuity & Others
                      </h4>
                    </div>

                    {nominees.map((nominee, index) => (
                      <div key={nominee.id} className="row">
                        <div
                          className="d-flex justify-content-between"
                          style={{ padding: "0" }}
                        >
                          <div
                            className="card-header mt-0"
                            style={{ padding: "0.50rem", borderBottom: "none" }}
                          >
                            <h4 className="card-title text-center">
                              Nominee {index + 1}
                            </h4>
                          </div>
                          {nominee.id !== 1 && (
                            <div className="card-header p-0">
                              <Link
                                className="btn btn-soft-danger btn-sm"
                                onClick={() => removeNominee(nominee.id)}
                              >
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="nomineeName" className="form-label">
                              Nominee Name{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="nomineeName"
                              name="nomineeName"
                              className="form-control"
                              // value={formData.nomineeName}
                              // onChange={handleChange}
                              value={"jack"}
                              required
                              placeholder="Enter Nominee Name"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="nomineeRelation"
                              className="form-label"
                            >
                              Relation <span className="text-danger">*</span>
                            </label>
                            <select
                              id="nomineeRelation"
                              name="nomineeRelation"
                              className="form-control"
                              // value={formData.nomineeRelation}
                              // onChange={handleChange}
                              value={"Sibling"}
                              required
                            >
                              <option value="">Select Relation</option>
                              <option value="Father">Father</option>
                              <option value="Mother">Mother</option>
                              <option value="Sibling">Sibling</option>
                              <option value="Spouse">Spouse</option>
                              <option value="Child">Child</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3">
                            <label
                              htmlFor="nomineeAadharNumber"
                              className="form-label"
                            >
                              Aadhar Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="nomineeAadharNumber"
                              name="nomineeAadharNumber"
                              className="form-control"
                              // value={formData.nomineeAadharNumber}
                              // onChange={handleChange}
                              required
                              value={"123654789"}
                              placeholder="Enter Nominee Aadhar Number"
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3">
                            <label
                              htmlFor="nomineeAadharCardOrPassportFile"
                              className="form-label"
                            >
                              Aadhar Card/ Passport (Upload){" "}
                              <span className="text-danger">*</span>
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

                        <div className="col-md-4">
                          <div className="mb-3">
                            <label
                              htmlFor="nomineeShearPercentage"
                              className="form-label"
                            >
                              Share Percentage (%){" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="nomineeShearPercentage"
                              name="nomineeShearPercentage"
                              className="form-control"
                              // value={nomineeShearPercentage}
                              // onChange={handleChange}
                              required
                              value={"100%"}
                              placeholder="Enter Nominee Shear Percentage "
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="text-end card-header">
                      <button
                        type="button"
                        className="btn btn-primary custom-submit-button"
                        onClick={addNominee}
                      >
                        Add Nominee
                      </button>
                    </div>

                    <div className="card-header mt-1">
                      <h4 className="card-title text-center custom-heading-font">
                        Previous Employment
                      </h4>
                    </div>

                    {experiences.map((exp, index) => (
                      <div key={exp.id} className="row">
                        <div
                          className="d-flex justify-content-between"
                          style={{ padding: "0" }}
                        >
                          <div
                            className="card-header mt-0"
                            style={{ padding: "0.50rem", borderBottom: "none" }}
                          >
                            <h4 className="card-title text-center">
                              Experience {index + 1}
                            </h4>
                          </div>
                          {exp.id !== 1 && (
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
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor={`previousSchoolName-${exp.id}`}
                              className="form-label"
                            >
                              School Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id={`previousSchoolName-${exp.id}`}
                              name={`previousSchoolName-${exp.id}`}
                              className="form-control"
                              required
                              value={"XYZ School"}
                              placeholder="Enter Previous School Name"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor={`previousSchoolAddress-${exp.id}`}
                              className="form-label"
                            >
                              Address <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id={`previousSchoolAddress-${exp.id}`}
                              name={`previousSchoolAddress-${exp.id}`}
                              className="form-control"
                              required
                              value={"Nashik"}
                              placeholder="Enter Previous School Address"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor={`previousSchoolJoiningDate-${exp.id}`}
                              className="form-label"
                            >
                              From <span className="text-danger">*</span>
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
                              To <span className="text-danger">*</span>
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

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor={`previousJobDesignation-${exp.id}`}
                              className="form-label"
                            >
                              Job Designation{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id={`previousJobDesignation-${exp.id}`}
                              name={`previousJobDesignation-${exp.id}`}
                              className="form-control"
                              required
                              value={"Teacher"}
                              placeholder="Enter Previous Job Designation "
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor={`previousSchoolName-${exp.id}`}
                              className="form-label"
                            >
                              No. of Experience{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id={`previousSchoolName-${exp.id}`}
                              name={`previousSchoolName-${exp.id}`}
                              className="form-control"
                              required
                              value={"3 Months"}
                              placeholder="Enter"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="text-end card-header">
                      <button
                        type="button"
                        className="btn btn-primary custom-submit-button"
                        onClick={addExperience}
                      >
                        Add Employment
                      </button>
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
                            Security Deposit Amount{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            id="securityDepositAmount"
                            name="securityDepositAmount"
                            className="form-control"
                            // value={formData.securityDepositAmount}
                            // onChange={handleChange}
                            required
                            value={"500"}
                            placeholder="Enter Security Deposit Amount"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="voluntaryPFContribution"
                            className="form-label"
                          >
                            Voluntary PF Contribution (Amount)
                          </label>
                          <input
                            type="number"
                            id="voluntaryPFContribution"
                            name="voluntaryPFContribution"
                            className="form-control"
                            // value={formData.voluntaryPFContribution}
                            // onChange={handleChange}
                            value={"500"}
                            required
                            placeholder="Enter Voluntary PF Contribution"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="taxRegime" className="form-label">
                            Tax Regime <span className="text-danger">*</span>
                          </label>
                          <select
                            id="taxRegime"
                            name="taxRegime"
                            className="form-control"
                            // value={formData.physicalHandicap}
                            // onChange={handleChange}
                            value={"Old"}
                            required
                          >
                            <option value="">Select Tax Regime</option>
                            <option value="old">Old</option>
                            <option value="New">New</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Status
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="status" className="form-label">
                            Status <span className="text-danger">*</span>
                          </label>
                          <select
                            id="status"
                            name="status"
                            className="form-control"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                          >
                            <option value="">Select Status</option>
                            <option value="Left">Left</option>
                            <option value="On Payroll">On Payroll</option>
                          </select>
                        </div>
                      </div>

                      {status === "Left" && (
                        <>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                htmlFor="lastWorkingDate"
                                className="form-label"
                              >
                                Last Working Date{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                id="lastWorkingDate"
                                name="lastWorkingDate"
                                className="form-control"
                                // value={formData.lastWorkingDate}
                                // onChange={handleChange}
                                required
                                placeholder="joiningDate"
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="mb-3">
                              <label
                                htmlFor="reasonForLeaving"
                                className="form-label"
                              >
                                Reason for Leaving{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                id="reasonForLeaving"
                                name="reasonForLeaving"
                                className="form-control"
                                value={reasonForLeaving}
                                onChange={handleReasonChange}
                                required
                              >
                                <option value="">
                                  Select Reason for Leaving
                                </option>
                                <option value="Left Service">
                                  Left Service
                                </option>
                                <option value="Retirement">Retirement</option>
                                <option value="Out of Coverage">
                                  Out of Coverage
                                </option>
                                <option value="Death">Death</option>
                                <option value="Retrenchment">
                                  Retrenchment
                                </option>
                                <option value="Permanent Disable">
                                  Permanent Disable
                                </option>
                              </select>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="mb-3">
                              <label htmlFor="pfCode" className="form-label">
                                PF Code
                              </label>
                              <input
                                type="text"
                                id="pfCode"
                                name="pfCode"
                                className="form-control"
                                value={pfCode}
                                // onChange={handleChange}
                                required
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="mb-3">
                              <label htmlFor="eslCode" className="form-label">
                                ESI Code
                              </label>
                              <input
                                type="text"
                                id="eslCode"
                                name="eslCode"
                                className="form-control"
                                value={esiCode}
                                required
                                readOnly
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
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

export default UpdateEmployeeDetails;
