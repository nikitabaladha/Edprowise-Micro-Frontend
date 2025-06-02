import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import countryData from "../../../../../CountryStateCityData.json";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI.jsx";
import putAPI from "../../../../../../api/putAPI.jsx";
import { useLocation } from "react-router-dom";
import { validateBasicForm } from "../Formvalidation.js/FormValidationUpdate.jsx";
import postAPI from "../../../../../../api/postAPI.jsx";

const UseStudentRegistrationUpdate = () => {
  const location = useLocation();
  const student = location.state?.student;
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [classes, setClasses] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const academicYear = localStorage.getItem("selectedAcademicYear");

  const [formData, setFormData] = useState({
    academicYear: academicYear,
    studentPhoto: null,
    firstName: student?.firstName || "",
    middleName: student?.middleName || "",
    lastName: student?.lastName || "",
    dateOfBirth: student?.dateOfBirth || "",
    age: student?.age || "",
    nationality: student?.nationality || "",
    gender: student?.gender || "",
    masterDefineClass:
      student?.masterDefineClass?._id || student?.masterDefineClass || "",
    masterDefineShift:
      student?.masterDefineShift?._id || student?.masterDefineShift || "",
    fatherName: student?.fatherName || "",
    fatherContactNo: student?.fatherContactNo || "",
    motherName: student?.motherName || "",
    motherContactNo: student?.motherContactNo || "",
    currentAddress: student?.currentAddress || "",
    country: student?.country || "",
    state: student?.state || "",
    city: student?.city || "",
    pincode: student?.pincode || "",
    previousSchoolName: student?.previousSchoolName || "",
    previousSchoolBoard: student?.previousSchoolBoard || "",
    addressOfpreviousSchool: student?.addressOfpreviousSchool || "",
    previousSchoolResult: null,
    tcCertificate: null,
    studentCategory: student?.studentCategory || "",
    howReachUs: student?.howReachUs || "",
    aadharPassportFile: null,
    aadharPassportNumber: student?.aadharPassportNumber || "",
    castCertificate: null,
    agreementChecked: student?.agreementChecked || false,
    registrationFee: student?.registrationFee || 0,
    concessionAmount: student?.concessionAmount || 0,
    finalAmount: student?.finalAmount || 0,
    name: student?.name || "",
    paymentMode: student?.paymentMode || "",
    chequeNumber: student?.chequeNumber || "",
    bankName: student?.bankName || "",
  });

  const [existingFiles] = useState({
    studentPhoto: student?.studentPhoto || null,
    previousSchoolResult: student?.previousSchoolResult || null,
    tcCertificate: student?.tcCertificate || null,
    aadharPassportFile: student?.aadharPassportFile || null,
    castCertificate: student?.castCertificate || null,
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

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    // Remove this line - it's preventing name field updates
    // if (name === 'name') return;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      if (name === "fatherName") {
        setFormData((prev) => ({ ...prev, fatherName: value }));
      } else if (name === "nationality") {
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

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        studentPhoto: file,
      }));
    }
  };

  const isNurseryClass = (classId) => {
    const selectedClass = classes.find((c) => c._id === classId);
    return selectedClass?.className === "Nursery";
  };

  const isNursery = isNurseryClass(formData.masterDefineClass);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!validateBasicForm(formData, toast, isNurseryClass, existingFiles)) {
        setIsSubmitting(false);
        return;
      }

      const submissionData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (value instanceof File) {
            submissionData.append(key, value, value.name);
          } else {
            submissionData.append(key, value);
          }
        }
      });

      const response = await putAPI(
        `/update-registartion-form/${student._id}`,
        submissionData,
        {
          "Content-Type": "multipart/form-data",
        }
      );

      if (!response) {
        throw new Error("No response from server");
      }

      if (response.error || response.status === "error") {
        toast.error(response.message || "Registration failed");
        return;
      }
      toast.success("Student registration Update successfully");
      navigate(-1);

      // navigate(`/school-dashboard/fees-module/form/registration-form/sucess`, {
      //   state: {
      //     student: response.data?.student || response.student,
      //   },
      // });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
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

  const getFileNameFromPath = (path) => {
    if (!path) return "";
    return path.split("/").pop();
  };

  const handleDownload = async () => {
    try {
      // Ensure all required fields are present
      const receiptData = {
        receiptNumber:
          formData.receiptNumber || student.receiptNumber || "REG001",
        firstName: formData.firstName,
        lastName: formData.lastName,
        registrationNumber: student?.registrationNumber || "REG001",
        registrationDate: formData.registrationDate || new Date().toISOString(),
        registrationFee: formData.registrationFee || 0,
        concessionAmount: formData.concessionAmount || 0,
        finalAmount: formData.finalAmount || 0,
        paymentMode: formData.paymentMode || "Cash",
        transactionNumber: formData.transactionNumber || "",
        chequeNumber: formData.chequeNumber || "",
        name: formData.name || "Admin",
      };

      const className =
        classes.find((c) => c._id === formData.masterDefineClass)?.className ||
        "";

      const response = await postAPI(
        "/create-registration-receipts",
        {
          student: receiptData,
          feeTypeName: "Registration Fee",
          className: className,
        },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Receipt_${receiptData.receiptNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading receipt:", error);
      toast.error(error.response?.data?.error || "Failed to download receipt");
    }
  };

  return {
    student,
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    classes,
    shifts,
    countryOptions,
    stateOptions,
    cityOptions,
    isNursery,
    handlePhotoUpload,
    getFileNameFromPath,
    existingFiles,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    handleDownload,
  };
};

export default UseStudentRegistrationUpdate;
