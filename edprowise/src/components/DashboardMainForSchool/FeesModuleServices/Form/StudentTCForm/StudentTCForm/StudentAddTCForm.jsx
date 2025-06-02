import React, { useState, useEffect } from "react";
import getAPI from "../../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";
import validateBasicForm from "../FormValidation/FormValidation.jsx";
import postAPI from "../../../../../../api/postAPI.jsx";
import { useNavigate } from "react-router-dom";

const StudentAddTCForm = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [existingStudents, setExistingStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showFullForm, setShowFullForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  const [oneTimeFeesList, setOneTimeFeesList] = useState([]);
  const [availableFeeTypes, setAvailableFeeTypes] = useState([]);
  const [selectedFeeType, setSelectedFeeType] = useState("");
  const [tcFees, setTcFees] = useState(0);
  const [concessionAmount, setConcessionAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [isFetchingFees, setIsFetchingFees] = useState(false);

  const academicYear = localStorage.getItem("selectedAcademicYear");

  const [formData, setFormData] = useState({
    academicYear: academicYear,
    studentPhoto: null,
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
    if (!schoolId) return;

    const fetchStudents = async () => {
      try {
        const response = await getAPI(`/get-admission-form/${schoolId}`);
        console.log("API response:", response);

        if (!response.hasError) {
          const studentArray = Array.isArray(response.data.data)
            ? response.data.data
            : [];
          setExistingStudents(studentArray);
        } else {
          toast.error(response.message || "Failed to fetch student list.");
        }
      } catch (err) {
        toast.error("Error fetching student data.");
        console.error("Student Fetch Error:", err);
      }
    };

    fetchStudents();
  }, [schoolId]);

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

  const fetchClassRelatedFeeTypes = async (classId) => {
    if (!classId) {
      setAvailableFeeTypes([]);
      setOneTimeFeesList([]);
      setSelectedFeeType("");
      setTcFees(0);
      setConcessionAmount(0);
      setFinalAmount(0);
      return;
    }

    setIsFetchingFees(true);
    try {
      const response = await getAPI(
        `/get-one-time-feesbyIds/${schoolId}/${classId}/${academicYear}`,
        {},
        true
      );
      if (response?.data?.data) {
        setOneTimeFeesList(response.data.data);
        const feeTypes = [];
        response.data.data.forEach((feeItem) => {
          if (feeItem.oneTimeFees && feeItem.oneTimeFees.length > 0) {
            feeItem.oneTimeFees.forEach((fee) => {
              if (fee.feesTypeId && fee.feesTypeId._id) {
                feeTypes.push({
                  id: fee.feesTypeId._id,
                  name: fee.feesTypeId.feesTypeName,
                });
              }
            });
          }
        });

        setAvailableFeeTypes(feeTypes, () => {
          console.log("Updated availableFeeTypes:", feeTypes);
        });

        if (feeTypes.length === 0) {
          toast.warn("No fee types available for the selected class.");
        }
      } else {
        setAvailableFeeTypes([]);
        toast.error("No fee types found for the selected class.");
      }
    } catch (error) {
      toast.error("Error fetching fee types for selected class");
      console.error("Fee type fetch error:", error);
      setAvailableFeeTypes([]);
    } finally {
      setIsFetchingFees(false);
    }
  };

  useEffect(() => {
    setFinalAmount(tcFees - concessionAmount);
    setFormData((prev) => ({
      ...prev,
      finalAmount: (tcFees - concessionAmount).toString(),
    }));
  }, [tcFees, concessionAmount]);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === "masterDefineClass") {
      setAvailableFeeTypes([]);
      setSelectedFeeType("");
      setTcFees(0);
      setConcessionAmount(0);
      setFinalAmount(0);
      setOneTimeFeesList([]);

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        TCfees: "",
        concessionAmount: "",
        finalAmount: "",
      }));

      if (value) {
        fetchClassRelatedFeeTypes(value);
      }
    } else if (name === "selectedFeeType") {
      setSelectedFeeType(value);
      const feeItem = oneTimeFeesList.find((item) =>
        item.oneTimeFees.some((fee) => fee.feesTypeId._id === value)
      );

      if (feeItem) {
        const selectedFee = feeItem.oneTimeFees.find(
          (fee) => fee.feesTypeId._id === value
        );
        if (selectedFee) {
          const newTCFees = selectedFee.amount;
          setTcFees(newTCFees);
          setConcessionAmount(0);
          setFinalAmount(newTCFees);

          setFormData((prev) => ({
            ...prev,
            TCfees: newTCFees.toString(),
            concessionAmount: "0",
            finalAmount: newTCFees.toString(),
          }));
        }
      }
    } else if (name === "concessionAmount") {
      const concession = Number(value) || 0;
      if (concession > tcFees) {
        toast.error("Concession cannot exceed TC fees");
        return;
      }
      const newFinalAmount = tcFees - concession;

      setConcessionAmount(concession);
      setFinalAmount(newFinalAmount);
      setFormData((prev) => ({
        ...prev,
        concessionAmount: value,
        finalAmount: newFinalAmount.toString(),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAdmissionSubmit = (e) => {
    e.preventDefault();

    const selectedAdmissionNumber = formData.AdmissionNumber.trim();
    const student = existingStudents.find(
      (s) => s.AdmissionNumber.trim() === selectedAdmissionNumber
    );

    if (!student) {
      toast.error(
        "Invalid admission number. Please select a valid admission number from the list."
      );
      return;
    }

    setSelectedStudent(student);
    setFormData((prev) => ({
      ...prev,
      studentPhoto: student.studentPhoto || null,
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split("T")[0] : "",
      nationality: student.nationality,
      masterDefineClass:
        student?.masterDefineClass?._id || student?.masterDefineClass || "",
      fatherName: student.fatherName,
      motherName: student.motherName,
      name: student.name,
      paymentMode: student.paymentMode,
      dateOfAdmission: student.applicationDate
        ? student.applicationDate.split("T")[0]
        : "",
    }));

    if (student?.masterDefineClass?._id || student?.masterDefineClass) {
      fetchClassRelatedFeeTypes(
        student.masterDefineClass._id || student.masterDefineClass
      );
    }

    setShowFullForm(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        studentPhoto: file,
      }));
    }
  };

  useEffect(() => {
    if (formData.dateOfBirth) {
      try {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        if (birthDate > today) {
          toast.error("Date of birth cannot be in the future");
          setFormData((prev) => ({ ...prev, dateOfBirth: "", age: "" }));
          return;
        }
        const maxAgeDate = new Date();
        maxAgeDate.setFullYear(maxAgeDate.getFullYear() - 120);
        if (birthDate < maxAgeDate) {
          toast.error("Please enter a valid date of birth");
          setFormData((prev) => ({ ...prev, dateOfBirth: "", age: "" }));
          return;
        }

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        setFormData((prev) => ({
          ...prev,
          age: age > 0 ? age.toString() : "0",
        }));
      } catch (error) {
        console.error("Error calculating age:", error);
        toast.error("Invalid date format");
        setFormData((prev) => ({ ...prev, dateOfBirth: "", age: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, age: "" }));
    }
  }, [formData.dateOfBirth]);

  const handleSave = (e) => {
    e.preventDefault();
    const error = validateBasicForm(formData);

    if (error) {
      toast.error(error);
      return;
    }

    setShowAdditionalData(true);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreementChecked) {
      toast.error("You must agree to the certificate purpose statement");
      return;
    }

    if (!formData.name || formData.name.trim() === "") {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.paymentMode) {
      toast.error("Please select a payment option");
      return;
    }

    if (
      formData.paymentMode === "Cheque" &&
      (!formData.chequeNumber || !formData.bankName)
    ) {
      toast.error("Please provide cheque number and bank name");
      return;
    }

    const payload = new FormData();
    payload.append("schoolId", schoolId);

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        payload.append(key, formData[key]);
      }
    }

    try {
      const response = await postAPI("/create-TC-form", payload, {
        "Content-Type": "multipart/form-data",
      });

      if (!response.hasError) {
        toast.success("Transfer Certificate submitted successfully!");
        const stateData = {
          data: response.data || response.student,
          feeTypeName:
            availableFeeTypes.find((fee) => fee.id === selectedFeeType)?.name ||
            "",
          className:
            classes.find((c) => c._id === formData.masterDefineClass)
              ?.className || "",
        };

        console.log("State data being passed:", stateData);
        navigate(`/school-dashboard/fees-module/form/trasfer-certificate-list`);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error("An error occurred during registration");
      }
    }
  };

  const handleRefreshFeeTypes = () => {
    if (formData.masterDefineClass) {
      fetchClassRelatedFeeTypes(formData.masterDefineClass);
    } else {
      toast.error("Please select a class first");
    }
  };

  if (!showFullForm) {
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
                <form onSubmit={handleAdmissionSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="AdmissionNumber" className="form-label">
                          Admission No
                        </label>
                        <input
                          type="text"
                          id="AdmissionNumber"
                          name="AdmissionNumber"
                          className="form-control"
                          list="AdmissionNumbers"
                          value={formData.AdmissionNumber}
                          onChange={handleChange}
                          required
                          placeholder="Search or select admission number"
                        />
                        <datalist id="AdmissionNumbers">
                          {existingStudents.map((student, index) => (
                            <option key={index} value={student.AdmissionNumber}>
                              {student.AdmissionNumber} - {student.firstName}{" "}
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
                    Transfer Certificate Form
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
                      {formData.studentPhoto ? (
                        typeof formData.studentPhoto === "string" ? (
                          <img
                            src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.studentPhoto}`}
                            alt="Student"
                            className="w-100 h-100 object-fit-cover"
                          />
                        ) : (
                          <img
                            src={URL.createObjectURL(formData.studentPhoto)}
                            alt="Student"
                            className="w-100 h-100 object-fit-cover"
                          />
                        )
                      ) : (
                        <div className="text-secondary">Photo</div>
                      )}
                    </div>
                    <div className="mb-3 w-100 text-center">
                      <input
                        type="file"
                        id="studentPhoto"
                        name="studentPhoto"
                        className="d-none"
                        accept=".jpg,.jpeg"
                        onChange={handlePhotoUpload}
                      />
                      <label
                        htmlFor="studentPhoto"
                        className="btn btn-primary btn-sm"
                      >
                        Upload Photo
                      </label>
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
                          onChange={handleChange}
                          required
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
                            onChange={handleChange}
                            required
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                            required
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
                            onChange={handleChange}
                            required
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
                            onChange={handleChange}
                            required
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
                        Nationality<span className="text-danger">*</span>
                      </label>
                      <select
                        id="nationality"
                        name="nationality"
                        className="form-control"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
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
                      <label htmlFor="fatherName" className="form-label">
                        Father Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        className="form-control"
                        value={formData.fatherName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
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
                        onChange={handleChange}
                        required
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
                        onChange={handleChange}
                        required
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
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="masterDefineClass" className="form-label">
                        Class in Which Student Studied Last
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        id="masterDefineClass"
                        name="masterDefineClass"
                        className="form-control"
                        value={formData.masterDefineClass}
                        onChange={handleChange}
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
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label
                        htmlFor="percentageObtainInLastExam"
                        className="form-label"
                      >
                        Percentage/Grade Obtain In Last Exam
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="percentageObtainInLastExam"
                        name="percentageObtainInLastExam"
                        className="form-control"
                        value={formData.percentageObtainInLastExam}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
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
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
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
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
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
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-7">
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
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
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
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {!showAdditionalData ? (
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={handleSave}
                    >
                      Save & Continue
                    </button>
                  </div>
                ) : (
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
                          id="agreementCheck"
                          name="agreementChecked"
                          checked={formData.agreementChecked}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="agreementCheck"
                        >
                          The certificate is issued for the purpose of admission
                          to another School.
                        </label>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="selectedFeeType"
                            className="form-label"
                          >
                            Fee Type <span className="text-danger">*</span>
                          </label>
                          <select
                            id="selectedFeeType"
                            name="selectedFeeType"
                            className="form-control"
                            value={selectedFeeType}
                            onChange={handleChange}
                            required
                            disabled={isFetchingFees}
                          >
                            <option value="">
                              {isFetchingFees
                                ? "Loading..."
                                : "Select Fee Type"}
                            </option>
                            {availableFeeTypes.map((feeType) => (
                              <option key={feeType.id} value={feeType.id}>
                                {feeType.name}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            className="btn btn-link btn-sm mt-1"
                            onClick={handleRefreshFeeTypes}
                            disabled={
                              isFetchingFees || !formData.masterDefineClass
                            }
                          ></button>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="TCfees" className="form-label">
                            TC Fees <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            id="TCfees"
                            name="TCfees"
                            className="form-control"
                            value={tcFees}
                            readOnly
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="concessionAmount"
                            className="form-label"
                          >
                            Concession
                          </label>
                          <input
                            type="number"
                            id="concessionAmount"
                            name="concessionAmount"
                            className="form-control"
                            value={concessionAmount}
                            onChange={handleChange}
                            max={tcFees}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="finalAmount" className="form-label">
                            Final Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            id="finalAmount"
                            name="finalAmount"
                            className="form-control"
                            value={finalAmount}
                            readOnly
                            required
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
                            required
                            value={formData.name}
                            onChange={handleChange}
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
                            onChange={handleChange}
                            required
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
                              onChange={handleChange}
                              required
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
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                        onClick={handleFinalSubmit}
                      >
                        Submit To Principal Approval
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

export default StudentAddTCForm;
