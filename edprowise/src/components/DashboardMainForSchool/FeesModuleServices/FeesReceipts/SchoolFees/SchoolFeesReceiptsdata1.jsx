import { useState, useEffect } from "react";
import getAPI from "../../../../../api/getAPI.jsx";
import postAPI from "../../../../../api/postAPI.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useSchoolFeesReceipts = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [showSecondTable, setShowSecondTable] = useState(false);
  const [existingStudents, setExistingStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showFullForm, setShowFullForm] = useState(false);
  const [sections, setSections] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [formData, setFormData] = useState({
    AdmissionNumber: "",
    paymentMode: "",
    name: "",
    chequeNumber: "",
    bankName: "",
  });
  const [selectedAcademicYears, setSelectedAcademicYears] = useState([]);
  const [selectAllYears, setSelectAllYears] = useState(false);
  const [currentInstallment, setCurrentInstallment] = useState(1);
  const [totalInstallments, setTotalInstallments] = useState([]);
  const [selectedInstallments, setSelectedInstallments] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProcessedData, setShowProcessedData] = useState(false);
  const [selectedFeeTypesByInstallment, setSelectedFeeTypesByInstallment] =
    useState({});
  const [paidAmounts, setPaidAmounts] = useState({});

  // const generateReceiptNumber = () => `${'RCPT'}-${Math.floor(100000 + Math.random() * 900000)}`;
  const generateTransactionNumber = () =>
    `${"TXN"}-${Math.floor(100000 + Math.random() * 900000)}`;

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails?.schoolId) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(userDetails.schoolId);
  }, []);

  useEffect(() => {
    if (!schoolId) return;

    const fetchInitialData = async () => {
      try {
        const studentsRes = await getAPI(`/get-admission-form/${schoolId}`);
        if (!studentsRes.hasError) {
          setExistingStudents(
            Array.isArray(studentsRes.data.data) ? studentsRes.data.data : []
          );
        }

        const classesRes = await getAPI(
          `/get-class-and-section/${schoolId}`,
          {},
          true
        );
        setClasses(classesRes?.data?.data || []);

        const feeTypesRes = await getAPI(`/getall-fess-type/${schoolId}`);
        if (!feeTypesRes.hasError) {
          setFeeTypes(feeTypesRes.data.data || []);
        }
      } catch (error) {
        toast.error("Error initializing data");
        console.error("Initialization error:", error);
      }
    };

    fetchInitialData();
  }, [schoolId]);

  const getInstallmentData = (installmentNumber, academicYear) => {
    if (!Array.isArray(feeData)) {
      console.warn("feeData is not an array:", { feeData });
      return [];
    }

    const selectedYearData = feeData.find(
      (year) => year.academicYear === academicYear
    );
    if (!selectedYearData?.feeInstallments) {
      console.warn(
        `No feeInstallments found for academic year: ${academicYear}`
      );
      return [];
    }

    const filteredInstallments = selectedYearData.feeInstallments
      .filter(
        (item) => item.installmentName === `Installment ${installmentNumber}`
      )
      .map((item) => ({
        ...item,
        academicYear: selectedYearData.academicYear,
      }));
    return filteredInstallments;
  };

  const handleAdmissionSubmit = async (e) => {
    e.preventDefault();
    const admissionNumber = formData.AdmissionNumber.trim();

    try {
      const student = existingStudents.find(
        (s) => s.AdmissionNumber.trim() === admissionNumber
      );
      if (!student) throw new Error("Invalid admission number");

      const updatedFormData = {
        ...formData,
        firstName: student.firstName,
        lastName: student.lastName,
        masterDefineClass:
          student?.masterDefineClass?._id || student?.masterDefineClass || "",
        section: student?.section?._id || student?.section || "",
      };
      setFormData(updatedFormData);

      if (updatedFormData.masterDefineClass) {
        const selectedClass = classes.find(
          (c) => c._id === updatedFormData.masterDefineClass
        );
        setSections(selectedClass?.sections || []);
      }

      if (
        schoolId &&
        admissionNumber &&
        updatedFormData.masterDefineClass &&
        updatedFormData.section
      ) {
        const response = await getAPI(
          `/get-concession-formbyADMID?classId=${updatedFormData.masterDefineClass}&sectionIds=${updatedFormData.section}&schoolId=${schoolId}&admissionNumber=${admissionNumber}`
        );
        if (!response?.data?.data || !Array.isArray(response.data.data)) {
          throw new Error("All fees are paid or no fee data found");
        }

        setFeeData(response.data.data);
        setShowFullForm(true);

        const initialPaidAmounts = {};
        response.data.data.forEach((year) => {
          if (Array.isArray(year.feeInstallments)) {
            year.feeInstallments.forEach((item) => {
              const installmentNum = item.installmentName.split(" ")[1];
              const key = `${year.academicYear}-${installmentNum}-${item.feesTypeId._id}`;
              initialPaidAmounts[key] = item.paidAmount || 0;
            });
          }
        });
        setPaidAmounts(initialPaidAmounts);

        if (response.data.data.length > 0) {
          setSelectedAcademicYears([response.data.data[0].academicYear]);
          setTotalInstallments(
            Array.isArray(response.data.data[0].installmentsPresent)
              ? response.data.data[0].installmentsPresent
              : []
          );
        }
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "All fees are paid for all academic years"
      );
      console.error("Submission error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getFeeTypeName = (feeTypeId) => {
    return (
      feeTypes.find((ft) => ft._id === feeTypeId)?.feesTypeName ||
      "Unknown Fee Type"
    );
  };

  const handleInstallmentSelection = (installmentNumber, academicYear) => {
    setSelectedInstallments((prev) => {
      const yearInstallments = prev[academicYear] || [];
      const isSelected = yearInstallments.includes(installmentNumber);
      const newYearInstallments = isSelected
        ? yearInstallments.filter((num) => num !== installmentNumber)
        : [...yearInstallments, installmentNumber];

      const installmentData = getInstallmentData(
        installmentNumber,
        academicYear
      );
      const allFeeTypeIds = installmentData.map((item) => item.feesTypeId._id);

      const newPaidAmounts = { ...paidAmounts };
      if (!isSelected) {
        installmentData.forEach((item) => {
          const concessionItem = feeData
            .find((y) => y.academicYear === academicYear)
            ?.concession?.concessionDetails?.find(
              (cd) =>
                cd.installmentName === `Installment ${installmentNumber}` &&
                cd.feesType === item.feesTypeId._id
            );

          const concessionAmount = concessionItem?.concessionAmount || 0;
          const fineAmount = item.fineAmount || 0;
          const payableAmount = item.amount - concessionAmount + fineAmount;
          const key = `${academicYear}-${installmentNumber}-${item.feesTypeId._id}`;

          newPaidAmounts[key] = payableAmount;
        });
        setPaidAmounts(newPaidAmounts);
      } else {
        installmentData.forEach((item) => {
          const key = `${academicYear}-${installmentNumber}-${item.feesTypeId._id}`;
          delete newPaidAmounts[key];
        });
        setPaidAmounts(newPaidAmounts);
      }

      setSelectedFeeTypesByInstallment((prevTypes) => {
        if (!isSelected) {
          return {
            ...prevTypes,
            [academicYear]: {
              ...(prevTypes[academicYear] || {}),
              [installmentNumber]: allFeeTypeIds,
            },
          };
        } else {
          const newTypes = { ...prevTypes };
          if (newTypes[academicYear]) {
            delete newTypes[academicYear][installmentNumber];
            if (Object.keys(newTypes[academicYear]).length === 0) {
              delete newTypes[academicYear];
            }
          }
          return newTypes;
        }
      });

      return {
        ...prev,
        [academicYear]: newYearInstallments,
      };
    });
  };

  const handleFeeTypeSelection = (
    installmentNumber,
    feeTypeId,
    academicYear
  ) => {
    setSelectedFeeTypesByInstallment((prev) => {
      const yearTypes = prev[academicYear] || {};
      const currentInstallmentTypes = yearTypes[installmentNumber] || [];
      const isAlreadySelected = currentInstallmentTypes.includes(feeTypeId);
      const newTypes = isAlreadySelected
        ? currentInstallmentTypes.filter((id) => id !== feeTypeId)
        : [...currentInstallmentTypes, feeTypeId];

      setSelectedInstallments((prevInst) => {
        const yearInstallments = prevInst[academicYear] || [];
        const isInstallmentSelected = newTypes.length > 0;

        if (
          isInstallmentSelected &&
          !yearInstallments.includes(installmentNumber)
        ) {
          return {
            ...prevInst,
            [academicYear]: [...yearInstallments, installmentNumber],
          };
        } else if (
          !isInstallmentSelected &&
          yearInstallments.includes(installmentNumber)
        ) {
          const newYearInstallments = yearInstallments.filter(
            (num) => num !== installmentNumber
          );
          const newInstallments = {
            ...prevInst,
            [academicYear]: newYearInstallments,
          };

          if (newYearInstallments.length === 0) {
            delete newInstallments[academicYear];
          }

          return newInstallments;
        }
        return prevInst;
      });

      if (!isAlreadySelected) {
        const yearData = feeData.find((y) => y.academicYear === academicYear);
        if (yearData) {
          const installmentData = yearData.feeInstallments?.find(
            (item) =>
              item.installmentName === `Installment ${installmentNumber}` &&
              item.feesTypeId._id === feeTypeId
          );

          if (installmentData) {
            const concessionItem = yearData.concession?.concessionDetails?.find(
              (cd) =>
                cd.installmentName === `Installment ${installmentNumber}` &&
                cd.feesType === feeTypeId
            );

            const concessionAmount = concessionItem?.concessionAmount || 0;
            const fineAmount = installmentData.fineAmount || 0;
            const payableAmount =
              installmentData.amount - concessionAmount + fineAmount;
            const paidKey = `${academicYear}-${installmentNumber}-${feeTypeId}`;

            setPaidAmounts((prev) => ({
              ...prev,
              [paidKey]: payableAmount,
            }));
          }
        }
      } else {
        const paidKey = `${academicYear}-${installmentNumber}-${feeTypeId}`;
        setPaidAmounts((prev) => {
          const newPaidAmounts = { ...prev };
          delete newPaidAmounts[paidKey];
          return newPaidAmounts;
        });
      }

      return {
        ...prev,
        [academicYear]: {
          ...yearTypes,
          [installmentNumber]: newTypes,
        },
      };
    });
  };

  const handleAcademicYearSelect = (academicYear) => {
    if (selectAllYears) {
      setSelectAllYears(false);
      setSelectedAcademicYears([academicYear]);
    } else {
      setSelectedAcademicYears((prev) =>
        prev.includes(academicYear)
          ? prev.filter((year) => year !== academicYear)
          : [...prev, academicYear]
      );
    }

    updateInstallmentsForSelectedYears();
  };

  const updateInstallmentsForSelectedYears = () => {
    const allInstallments = new Set();
    feeData.forEach((year) => {
      if (
        (selectAllYears || selectedAcademicYears.includes(year.academicYear)) &&
        Array.isArray(year.installmentsPresent)
      ) {
        year.installmentsPresent.forEach((inst) => allInstallments.add(inst));
      }
    });
    setTotalInstallments(Array.from(allInstallments));
  };

  const handleSelectAllYears = () => {
    const newSelectAll = !selectAllYears;
    setSelectAllYears(newSelectAll);

    if (newSelectAll) {
      setSelectedAcademicYears(feeData.map((year) => year.academicYear));
    } else {
      setSelectedAcademicYears([]);
    }

    updateInstallmentsForAllYears(newSelectAll);
  };

  const updateInstallmentsForAllYears = (selectAll) => {
    if (selectAll) {
      const allInstallments = new Set();
      feeData.forEach((year) => {
        if (Array.isArray(year.installmentsPresent)) {
          year.installmentsPresent.forEach((inst) => allInstallments.add(inst));
        }
      });
      setTotalInstallments(Array.from(allInstallments));
    } else {
      setTotalInstallments([]);
    }
  };

  const handlePaidAmountChange = (
    installmentNum,
    feeTypeId,
    amount,
    academicYear
  ) => {
    const key = `${academicYear}-${installmentNum}-${feeTypeId}`;
    setPaidAmounts((prev) => ({
      ...prev,
      [key]: amount,
    }));

    setFeeData((prev) => {
      if (!prev || !Array.isArray(prev)) return prev;

      return prev.map((year) => {
        if (
          selectAllYears ||
          selectedAcademicYears.includes(year.academicYear)
        ) {
          const updatedInstallments = year.feeInstallments.map((item) => {
            if (
              item.installmentName === `Installment ${installmentNum}` &&
              item.feesTypeId._id === feeTypeId
            ) {
              return { ...item, paidAmount: amount };
            }
            return item;
          });
          return { ...year, feeInstallments: updatedInstallments };
        }
        return year;
      });
    });
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!formData.paymentMode || !formData.name) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsGenerating(true);

    try {
      const actualSelectedYears = selectAllYears
        ? feeData.map((year) => year.academicYear)
        : selectedAcademicYears;

      if (actualSelectedYears.length === 0) {
        throw new Error("No academic years selected for processing");
      }

      const baseReceiptDetails = {
        studentName: `${formData.firstName} ${formData.lastName}`,
        studentAdmissionNumber: formData.AdmissionNumber,
        className:
          classes.find((c) => c._id === formData.masterDefineClass)
            ?.className || "",
        section: sections.find((s) => s._id === formData.section)?.name || "",
        date: new Date().toISOString().split("T")[0],
        paymentMode: formData.paymentMode,
        collectorName: formData.name,
        bankName:
          formData.paymentMode === "Cheque" ? formData.bankName : undefined,
      };

      const frontendReceiptDetails = [];

      for (const academicYear of actualSelectedYears) {
        if (!selectedInstallments[academicYear]?.length) {
          console.warn(
            `No installments selected for academic year ${academicYear}`
          );
          continue;
        }

        const receiptDetails = {
          ...baseReceiptDetails,
          // receiptNumber: generateReceiptNumber(),
          transactionNumber:
            formData.paymentMode === "Online Transfer"
              ? generateTransactionNumber()
              : formData.chequeNumber,
          academicYear,
          installments: [],
        };

        for (const installmentNum of selectedInstallments[academicYear] || []) {
          const installmentData = getInstallmentData(
            installmentNum,
            academicYear
          );
          const selectedTypes =
            selectedFeeTypesByInstallment[academicYear]?.[installmentNum] || [];

          if (!selectedTypes.length) {
            console.warn(
              `No fee types selected for installment ${installmentNum}, year ${academicYear}`
            );
            continue;
          }

          const seenFeeTypeIds = new Set();
          const uniqueFeeItems = installmentData
            .filter((item) => selectedTypes.includes(item.feesTypeId._id))
            .filter((item) => {
              if (seenFeeTypeIds.has(item.feesTypeId._id)) {
                console.warn(
                  `Duplicate feeTypeId ${item.feesTypeId._id} filtered out for installment ${installmentNum}, year ${academicYear}`
                );
                return false;
              }
              seenFeeTypeIds.add(item.feesTypeId._id);
              return true;
            })
            .map((item) => {
              const concessionItem = feeData
                .find((y) => y.academicYear === item.academicYear)
                ?.concession?.concessionDetails?.find(
                  (cd) =>
                    cd.installmentName === item.installmentName &&
                    cd.feesType === item.feesTypeId._id
                );

              const concession = concessionItem?.concessionAmount || 0;
              const fineAmount = item.fineAmount || 0;
              const payable = item.amount - concession;
              const paidKey = `${item.academicYear}-${installmentNum}-${item.feesTypeId._id}`;
              const paid = paidAmounts[paidKey] || item.paidAmount || 0;

              return {
                feeTypeId: item.feesTypeId._id,
                amount: item.amount,
                concession,
                fineAmount,
                payable,
                paid,
                balance: payable - paid,
                academicYear: item.academicYear,
              };
            });

          if (uniqueFeeItems.length > 0) {
            receiptDetails.installments.push({
              number: installmentNum,
              academicYear,
              feeItems: uniqueFeeItems,
            });
          }
        }

        if (receiptDetails.installments.length === 0) {
          console.warn(
            `No valid fee items selected for academic year ${academicYear}`
          );
          continue;
        }

        const response = await postAPI(
          "/create-schoolfees",
          receiptDetails,
          true
        );

        if (response.hasError) {
          throw new Error(
            response.message || `Failed to save receipt for ${academicYear}`
          );
        }

        frontendReceiptDetails.push({
          ...receiptDetails,
          receiptNumber: response.data.receipt.receiptNumber,
          bankName:
            formData.paymentMode === "Cheque" ? formData.bankName : undefined,
          installments: receiptDetails.installments.map((inst) => ({
            ...inst,
            feeItems: inst.feeItems.map((item) => ({
              ...item,
              type: getFeeTypeName(item.feeTypeId),
              academicYear: item.academicYear,
            })),
          })),
        });
      }

      if (frontendReceiptDetails.length === 0) {
        throw new Error("No valid fee items selected for any academic year");
      }

      toast.success("Receipts generated successfully!");

      navigate(
        "/school-dashboard/fees-module/fees-receipts/school-fees/student-receipts",
        {
          state: frontendReceiptDetails,
        }
      );
    } catch (error) {
      toast.error(error.message || "Failed to generate receipts");
      console.error("Receipt generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    formData,
    handleChange,
    handleAdmissionSubmit,
    existingStudents,
    classes,
    sections,
    feeData,
    selectedAcademicYears,
    selectAllYears,
    setSelectAllYears,
    currentInstallment,
    setCurrentInstallment,
    totalInstallments,
    selectedInstallments,
    getFeeTypeName,
    getInstallmentData,
    handleInstallmentSelection,
    handleFeeTypeSelection,
    handleFinalSubmit,
    isGenerating,
    showFullForm,
    showSecondTable,
    setShowSecondTable,
    showProcessedData,
    setShowProcessedData,
    selectedFeeTypesByInstallment,
    handlePaidAmountChange,
    paidAmounts,
    handleAcademicYearSelect,
    handleSelectAllYears,
    setTotalInstallments,
    schoolId,
    feeTypes,
  };
};

export default useSchoolFeesReceipts;
