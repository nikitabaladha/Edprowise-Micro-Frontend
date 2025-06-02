export const validateBasicForm = (formData, isNursery) => {
  if (!formData.registrationNumber) {
    return "Please select a registration number";
  }
  const requiredFields = [
    { field: "firstName", name: "first name" },
    { field: "lastName", name: "last name" },
    { field: "bloodGroup", name: "blood group" },
    { field: "dateOfBirth", name: "date of birth" },
    { field: "nationality", name: "nationality" },
    { field: "gender", name: "gender" },
    { field: "masterDefineClass", name: "class applying for" },
    { field: "masterDefineShift", name: "shift" },
    { field: "fatherName", name: "father name" },
    { field: "fatherContactNo", name: "father contact number" },
    { field: "motherName", name: "mother name" },
    { field: "motherContactNo", name: "mother contact number" },
    { field: "currentAddress", name: "current address" },
    { field: "country", message: "country " },
    { field: "state", message: "state " },
    { field: "city", message: "city " },
    { field: "pincode", name: "pincode" },
    { field: "studentCategory", name: "category" },
    { field: "aadharPassportNumber", name: "Aadhar/Passport number" },
    { field: "motherTongue", name: "mother tongue" },
  ];

  // if (!isNurseryClass(formData.masterDefineClass)) {
  //     requiredFields.push(
  //       { field: 'previousSchoolName', message: 'Previous school name is required' },
  //       { field: 'addressOfpreviousSchool', message: 'Address of previous school is required' },
  //       { field: 'previousSchoolBoard', message: 'Previous school board is required' }
  //     );
  //   }

  for (const { field, name } of requiredFields) {
    if (!formData[field]) {
      return `Please fill in ${name}`;
    }
  }

  if (!formData.studentPhoto) {
    return "Please upload the student photo";
  }

  if (!formData.aadharPassportFile) {
    return "Please upload Aadhar/Passport file";
  }
  if (!formData.proofOfResidence) {
    return "Please upload proof of residence";
  }

  if (!isNursery) {
    if (!formData.previousSchoolResult) {
      return "Please upload previous school result";
    }
    if (!formData.tcCertificate) {
      return "Please upload TC certificate";
    }
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(formData.fatherContactNo)) {
    return "Please enter a valid 10-digit father contact number";
  }
  if (!phoneRegex.test(formData.motherContactNo)) {
    return "Please enter a valid 10-digit mother contact number";
  }

  const pincodeRegex = /^[0-9]{6}$/;
  if (!pincodeRegex.test(formData.pincode)) {
    return "Please enter a valid 6-digit pincode";
  }

  if (formData.parentalStatus === "Single Father") {
    if (!formData.fatherName) return "Please enter father name";
    if (!formData.fatherContactNo) return "Please enter father contact number";
    if (!formData.fatherProfession) return "Please enter father profession";
  } else if (formData.parentalStatus === "Single Mother") {
    if (!formData.motherName) return "Please enter mother name";
    if (!formData.motherContactNo) return "Please enter mother contact number";
    if (!formData.motherProfession) return "Please enter mother profession";
  } else {
    if (!formData.fatherName) return "Please enter father name";
    if (!formData.fatherContactNo) return "Please enter father contact number";
    if (!formData.fatherProfession) return "Please enter father profession";
    if (!formData.motherName) return "Please enter mother name";
    if (!formData.motherContactNo) return "Please enter mother contact number";
    if (!formData.motherProfession) return "Please enter mother profession";
  }

  if (!formData.siblingInfoChecked) {
    if (!formData.relationType)
      return "Please select relation type for sibling";
    if (!formData.siblingName) return "Please enter sibling name";
    if (!formData.idCardFile) return "Please upload sibling ID card";
  }

  if (formData.studentCategory !== "General" && !formData.castCertificate) {
    return "Please upload caste certificate";
  }

  return null;
};

export const validateFullForm = (formData, isNursery) => {
  const basicError = validateBasicForm(formData, isNursery);
  if (basicError) return basicError;

  if (!formData.agreementChecked) {
    return "Please agree to the terms and conditions";
  }

  if (!formData.paymentMode) {
    return "Please select payment mode";
  }

  if (!formData.name) {
    return "Please enter your name in the agreement section";
  }

  if (formData.paymentMode === "Cheque") {
    if (!formData.chequeNumber) return "Please enter cheque number";
    if (!formData.bankName) return "Please enter bank name";
  }

  return null;
};
