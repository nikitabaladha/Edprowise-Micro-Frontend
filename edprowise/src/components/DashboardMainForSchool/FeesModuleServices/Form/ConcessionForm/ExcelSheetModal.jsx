import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import postAPI from "../../../../../api/postAPI.jsx";
import getAPI from "../../../../../api/getAPI.jsx";
import ImportModal from "./ImportModal.jsx";
import ConfirmModal from "../../../../ConfirmModalImportExcel.jsx";
import PreviewModal from "./PreviewModal.jsx";

const ExcelSheetModal = ({
  show,
  onClose,
  schoolId,
  academicYear,
  onImportSuccess,
  classes,
}) => {
  const [file, setFile] = useState(null);
  const [showMainModal, setShowMainModal] = useState(show);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFullPreviewModal, setShowFullPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [validatedData, setValidatedData] = useState([]);
  const [students, setStudents] = useState([]);
  const [feeTypesByClass, setFeeTypesByClass] = useState({});

  useEffect(() => {
    setShowMainModal(show);
  }, [show]);

  useEffect(() => {
    if (!schoolId) return;

    const fetchData = async () => {
      try {
        const studentRes = await getAPI(`/get-admission-form/${schoolId}`);
        if (!studentRes.hasError) {
          setStudents(
            Array.isArray(studentRes.data.data) ? studentRes.data.data : []
          );
        } else {
          toast.error(studentRes.message || "Failed to fetch student list.");
        }
      } catch (error) {
        toast.error("Error fetching data.");
        console.error(error);
      }
    };

    fetchData();
  }, [schoolId]);

  const fetchFeeTypes = async (classId) => {
    try {
      const response = await getAPI(`/getall-fess-type/${schoolId}`);
      if (!response.hasError) {
        const feeTypes = response.data.data.map((fee) => ({
          id: fee._id,
          name: fee.feesTypeName,
          amount: fee.amount || 0,
        }));
        console.log(`FeeTypes for class ${classId}:`, feeTypes);
        return feeTypes;
      }
      return [];
    } catch (error) {
      console.error("Fee type fetch error:", error);
      return [];
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImportClick = () => {
    if (!file) {
      toast.error("Please select a file to import.");
      return;
    }
    if (!academicYear) {
      toast.error("Please select an academic year before importing.");
      return;
    }
    if (students.length === 0) {
      toast.error(
        "No students available. Please ensure students are registered in the system."
      );
      return;
    }
    if (classes.length === 0) {
      toast.error(
        "No classes available. Please configure classes in the system."
      );
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
            .filter((row) => {
              return row.AdmissionNumber?.toString().trim();
            });

          console.log("Raw Excel Data:", jsonData);

          if (jsonData.length === 0) {
            toast.error("No valid data rows found in the Excel file.");
            resolve({ jsonData: [], validatedData: [] });
            return;
          }

          const tempValidatedData = [];
          const groupedData = {};
          let hasError = false;

          const feeTypesCache = {};
          for (const cls of classes) {
            feeTypesCache[cls._id] = await fetchFeeTypes(cls._id);
          }
          setFeeTypesByClass(feeTypesCache);
          console.log("FeeTypes Cache:", feeTypesCache);

          jsonData.forEach((row, index) => {
            const admissionNumber = row.AdmissionNumber?.toString().trim();
            if (!groupedData[admissionNumber]) {
              groupedData[admissionNumber] = {
                rows: [],
                validatedPayload: null,
              };
            }
            groupedData[admissionNumber].rows.push({
              ...row,
              rowIndex: index + 1,
            });
          });

          for (const admissionNumber in groupedData) {
            const group = groupedData[admissionNumber];
            const rows = group.rows;
            let rowValid = true;
            const payload = {
              academicYear,
              AdmissionNumber: admissionNumber,
              concessionDetails: [],
            };

            const student = students.find(
              (s) => s.AdmissionNumber.trim() === admissionNumber
            );
            if (!student) {
              toast.error(
                `Row ${rows[0].rowIndex}: Invalid Admission Number "${admissionNumber}".`
              );
              hasError = true;
              rowValid = false;
            } else {
              payload.firstName =
                rows[0].firstName?.toString().trim() || student.firstName || "";
              payload.middleName =
                rows[0].middleName?.toString().trim() ||
                student.middleName ||
                "";
              payload.lastName =
                rows[0].lastName?.toString().trim() || student.lastName || "";
              payload.concessionType =
                rows[0].concessionType?.toString().trim() || "";
              console.log(
                `Row ${rows[0].rowIndex}: Found student for AdmissionNumber ${admissionNumber}`
              );
            }

            const className = rows[0].className?.toString().trim();
            const classObj = classes.find(
              (c) => c.className.toLowerCase() === className?.toLowerCase()
            );
            if (!classObj) {
              toast.error(
                `Row ${rows[0].rowIndex}: Invalid Class "${className}".`
              );
              hasError = true;
              rowValid = false;
            } else {
              payload.masterDefineClass = classObj._id;
              console.log(
                `Row ${rows[0].rowIndex}: Class ${className} mapped to ID ${classObj._id}`
              );
            }

            const sectionName = rows[0].section?.toString().trim();
            const sectionObj = classObj?.sections?.find(
              (s) => s.name.toLowerCase() === sectionName?.toLowerCase()
            );
            if (!sectionObj) {
              toast.error(
                `Row ${rows[0].rowIndex}: Invalid Section "${sectionName}" for class "${className}".`
              );
              hasError = true;
              rowValid = false;
            } else {
              payload.section = sectionObj._id;
              console.log(
                `Row ${rows[0].rowIndex}: Section ${sectionName} mapped to ID ${sectionObj._id}`
              );
            }

            const validConcessionTypes = [
              "EWS",
              "SC",
              "ST",
              "OBC",
              "Staff Children",
              "Other",
            ];
            if (!validConcessionTypes.includes(payload.concessionType)) {
              toast.error(
                `Row ${rows[0].rowIndex}: Invalid Concession Type "${
                  payload.concessionType
                }". Must be one of: ${validConcessionTypes.join(", ")}.`
              );
              hasError = true;
              rowValid = false;
            }

            const requiredFields = [
              {
                key: "firstName",
                value: payload.firstName,
                label: "First Name",
              },
              { key: "lastName", value: payload.lastName, label: "Last Name" },
              {
                key: "concessionType",
                value: payload.concessionType,
                label: "Concession Type",
              },
            ];

            for (const field of requiredFields) {
              if (!field.value) {
                toast.error(
                  `Row ${rows[0].rowIndex}: ${field.label} is required.`
                );
                hasError = true;
                rowValid = false;
              }
            }

            rows.forEach((row, rowIndex) => {
              const detail = {
                installmentName: row.installmentName?.toString().trim() || "",
                feesType: "",
                totalFees: Number(row.totalFees) || 0,
                concessionPercentage: Number(row.concessionPercentage) || 0,
                concessionAmount: Number(row.concessionAmount) || 0,
                balancePayable: Number(row.balancePayable) || 0,
              };

              const feeTypeName = row.selectedFeeType?.toString().trim();
              const feeTypes = feeTypesCache[classObj?._id] || [];
              const feeType = feeTypes.find(
                (ft) => ft.name.toLowerCase() === feeTypeName?.toLowerCase()
              );
              if (!feeType) {
                toast.error(
                  `Row ${row.rowIndex}: Invalid Fee Type "${feeTypeName}".`
                );
                hasError = true;
                rowValid = false;
              } else {
                detail.feesType = feeType.id;
                console.log(
                  `Row ${row.rowIndex}: FeeType ${feeTypeName} mapped to ID ${feeType.id}`
                );
              }

              if (
                !detail.installmentName ||
                detail.totalFees <= 0 ||
                detail.concessionPercentage < 0 ||
                detail.concessionPercentage > 100
              ) {
                toast.error(`Row ${row.rowIndex}: Invalid concession details.`);
                hasError = true;
                rowValid = false;
              }

              const expectedConcessionAmount =
                (detail.totalFees * detail.concessionPercentage) / 100;
              const expectedBalancePayable =
                detail.totalFees - expectedConcessionAmount;
              if (
                Math.abs(detail.concessionAmount - expectedConcessionAmount) >
                  0.01 ||
                Math.abs(detail.balancePayable - expectedBalancePayable) > 0.01
              ) {
                toast.error(
                  `Row ${row.rowIndex}: Concession calculations incorrect.`
                );
                hasError = true;
                rowValid = false;
              }

              payload.concessionDetails.push(detail);
            });

            if (payload.concessionDetails.length === 0) {
              toast.error(
                `Row ${rows[0].rowIndex}: At least one concession detail is required.`
              );
              hasError = true;
              rowValid = false;
            }

            if (rowValid) {
              tempValidatedData.push(payload);
              group.validatedPayload = payload;
              console.log(
                `AdmissionNumber ${admissionNumber}: Added to validatedData`,
                payload
              );
            } else {
              console.log(
                `AdmissionNumber ${admissionNumber}: Skipped due to validation errors`
              );
            }
          }

          if (hasError) {
            toast.warn(
              "Some rows contain errors. Review the preview and correct the file."
            );
          } else {
            toast.success("All rows validated successfully.");
          }

          console.log("Validated Data:", tempValidatedData);
          resolve({ jsonData, validatedData: tempValidatedData });
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        toast.error("Error processing Excel file: " + error.message);
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
      // Error
    }
  };

  const handleConfirmImport = async () => {
    if (previewData.length === 0) {
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

    for (const [index, data] of validatedData.entries()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("schoolId", schoolId);
        formDataToSend.append("academicYear", data.academicYear);
        formDataToSend.append("AdmissionNumber", data.AdmissionNumber);
        formDataToSend.append("firstName", data.firstName);
        formDataToSend.append("middleName", data.middleName);
        formDataToSend.append("lastName", data.lastName);
        formDataToSend.append("masterDefineClass", data.masterDefineClass);
        formDataToSend.append("section", data.section);
        formDataToSend.append("concessionType", data.concessionType);

        data.concessionDetails.forEach((detail, idx) => {
          formDataToSend.append(
            `concessionDetails[${idx}][installmentName]`,
            detail.installmentName
          );
          formDataToSend.append(
            `concessionDetails[${idx}][feesType]`,
            detail.feesType
          );
          formDataToSend.append(
            `concessionDetails[${idx}][totalFees]`,
            detail.totalFees
          );
          formDataToSend.append(
            `concessionDetails[${idx}][concessionPercentage]`,
            detail.concessionPercentage
          );
          formDataToSend.append(
            `concessionDetails[${idx}][concessionAmount]`,
            detail.concessionAmount
          );
          formDataToSend.append(
            `concessionDetails[${idx}][balancePayable]`,
            detail.balancePayable
          );
        });

        const response = await postAPI(
          "/create-Concession-form",
          formDataToSend,
          {
            "Content-Type": "multipart/form-data",
          }
        );

        if (!response.hasError) {
          toast.success(
            `Concession form for Admission Number ${
              data.AdmissionNumber
            } imported successfully (Row ${index + 1}).`
          );
        } else {
          toast.error(
            `Row ${index + 1}: ${
              response.message || "Failed to import concession form."
            }`
          );
        }
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message ||
          `Error importing concession form for row ${index + 1}.`;
        toast.error(errorMessage);
      }
    }

    onImportSuccess();
    setFile(null);
    setPreviewData([]);
    setValidatedData([]);
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
    setShowMainModal(true);
  };

  const handleDownloadDemo = () => {
    if (students.length === 0 || classes.length === 0) {
      toast.error("No students or classes available to include in demo sheet.");
      return;
    }

    const guidelines = [
      ["📌 Import Guidelines:"],
      [
        "• Required Fields: AdmissionNumber, firstName, lastName, className, section, concessionType, installmentName, selectedFeeType, totalFees, concessionPercentage, concessionAmount, balancePayable.",
      ],
      ["• Optional Fields: middleName."],
      [
        "• Formats: concessionType must be EWS/SC/ST/OBC/Staff Children/Other. concessionPercentage must be 0-100. concessionAmount = totalFees * concessionPercentage / 100. balancePayable = totalFees - concessionAmount.",
      ],
      [
        "• Each installment should be a separate row with the same AdmissionNumber, className, section, etc.",
      ],
      ["• Do not change column headers; they must remain exactly as provided."],
      ['• Use the "Data" sheet to enter your data.'],
      [`• Available Classes: ${classes.map((c) => c.className).join(", ")}.`],
      [
        `• Sample Admission Numbers: ${students
          .slice(0, 5)
          .map((s) => s.AdmissionNumber)
          .join(", ")}.`,
      ],
    ];

    const wsData = [
      [
        "AdmissionNumber",
        "firstName",
        "middleName",
        "lastName",
        "className",
        "section",
        "concessionType",
        "installmentName",
        "selectedFeeType",
        "totalFees",
        "concessionPercentage",
        "concessionAmount",
        "balancePayable",
      ],
      [
        students[0]?.AdmissionNumber || "ADM001",
        "John",
        "",
        "Doe",
        classes[0]?.className || "Grade 10",
        "A",
        "EWS",
        "Term 1",
        "Tuition Fee",
        "1000",
        "10",
        "100",
        "900",
      ],
      [
        students[0]?.AdmissionNumber || "ADM001",
        "John",
        "",
        "Doe",
        classes[0]?.className || "Grade 10",
        "A",
        "EWS",
        "Term 2",
        "Tuition Fee",
        "1000",
        "10",
        "100",
        "900",
      ],
      [
        students[0]?.AdmissionNumber || "ADM001",
        "John",
        "",
        "Doe",
        classes[0]?.className || "Grade 10",
        "A",
        "EWS",
        "Term 3",
        "Tuition Fee",
        "1000",
        "10",
        "100",
        "900",
      ],
      [
        students[0]?.AdmissionNumber || "ADM001",
        "John",
        "",
        "Doe",
        classes[0]?.className || "Grade 10",
        "A",
        "EWS",
        "Term 4",
        "Tuition Fee",
        "1000",
        "10",
        "100",
        "900",
      ],
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    const wsGuidelines = XLSX.utils.aoa_to_sheet(guidelines);
    XLSX.utils.book_append_sheet(wb, wsGuidelines, "Guidelines");

    XLSX.writeFile(wb, "concession_form.xlsx");
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateY(-50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .confirmation-dialog {
            animation: slideIn 0.3s ease-out;
          }
          .confirmation-dialog .bg-warning {
            animation: fadeIn 0.5s ease-in;
          }
        `}
      </style>
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
      <PreviewModal
        show={showFullPreviewModal}
        onClose={() => setShowFullPreviewModal(false)}
        previewData={previewData}
        validatedData={validatedData}
        students={students}
        classes={classes}
        feeTypesByClass={feeTypesByClass}
      />
    </>
  );
};

export default ExcelSheetModal;
