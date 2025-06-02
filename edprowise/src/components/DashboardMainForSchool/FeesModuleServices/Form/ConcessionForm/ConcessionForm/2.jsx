import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import getAPI from "../../../../../../api/getAPI.jsx";
import postAPI from "../../../../../../api/postAPI.jsx";
import { useNavigate } from "react-router-dom";

const useConcessionForm = () => {
  const navigate = useNavigate();
  const [existingStudents, setExistingStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showFullForm, setShowFullForm] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [sections, setSections] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);

  const [formData, setFormData] = useState({
    studentPhoto: null,
    AdmissionNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    masterDefineClass: "",
    section: "",
    concessionType: "",
    castOrIncomeCertificate: null,
    applicableAcademicYear: "",
    concessionDetails: Array(4).fill({
      installmentName: "",
      feesType: "",
      totalFees: "",
      concessionPercentage: "",
      concessionAmount: "",
      balancePayable: "",
    }),
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

  useEffect(() => {
    const fetchFeeTypes = async () => {
      try {
        if (!schoolId) return;
        const response = await getAPI(`/getall-fess-type/${schoolId}`);
        if (!response.hasError) {
          setFeeTypes(response.data.data || []);
        }
      } catch (error) {
        toast.error("Error fetching fee types.");
      }
    };

    fetchFeeTypes();
  }, [schoolId]);

  // In your useEffect for fetching fee installments:
  useEffect(() => {
    const fetchFeeInstallments = async () => {
      if (!formData.masterDefineClass || !formData.section || !schoolId) return;
      try {
        const response = await getAPI(
          `/fetch-viva-installments?schoolId=${schoolId}&classId=${formData.masterDefineClass}&sectionIds=${formData.section}`
        );

        if (response.data) {
          const updatedConcessionDetails = [];

          (response.data.data || []).forEach((installment) => {
            (installment.fees || []).forEach((fee) => {
              // Find the fee type name
              const feeType = feeTypes.find((ft) => ft._id === fee.feesTypeId);
              const feeTypeName = feeType
                ? feeType.feesTypeName
                : "Unknown Fee Type";

              updatedConcessionDetails.push({
                installmentName: installment.name || "",
                feesType: feeTypeName, // Store the name directly
                feesTypeId: fee.feesTypeId, // Store the ID if needed
                totalFees: fee.amount || "",
                concessionPercentage: "",
                concessionAmount: "",
                balancePayable: fee.amount || "",
              });
            });
          });

          setFormData((prev) => ({
            ...prev,
            concessionDetails: updatedConcessionDetails,
          }));
        }
      } catch (error) {
        toast.error("Error fetching fee installments.");
        console.error("Fee Installment Fetch Error:", error);
      }
    };

    fetchFeeInstallments();
  }, [formData.masterDefineClass, formData.section, schoolId, feeTypes]);

  const handleClassChange = (e) => {
    const classId = e.target.value;
    const selectedClass = classes.find((c) => c._id === classId);

    setSections(selectedClass?.sections || []);

    setFormData({
      ...formData,
      masterDefineClass: classId,
      section: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "castOrIncomeCertificate") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleConcessionDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedConcessionDetails = [...formData.concessionDetails];

    updatedConcessionDetails[index] = {
      ...updatedConcessionDetails[index],
      [name]: value,
    };

    if (name === "concessionPercentage" || name === "totalFees") {
      const totalFees =
        parseFloat(updatedConcessionDetails[index].totalFees) || 0;
      const concessionPercentage =
        parseFloat(updatedConcessionDetails[index].concessionPercentage) || 0;

      const concessionAmount = (totalFees * concessionPercentage) / 100;
      const balancePayable = totalFees - concessionAmount;

      updatedConcessionDetails[index] = {
        ...updatedConcessionDetails[index],
        concessionAmount: concessionAmount.toFixed(2),
        balancePayable: balancePayable.toFixed(2),
      };
    }

    setFormData({
      ...formData,
      concessionDetails: updatedConcessionDetails,
    });
  };

  const fileInputRef = useRef(null);

  const cancelSubmittingForm = () => {
    setFormData({
      studentPhoto: null,
      AdmissionNumber: "",
      firstName: "",
      middleName: "",
      lastName: "",
      masterDefineClass: "",
      section: "",
      concessionType: "",
      castOrIncomeCertificate: null,
      applicableAcademicYear: "",
      concessionDetails: Array(4).fill({
        installmentName: "",
        feesType: "",
        totalFees: "",
        concessionPercentage: "",
        concessionAmount: "",
        balancePayable: "",
      }),
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSections([]);
    setShowFullForm(false);
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

    setFormData((prev) => ({
      ...prev,
      studentPhoto: student.studentPhoto || null,
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      masterDefineClass:
        student?.masterDefineClass?._id || student?.masterDefineClass || "",
      section: student?.section?._id || student?.section || "",
    }));

    if (student?.masterDefineClass?._id || student?.masterDefineClass) {
      const classId =
        student?.masterDefineClass?._id || student?.masterDefineClass;
      const selectedClass = classes.find((c) => c._id === classId);
      setSections(selectedClass?.sections || []);
    }

    setShowFullForm(true);
  };

  const generateAcademicYears = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year < endYear; year++) {
      years.push(`${year} - ${year + 1}`);
    }
    return years;
  };

  const validateForm = () => {
    if (
      !formData.concessionType ||
      !formData.applicableAcademicYear ||
      !formData.castOrIncomeCertificate
    ) {
      toast.error("Please fill all required fields");
      return false;
    }

    const hasEmptyDetails = formData.concessionDetails.some(
      (detail) =>
        !detail.installmentName || !detail.feesType || !detail.totalFees
    );

    if (hasEmptyDetails) {
      toast.error("Please fill all concession details");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("schoolId", schoolId);
      formDataToSend.append("AdmissionNumber", formData.AdmissionNumber);
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("masterDefineClass", formData.masterDefineClass);
      formDataToSend.append("section", formData.section);
      formDataToSend.append("concessionType", formData.concessionType);
      formDataToSend.append(
        "applicableAcademicYear",
        formData.applicableAcademicYear
      );

      if (formData.studentPhoto) {
        formDataToSend.append("studentPhoto", formData.studentPhoto);
      }

      if (formData.castOrIncomeCertificate) {
        formDataToSend.append(
          "castOrIncomeCertificate",
          formData.castOrIncomeCertificate
        );
      }

      formData.concessionDetails.forEach((detail, index) => {
        formDataToSend.append(
          `concessionDetails[${index}][installmentName]`,
          detail.installmentName
        );
        formDataToSend.append(
          `concessionDetails[${index}][feesType]`,
          detail.feesType
        );
        formDataToSend.append(
          `concessionDetails[${index}][totalFees]`,
          detail.totalFees
        );
        formDataToSend.append(
          `concessionDetails[${index}][concessionPercentage]`,
          detail.concessionPercentage
        );
        formDataToSend.append(
          `concessionDetails[${index}][concessionAmount]`,
          detail.concessionAmount
        );
        formDataToSend.append(
          `concessionDetails[${index}][balancePayable]`,
          detail.balancePayable
        );
      });

      // const response =
      await postAPI("/create-Concession-form", formDataToSend, {
        "Content-Type": "multipart/form-data",
      });

      toast.success("Concession application submitted successfully!");
      navigate(`/school-dashboard/fees-module/form/concession-form-details`, {
        state: {
          formData: formData,
          className:
            classes.find((c) => c._id === formData.masterDefineClass)
              ?.className || "",
          sectionName:
            sections.find((s) => s._id === formData.section)?.sectionName || "",
          feeTypes: feeTypes,
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit concession application");
    }
  };

  const toggleRowSelection = (index) => {
    const updatedConcessionDetails = [...formData.concessionDetails];
    updatedConcessionDetails[index] = {
      ...updatedConcessionDetails[index],
      selected: !updatedConcessionDetails[index].selected,
    };
    setFormData({
      ...formData,
      concessionDetails: updatedConcessionDetails,
    });
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

  return {
    formData,
    setFormData,
    handleChange,
    handleConcessionDetailChange,
    toggleRowSelection,
    fileInputRef,
    existingStudents,
    classes,
    sections,
    feeTypes,
    setSections,
    schoolId,
    showFullForm,
    setShowFullForm,
    navigate,
    handleAdmissionSubmit,
    handleSubmit,
    handleClassChange,
    generateAcademicYears,
    cancelSubmittingForm,
    handlePhotoUpload,
  };
};

export default useConcessionForm;
