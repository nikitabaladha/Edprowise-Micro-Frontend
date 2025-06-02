import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import postAPI from "../../../../../api/postAPI.jsx";
import getAPI from "../../../../../api/getAPI.jsx";
import ImportModal from "./ImportModal.jsx";
import ConfirmModal from "../../../../ConfirmModalImportExcel.jsx";
import PreviewModal from "./PreviewModal.jsx";

const AdmissionExcelSheetModal = ({
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
  const [sectionsByClassAndShift, setSectionsByClassAndShift] = useState({});
  const [feeTypesByClassAndSection, setFeeTypesByClassAndSection] = useState(
    {}
  );

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
        const fetchedClasses = classRes?.data?.data || [];
        setClasses(fetchedClasses);

        const shiftRes = await getAPI(`/master-define-shift/${schoolId}`);
        if (!shiftRes.hasError) {
          setShifts(
            Array.isArray(shiftRes.data?.data) ? shiftRes.data.data : []
          );
        } else {
          toast.error(shiftRes.message || "Failed to fetch shifts.");
        }

        const sectionsCache = {};
        fetchedClasses.forEach((cls) => {
          cls.sections.forEach((section) => {
            const key = `${cls._id}_${section.shiftId}`;
            if (!sectionsCache[key]) {
              sectionsCache[key] = [];
            }
            sectionsCache[key].push(section);
          });
        });
        setSectionsByClassAndShift(sectionsCache);
      } catch (error) {
        toast.error("Error fetching data.");
        console.error(error);
      }
    };

    fetchData();
  }, [schoolId]);

  const fetchFeeTypes = async (classId, sectionId) => {
    try {
      const response = await getAPI(
        `/get-one-time-feesBysectionIds/${schoolId}/${classId}/${sectionId}/${academicYear}`,
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
            for (const section of cls.sections) {
              const key = `${cls._id}_${section._id}`;
              feeTypesCache[key] = await fetchFeeTypes(cls._id, section._id);
            }
          }
          setFeeTypesByClassAndSection(feeTypesCache);

          for (let index = 0; index < jsonData.length; index++) {
            const row = jsonData[index];
            const payload = {};

            payload.academicYear = academicYear;
            payload.registrationNumber = row.registrationNumber
              ?.toString()
              .trim();
            payload.firstName = row.firstName?.toString().trim();
            payload.middleName = row.middleName?.toString().trim() || "";
            payload.lastName = row.lastName?.toString().trim();
            payload.dateOfBirth = row.dateOfBirth?.toString().trim();
            payload.age = row.age?.toString().trim();
            payload.nationality = row.nationality?.toString().trim();
            payload.gender = row.gender?.toString().trim();
            payload.bloodGroup = row.bloodGroup?.toString().trim();
            payload.currentAddress = row.currentAddress?.toString().trim();
            payload.country = row.country?.toString().trim();
            payload.state = row.state?.toString().trim();
            payload.city = row.city?.toString().trim();
            payload.pincode = row.pincode?.toString().trim();
            payload.parentContactNumber = row.parentContactNumber
              ?.toString()
              .trim();
            payload.motherTongue = row.motherTongue?.toString().trim();
            payload.aadharPassportNumber = row.aadharPassportNumber
              ?.toString()
              .trim();
            payload.studentCategory = row.studentCategory?.toString().trim();
            payload.siblingInfoChecked =
              row.siblingInfoChecked?.toString().trim().toLowerCase() ===
              "true";
            payload.relationType = row.relationType?.toString().trim();
            payload.siblingName = row.siblingName?.toString().trim();
            payload.parentalStatus = row.parentalStatus?.toString().trim();
            payload.fatherName = row.fatherName?.toString().trim();
            payload.fatherContactNo = row.fatherContactNo?.toString().trim();
            payload.fatherQualification = row.fatherQualification
              ?.toString()
              .trim();
            payload.fatherProfession = row.fatherProfession?.toString().trim();
            payload.motherName = row.motherName?.toString().trim();
            payload.motherContactNo = row.motherContactNo?.toString().trim();
            payload.motherQualification = row.motherQualification
              ?.toString()
              .trim();
            payload.motherProfession = row.motherProfession?.toString().trim();
            payload.agreementChecked =
              row.agreementChecked?.toString().trim().toLowerCase() === "true";
            payload.name = row.name?.toString().trim();
            payload.paymentMode = row.paymentMode?.toString().trim();
            payload.chequeNumber = row.chequeNumber?.toString().trim();
            payload.bankName = row.bankName?.toString().trim();

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

            const shiftName = row.Shift?.toString().trim();
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

            const sectionName = row.section?.toString().trim();
            const sectionKey = `${classObj._id}_${shiftObj._id}`;
            const sections = sectionsByClassAndShift[sectionKey] || [];
            const sectionObj = sections.find(
              (s) => s.name.toLowerCase() === sectionName?.toLowerCase()
            );
            if (!sectionObj) {
              toast.error(
                `Row ${
                  index + 1
                }: Invalid Section "${sectionName}" for class "${className}" and shift "${shiftName}".`
              );
              hasError = true;
              continue;
            }
            payload.section = sectionObj._id;

            const feeTypeName = row.selectedFeeType?.toString().trim();
            const feeTypeKey = `${classObj._id}_${sectionObj._id}`;
            const feeTypes = feeTypesCache[feeTypeKey] || [];
            const feeType = feeTypes.find(
              (ft) => ft.name.toLowerCase() === feeTypeName?.toLowerCase()
            );
            if (!feeType) {
              toast.error(
                `Row ${
                  index + 1
                }: Invalid Fee Type "${feeTypeName}" for class "${className}" and section "${sectionName}".`
              );
              hasError = true;
              continue;
            }
            payload.selectedFeeType = feeType.id;

            const admissionFees = Number(row.admissionFees) || 0;
            if (admissionFees <= 0 || admissionFees !== feeType.amount) {
              toast.error(
                `Row ${
                  index + 1
                }: Admission Fee must match the fee type amount (${
                  feeType.amount
                }).`
              );
              hasError = true;
              continue;
            }
            payload.admissionFees = admissionFees.toString();

            const concessionAmount = Number(row.concessionAmount) || 0;
            if (concessionAmount < 0 || concessionAmount > admissionFees) {
              toast.error(
                `Row ${
                  index + 1
                }: Concession Amount must be between 0 and Admission Fee (${admissionFees}).`
              );
              hasError = true;
              continue;
            }
            payload.concessionAmount = concessionAmount.toString();

            const finalAmount = Number(row.finalAmount) || 0;
            if (finalAmount !== admissionFees - concessionAmount) {
              toast.error(
                `Row ${
                  index + 1
                }: Final Amount must be Admission Fee (${admissionFees}) minus Concession (${concessionAmount}).`
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
              payload.addressOfPreviousSchool = row.addressOfPreviousSchool
                ?.toString()
                .trim();
              payload.previousSchoolBoard = row.previousSchoolBoard
                ?.toString()
                .trim();
            }

            const requiredFields = [
              {
                key: "registrationNumber",
                value: payload.registrationNumber,
                label: "Registration Number",
              },
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
                key: "bloodGroup",
                value: payload.bloodGroup,
                label: "Blood Group",
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
                key: "parentContactNumber",
                value: payload.parentContactNumber,
                label: "Parent Contact Number",
              },
              {
                key: "motherTongue",
                value: payload.motherTongue,
                label: "Mother Tongue",
              },
              {
                key: "aadharPassportNumber",
                value: payload.aadharPassportNumber,
                label: "Aadhar/Passport Number",
              },
              {
                key: "studentCategory",
                value: payload.studentCategory,
                label: "Student Category",
              },
              {
                key: "parentalStatus",
                value: payload.parentalStatus,
                label: "Parental Status",
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
                  key: "addressOfPreviousSchool",
                  value: payload.addressOfPreviousSchool,
                  label: "Address of Previous School",
                },
                {
                  key: "previousSchoolBoard",
                  value: payload.previousSchoolBoard,
                  label: "Previous School Board",
                }
              );
            }

            if (payload.parentalStatus !== "Single Mother") {
              requiredFields.push(
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
                  key: "fatherProfession",
                  value: payload.fatherProfession,
                  label: "Father Profession",
                }
              );
            }

            if (payload.parentalStatus !== "Single Father") {
              requiredFields.push(
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
                  key: "motherProfession",
                  value: payload.motherProfession,
                  label: "Mother Profession",
                }
              );
            }

            if (!payload.siblingInfoChecked) {
              requiredFields.push(
                {
                  key: "relationType",
                  value: payload.relationType,
                  label: "Relation Type",
                },
                {
                  key: "siblingName",
                  value: payload.siblingName,
                  label: "Sibling Name",
                }
              );
            }

            if (payload.studentCategory !== "General") {
              requiredFields.push({
                key: "castCertificate",
                value: payload.castCertificate,
                label: "Caste Certificate",
              });
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
              !["AB-", "AB+", "O-", "O+", "B-", "B+", "A-", "A+"].includes(
                payload.bloodGroup
              )
            ) {
              toast.error(
                `Row ${index + 1}: Invalid Blood Group "${
                  payload.bloodGroup
                }". Must be one of: AB-, AB+, O-, O+, B-, B+, A-, A+.`
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
              !["Single Father", "Single Mother", "Parents"].includes(
                payload.parentalStatus
              )
            ) {
              toast.error(
                `Row ${index + 1}: Invalid Parental Status "${
                  payload.parentalStatus
                }". Must be one of: Single Father, Single Mother, Parents.`
              );
              hasError = true;
              continue;
            }

            if (
              !payload.siblingInfoChecked &&
              !["Brother", "Sister"].includes(payload.relationType)
            ) {
              toast.error(
                `Row ${index + 1}: Invalid Relation Type "${
                  payload.relationType
                }". Must be one of: Brother, Sister.`
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
              if (!payload.chequeNumber || !payload.bankName) {
                toast.error(
                  `Row ${
                    index + 1
                  }: Cheque Number and Bank Name are required for Cheque payment mode.`
                );
                hasError = true;
                continue;
              }
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
        payload.append("schoolId", schoolId);

        const response = await postAPI("/create-admission-form", payload, {
          "Content-Type": "multipart/form-data",
        });

        if (!response.hasError) {
          toast.success(
            `Admission form for ${data.firstName} ${
              data.lastName
            } imported successfully (Row ${index + 1}).`
          );
        } else {
          toast.error(
            `Row ${index + 1}: ${
              response.message || "Failed to import admission form."
            }`
          );
        }
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message ||
          `Error importing admission form for row ${index + 1}.`;
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
        "Required Fields: registrationNumber, firstName, lastName, dateOfBirth, age, nationality, gender, bloodGroup, className, Shift, section, currentAddress, country, state, city, pincode, parentContactNumber, motherTongue, aadharPassportNumber, studentCategory, parentalStatus, agreementChecked, selectedFeeType, admissionFees, finalAmount, name, paymentMode.",
      ],
      [
        "Conditional Fields: chequeNumber and bankName are required if paymentMode is Cheque. previousSchoolName, addressOfPreviousSchool, previousSchoolBoard required if className is not Nursery. fatherName, fatherContactNo, fatherProfession required if parentalStatus is not Single Mother. motherName, motherContactNo, motherProfession required if parentalStatus is not Single Father. relationType, siblingName required if siblingInfoChecked is false. castCertificate required if studentCategory is not General.",
      ],
      [
        "Optional Fields: middleName, concessionAmount, fatherQualification, motherQualification.",
      ],
      [
        "Formats: Dates must be YYYY-MM-DD. agreementChecked, siblingInfoChecked must be true/false. paymentMode must be Cash/Cheque/Online. nationality must be India/International/SAARC Countries. gender must be Male/Female. bloodGroup must be AB-/AB+/O-/O+/B-/B+/A-/A+. studentCategory must be General/OBC/ST/SC. parentalStatus must be Single Father/Single Mother/Parents. relationType must be Brother/Sister.",
      ],
      [
        "admissionFees must match the selectedFeeType amount. finalAmount = admissionFees - concessionAmount.",
      ],
      [
        "File Fields: studentPhoto, previousSchoolResult, tcCertificate, proofOfResidence, aadharPassportFile, castCertificate, idCardFile are optional and can be uploaded later via the update form.",
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
      [
        `Available Sections: Vary by class and shift; check system for valid combinations.`,
      ],
    ];

    const wsData = [
      [
        "registrationNumber",
        "firstName",
        "middleName",
        "lastName",
        "dateOfBirth",
        "age",
        "nationality",
        "gender",
        "bloodGroup",
        "className",
        "Shift",
        "section",
        "currentAddress",
        "country",
        "state",
        "city",
        "pincode",
        "parentContactNumber",
        "motherTongue",
        "previousSchoolName",
        "addressOfPreviousSchool",
        "previousSchoolBoard",
        "aadharPassportNumber",
        "studentCategory",
        "siblingInfoChecked",
        "relationType",
        "siblingName",
        "parentalStatus",
        "fatherName",
        "fatherContactNo",
        "fatherQualification",
        "fatherProfession",
        "motherName",
        "motherContactNo",
        "motherQualification",
        "motherProfession",
        "agreementChecked",
        "selectedFeeType",
        "admissionFees",
        "concessionAmount",
        "finalAmount",
        "name",
        "paymentMode",
        "chequeNumber",
        "bankName",
      ],
      [
        "ABC10001",
        "John",
        "",
        "Doe",
        "2010-05-15",
        "15",
        "India",
        "Male",
        "A+",
        classes[0]?.className || "Grade 10",
        shifts[0]?.masterDefineShiftName || "Morning",
        classes[0]?.sections[0]?.name || "A",
        "123 Main St",
        "India",
        "Delhi",
        "New Delhi",
        "110001",
        "1234567890",
        "English",
        "Previous School",
        "456 Old St",
        "CBSE",
        "123456789012",
        "General",
        "false",
        "Brother",
        "James Doe",
        "Parents",
        "John Sr.",
        "9876543210",
        "MBA",
        "Engineer",
        "Jane Doe",
        "8765432109",
        "MA",
        "Teacher",
        "true",
        "Admission Fee",
        "1000",
        "100",
        "900",
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

    XLSX.writeFile(wb, "admission_form.xlsx");
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
        feeTypesByClass={feeTypesByClassAndSection}
      />
    </>
  );
};

export default AdmissionExcelSheetModal;
