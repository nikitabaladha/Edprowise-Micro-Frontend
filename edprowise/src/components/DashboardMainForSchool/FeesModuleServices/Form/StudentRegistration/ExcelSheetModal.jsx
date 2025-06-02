import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import postAPI from "../../../../../api/postAPI.jsx";
import getAPI from "../../../../../api/getAPI.jsx";
import ImportModal from "./ImportModal.jsx";
import ConfirmModal from "../../../../ConfirmModalImportExcel.jsx";
import PreviewModal from "./PreviewModal.jsx";

const RegistrationExcelSheetModal = ({
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
  const [shifts, setShifts] = useState([]);
  const [feeTypesByClass, setFeeTypesByClass] = useState({});

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

        const shiftRes = await getAPI(`/master-define-shift/${schoolId}`);
        if (!shiftRes.hasError) {
          setShifts(
            Array.isArray(shiftRes.data?.data) ? shiftRes.data.data : []
          );
        } else {
          toast.error(shiftRes.message || "Failed to fetch shifts.");
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
      const response = await getAPI(
        `/get-one-time-feesbyIds/${schoolId}/${classId}/${academicYear}`,
        {},
        true
      );
      if (response?.data?.data) {
        const feeTypes = response.data.data.flatMap((feeItem) =>
          feeItem.oneTimeFees.map((fee) => ({
            id: fee.feesTypeId._id,
            name: fee.feesTypeId.feesTypeName,
            amount: fee.amount,
          }))
        );
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
    if (classes.length === 0) {
      toast.error(
        "No classes available. Please configure classes in the system."
      );
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
              return (
                row.firstName?.toString().trim() &&
                row.lastName?.toString().trim()
              );
            });

          if (jsonData.length === 0) {
            toast.error("No valid data rows found in the Excel file.");
            resolve({ jsonData: [], validatedData: [] });
            return;
          }

          const tempValidatedData = [];
          let hasError = false;

          const feeTypesCache = {};
          for (const cls of classes) {
            feeTypesCache[cls._id] = await fetchFeeTypes(cls._id);
          }
          setFeeTypesByClass(feeTypesCache);

          for (let index = 0; index < jsonData.length; index++) {
            const row = jsonData[index];
            const payload = {};

            payload.academicYear = academicYear;
            payload.firstName = row.firstName?.toString().trim();
            payload.middleName = row.middleName?.toString().trim() || "";
            payload.lastName = row.lastName?.toString().trim();
            payload.dateOfBirth = row.dateOfBirth?.toString().trim();
            payload.age = row.age?.toString().trim();
            payload.nationality = row.nationality?.toString().trim();
            payload.gender = row.gender?.toString().trim();
            payload.fatherName = row.fatherName?.toString().trim();
            payload.fatherContactNo = row.fatherContactNo?.toString().trim();
            payload.motherName = row.motherName?.toString().trim();
            payload.motherContactNo = row.motherContactNo?.toString().trim();
            payload.currentAddress = row.currentAddress?.toString().trim();
            payload.country = row.country?.toString().trim();
            payload.state = row.state?.toString().trim();
            payload.city = row.city?.toString().trim();
            payload.pincode = row.pincode?.toString().trim();
            payload.studentCategory = row.studentCategory?.toString().trim();
            payload.howReachUs = row.howReachUs?.toString().trim();
            payload.aadharPassportNumber = row.aadharPassportNumber
              ?.toString()
              .trim();
            payload.agreementChecked =
              row.agreementChecked?.toString().trim().toLowerCase() === "true";
            payload.name = row.name?.toString().trim();
            payload.paymentMode = row.paymentMode?.toString().trim();

            const className = row.className?.toString().trim();
            const classObj = classes.find(
              (c) => c.className.toLowerCase() === className?.toLowerCase()
            );
            if (!classObj) {
              toast.error(`Row ${index + 1}: Invalid Class "${className}".`);
              hasError = true;
              continue;
            }
            payload.masterDefineClass = classObj._id;
            const shiftName = row.shift?.toString().trim();
            const shiftObj = shifts.find(
              (s) =>
                s.masterDefineShiftName.toLowerCase() ===
                shiftName?.toLowerCase()
            );
            if (!shiftObj) {
              toast.error(`Row ${index + 1}: Invalid Shift "${shiftName}".`);
              hasError = true;
              continue;
            }
            payload.masterDefineShift = shiftObj._id;

            const feeTypeName = row.selectedFeeType?.toString().trim();
            const feeTypes = feeTypesCache[classObj._id] || [];
            const feeType = feeTypes.find(
              (ft) => ft.name.toLowerCase() === feeTypeName?.toLowerCase()
            );
            if (!feeType) {
              toast.error(
                `Row ${
                  index + 1
                }: Invalid Fee Type "${feeTypeName}" for class "${className}".`
              );
              hasError = true;
              continue;
            }

            const registrationFee = Number(row.registrationFee) || 0;
            if (registrationFee <= 0 || registrationFee !== feeType.amount) {
              toast.error(
                `Row ${
                  index + 1
                }: Registration Fee must match the fee type amount (${
                  feeType.amount
                }).`
              );
              hasError = true;
              continue;
            }
            payload.registrationFee = registrationFee.toString();

            const concessionAmount = Number(row.concessionAmount) || 0;
            if (concessionAmount < 0 || concessionAmount > registrationFee) {
              toast.error(
                `Row ${
                  index + 1
                }: Concession Amount must be between 0 and Registration Fee (${registrationFee}).`
              );
              hasError = true;
              continue;
            }
            payload.concessionAmount = concessionAmount.toString();

            const finalAmount = Number(row.finalAmount) || 0;
            if (finalAmount !== registrationFee - concessionAmount) {
              toast.error(
                `Row ${
                  index + 1
                }: Final Amount must be Registration Fee (${registrationFee}) minus Concession (${concessionAmount}).`
              );
              hasError = true;
              continue;
            }
            payload.finalAmount = finalAmount.toString();

            const isNursery = className.toLowerCase() === "nursery";
            if (!isNursery) {
              payload.previousSchoolName = row.previousSchoolName
                ?.toString()
                .trim();
              payload.addressOfpreviousSchool = row.addressOfpreviousSchool
                ?.toString()
                .trim();
              payload.previousSchoolBoard = row.previousSchoolBoard
                ?.toString()
                .trim();
            }

            const requiredFields = [
              {
                key: "firstName",
                value: payload.firstName,
                label: "First Name",
              },
              { key: "lastName", value: payload.lastName, label: "Last Name" },
              {
                key: "dateOfBirth",
                value: payload.dateOfBirth,
                label: "Date of Birth",
              },
              { key: "age", value: payload.age, label: "Age" },
              {
                key: "nationality",
                value: payload.nationality,
                label: "Nationality",
              },
              { key: "gender", value: payload.gender, label: "Gender" },
              {
                key: "fatherName",
                value: payload.fatherName,
                label: "Father Name",
              },
              {
                key: "fatherContactNo",
                value: payload.fatherContactNo,
                label: "Father Contact Number",
              },
              {
                key: "motherName",
                value: payload.motherName,
                label: "Mother Name",
              },
              {
                key: "motherContactNo",
                value: payload.motherContactNo,
                label: "Mother Contact Number",
              },
              {
                key: "currentAddress",
                value: payload.currentAddress,
                label: "Current Address",
              },
              { key: "country", value: payload.country, label: "Country" },
              { key: "state", value: payload.state, label: "State" },
              { key: "city", value: payload.city, label: "City" },
              { key: "pincode", value: payload.pincode, label: "Pincode" },
              {
                key: "studentCategory",
                value: payload.studentCategory,
                label: "Student Category",
              },
              {
                key: "howReachUs",
                value: payload.howReachUs,
                label: "How Reach Us",
              },
              {
                key: "aadharPassportNumber",
                value: payload.aadharPassportNumber,
                label: "Aadhar/Passport Number",
              },
              {
                key: "name",
                value: payload.name,
                label: "Name of Person Filling the Form",
              },
              {
                key: "paymentMode",
                value: payload.paymentMode,
                label: "Payment Mode",
              },
            ];

            if (!isNursery) {
              requiredFields.push(
                {
                  key: "previousSchoolName",
                  value: payload.previousSchoolName,
                  label: "Previous School Name",
                },
                {
                  key: "addressOfpreviousSchool",
                  value: payload.addressOfpreviousSchool,
                  label: "Address of Previous School",
                },
                {
                  key: "previousSchoolBoard",
                  value: payload.previousSchoolBoard,
                  label: "Previous School Board",
                }
              );
            }

            for (const field of requiredFields) {
              if (!field.value) {
                toast.error(`Row ${index + 1}: ${field.label} is required.`);
                hasError = true;
                continue;
              }
              payload[field.key] = field.value;
            }

            if (hasError) continue;

            if (
              !["India", "International", "SAARC Countries"].includes(
                payload.nationality
              )
            ) {
              toast.error(
                `Row ${index + 1}: Invalid Nationality "${
                  payload.nationality
                }". Must be one of: India, International, SAARC Countries.`
              );
              hasError = true;
              continue;
            }

            if (!["Male", "Female"].includes(payload.gender)) {
              toast.error(
                `Row ${index + 1}: Invalid Gender "${
                  payload.gender
                }". Must be one of: Male, Female.`
              );
              hasError = true;
              continue;
            }

            if (
              !["General", "OBC", "ST", "SC"].includes(payload.studentCategory)
            ) {
              toast.error(
                `Row ${index + 1}: Invalid Student Category "${
                  payload.studentCategory
                }". Must be one of: General, OBC, ST, SC.`
              );
              hasError = true;
              continue;
            }

            if (
              ![
                "Teacher",
                "Advertisement",
                "Student",
                "Online Search",
              ].includes(payload.howReachUs)
            ) {
              toast.error(
                `Row ${index + 1}: Invalid How Reach Us "${
                  payload.howReachUs
                }". Must be one of: Teacher, Advertisement, Student, Online Search.`
              );
              hasError = true;
              continue;
            }

            if (!["Cash", "Cheque", "Online"].includes(payload.paymentMode)) {
              toast.error(
                `Row ${index + 1}: Invalid Payment Mode "${
                  payload.paymentMode
                }". Must be one of: Cash, Cheque, Online.`
              );
              hasError = true;
              continue;
            }

            if (payload.paymentMode === "Cheque") {
              const chequeNumber = row.chequeNumber?.toString().trim();
              const bankName = row.bankName?.toString().trim();
              if (!chequeNumber || !bankName) {
                toast.error(
                  `Row ${
                    index + 1
                  }: Cheque Number and Bank Name are required for Cheque payment mode.`
                );
                hasError = true;
                continue;
              }
              payload.chequeNumber = chequeNumber;
              payload.bankName = bankName;
            } else {
              payload.chequeNumber = "";
              payload.bankName = "";
            }

            const today = new Date();
            const dateFields = [
              {
                key: "dateOfBirth",
                value: payload.dateOfBirth,
                label: "Date of Birth",
              },
            ];

            for (const field of dateFields) {
              if (!field.value || isNaN(new Date(field.value).getTime())) {
                toast.error(
                  `Row ${index + 1}: Invalid ${
                    field.label
                  } format. Use YYYY-MM-DD.`
                );
                hasError = true;
                continue;
              }
              const date = new Date(field.value);
              if (field.key === "dateOfBirth" && date > today) {
                toast.error(
                  `Row ${index + 1}: ${field.label} cannot be in the future.`
                );
                hasError = true;
                continue;
              }
            }

            const birthDate = new Date(payload.dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (
              monthDiff < 0 ||
              (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ) {
              age--;
            }
            if (age <= 0 || age > 120) {
              toast.error(
                `Row ${index + 1}: Invalid age derived from Date of Birth.`
              );
              hasError = true;
              continue;
            }
            if (Number(payload.age) !== age) {
              toast.error(
                `Row ${index + 1}: Age (${
                  payload.age
                }) does not match calculated age (${age}) from Date of Birth.`
              );
              hasError = true;
              continue;
            }

            if (!payload.agreementChecked) {
              toast.error(
                `Row ${index + 1}: Agreement must be checked (true).`
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
        const payload = new FormData();
        for (const key in data) {
          if (data.hasOwnProperty(key) && key !== "selectedFeeType") {
            payload.append(key, data[key]);
          }
        }

        const response = await postAPI("/create-registartion-form", payload, {
          "Content-Type": "multipart/form-data",
        });

        if (!response.hasError) {
          toast.success(
            `Registration form for ${data.firstName} ${
              data.lastName
            } imported successfully (Row ${index + 1}).`
          );
        } else {
          toast.error(
            `Row ${index + 1}: ${
              response.message || "Failed to import registration form."
            }`
          );
        }
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message ||
          `Error importing registration form for row ${index + 1}.`;
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
    if (classes.length === 0 || shifts.length === 0) {
      toast.error("No classes or shifts available to include in demo sheet.");
      return;
    }

    const guidelines = [
      ["📌 Import Guidelines:"],
      [
        "Required Fields: firstName, lastName, dateOfBirth, age, nationality, gender, className, shift, fatherName, fatherContactNo, motherName, motherContactNo, currentAddress, country, state, city, pincode, studentCategory, howReachUs, aadharPassportNumber, agreementChecked, selectedFeeType, registrationFee, finalAmount, name, paymentMode.",
      ],
      [
        "Conditional Fields: chequeNumber and bankName are required if paymentMode is Cheque. previousSchoolName, addressOfpreviousSchool, previousSchoolBoard required if className is not Nursery.",
      ],
      ["Optional Fields: middleName, concessionAmount."],
      [
        "Formats: Dates must be YYYY-MM-DD. agreementChecked must be true/false. paymentMode must be Cash/Cheque/Online. nationality must be India/International/SAARC Countries. gender must be Male/Female. studentCategory must be General/OBC/ST/SC. howReachUs must be Teacher/Advertisement/Student/Online Search.",
      ],
      [
        "registrationFee must match the selectedFeeType amount. finalAmount = registrationFee - concessionAmount.",
      ],
      [
        "selectedFeeType is required for validation and must match an existing feeType in the OneTimeFees collection.",
      ],
      ["Do not change column headers; they must remain exactly as provided."],
      [
        'If the payment mode is "Cash" or "Online", leave the Cheque Number and Bank Name fields blank.',
      ],
      ['Use the "Data" sheet to enter your data.'],
      [`Available Classes: ${classes.map((c) => c.className).join(", ")}.`],
      [
        `Available Shifts: ${shifts
          .map((s) => s.masterDefineShiftName)
          .join(", ")}.`,
      ],
    ];

    const wsData = [
      [
        "firstName",
        "middleName",
        "lastName",
        "dateOfBirth",
        "age",
        "nationality",
        "gender",
        "className",
        "shift",
        "fatherName",
        "fatherContactNo",
        "motherName",
        "motherContactNo",
        "currentAddress",
        "country",
        "state",
        "city",
        "pincode",
        "previousSchoolName",
        "addressOfpreviousSchool",
        "previousSchoolBoard",
        "studentCategory",
        "howReachUs",
        "aadharPassportNumber",
        "agreementChecked",
        "selectedFeeType",
        "registrationFee",
        "concessionAmount",
        "finalAmount",
        "name",
        "paymentMode",
        "chequeNumber",
        "bankName",
      ],
      [
        "John",
        "",
        "Doe",
        "2010-05-15",
        "15",
        "India",
        "Male",
        classes[0]?.className || "Grade 10",
        shifts[0]?.masterDefineShiftName || "Morning",
        "James Doe",
        "1234567890",
        "Jane Doe",
        "0987654321",
        "123 Main St",
        "India",
        "Delhi",
        "New Delhi",
        "110001",
        "Previous School",
        "456 Old St",
        "CBSE",
        "General",
        "Online Search",
        "123456789012",
        "true",
        "Registration Fee",
        "500",
        "100",
        "400",
        "Admin User",
        "Cheque",
        "123456",
        "State Bank",
      ],
    ];

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    const wsGuidelines = XLSX.utils.aoa_to_sheet(guidelines);
    XLSX.utils.book_append_sheet(wb, wsGuidelines, "Guidelines");

    XLSX.writeFile(wb, "registration_form.xlsx");
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
        shifts={shifts}
        feeTypesByClass={feeTypesByClass}
      />
    </>
  );
};

export default RegistrationExcelSheetModal;
