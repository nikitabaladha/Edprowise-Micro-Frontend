import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import postAPI from "../../../../../../api/postAPI.jsx";
import getAPI from "../../../../../../api/getAPI.jsx";
import ImportModal from "./ImportModal.jsx";
import ConfirmModal from "../../../../../ConfirmModalImportExcel.jsx";
import PreviewModal from "./PreviewModal.jsx";

const ExcelSheetModal = ({
  show,
  onClose,
  schoolId,
  academicYear,
  onImportSuccess,
}) => {
  const [file, setFile] = useState(null);
  const [showMainModal, setShowMainModal] = useState(show);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFullPreviewModal, setShowFullPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [validatedData, setValidatedData] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    setShowMainModal(show);
  }, [show]);

  useEffect(() => {
    if (!schoolId) return;

    const fetchData = async () => {
      try {
        const classRes = await getAPI(
          `/get-class-and-section/${schoolId}`,
          {},
          true
        );
        setClasses(classRes?.data?.data || []);
      } catch (error) {
        toast.error("Error fetching data.");
        console.error(error);
      }
    };

    fetchData();
  }, [schoolId]);

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
    if (classes.length === 0) {
      toast.error(
        "No classes available. Please configure classes in the system."
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
                row.Sections?.toString().trim() &&
                row.Amount?.toString().trim()
              );
            });

          if (jsonData.length === 0) {
            toast.error("No valid data rows found in the Excel file.");
            resolve({ jsonData: [], validatedData: [] });
            return;
          }

          const tempValidatedData = [];
          let hasError = false;

          const groupedData = {};
          jsonData.forEach((row, index) => {
            const className = row.Class ? String(row.Class).trim() : "";
            const sections = row.Sections
              ? String(row.Sections)
                  .trim()
                  .split(",")
                  .map((s) => s.trim())
              : [];
            const amount = row.Amount ? Number(row.Amount) : 0;

            const classObj = classes.find(
              (c) => c.className.toLowerCase() === className.toLowerCase()
            );
            if (!classObj) {
              toast.error(`Row ${index + 1}: Invalid class "${className}".`);
              hasError = true;
              return;
            }

            const validSections = sections.filter((s) =>
              classObj.sections.some(
                (sec) => sec.name.toLowerCase() === s.toLowerCase()
              )
            );
            if (validSections.length !== sections.length) {
              const invalid = sections.filter(
                (s) =>
                  !classObj.sections.some(
                    (sec) => sec.name.toLowerCase() === s.toLowerCase()
                  )
              );
              toast.error(
                `Row ${index + 1}: Invalid section(s) "${invalid.join(
                  ", "
                )}" for class "${className}".`
              );
              hasError = true;
              return;
            }
            const sectionIds = validSections.map(
              (s) =>
                classObj.sections.find(
                  (sec) => sec.name.toLowerCase() === s.toLowerCase()
                )._id
            );

            if (!amount || amount <= 0) {
              toast.error(
                `Row ${index + 1}: Amount must be a positive number.`
              );
              hasError = true;
              return;
            }

            const key = `${classObj._id}-${sectionIds.sort().join(",")}`;
            if (!groupedData[key]) {
              groupedData[key] = {
                classId: classObj._id,
                sectionIds,
                amount,
              };
            } else {
              toast.error(
                `Row ${
                  index + 1
                }: Duplicate class "${className}" and sections "${sections.join(
                  ", "
                )}".`
              );
              hasError = true;
            }
          });

          if (hasError) {
            toast.error(
              "Some rows contain errors. Review the preview and correct the file."
            );
          }

          Object.values(groupedData).forEach((group) => {
            tempValidatedData.push({
              academicYear,
              classId: group.classId,
              sectionIds: group.sectionIds,
              amount: group.amount,
            });
          });

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
        const response = await postAPI(
          "/create-board-exam-fees",
          payload,
          true
        );
        if (!response.hasError) {
          toast.success(
            `Board exam fees for class imported successfully (Row ${
              index + 1
            }).`
          );
        } else {
          toast.error(
            response.message ||
              `Failed to import board exam fees for row ${index + 1}.`
          );
        }
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message ||
          `Error importing board exam fees for row ${index + 1}.`;
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
    if (classes.length === 0) {
      toast.error("No classes available to include in demo sheet.");
      return;
    }

    const guidelines = [
      ["📌 Import Guidelines:"],
      ["• Class: Enter the class name (e.g., Grade 1, Class 10)."],
      ["• Sections: Enter section names separated by commas (e.g., A,B,C)."],
      ["• Amount: Enter the fee amount (positive number)."],
      ["• Ensure all fields are filled and valid."],
      [
        "• Do not change the column headers; they must remain exactly as provided.",
      ],
      ['• Use the "Data" sheet to enter your data.'],
      [`• Available Classes: ${classes.map((c) => c.className).join(", ")}.`],
    ];

    const wsData = [
      ["Class", "Sections", "Amount"],
      ["Grade 10", "A,B", 3000],
      ["Grade 12", "A,B", 3500],
    ];

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    const wsGuidelines = XLSX.utils.aoa_to_sheet(guidelines);
    XLSX.utils.book_append_sheet(wb, wsGuidelines, "Guidelines");

    XLSX.writeFile(wb, "board_exam_fees.xlsx");
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
        classes={classes}
      />
    </>
  );
};

export default ExcelSheetModal;
