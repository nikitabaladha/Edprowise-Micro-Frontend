import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import postAPI from "../../../../../api/postAPI.jsx";
import ImportModal from "./ImportModal.jsx";
import ConfirmModal from "../../../../ConfirmModalImportExcel.jsx";
import PreviewModal from "./PreviewModal.jsx";

const ExcelSheetModal = ({ show, onClose, shifts, onImportSuccess }) => {
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
    if (shifts.length === 0) {
      toast.error(
        "No shifts available. Please configure shifts in the system."
      );
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
                row.Class?.toString().trim() &&
                row.Section?.toString().trim() &&
                row.Shift?.toString().trim()
              );
            });

          if (jsonData.length === 0) {
            toast.error("No valid data rows found in the Excel file.");
            resolve({ jsonData: [], validatedData: [] });
            return;
          }

          const groupedData = {};
          let hasError = false;

          jsonData.forEach((row, index) => {
            const shiftValue = row.Shift ? String(row.Shift).trim() : "";
            const className = row.Class ? String(row.Class).trim() : "";
            const sectionNames = row.Section
              ? String(row.Section)
                  .split(",")
                  .map((s) => s.trim())
                  .filter((s) => s)
              : [];

            if (!shiftValue) {
              toast.error(`Row ${index + 1}: Shift is missing or empty.`);
              hasError = true;
              return;
            }

            const shift = shifts.find(
              (s) =>
                s.masterDefineShiftName.toLowerCase() ===
                shiftValue.toLowerCase()
            );
            if (!shift) {
              toast.error(
                `Row ${
                  index + 1
                }: Invalid shift "${shiftValue}". Available shifts: ${shifts
                  .map((s) => s.masterDefineShiftName)
                  .join(", ")}.`
              );
              hasError = true;
              return;
            }

            if (!className || sectionNames.length === 0) {
              toast.error(`Row ${index + 1}: Class or Section is missing.`);
              hasError = true;
              return;
            }

            if (!groupedData[className]) {
              groupedData[className] = {
                className,
                sections: [],
              };
            }

            sectionNames.forEach((sectionName) => {
              if (
                !groupedData[className].sections.some(
                  (s) => s.name === sectionName
                )
              ) {
                groupedData[className].sections.push({
                  name: sectionName,
                  shiftId: shift._id,
                });
              } else {
                toast.warn(
                  `Row ${
                    index + 1
                  }: Duplicate section "${sectionName}" for class "${className}" ignored.`
                );
              }
            });
          });

          if (hasError) {
            toast.error(
              "Some rows contain errors. Review the preview and correct the file."
            );
          }

          const validatedData = Object.values(groupedData);

          resolve({ jsonData, validatedData });
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
        const response = await postAPI(
          "/create-class-and-section",
          payload,
          {},
          true
        );
        if (!response.hasError) {
          toast.success(`Class ${payload.className} imported successfully!`);
        } else {
          toast.error(
            response.message ||
              `Failed to import class ${payload.className} (Row ${index + 1}).`
          );
        }
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message ||
          `Error importing class for row ${index + 1}.`;
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
    if (shifts.length === 0) {
      toast.error("No shifts available to include in demo sheet.");
      return;
    }

    const guidelines = [
      ["📌 Import Guidelines:"],
      ["• Class: Enter the class name (e.g., Grade 1, Class 10, or 10)."],
      [
        "• Section: Enter section names, separated by commas for multiple sections (e.g., A or A,B,C).",
      ],
      [
        `• Shift: Must match one of the following available shifts: ${shifts
          .map((s) => s.masterDefineShiftName)
          .join(", ")}.`,
      ],
      ["• Ensure all fields are filled and valid."],
      [
        "• Do not change the column headers; they must remain exactly as provided.",
      ],
      ['• Use the "Data" sheet to enter your data.'],
      [
        '• Example: For class UKG with sections A, B, and C, enter "A,B,C" in the Section column.',
      ],
    ];

    const wsData = [
      ["Class", "Section", "Shift"],
      ["Nursery", "A,B", "Morning"],
      ["LKG", "A", "Morning"],
      ["UKG", "A,B,C", "Morning"],
      ["Nursery", "C", "Afternoon"],
    ];

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    const wsGuidelines = XLSX.utils.aoa_to_sheet(guidelines);
    XLSX.utils.book_append_sheet(wb, wsGuidelines, "Guidelines");

    XLSX.writeFile(wb, "class_section.xlsx");
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
