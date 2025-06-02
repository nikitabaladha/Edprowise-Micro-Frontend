export const validateBasicForm = (
  formData,
  toast,
  isNurseryClass,
  existingFiles = {}
) => {
  if (!formData) {
    toast.error("Form data is missing");
    return false;
  }

  const requiredFields = [
    { field: "firstName", message: "First name is required" },
    { field: "lastName", message: "Last name is required" },
    { field: "dateOfBirth", message: "Date of birth is required" },
    { field: "nationality", message: "Nationality is required" },
    { field: "gender", message: "Gender is required" },
    { field: "masterDefineClass", message: "Class is required" },
    { field: "masterDefineShift", message: "Shift is required" },
    { field: "fatherName", message: "Father's name is required" },
    {
      field: "fatherContactNo",
      message: "Father's contact number is required",
    },
    { field: "motherName", message: "Mother's name is required" },
    {
      field: "motherContactNo",
      message: "Mother's contact number is required",
    },
    { field: "currentAddress", message: "Current address is required" },
    { field: "country", message: "country" },
    { field: "state", message: "state " },
    { field: "city", message: "city " },
    { field: "pincode", message: "Pincode is required" },
    { field: "studentCategory", message: "Student category is required" },
    { field: "howReachUs", message: "Please specify how you reached us" },
    {
      field: "aadharPassportNumber",
      message: "Aadhaar/Passport number is required",
    },
  ];

  if (!isNurseryClass(formData.masterDefineClass)) {
    requiredFields.push(
      {
        field: "previousSchoolName",
        message: "Previous school name is required",
      },
      {
        field: "addressOfpreviousSchool",
        message: "Address of previous school is required",
      },
      {
        field: "previousSchoolBoard",
        message: "Previous school board is required",
      }
    );
  }

  for (const { field, message } of requiredFields) {
    if (!formData[field]) {
      toast.error(message);
      return false;
    }
  }

  for (const { field, message } of requiredFields) {
    if (!formData[field]) {
      toast.error(message);
      return false;
    }
  }

  const today = new Date();
  const dob = new Date(formData.dateOfBirth);
  if (dob > today) {
    toast.error("Date of birth cannot be a future date");
    return false;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (
    formData.fatherContactNo &&
    !phonePattern.test(formData.fatherContactNo)
  ) {
    toast.error("Father's contact number must be exactly 10 digits");
    return false;
  }
  if (
    formData.motherContactNo &&
    !phonePattern.test(formData.motherContactNo)
  ) {
    toast.error("Mother's contact number must be exactly 10 digits");
    return false;
  }

  const aadhaarPattern = /^\d{12}$/;
  const passportPattern = /^[A-Za-z]{1}[0-9]{7}$/;
  if (
    formData.aadharPassportNumber &&
    !(
      aadhaarPattern.test(formData.aadharPassportNumber) ||
      passportPattern.test(formData.aadharPassportNumber)
    )
  ) {
    toast.error(
      "Please enter a valid Aadhaar number (12 digits) or Passport number (1 letter followed by 7 digits)"
    );
    return false;
  }

  if (
    formData.masterDefineClass &&
    !isNurseryClass(formData.masterDefineClass)
  ) {
    if (!formData.previousSchoolResult && !existingFiles.previousSchoolResult) {
      toast.error("Please upload the previous school result");
      return false;
    }
    if (!formData.tcCertificate && !existingFiles.tcCertificate) {
      toast.error("Please upload the TC (Transfer Certificate)");
      return false;
    }
  }

  if (
    formData.studentCategory !== "General" &&
    !formData.castCertificate &&
    !existingFiles.castCertificate
  ) {
    toast.error("Please upload the caste certificate");
    return false;
  }

  if (!formData.aadharPassportFile && !existingFiles.aadharPassportFile) {
    toast.error("Please upload the Aadhar/Passport file");
    return false;
  }

  return true;
};
