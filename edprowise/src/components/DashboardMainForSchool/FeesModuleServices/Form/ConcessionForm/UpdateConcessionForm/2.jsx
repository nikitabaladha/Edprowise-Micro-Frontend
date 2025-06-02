import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI.jsx";
import putAPI from "../../../../../../api/putAPI.jsx";

export const useConcessionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student;
  const fileInputRef = useRef(null);

  const [classes, setClasses] = useState([]);
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
    existingCertificateUrl: "",
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
    if (student) {
      setFormData({
        studentPhoto: student.studentPhoto || null,
        AdmissionNumber: student.AdmissionNumber,
        firstName: student.firstName,
        middleName: student.middleName || "",
        lastName: student.lastName,
        masterDefineClass:
          student?.masterDefineClass?._id || student?.masterDefineClass || "",
        section: student?.section?._id || student?.section || "",
        concessionType: student.concessionType,
        castOrIncomeCertificate: student.castOrIncomeCertificate || null,
        applicableAcademicYear: student.applicableAcademicYear,
        concessionDetails: student.concessionDetails.map((detail) => ({
          installmentName: detail.installmentName,
          feesType: detail.feesType || detail.feesType,
          totalFees: detail.totalFees.toString(),
          concessionPercentage: detail.concessionPercentage.toString(),
          concessionAmount: detail.concessionAmount.toString(),
          balancePayable: detail.balancePayable.toString(),
        })),
      });
    }
  }, [student]);

  useEffect(() => {
    const fetchData = async () => {
      if (!schoolId) return;
      try {
        const res = await getAPI(
          `/get-class-and-section/${schoolId}`,
          {},
          true
        );
        setClasses(res?.data?.data || []);
      } catch (err) {
        toast.error("Error fetching class and section data.");
      }
    };
    fetchData();
  }, [schoolId]);

  useEffect(() => {
    if (student?.masterDefineClass?._id || student?.masterDefineClass) {
      const classId =
        student?.masterDefineClass?._id || student?.masterDefineClass;
      const selectedClass = classes.find((c) => c._id === classId);
      const classSections =
        selectedClass?.sections.map((section) => ({
          _id: section._id,
          name: section.name,
        })) || [];
      setSections(classSections);
    }
  }, [student, classes]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "castOrIncomeCertificate") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    const selectedClass = classes.find((c) => c._id === classId);
    const classSections =
      selectedClass?.sections.map((section) => ({
        _id: section._id,
        name: section.name,
      })) || [];

    setSections(classSections);
    setFormData({
      ...formData,
      masterDefineClass: classId,
      section: "",
    });
  };

  const handleConcessionDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...formData.concessionDetails];

    updatedDetails[index] = {
      ...updatedDetails[index],
      [name]: value,
    };

    if (name === "concessionPercentage" || name === "totalFees") {
      const totalFees = parseFloat(updatedDetails[index].totalFees) || 0;
      const percentage =
        parseFloat(updatedDetails[index].concessionPercentage) || 0;

      const concessionAmount = (totalFees * percentage) / 100;
      const balancePayable = totalFees - concessionAmount;

      updatedDetails[index].concessionAmount = concessionAmount.toFixed(2);
      updatedDetails[index].balancePayable = balancePayable.toFixed(2);
    }

    setFormData((prev) => ({
      ...prev,
      concessionDetails: updatedDetails,
    }));
  };

  const validateForm = () => {
    if (!formData.concessionType || !formData.applicableAcademicYear) {
      toast.error("Please fill all required fields");
      return false;
    }

    if (!formData.existingCertificateUrl && !formData.castOrIncomeCertificate) {
      toast.error("Please upload a caste/income certificate");
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
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (value instanceof File) {
            formDataObj.append(key, value, value.name);
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              Object.entries(item).forEach(([field, val]) => {
                formDataObj.append(
                  `concessionDetails[${index}][${field}]`,
                  val
                );
              });
            });
          } else {
            formDataObj.append(key, value);
          }
        }
      });

      const headers = { "Content-Type": "multipart/form-data" };
      const response = await putAPI(
        `/update-concession-form/${student._id}`,
        formDataObj,
        headers,
        true
      );

      if (!response.hasError) {
        toast.success("Concession updated successfully!");
        navigate(-1);
      } else {
        toast.error(response.message || "Update failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  const cancelSubmittingForm = () => navigate(-1);

  const toggleRowSelection = (index, formData, setFormData) => {
    const updated = [...formData.concessionDetails];
    updated[index].selected = !updated[index].selected;

    setFormData((prev) => ({
      ...prev,
      concessionDetails: updated,
    }));
  };

  const generateAcademicYears = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year < endYear; year++) {
      years.push(`${year} - ${year + 1}`);
    }
    return years;
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

  const getFileNameFromPath = (path) => {
    if (!path) return "";
    return path.split("/").pop();
  };

  return {
    formData,
    setFormData,
    classes,
    sections,
    feeTypes,
    fileInputRef,
    handleChange,
    handleClassChange,
    handleConcessionDetailChange,
    handleSubmit,
    cancelSubmittingForm,
    toggleRowSelection,
    getFileNameFromPath,
    generateAcademicYears,
    handlePhotoUpload,
  };
};
