import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getAPI from "../../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";

const UpdateTCForm = () => {
  const location = useLocation();
  const student = location.state?.student;
  const [classes, setClasses] = useState([]);
  const [schoolId, setSchoolId] = useState("");

  const [formData, setFormData] = useState({
    AdmissionNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    nationality: "",
    fatherName: "",
    motherName: "",
    dateOfIssue: "",
    dateOfAdmission: "",
    masterDefineClass: "",
    percentageObtainInLastExam: "",
    qualifiedPromotionInHigherClass: "",
    whetherFaildInAnyClass: "",
    anyOutstandingDues: "",
    moralBehaviour: "",
    dateOfLastAttendanceAtSchool: "",
    reasonForLeaving: "",
    anyRemarks: "",
    agreementChecked: false,
    TCfees: "",
    concessionAmount: "",
    finalAmount: "",
    name: "",
    paymentMode: "",
    chequeNumber: "",
    bankName: "",
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }

    setSchoolId(id);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!schoolId) return;
        const response = await getAPI(
          `/get-class-and-section/${schoolId}`,
          {},
          true
        );
        setClasses(response?.data?.data || []);
      } catch (error) {
        toast.error("Error fetching class and section data.");
      }
    };

    fetchData();
  }, [schoolId]);

  useEffect(() => {
    if (student) {
      setFormData({
        studentPhoto: student.studentPhoto || null,
        AdmissionNumber: student.AdmissionNumber || "",
        firstName: student.firstName || "",
        middleName: student.middleName || "",
        lastName: student.lastName || "",
        dateOfBirth: student.dateOfBirth
          ? student.dateOfBirth.split("T")[0]
          : "",
        age: student.age || "",
        nationality: student.nationality || "",
        fatherName: student.fatherName || "",
        motherName: student.motherName || "",
        dateOfIssue: student.dateOfIssue
          ? student.dateOfIssue.split("T")[0]
          : "",
        dateOfAdmission: student.dateOfAdmission
          ? student.dateOfAdmission.split("T")[0]
          : "",
        masterDefineClass: student.masterDefineClass || "",
        percentageObtainInLastExam: student.percentageObtainInLastExam || "",
        qualifiedPromotionInHigherClass:
          student.qualifiedPromotionInHigherClass || "",
        whetherFaildInAnyClass: student.whetherFaildInAnyClass || "",
        anyOutstandingDues: student.anyOutstandingDues || "",
        moralBehaviour: student.moralBehaviour || "",
        dateOfLastAttendanceAtSchool: student.dateOfLastAttendanceAtSchool
          ? student.dateOfLastAttendanceAtSchool.split("T")[0]
          : "",
        agreementChecked: student.agreementChecked || "",
        reasonForLeaving: student.reasonForLeaving || "",
        anyRemarks: student.anyRemarks || "",
        TCfees: student.TCfees || 0,
        concessionAmount: student.concessionAmount || 0,
        finalAmount: student.finalAmount || 0,
        name: student.name || "",
        paymentMode: student.paymentMode || "",
        ApplicationReceivedOn: student.ApplicationReceivedOn
          ? student.ApplicationReceivedOn.split("T")[0]
          : "",
        transactionNumber: student.transactionNumber || "",
        receiptNumber: student.receiptNumber || "",
        certificateNumber: student.certificateNumber || "",
      });
    }
  }, [student]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Transfer Certificate Form
                  </h4>
                </div>
              </div>
              <form onSubmit={""}>
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
                        <label htmlFor="AdmissionNumber" className="form-label">
                          Admission No
                        </label>
                        <input
                          type="text"
                          id="AdmissionNumber"
                          name="AdmissionNumber"
                          className="form-control"
                          value={formData.AdmissionNumber}
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
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="nationality" className="form-label">
                        Nationality<span className="text-danger">*</span>
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
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="fatherName" className="form-label">
                        Father Name<span className="text-danger">*</span>
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

                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="motherName" className="form-label">
                        Mother Name<span className="text-danger">*</span>
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
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="dateOfIssue" className="form-label">
                        Date Of Issue<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="dateOfIssue"
                        name="dateOfIssue"
                        className="form-control"
                        value={formData.dateOfIssue}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="dateOfAdmission" className="form-label">
                        Date Of Admission In School
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="dateOfAdmission"
                        name="dateOfAdmission"
                        className="form-control"
                        value={formData.dateOfAdmission}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="studentLastClass" className="form-label">
                        Class in Which Student Studied Last
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        id="masterDefineClass"
                        name="masterDefineClass"
                        className="form-control"
                        value={formData.masterDefineClass}
                        disabled
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

                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label
                        htmlFor="percentageObtainInLastExam"
                        className="form-label"
                      >
                        Percentage/Gradem Obtain In Last Exam
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="percentageObtainInLastExam"
                        name="percentageObtainInLastExam"
                        className="form-control"
                        value={formData.percentageObtainInLastExam}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label
                        htmlFor="qualifiedPromotionInHigherClass"
                        className="form-label"
                      >
                        Whether Qualified For Promotion In Higher Class
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="qualifiedPromotionInHigherClass"
                        name="qualifiedPromotionInHigherClass"
                        className="form-control"
                        value={formData.qualifiedPromotionInHigherClass}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label
                        htmlFor="whetherFaildInAnyClass"
                        className="form-label"
                      >
                        Whether Failed In Any Class
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="whetherFaildInAnyClass"
                        name="whetherFaildInAnyClass"
                        className="form-control"
                        value={formData.whetherFaildInAnyClass}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label
                        htmlFor="anyOutstandingDues"
                        className="form-label"
                      >
                        Any Outstanding Dues
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="anyOutstandingDues"
                        name="anyOutstandingDues"
                        className="form-control"
                        value={formData.anyOutstandingDues}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="moralBehaviour" className="form-label">
                        Moral Behaviour<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="moralBehaviour"
                        name="moralBehaviour"
                        className="form-control"
                        value={formData.moralBehaviour}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="mb-3">
                      <label
                        htmlFor="dateOfLastAttendanceAtSchool"
                        className="form-label"
                      >
                        Date Of Last Attendance At School
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="dateOfLastAttendanceAtSchool"
                        name="dateOfLastAttendanceAtSchool"
                        className="form-control"
                        value={formData.dateOfLastAttendanceAtSchool}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-7">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="reasonForLeaving" className="form-label">
                        Reason For Leaving
                      </label>
                      <input
                        type="text"
                        id="reasonForLeaving"
                        name="reasonForLeaving"
                        className="form-control"
                        value={formData.reasonForLeaving}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="anyRemarks" className="form-label">
                        Any Other Remarks
                      </label>
                      <input
                        type="text"
                        id="anyRemarks"
                        name="anyRemarks"
                        className="form-control"
                        value={formData.anyRemarks}
                        disabled
                      />
                    </div>
                  </div>
                </div>

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
                      id="agreementCheck"
                      name="agreementChecked"
                      checked={formData.agreementChecked}
                      disabled
                    />
                    <label
                      className="form-check-label"
                      htmlFor="agreementCheck"
                    >
                      The certificate is issued for the purpose of admission to
                      another School.
                    </label>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="TCfees" className="form-label">
                        TC Fees <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        id="TCfees"
                        name="TCfees"
                        className="form-control"
                        value={formData.TCfees}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="concessionamount" className="form-label">
                        Concession
                      </label>
                      <input
                        // type="number"
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
                        Name of Person Filling the Form{" "}
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
                        Payment Option <span className="text-danger">*</span>
                      </label>
                      <select
                        id="paymentMode"
                        name="paymentMode"
                        className="form-control"
                        value={formData.paymentMode}
                        disabled
                      >
                        <option value="">Select</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>
                  </div>
                </div>

                {formData.paymentMode === "Cheque" && (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="chequeNumber" className="form-label">
                          Cheque Number <span className="text-danger">*</span>
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
                  </div>
                )}

                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    For Official Use Only
                  </h4>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="dateOfApplicationReceived"
                        className="form-label"
                      >
                        Application Received On
                      </label>
                      <input
                        type="date"
                        id="dateOfApplicationReceived"
                        name="dateOfApplicationReceived"
                        className="form-control"
                        value={formData.ApplicationReceivedOn}
                        required
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
                        value={formData.receiptNumber}
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="certificateNumber" className="form-label">
                        Certificate No.
                      </label>
                      <input
                        type="text"
                        id="certificateNumber"
                        name="certificateNumber"
                        className="form-control"
                        value={formData.certificateNumber}
                        required
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="feesReceivedBy" className="form-label">
                        Payment Mode
                      </label>
                      <input
                        type="text"
                        id="feesReceivedBy"
                        name="feesReceivedBy"
                        className="form-control"
                        required
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
                            ? new Date(student.paymentDate).toLocaleDateString(
                                "en-GB"
                              )
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
                  <div className="mr-2"> </div>
                  <div className="text" style={{ marginLeft: "2px" }}></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateTCForm;
