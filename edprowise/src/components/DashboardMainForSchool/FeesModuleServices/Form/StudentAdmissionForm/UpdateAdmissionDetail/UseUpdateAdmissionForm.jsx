import React, { useState, useEffect } from "react";
import countryData from "../../../../../CountryStateCityData.json";
import { useNavigate, useLocation } from "react-router-dom";
import getAPI from "../../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";
import putAPI from "../../../../../../api/putAPI.jsx";
import { validateFullForm } from "../FormValidation/FormValidation.jsx";

const UseUpdateAdmissionForm = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [existingStudents, setExistingStudents] = useState([]);
  const [showFullForm, setShowFullForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  const [classes, setClasses] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [sections, setSections] = useState([]);
  const location = useLocation();
  const student = location.state?.student;
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
    masterDefineShift: "",
    section: "",
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
    parentalStatus: "",
    fatherName: "",
    fatherContactNo: "",
    fatherQualification: "",
    fatherProfession: "",
    motherName: "",
    motherContactNo: "",
    motherQualification: "",
    motherProfession: "",
    agreementChecked: false,
    admissionFees: "",
    concessionAmount: "" || 0,
    finalAmount: "",
    name: "",
    paymentMode: "",
    chequeNumber: "",
    bankName: "",
    admissionFeesReceivedBy: "",
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
    if (student) {
      setFormData({
        academicYear: student.academicYear || null,
        studentPhoto: student.studentPhoto || null,
        registrationNumber: student.registrationNumber,
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        dateOfBirth: student.dateOfBirth
          ? student.dateOfBirth.split("T")[0]
          : "",
        age: student.age?.toString() || "",
        nationality: student.nationality,
        gender: student.gender,
        bloodGroup: student.bloodGroup,
        masterDefineClass:
          student?.masterDefineClass?._id || student?.masterDefineClass || "",
        masterDefineShift:
          student?.masterDefineShift?._id || student?.masterDefineShift || "",
        section: student?.section?._id || student?.section || "",
        currentAddress: student.currentAddress || "",
        country: student?.country || "",
        state: student?.state || "",
        city: student?.city || "",
        pincode: student.pincode || "",
        parentContactNumber: student.parentContactNumber || "",
        motherTongue: student.motherTongue || "",
        previousSchoolName: student.previousSchoolName || "",
        addressOfPreviousSchool: student.addressOfPreviousSchool || "",
        previousSchoolBoard: student.previousSchoolBoard || "",
        previousSchoolResult: student.previousSchoolResult || null,
        tcCertificate: student.tcCertificate || null,
        proofOfResidence: student.proofOfResidence || null,
        aadharPassportNumber: student.aadharPassportNumber || "",
        aadharPassportFile: student.aadharPassportFile || null,
        studentCategory: student.studentCategory || "",
        castCertificate: student.castCertificate || null,
        siblingInfoChecked: student.siblingInfoChecked || false,
        relationType: student.relationType || null,
        siblingName: student.siblingName || "",
        idCardFile: student.idCardFile || null,
        parentalStatus: student.parentalStatus || "",
        fatherName: student.fatherName || "",
        fatherContactNo: student.fatherContactNo || "",
        fatherQualification: student.fatherQualification || "",
        fatherProfession: student.fatherProfession || "",
        motherName: student.motherName || "",
        motherContactNo: student.motherContactNo || "",
        motherQualification: student.motherQualification || "",
        motherProfession: student.motherProfession || "",
        agreementChecked: student.agreementChecked || false,
        admissionFees: student.admissionFees || "",
        concessionAmount: student.concessionAmount || "",
        finalAmount: student.finalAmount || "",
        name: student.name || "",
        paymentMode: student.paymentMode || "",
        chequeNumber: student?.chequeNumber || "",
        bankName: student?.bankName || "",
        admissionNumber: student.AdmissionNumber || "",
        receiptNumber: student.receiptNumber || "",
        transactionNumber: student.transactionNumber || "",
        dateOfAdmission: student.dateOfAdmission
          ? student.dateOfAdmission.split("T")[0]
          : "",
        admissionFeesReceivedBy: student.admissionFeesReceivedBy || "",
      });
      setShowFullForm(true);
      setShowAdditionalData(true);
    }
  }, [student]);

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
    let filteredSections = [];

    if (formData.masterDefineClass) {
      const selectedClass = classes.find(
        (c) => c._id === formData.masterDefineClass
      );
      filteredSections =
        selectedClass?.sections.filter(
          (section) => section.shiftId === shiftId
        ) || [];
    }

    setSections(filteredSections);
    setFormData({
      ...formData,
      masterDefineShift: shiftId,
      section: "",
    });
  };

  useEffect(() => {
    if (student && classes.length > 0 && shifts.length > 0) {
      const selectedClass = classes.find(
        (c) => c._id === formData.masterDefineClass
      );
      if (selectedClass) {
        const filteredSections = selectedClass.sections.filter(
          (section) => section.shiftId === formData.masterDefineShift
        );
        setSections(filteredSections);
      }
    }
  }, [student, classes, shifts]);

  useEffect(() => {
    if (
      formData.masterDefineClass &&
      formData.masterDefineShift &&
      classes.length > 0
    ) {
      const selectedClass = classes.find(
        (c) => c._id === formData.masterDefineClass
      );
      if (selectedClass) {
        const filteredSections = selectedClass.sections.filter(
          (section) => section.shiftId === formData.masterDefineShift
        );
        setSections(filteredSections);

        if (
          formData.section &&
          !filteredSections.some((s) => s._id === formData.section)
        ) {
          setFormData((prev) => ({ ...prev, section: "" }));
        }
      }
    }
  }, [formData.masterDefineClass, formData.masterDefineShift, classes]);

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
        section: student?.section?._id || student?.section || "",
        currentAddress: student.currentAddress,
        cityStateCountry: student.cityStateCountry,
        pincode: student.pincode,
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
        admissionFees: student.admissionFees,
        concessionAmount: student.concessionAmount,
        finalAmount: student.finalAmount,
        name: student.name,
        paymentMode: student.paymentMode,
      }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      ...(formData.siblingInfoChecked && {
        relationType: null,
        siblingName: "",
        idCardFile: null,
      }),
    };

    const formDataObj = new FormData();

    Object.entries(submissionData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          formDataObj.append(key, value, value.name);
        } else if (
          typeof value === "string" &&
          (key.endsWith("File") ||
            key.endsWith("Certificate") ||
            key.endsWith("Result"))
        ) {
          formDataObj.append(key, value);
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
      const response = await putAPI(
        `/update-admission-form/${student._id}`,
        formDataObj,
        {
          "Content-Type": "multipart/form-data",
        }
      );

      console.log("API response:", response);

      if (response?.hasError) {
        toast.error(response.message || "Something went wrong");
      } else {
        toast.success(
          student
            ? "Admission Form Updated successfully"
            : "Admission Form Submitted successfully"
        );
        const studentData = response.data?.student || response.student;
        navigate(-1);
        // console.log("Student data to send in navigate state:", studentData);
        // navigate(`/school-dashboard/fees-module/form/admission-form/admission-details`, {
        //   state: {
        //     student: response.data?.admission || response.data?.student,
        //   },
        // });
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
    return path.split("/").pop();
  };

  return {
    formData,
    setFormData,
    handleChange,
    handlePhotoUpload,
    handleClassChange,
    handleShiftChange,
    handleRegistrationSubmit,
    handleSubmit,
    showFullForm,
    setShowFullForm,
    showAdditionalData,
    setShowAdditionalData,
    classes,
    shifts,
    sections,
    isSubmitting,
    cityOptions,
    countryOptions,
    stateOptions,
    getFileNameFromPath,
    isNursery,
    student,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
  };
};

export default UseUpdateAdmissionForm;
