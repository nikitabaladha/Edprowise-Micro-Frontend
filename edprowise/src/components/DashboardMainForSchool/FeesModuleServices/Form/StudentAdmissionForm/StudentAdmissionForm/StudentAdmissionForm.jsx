import React, { useState, useEffect } from "react";
import countryData from "../../../../../CountryStateCityData.json";
import { useNavigate } from "react-router-dom";
import getAPI from "../../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";
import postAPI from "../../../../../../api/postAPI.jsx";
import {
  validateBasicForm,
  validateFullForm,
} from "../FormValidation/FormValidation.jsx";
import RegistrationSelector from "./RegistrationSelector.jsx";
import Form from "./Form.jsx";

const StudentAdmissionForm = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [existingStudents, setExistingStudents] = useState([]);
  const [showFullForm, setShowFullForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [oneTimeFeesList, setOneTimeFeesList] = useState([]);
  const [availableFeeTypes, setAvailableFeeTypes] = useState([]);
  const [selectedFeeType, setSelectedFeeType] = useState("");
  const [concessionAmount, setConcessionAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [admissionFees, setAdmissionFees] = useState(0);
  const academicYear = localStorage.getItem("selectedAcademicYear");

  const [formData, setFormData] = useState({
    academicYear: academicYear,
    studentPhoto: null,
    registrationNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    nationality: "",
    gender: "",
    bloodGroup: "",
    masterDefineClass: "",
    section: "",
    masterDefineShift: "",
    currentAddress: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    parentContactNumber: "",
    motherTongue: "",
    previousSchoolName: "",
    addressOfPreviousSchool: "",
    previousSchoolBoard: "",
    previousSchoolResult: null,
    tcCertificate: null,
    proofOfResidence: null,
    aadharPassportNumber: "",
    aadharPassportFile: null,
    studentCategory: "",
    castCertificate: null,
    siblingInfoChecked: false,
    relationType: null,
    siblingName: "",
    idCardFile: null,
    parentalStatus: "Parents",
    fatherName: "",
    fatherContactNo: "",
    fatherQualification: "",
    fatherProfession: "",
    motherName: "",
    motherContactNo: "",
    motherQualification: "",
    motherProfession: "",
    agreementChecked: false,
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
        const response = await getAPI(
          `/get-registartion-formbySchoolId/${schoolId}`
        );
        console.log("API response:", response);

        if (!response.hasError) {
          const studentArray = Array.isArray(response.data.students)
            ? response.data.students.map((student) => ({
                ...student,
                registrationNumber:
                  student.registrationNumber ||
                  `ABC${10000 + response.data.students.indexOf(student) + 1}`,
              }))
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

  useEffect(() => {
    if (!schoolId) return;

    const fetchShifts = async () => {
      try {
        const response = await getAPI(`/master-define-shift/${schoolId}`);
        if (!response.hasError) {
          const shiftArray = Array.isArray(response.data?.data)
            ? response.data.data
            : [];
          setShifts(shiftArray);
        } else {
          toast.error(response.message || "Failed to fetch shifts.");
        }
      } catch (err) {
        toast.error("Error fetching shift data.");
        console.error("Shift Fetch Error:", err);
      }
    };

    fetchShifts();
  }, [schoolId]);

  const fetchClassRelatedFeeTypes = async (classId, sectionId) => {
    try {
      if (!schoolId || !classId || !sectionId) return;

      const response = await getAPI(
        `/get-one-time-feesBysectionIds/${schoolId}/${classId}/${sectionId}/${academicYear}`,
        {},
        true
      );
      if (response?.data?.data) {
        setOneTimeFeesList(response.data.data);

        const feeTypes = response.data.data.flatMap((feeItem) =>
          feeItem.oneTimeFees.map((fee) => ({
            id: fee.feesTypeId._id,
            name: fee.feesTypeId.feesTypeName,
            amount: fee.amount,
          }))
        );
        setAvailableFeeTypes(feeTypes);
      }
    } catch (error) {
      toast.error("Error fetching fee types for selected class");
      console.error("Fee type fetch error:", error);
    }
  };

  useEffect(() => {
    if (formData.masterDefineClass && formData.section) {
      fetchClassRelatedFeeTypes(formData.masterDefineClass, formData.section);
    }
  }, [formData.masterDefineClass, formData.section]);

  const handleFeeTypeChange = (e) => {
    const feeTypeId = e.target.value;
    setSelectedFeeType(feeTypeId);

    const selectedFee = availableFeeTypes.find((fee) => fee.id === feeTypeId);
    if (selectedFee) {
      setAdmissionFees(selectedFee.amount);
      setFinalAmount(selectedFee.amount - concessionAmount);
    } else {
      setAdmissionFees(0);
      setFinalAmount(0);
    }
  };

  const handleConcessionChange = (e) => {
    const concession = Number(e.target.value);
    setConcessionAmount(concession);
    setFinalAmount(admissionFees - concession);
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    const selectedClass = classes.find((c) => c._id === classId);

    let filteredSections = selectedClass?.sections || [];
    if (formData.masterDefineShift) {
      filteredSections = filteredSections.filter(
        (section) => section.shiftId === formData.masterDefineShift
      );
    }

    setSections(filteredSections);

    setFormData({
      ...formData,
      masterDefineClass: classId,
      section: "",
    });
  };

  const handleShiftChange = (e) => {
    const shiftId = e.target.value;

    if (formData.masterDefineClass) {
      const selectedClass = classes.find(
        (c) => c._id === formData.masterDefineClass
      );
      const filteredSections =
        selectedClass?.sections.filter(
          (section) => section.shiftId === shiftId
        ) || [];
      setSections(filteredSections);
    }

    setFormData({
      ...formData,
      masterDefineShift: shiftId,
      section: "",
    });
  };
  useEffect(() => {
    if (formData.masterDefineClass && formData.masterDefineShift) {
      const selectedClass = classes.find(
        (c) => c._id === formData.masterDefineClass
      );
      const filteredSections =
        selectedClass?.sections.filter(
          (section) => section.shiftId === formData.masterDefineShift
        ) || [];
      setSections(filteredSections);

      if (
        formData.section &&
        !filteredSections.some((s) => s._id === formData.section)
      ) {
        setFormData((prev) => ({ ...prev, section: "" }));
      }
    }
  }, [formData.masterDefineShift, formData.masterDefineClass, classes]);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      if (name === "nationality") {
        setFormData((prev) => ({
          ...prev,
          nationality: value,
          studentCategory:
            value === "SAARC Countries" || value === "International"
              ? "General"
              : prev.studentCategory,
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
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

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (!formData.registrationNumber) {
      toast.error("Please select a registration number");
      return;
    }

    const student = existingStudents.find(
      (s) => s.registrationNumber === formData.registrationNumber
    );

    if (!student) {
      toast.error(
        "Invalid registration number. Please select a valid registration number from the list."
      );
      return;
    }
    if (student) {
      setSelectedStudent(student);

      setFormData((prev) => ({
        ...prev,
        studentPhoto: student.studentPhoto || null,
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        dateOfBirth: student.dateOfBirth
          ? student.dateOfBirth.split("T")[0]
          : "",
        nationality: student.nationality,
        gender: student.gender,
        masterDefineClass:
          student?.masterDefineClass?._id || student?.masterDefineClass || "",
        masterDefineShift:
          student?.masterDefineShift?._id || student?.masterDefineShift || "",
        currentAddress: student.currentAddress || "",
        country: student?.country || "",
        state: student?.state || "",
        city: student?.city || "",
        pincode: student.pincode || "",
        parentContactNumber:
          student.fatherContactNo || student.motherContactNo || "",
        previousSchoolName: student.previousSchoolName || "",
        addressOfPreviousSchool: student.addressOfpreviousSchool || "",
        previousSchoolBoard: student.previousSchoolBoard || "",
        previousSchoolResult: student?.previousSchoolResult || null,
        tcCertificate: student?.tcCertificate || null,
        aadharPassportNumber: student.aadharPassportNumber,
        castCertificate: student?.castCertificate || null,
        aadharPassportFile: student.aadharPassportFile || null,
        studentCategory: student.studentCategory,
        siblingInfoChecked: false,
        relationType: null,
        fatherName: student.fatherName,
        fatherContactNo: student.fatherContactNo,
        motherName: student.motherName,
        motherContactNo: student.motherContactNo,
        name: student.name,
        paymentMode: student.paymentMode,
      }));

      if (student?.masterDefineClass?._id || student?.masterDefineClass) {
        const classId =
          student?.masterDefineClass?._id || student?.masterDefineClass;
        const selectedClass = classes.find((c) => c._id === classId);
        setSections(selectedClass?.sections || []);
      }
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

  const handleSave = (e) => {
    e.preventDefault();
    const isNursery = isNurseryClass(formData.masterDefineClass);
    const error = validateBasicForm(formData, isNursery);

    if (error) {
      toast.error(error);
      return;
    }

    setShowAdditionalData(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    setIsSubmitting(true);

    const isNursery = isNurseryClass(formData.masterDefineClass);
    const error = validateFullForm(formData, isNursery);

    if (error) {
      toast.error(error);
      setIsSubmitting(false);
      return;
    }

    const submissionData = {
      ...formData,
      admissionFees,
      concessionAmount,
      finalAmount,
      ...(formData.siblingInfoChecked && {
        relationType: null,
        siblingName: "",
        idCardFile: null,
      }),
    };

    const formDataObj = new FormData();

    const fileFields = [
      "studentPhoto",
      "previousSchoolResult",
      "tcCertificate",
      "proofOfResidence",
      "aadharPassportFile",
      "castCertificate",
      "idCardFile",
    ];

    Object.entries(submissionData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (fileFields.includes(key)) {
          if (value instanceof File) {
            formDataObj.append(key, value, value.name);
          } else if (typeof value === "string" && value) {
            formDataObj.append(key, value);
          }
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            formDataObj.append(`${key}[]`, item);
          });
        } else {
          formDataObj.append(key, value);
        }
      }
    });

    formDataObj.append("schoolId", schoolId);

    try {
      const response = await postAPI("/create-admission-form", formDataObj, {
        "Content-Type": "multipart/form-data",
      });

      console.log("API response:", response);

      if (response?.hasError) {
        toast.error(response.message || "Something went wrong");
      } else {
        toast.success("Admission Form Submitted successfully");
        const studentData = response.data?.student || response.student;

        const selectedClass = classes.find(
          (c) => c._id === response.data.admission.masterDefineClass
        );

        navigate(
          `/school-dashboard/fees-module/form/admission-form/admission-details`,
          {
            state: {
              student: response.data?.admission,
              className: selectedClass?.className || "",
              sectionName:
                sections.find((s) => s._id === formData.section)?.name || "",
              feeTypeName:
                availableFeeTypes.find((fee) => fee.id === selectedFeeType)
                  ?.name || "",
            },
          }
        );
      }
    } catch (error) {
      const backendMessage = error?.response?.data?.message;

      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error("An error occurred during registration");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const countryOptions = Object.keys(countryData).map((country) => ({
    value: country,
    label: country,
  }));
  const stateOptions =
    formData.country && countryData[formData.country]
      ? Object.keys(countryData[formData.country]).map((state) => ({
          value: state,
          label: state,
        }))
      : [];

  const cityOptions =
    formData.state &&
    formData.country &&
    countryData[formData.country]?.[formData.state]
      ? countryData[formData.country][formData.state].map((city) => ({
          value: city,
          label: city,
        }))
      : [];

  const handleCountryChange = (selectedOption, actionMeta) => {
    if (actionMeta.action === "create-option") {
      setFormData((prev) => ({
        ...prev,
        country: selectedOption.value,
        state: "",
        city: "",
      }));
    } else if (actionMeta.action === "select-option") {
      setFormData((prev) => ({
        ...prev,
        country: selectedOption ? selectedOption.value : "",
        state: "",
        city: "",
      }));
    } else if (actionMeta.action === "clear") {
      setFormData((prev) => ({
        ...prev,
        country: "",
        state: "",
        city: "",
      }));
    }
  };

  const handleStateChange = (selectedOption, actionMeta) => {
    if (actionMeta.action === "create-option") {
      setFormData((prev) => ({
        ...prev,
        state: selectedOption.value,
        city: "",
      }));
    } else if (actionMeta.action === "select-option") {
      setFormData((prev) => ({
        ...prev,
        state: selectedOption ? selectedOption.value : "",
        city: "",
      }));
    } else if (actionMeta.action === "clear") {
      setFormData((prev) => ({
        ...prev,
        state: "",
        city: "",
      }));
    }
  };

  const handleCityChange = (selectedOption, actionMeta) => {
    if (actionMeta.action === "create-option") {
      setFormData((prev) => ({
        ...prev,
        city: selectedOption.value,
      }));
    } else if (actionMeta.action === "select-option") {
      setFormData((prev) => ({
        ...prev,
        city: selectedOption ? selectedOption.value : "",
      }));
    } else if (actionMeta.action === "clear") {
      setFormData((prev) => ({
        ...prev,
        city: "",
      }));
    }
  };

  const isNurseryClass = (classId) => {
    const selectedClass = classes.find((c) => c._id === classId);
    return selectedClass?.className === "Nursery";
  };

  const isNursery = isNurseryClass(formData.masterDefineClass);

  const getFileNameFromPath = (path) => {
    if (!path) return "";
    return path.split(/[\\/]/).pop();
  };

  if (!showFullForm) {
    return (
      <RegistrationSelector
        formData={formData}
        handleChange={handleChange}
        handleRegistrationSubmit={handleRegistrationSubmit}
        existingStudents={existingStudents}
      />
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
                    Student Admission Form
                  </h4>
                </div>
              </div>
              <Form
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleSave={handleSave}
                classes={classes}
                handleClassChange={handleClassChange}
                sections={sections}
                shifts={shifts}
                countryOptions={countryOptions}
                stateOptions={stateOptions}
                cityOptions={cityOptions}
                isNursery={isNursery}
                getFileNameFromPath={getFileNameFromPath}
                isSubmitting={isSubmitting}
                showAdditionalData={showAdditionalData}
                handleShiftChange={handleShiftChange}
                handlePhotoUpload={handlePhotoUpload}
                selectedFeeType={selectedFeeType}
                admissionFees={admissionFees}
                concessionAmount={concessionAmount}
                finalAmount={finalAmount}
                availableFeeTypes={availableFeeTypes}
                handleFeeTypeChange={handleFeeTypeChange}
                handleConcessionChange={handleConcessionChange}
                handleCountryChange={handleCountryChange}
                handleStateChange={handleStateChange}
                handleCityChange={handleCityChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAdmissionForm;
