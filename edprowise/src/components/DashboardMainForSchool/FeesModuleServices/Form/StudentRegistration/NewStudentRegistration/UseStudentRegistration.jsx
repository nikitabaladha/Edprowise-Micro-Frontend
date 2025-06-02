import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import countryData from "../../../../../CountryStateCityData.json";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI.jsx";
import postAPI from "../../../../../../api/postAPI.jsx";
import { validateBasicForm } from "../Formvalidation.js/FormValidation.jsx";

const useStudentRegistration = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [classes, setClasses] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  const [oneTimeFeesList, setOneTimeFeesList] = useState([]);
  const [availableFeeTypes, setAvailableFeeTypes] = useState([]);
  const [selectedFeeType, setSelectedFeeType] = useState("");
  const [registrationFee, setRegistrationFee] = useState(0);
  const [concessionAmount, setConcessionAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const academicYear = localStorage.getItem("selectedAcademicYear");

  const [formData, setFormData] = useState({
    academicYear: academicYear,
    studentPhoto: null,
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    nationality: "",
    gender: "",
    masterDefineClass: "",
    masterDefineShift: "",
    fatherName: "",
    fatherContactNo: "",
    motherName: "",
    motherContactNo: "",
    currentAddress: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    previousSchoolName: "",
    previousSchoolBoard: "",
    addressOfpreviousSchool: "",
    previousSchoolResult: null,
    tcCertificate: null,
    studentCategory: "",
    howReachUs: "",
    aadharPassportFile: null,
    aadharPassportNumber: "",
    castCertificate: null,
    agreementChecked: false,
    registrationFee: "",
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

  const fetchClassRelatedFeeTypes = async (classId) => {
    try {
      if (!schoolId || !classId) return;

      const response = await getAPI(
        `/get-one-time-feesbyIds/${schoolId}/${classId}/${academicYear}`,
        {},
        true
      );
      if (response?.data?.data) {
        setOneTimeFeesList(response.data.data);

        const feeTypes = response.data.data.flatMap((feeItem) =>
          feeItem.oneTimeFees.map((fee) => ({
            id: fee.feesTypeId._id,
            name: fee.feesTypeId.feesTypeName,
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
    setFinalAmount(registrationFee - concessionAmount);
  }, [registrationFee, concessionAmount]);

  useEffect(() => {
    if (!schoolId) return;

    const fetchShifts = async () => {
      try {
        const response = await getAPI(`/master-define-shift/${schoolId}`);
        console.log("Fetched Shifts:", response);
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

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    console.log("handleChange triggered for:", e.target.name);

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
      } else if (name === "masterDefineClass") {
        setFormData((prev) => ({ ...prev, [name]: value }));
        fetchClassRelatedFeeTypes(value);
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
            const newRegistrationFee = selectedFee.amount;
            setRegistrationFee(newRegistrationFee);
            setConcessionAmount(0);
            setFormData((prev) => ({
              ...prev,
              registrationFee: newRegistrationFee,
              concessionAmount: 0,
              finalAmount: newRegistrationFee,
            }));
          }
        }
      } else if (name === "concessionamount") {
        const concession = Number(value) || 0;
        const newFinalAmount = registrationFee - concession;
        setConcessionAmount(concession);
        setFinalAmount(newFinalAmount);
        setFormData((prev) => ({
          ...prev,
          concessionAmount: concession,
          finalAmount: newFinalAmount,
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const isNurseryClass = (classId) => {
    const selectedClass = classes.find((c) => c._id === classId);
    return selectedClass?.className === "Nursery";
  };

  const isNursery = isNurseryClass(formData.masterDefineClass);

  const handleSave = (e) => {
    e.preventDefault();
    if (validateBasicForm(formData, toast, isNurseryClass)) {
      setShowAdditionalData(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!validateBasicForm(formData, toast, isNurseryClass)) {
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

      const response = await postAPI(
        "/create-registartion-form",
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
      toast.success("Student registered successfully");
      navigate(
        `/school-dashboard/fees-module/form/registration-form/receipts`,
        {
          state: {
            student: response.data?.student || response.student,
            feeTypeName:
              availableFeeTypes.find((fee) => fee.id === selectedFeeType)
                ?.name || "",
            className:
              classes.find((c) => c._id === formData.masterDefineClass)
                ?.className || "",
          },
        }
      );
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

  return {
    formData,
    handleChange,
    handleSave,
    handleSubmit,
    isSubmitting,
    showAdditionalData,
    classes,
    shifts,
    countryOptions,
    stateOptions,
    cityOptions,
    isNursery,
    handlePhotoUpload,
    availableFeeTypes,
    selectedFeeType,
    registrationFee,
    concessionAmount,
    finalAmount,
    setFormData,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
  };
};

export default useStudentRegistration;
