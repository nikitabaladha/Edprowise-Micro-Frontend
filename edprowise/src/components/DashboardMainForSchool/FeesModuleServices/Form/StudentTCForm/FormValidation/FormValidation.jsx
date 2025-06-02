const validateBasicForm = (formData) => {
  const fieldNames = {
    AdmissionNumber: "Admission Number",
    firstName: "First Name",
    lastName: "Last Name",
    dateOfBirth: "Date of Birth",
    age: "Age",
    nationality: "Nationality",
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    dateOfIssue: "Date of Issue",
    dateOfAdmission: "Date of Admission",
    masterDefineClass: "Class",
    percentageObtainInLastExam: "Percentage/Grade in Last Exam",
    qualifiedPromotionInHigherClass: "Qualified for Promotion",
    whetherFaildInAnyClass: "Failed in Any Class",
    anyOutstandingDues: "Outstanding Dues",
    moralBehaviour: "Moral Behaviour",
    dateOfLastAttendanceAtSchool: "Date of Last Attendance",
  };

  const requiredFields = [
    "AdmissionNumber",
    "firstName",
    "lastName",
    "dateOfBirth",
    "age",
    "nationality",
    "fatherName",
    "motherName",
    "dateOfIssue",
    "dateOfAdmission",
    "masterDefineClass",
    "percentageObtainInLastExam",
    "qualifiedPromotionInHigherClass",
    "whetherFaildInAnyClass",
    "anyOutstandingDues",
    "moralBehaviour",
    "dateOfLastAttendanceAtSchool",
  ];

  for (const field of requiredFields) {
    if (!formData[field] || formData[field].toString().trim() === "") {
      return `${fieldNames[field]} is required`;
    }
  }

  const currentDate = new Date();

  if (new Date(formData.dateOfBirth) > currentDate) {
    return "Date of birth cannot be in the future";
  }

  if (new Date(formData.dateOfIssue) > currentDate) {
    return "Date of issue cannot be in the future";
  }

  if (new Date(formData.dateOfAdmission) > currentDate) {
    return "Date of admission cannot be in the future";
  }

  if (new Date(formData.dateOfLastAttendanceAtSchool) > currentDate) {
    return "Date of last attendance cannot be in the future";
  }

  if (new Date(formData.dateOfAdmission) > new Date(formData.dateOfIssue)) {
    return "Date of admission cannot be after date of issue";
  }

  if (
    new Date(formData.dateOfLastAttendanceAtSchool) >
    new Date(formData.dateOfIssue)
  ) {
    return "Date of last attendance cannot be after date of issue";
  }

  const age = parseInt(formData.age);
  if (isNaN(age) || age < 1 || age > 120) {
    return "Please enter a valid age (1-120 years)";
  }

  const percentage = parseFloat(formData.percentageObtainInLastExam);
  if (isNaN(percentage) || percentage < 0 || percentage > 100) {
    return "Please enter a valid percentage (0-100)";
  }

  return null;
};

export default validateBasicForm;
