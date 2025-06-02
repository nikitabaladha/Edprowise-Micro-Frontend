import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import postAPI from "../../../../../api/postAPI.jsx";
import ImportModal from "./ImportModal.jsx";
import ConfirmModal from "../../../../ConfirmModalImportExcel.jsx";
import PreviewModal from "./PreviewModal.jsx";

const ExcelSheetModal = ({ show, onClose, schoolId, onImportSuccess }) => {
  const [file, setFile] = useState(null);
  const [showMainModal, setShowMainModal] = useState(show);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFullPreviewModal, setShowFullPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [validatedData, setValidatedData] = useState([]);

  useEffect(() => {
    setShowMainModal(show);
  }, [show]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImportClick = () => {
    if (!file) {
      toast.error("Please select a file to import.");
      return;
    }
    setShowMainModal(false);
    setShowConfirmModal(true);
  };

  const processExcelData = () => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
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
              return (
                row.FeesTypeName?.toString().trim() &&
                row.GroupOfFees?.toString().trim()
              );
            });

          if (jsonData.length === 0) {
            toast.error("No valid data rows found in the Excel file.");
            resolve({ jsonData: [], validatedData: [] });
            return;
          }

          const tempValidatedData = [];
          let hasError = false;

          jsonData.forEach((row, index) => {
            const feesTypeName = row.FeesTypeName
              ? String(row.FeesTypeName).trim()
              : "";
            const groupOfFees = row.GroupOfFees
              ? String(row.GroupOfFees).trim()
              : "";

            if (!feesTypeName || !groupOfFees) {
              toast.error(
                `Row ${index + 1}: Fees Type Name or Group of Fees is missing.`
              );
              hasError = true;
              return;
            }

            const validGroups = ["School Fees", "One Time Fees"];
            if (!validGroups.includes(groupOfFees)) {
              toast.error(
                `Row ${
                  index + 1
                }: Invalid Group of Fees "${groupOfFees}". Must be one of: ${validGroups.join(
                  ", "
                )}.`
              );
              hasError = true;
              return;
            }

            tempValidatedData.push({
              feesTypeName,
              groupOfFees,
              schoolId,
            });
          });

          if (hasError) {
            toast.error(
              "Some rows contain errors. Review the preview and correct the file."
            );
          }

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

    for (const [index, payload] of validatedData.entries()) {
      try {
        const response = await postAPI("/create-fess-type", payload, true);
        if (!response.hasError) {
          toast.success(
            `Fees Type ${payload.feesTypeName} imported successfully!`
          );
        } else {
          toast.error(
            response.message ||
              `Failed to import fees type ${payload.feesTypeName} (Row ${
                index + 1
              }).`
          );
        }
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message ||
          `Error importing fees type for row ${index + 1}.`;
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
    // Guidelines for the separate sheet
    const guidelines = [
      ["📌 Import Guidelines:"],
      [
        "• FeesTypeName: Enter the fees type name (e.g., Tuition Fee, Admission Fee).",
      ],
      ["• GroupOfFees: Must be one of: School Fees, One Time Fees."],
      ["• Ensure all fields are filled and valid."],
      [
        "• Do not change the column headers; they must remain exactly as provided.",
      ],
      ['• Use the "Data" sheet to enter your data.'],
    ];

    const wsData = [
      ["FeesTypeName", "GroupOfFees"],
      ["Tuition Fee", "School Fees"],
      ["Admission Fee", "One Time Fees"],
    ];

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    const wsGuidelines = XLSX.utils.aoa_to_sheet(guidelines);
    XLSX.utils.book_append_sheet(wb, wsGuidelines, "Guidelines");

    XLSX.writeFile(wb, "fees_type.xlsx");
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
      />
    </>
  );
};

export default ExcelSheetModal;
