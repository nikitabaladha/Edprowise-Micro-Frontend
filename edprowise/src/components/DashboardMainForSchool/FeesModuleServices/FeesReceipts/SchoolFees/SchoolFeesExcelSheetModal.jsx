import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI.jsx";
import postAPI from "../../../../../api/postAPI.jsx";
import ImportModal from "./ImportModal.jsx";
import ConfirmModal from "../../../../ConfirmModalImportExcel.jsx";
import SchoolFeesPreviewModal from "./SchoolFeesPreviewModal.jsx";

const SchoolFeesExcelSheetModal = ({
  show,
  onClose,
  schoolId,
  existingStudents,
  classes,
  feeTypes,
}) => {
  const [file, setFile] = useState(null);
  const [showMainModal, setShowMainModal] = useState(show);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFullPreviewModal, setShowFullPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [validatedData, setValidatedData] = useState([]);
  const [sectionsByClass, setSectionsByClass] = useState({});

  useEffect(() => {
    setShowMainModal(show);
  }, [show]);

  useEffect(() => {
    const sectionsCache = {};
    classes.forEach((cls) => {
      sectionsCache[cls._id] = cls.sections || [];
    });
    setSectionsByClass(sectionsCache);
  }, [classes]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImportClick = () => {
    if (!file) {
      toast.error("Please select a file to import.");
      return;
    }
    if (!schoolId) {
      toast.error("School ID is missing. Please contact support.");
      return;
    }
    setShowMainModal(false);
    setShowConfirmModal(true);
  };

  const processExcelData = async () => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames.find(
            (name) => name.toLowerCase() === "data"
          );
          if (!sheetName) {
            toast.error('No "Data" sheet found in the Excel file.');
            resolve({ jsonData: [], validatedData: [] });
            return;
          }

          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils
            .sheet_to_json(sheet, { defval: "" })
            .filter((row) => row.AdmissionNumber?.toString().trim());

          if (jsonData.length === 0) {
            toast.error("No valid data rows found in the Excel file.");
            resolve({ jsonData: [], validatedData: [] });
            return;
          }

          const tempValidatedData = [];
          let hasError = false;

          for (let index = 0; index < jsonData.length; index++) {
            const row = jsonData[index];
            const payload = {};

            payload.AdmissionNumber = row.AdmissionNumber?.toString().trim();
            payload.paymentMode = row.paymentMode?.toString().trim();
            payload.name = row.name?.toString().trim();
            payload.chequeNumber = row.chequeNumber?.toString().trim();
            payload.bankName = row.bankName?.toString().trim();
            payload.academicYear = row.academicYear?.toString().trim();
            payload.installmentNumber = row.installmentNumber
              ?.toString()
              .trim();
            payload.feeTypeName = row.feeTypeName?.toString().trim();
            payload.paidAmount = Number(row.paidAmount) || 0;
            payload.paymentDate = row.paymentDate?.toString().trim();

            if (!payload.AdmissionNumber) {
              toast.error(`Row ${index + 2}: Admission Number is required.`);
              hasError = true;
              continue;
            }

            const student = existingStudents.find(
              (s) => s.AdmissionNumber.trim() === payload.AdmissionNumber
            );
            if (!student) {
              toast.error(
                `Row ${index + 2}: Invalid Admission Number "${
                  payload.AdmissionNumber
                }".`
              );
              hasError = true;
              continue;
            }
            payload.firstName = student.firstName;
            payload.lastName = student.lastName;
            payload.masterDefineClass =
              student.masterDefineClass?._id || student.masterDefineClass;
            payload.section = student.section?._id || student.section;

            const className = row.className?.toString().trim();
            const classObj = classes.find(
              (c) => c.className.toLowerCase() === className?.toLowerCase()
            );
            if (!classObj) {
              toast.error(`Row ${index + 2}: Invalid Class "${className}".`);
              hasError = true;
              continue;
            }
            if (classObj._id !== payload.masterDefineClass) {
              toast.error(
                `Row ${
                  index + 2
                }: Class "${className}" does not match student’s class for Admission Number "${
                  payload.AdmissionNumber
                }".`
              );
              hasError = true;
              continue;
            }

            const sectionName = row.section?.toString().trim();
            const sections = sectionsByClass[classObj._id] || [];
            const sectionObj = sections.find(
              (s) => s.name.toLowerCase() === sectionName?.toLowerCase()
            );
            if (!sectionObj) {
              toast.error(
                `Row ${
                  index + 2
                }: Invalid Section "${sectionName}" for class "${className}".`
              );
              hasError = true;
              continue;
            }
            if (sectionObj._id !== payload.section) {
              toast.error(
                `Row ${
                  index + 2
                }: Section "${sectionName}" does not match student’s section for Admission Number "${
                  payload.AdmissionNumber
                }".`
              );
              hasError = true;
              continue;
            }

            if (
              !["Cash", "Cheque", "Online Transfer"].includes(
                payload.paymentMode
              )
            ) {
              toast.error(
                `Row ${index + 2}: Invalid Payment Mode "${
                  payload.paymentMode
                }". Must be one of: Cash, Cheque, Online Transfer.`
              );
              hasError = true;
              continue;
            }

            if (payload.paymentMode === "Cheque") {
              if (!payload.chequeNumber || !payload.bankName) {
                toast.error(
                  `Row ${
                    index + 2
                  }: Cheque Number and Bank Name are required for Cheque payment mode.`
                );
                hasError = true;
                continue;
              }
            } else {
              payload.chequeNumber = "";
              payload.bankName = "";
            }

            if (!payload.name) {
              toast.error(`Row ${index + 2}: Collector Name is required.`);
              hasError = true;
              continue;
            }

            if (!payload.academicYear) {
              toast.error(`Row ${index + 2}: Academic Year is required.`);
              hasError = true;
              continue;
            }

            const installmentNum = Number(payload.installmentNumber);
            if (isNaN(installmentNum) || installmentNum < 1) {
              toast.error(
                `Row ${index + 2}: Invalid Installment Number "${
                  payload.installmentNumber
                }".`
              );
              hasError = true;
              continue;
            }

            const feeType = feeTypes.find(
              (ft) =>
                ft.feesTypeName.toLowerCase() ===
                payload.feeTypeName?.toLowerCase()
            );
            if (!feeType) {
              toast.error(
                `Row ${index + 2}: Invalid Fee Type "${payload.feeTypeName}".`
              );
              hasError = true;
              continue;
            }
            payload.feesTypeId = feeType._id;

            if (!payload.paymentDate) {
              toast.error(`Row ${index + 2}: Payment Date is required.`);
              hasError = true;
              continue;
            }
            const parsedDate = new Date(payload.paymentDate);
            if (isNaN(parsedDate.getTime())) {
              toast.error(
                `Row ${index + 2}: Invalid Payment Date "${
                  payload.paymentDate
                }". Use format YYYY-MM-DD.`
              );
              hasError = true;
              continue;
            }
            payload.paymentDate = parsedDate;

            if (!payload.masterDefineClass) {
              toast.error(
                `Row ${index + 2}: Class ID is missing for Admission Number "${
                  payload.AdmissionNumber
                }".`
              );
              hasError = true;
              continue;
            }
            if (!payload.section) {
              toast.error(
                `Row ${
                  index + 2
                }: Section ID is missing for Admission Number "${
                  payload.AdmissionNumber
                }".`
              );
              hasError = true;
              continue;
            }
            if (!schoolId) {
              toast.error(
                `Row ${
                  index + 2
                }: School ID is missing. Please contact support.`
              );
              hasError = true;
              continue;
            }

            try {
              const response = await getAPI(
                `/get-concession-formbyADMID?classId=${payload.masterDefineClass}&sectionIds=${payload.section}&schoolId=${schoolId}&admissionNumber=${payload.AdmissionNumber}`
              );
              if (!response?.data?.data || !Array.isArray(response.data.data)) {
                toast.error(
                  `Row ${index + 2}: No fee data found for Admission Number "${
                    payload.AdmissionNumber
                  }".`
                );
                hasError = true;
                continue;
              }

              const yearData = response.data.data.find(
                (y) => y.academicYear === payload.academicYear
              );
              if (!yearData) {
                toast.error(
                  `Row ${index + 2}: Academic Year "${
                    payload.academicYear
                  }" not found for Admission Number "${
                    payload.AdmissionNumber
                  }".`
                );
                hasError = true;
                continue;
              }

              const installmentData = yearData.feeInstallments?.find(
                (item) =>
                  item.installmentName === `Installment ${installmentNum}` &&
                  item.feesTypeId._id === payload.feesTypeId
              );
              if (!installmentData) {
                toast.error(
                  `Row ${
                    index + 2
                  }: Installment ${installmentNum} with Fee Type "${
                    payload.feeTypeName
                  }" not found for Academic Year "${payload.academicYear}".`
                );
                hasError = true;
                continue;
              }

              const concessionItem =
                yearData.concession?.concessionDetails?.find(
                  (cd) =>
                    cd.installmentName === `Installment ${installmentNum}` &&
                    cd.feesType === payload.feesTypeId
                );
              const concessionAmount = concessionItem?.concessionAmount || 0;
              const fineAmount = installmentData.fineAmount || 0;
              const payableAmount =
                installmentData.amount - concessionAmount + fineAmount;

              if (
                payload.paidAmount <= 0 ||
                payload.paidAmount > payableAmount
              ) {
                toast.error(
                  `Row ${index + 2}: Paid Amount (${
                    payload.paidAmount
                  }) must be between 1 and ${payableAmount}.`
                );
                hasError = true;
                continue;
              }

              payload.amount = installmentData.amount;
              payload.concession = concessionAmount;
              payload.fineAmount = fineAmount;
              payload.payable = payableAmount;
              payload.balance = payableAmount - payload.paidAmount;
            } catch (error) {
              console.error(`Row ${index + 2}: API Error:`, error);
              toast.error(
                `Row ${index + 2}: Error fetching fee data: ${
                  error.message || "Failed to fetch fee data"
                }.`
              );
              hasError = true;
              continue;
            }

            tempValidatedData.push(payload);
          }

          if (hasError) {
            toast.error(
              "Some rows contain errors. Review the preview and correct the file."
            );
          }

          resolve({ jsonData, validatedData: tempValidatedData });
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        toast.error(
          `Error processing Excel file: ${error.message || "Unknown error"}`
        );
        console.error("Process Error:", error);
        reject(error);
      }
    });
  };

  const handleViewExcelSheet = async () => {
    if (!file) {
      toast.error("Please select a file to view.");
      return;
    }

    try {
      const { jsonData, validatedData } = await processExcelData();
      setPreviewData(jsonData);
      setValidatedData(validatedData);
      setShowFullPreviewModal(true);
    } catch (error) {
      console.error("View Excel Error:", error);
    }
  };

  const handleConfirmImport = async () => {
    if (validatedData.length === 0 && previewData.length === 0) {
      try {
        const { jsonData, validatedData } = await processExcelData();
        setPreviewData(jsonData);
        setValidatedData(validatedData);
      } catch (error) {
        setShowConfirmModal(false);
        setShowMainModal(true);
        return;
      }
    }

    if (validatedData.length === 0) {
      toast.error(
        "No valid data to import. Please review and correct the file."
      );
      setShowConfirmModal(false);
      setShowMainModal(true);
      return;
    }

    setShowConfirmModal(false);

    try {
      const groupedData = validatedData.reduce((acc, data) => {
        const key = `${data.AdmissionNumber}-${data.academicYear}`;
        if (!acc[key]) {
          acc[key] = {
            AdmissionNumber: data.AdmissionNumber,
            firstName: data.firstName,
            lastName: data.lastName,
            masterDefineClass: data.masterDefineClass,
            section: data.section,
            paymentMode: data.paymentMode,
            name: data.name,
            chequeNumber: data.chequeNumber,
            bankName: data.bankName,
            academicYear: data.academicYear,
            paymentDate: data.paymentDate,
            installments: [],
          };
        }
        const installmentNum = Number(data.installmentNumber);
        let installment = acc[key].installments.find(
          (i) => i.number === installmentNum
        );
        if (!installment) {
          installment = {
            number: installmentNum,
            academicYear: data.academicYear,
            feeItems: [],
          };
          acc[key].installments.push(installment);
        }
        installment.feeItems.push({
          feeTypeId: data.feesTypeId,
          amount: data.amount,
          concession: data.concession,
          fineAmount: data.fineAmount,
          payable: data.payable,
          paid: data.paidAmount,
          balance: data.balance,
          academicYear: data.academicYear,
        });
        return acc;
      }, {});

      for (const data of Object.values(groupedData)) {
        const formData = {
          AdmissionNumber: data.AdmissionNumber,
          firstName: data.firstName,
          lastName: data.lastName,
          masterDefineClass: data.masterDefineClass,
          section: data.section,
          paymentMode: data.paymentMode,
          name: data.name,
          chequeNumber: data.chequeNumber,
          bankName: data.bankName,
        };

        try {
          const receiptDetails = {
            studentName: `${data.firstName} ${data.lastName}`,
            studentAdmissionNumber: data.AdmissionNumber,
            className:
              classes.find((c) => c._id === data.masterDefineClass)
                ?.className || "Unknown",
            section:
              sectionsByClass[data.masterDefineClass]?.find(
                (s) => s._id === data.section
              )?.name || "Unknown",
            paymentDate: data.paymentDate,
            paymentMode: data.paymentMode,
            collectorName: data.name,
            transactionNumber:
              data.paymentMode === "Online Transfer"
                ? `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
                : data.chequeNumber || "",
            bankName: data.paymentMode === "Cheque" ? data.bankName : undefined,
            academicYear: data.academicYear,
            installments: data.installments.map((inst) => ({
              number: inst.number,
              feeItems: inst.feeItems.map((fi) => ({
                feeTypeId: fi.feeTypeId,
                amount: fi.amount,
                concession: fi.concession,
                fineAmount: fi.fineAmount,
                payable: fi.payable,
                paid: fi.paid,
                balance: fi.balance,
              })),
            })),
          };

          const response = await postAPI(
            "/create-schoolfees",
            receiptDetails,
            true
          );
          toast.success(
            `School Fees Data for ${data.firstName} ${data.lastName} imported successfully.`
          );
        } catch (error) {
          toast.error(
            `Failed to import for Admission Number ${data.AdmissionNumber}: ${
              error.message || "Unknown error"
            }`
          );
          continue;
        }
      }

      onClose();
      setFile(null);
      setPreviewData([]);
      setValidatedData([]);
    } catch (error) {
      toast.error(
        `Error importing fee receipts: ${error.message || "Unknown error"}`
      );
      setShowMainModal(true);
    }
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
    setShowMainModal(true);
  };

  const handleDownloadDemo = () => {
    if (classes.length === 0 || feeTypes.length === 0) {
      toast.error(
        "No classes or fee types available to include in demo sheet."
      );
      return;
    }

    const guidelines = [
      ["📌 Import Guidelines:"],
      [
        "Required Fields: AdmissionNumber, className, section, paymentMode, name, academicYear, installmentNumber, feeTypeName, paidAmount, paymentDate.",
      ],
      [
        "Conditional Fields: chequeNumber, bankName required if paymentMode is Cheque.",
      ],
      [
        "Formats: paymentMode must be Cash/Cheque/Online Transfer. academicYear must be in format YYYY-YYYY (e.g., 2023-2024). installmentNumber must be a positive integer. paidAmount must be a positive number not exceeding the payable amount. paymentDate must be in format YYYY-MM-DD (e.g., 2023-10-15).",
      ],
      [
        "AdmissionNumber must match an existing student. className and section must match the student’s data. feeTypeName must exist and be valid for the installment and academic year.",
      ],
      ["Do not change column headers; they must remain exactly as provided."],
      ['Use the "Data" sheet to enter your data.'],
      [`Available Classes: ${classes.map((c) => c.className).join(", ")}.`],
      [
        `Available Fee Types: ${feeTypes
          .map((ft) => ft.feesTypeName)
          .join(", ")}.`,
      ],
    ];

    const wsData = [
      [
        "AdmissionNumber",
        "className",
        "section",
        "paymentMode",
        "name",
        "chequeNumber",
        "bankName",
        "academicYear",
        "installmentNumber",
        "feeTypeName",
        "paidAmount",
        "paymentDate",
      ],
      [
        existingStudents[0]?.AdmissionNumber || "ABC10001",
        classes[0]?.className || "Grade 10",
        classes[0]?.sections[0]?.name || "A",
        "Cheque",
        "Admin User",
        "123456",
        "State Bank",
        "2023-2024",
        "1",
        feeTypes[0]?.feesTypeName || "Tuition Fee",
        "5000",
        "2023-10-15",
      ],
    ];

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    const wsGuidelines = XLSX.utils.aoa_to_sheet(guidelines);
    XLSX.utils.book_append_sheet(wb, wsGuidelines, "Guidelines");

    XLSX.writeFile(wb, "school_fees_receipt.xlsx");
  };

  return (
    <>
      <ImportModal
        show={showMainModal}
        onClose={onClose}
        handleFileChange={handleFileChange}
        handleImportClick={handleImportClick}
        handleDownloadDemo={handleDownloadDemo}
      />
      <ConfirmModal
        show={showConfirmModal}
        onCancel={handleCancelConfirm}
        onConfirm={handleConfirmImport}
        onViewExcelSheet={handleViewExcelSheet}
      />
      <SchoolFeesPreviewModal
        show={showFullPreviewModal}
        onClose={() => setShowFullPreviewModal(false)}
        previewData={previewData}
        validatedData={validatedData}
        classes={classes}
        feeTypes={feeTypes}
        sectionsByClass={sectionsByClass}
      />
    </>
  );
};

export default SchoolFeesExcelSheetModal;
