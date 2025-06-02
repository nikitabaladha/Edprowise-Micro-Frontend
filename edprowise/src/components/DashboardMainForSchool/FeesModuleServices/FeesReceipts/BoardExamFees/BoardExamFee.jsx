import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI.jsx";
import postAPI from "../../../../../api/postAPI.jsx";
import { useNavigate } from "react-router-dom";

const BoardExamFeeRegistration = () => {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classesLoading, setClassesLoading] = useState(false);
  const [feesLoading, setFeesLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [boardExamFees, setBoardExamFees] = useState({});
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }

    setSchoolId(id);
  }, []);

  const academicYear =
    localStorage.getItem("selectedAcademicYear") || "2024-2025";

  useEffect(() => {
    if (!schoolId) return;

    const fetchClasses = async () => {
      setClassesLoading(true);
      try {
        const classResponse = await getAPI(
          `/get-class-and-section/${schoolId}`,
          {},
          true
        );

        const classData = classResponse?.data?.data || [];
        if (Array.isArray(classData) && classData.length > 0) {
          setClasses(classData);
        } else {
          toast.info("No classes found for this school.");
          setClasses([]);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("Failed to fetch classes. Please try again.");
        setClasses([]);
      } finally {
        setClassesLoading(false);
      }
    };

    fetchClasses();
  }, [schoolId]);

  useEffect(() => {
    if (!schoolId || !selectedClass || !academicYear) return;

    const fetchFees = async () => {
      setFeesLoading(true);
      try {
        const feesResponse = await getAPI(
          `/get-board-exam-fees-byIds/${schoolId}/${academicYear}/${selectedClass}/${selectedSection}`,
          {},
          true
        );
        console.log("Fees API Response:", feesResponse);

        const feesData = feesResponse?.data?.data || [];
        if (Array.isArray(feesData)) {
          const feesMap = {};
          feesData.forEach((fee) => {
            feesMap[fee.classId] = fee.amount;
          });
          setBoardExamFees(feesMap);
        } else {
          toast.info(
            "No board exam fees found for the selected class/section."
          );
          setBoardExamFees({});
        }
      } catch (error) {
        console.error("Error fetching fees:", error);
        toast.error("Failed to fetch board exam fees.");
        setBoardExamFees({});
      } finally {
        setFeesLoading(false);
      }
    };

    fetchFees();
  }, [schoolId, academicYear, selectedClass, selectedSection]);

  useEffect(() => {
    if (selectedClass) {
      const selectedClassData = classes.find((c) => c._id === selectedClass);
      const sectionsData = selectedClassData?.sections || [];
      setSections(sectionsData);
      setSelectedSection("");
    } else {
      setSections([]);
      setSelectedSection("");
    }
  }, [selectedClass, classes]);

  const fetchStudents = async () => {
    if (!selectedClass || !selectedSection) {
      toast.warning("Please select both class and section.");
      return;
    }
    setLoading(true);
    try {
      const response = await getAPI(
        `/admission-forms-board-exam/${schoolId}/${academicYear}/${selectedClass}/${selectedSection}`,
        {},
        true
      );

      const selectedClassData = classes.find((c) => c._id === selectedClass);
      const selectedSectionData = selectedClassData?.sections?.find(
        (s) => s._id === selectedSection
      );
      const feeAmount = boardExamFees[selectedClass] || 0;

      const studentData = response?.data?.data || [];
      if (Array.isArray(studentData)) {
        setStudents(
          studentData.map((student) => ({
            ...student,
            feesAmt: feeAmount,
            paymentStatus: student.boardExamStatus || "Pending",
            paymentMode:
              student.boardExamStatus === "Paid"
                ? student.paymentMode === "N/A"
                  ? ""
                  : student.paymentMode
                : "Cash",
            chequeNumber:
              student.paymentMode === "Cheque" && student.chequeNumber !== "N/A"
                ? student.chequeNumber
                : "",
            bankName:
              student.paymentMode === "Cheque" && student.bankName !== "N/A"
                ? student.bankName
                : "",
            className: student.masterDefineClass?.className || "",
            sectionName: selectedSectionData?.name || student.sectionName || "",
          }))
        );
        setShowTable(true);
        setSelectedStudentIds([]);
      } else {
        toast.info("No students found for the selected class/section.");
        setStudents([]);
        setShowTable(false);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch student data.");
      setShowTable(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentModeChange = (id, mode) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === id
          ? {
              ...student,
              paymentMode: mode,
              chequeNumber: mode === "Cheque" ? student.chequeNumber : "",
              bankName: mode === "Cheque" ? student.bankName : "",
            }
          : student
      )
    );
  };

  const handleChequeFieldChange = (id, field, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === id ? { ...student, [field]: value } : student
      )
    );
  };

  const handlePaidClick = async (event, student) => {
    event.preventDefault();
    if (!student.paymentMode) {
      toast.warning(
        `Please select payment mode for ${student.firstName} ${student.lastName}`
      );
      return;
    }

    if (
      student.paymentMode === "Cheque" &&
      (!student.chequeNumber || !student.bankName)
    ) {
      toast.warning(
        `Please fill cheque number and bank name for ${student.firstName} ${student.lastName}`
      );
      return;
    }

    setSubmitLoading(true);
    try {
      const payment = {
        studentId: student._id,
        admissionNumber: student.AdmissionNumber,
        studentName: `${student.firstName} ${student.lastName}`,
        classId: selectedClass,
        sectionId: selectedSection,
        className: student.className,
        sectionName: student.sectionName,
        amount: student.feesAmt,
        paymentMode: student.paymentMode,
        chequeNumber: student.chequeNumber || "",
        bankName: student.bankName || "",
        status: "Paid",
        academicYear,
        schoolId,
      };

      const response = await postAPI(
        "/submit-board-exam-fees-payment",
        { payments: [payment] },
        true
      );
      toast.success(
        `Payment submitted for ${student.firstName} ${student.lastName}. Viewing receipt.`
      );

      const receiptData = {
        ...student,
        receiptNumberBef:
          response?.data?.data?.[0]?.receiptNumberBef ||
          `REC-${student._id}-${Date.now()}`,
        admissionFees: student.feesAmt,
        concessionAmount: 0,
        finalAmount: student.feesAmt,
        applicationDate: new Date().toISOString(),
        paymentDate: new Date().toISOString(),
        transactionNumber:
          student.paymentMode === "Online" ? `TXN-${Date.now()}` : "",
      };

      navigate(
        "/school-dashboard/fees-module/fees-receipts/board-exam-fees/receipts",
        {
          state: {
            student: receiptData,
            feeTypeName: "Board Exam Fee",
            className: student.className,
            sectionName: student.sectionName,
          },
        }
      );

      await fetchStudents();
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(`${backendMessage}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCheckboxChange = (studentId) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmitPayments = async (event) => {
    event.preventDefault();

    const selectedStudents = students.filter((student) =>
      selectedStudentIds.includes(student._id)
    );

    const invalidPayments = selectedStudents.some((s) => {
      if (s.paymentStatus === "Paid" && !s.paymentMode) {
        return true;
      }
      if (
        s.paymentMode === "Cheque" &&
        s.paymentStatus !== "Paid" &&
        (!s.chequeNumber || !s.bankName)
      ) {
        return true;
      }
      return false;
    });

    if (invalidPayments) {
      toast.warning(
        "Please ensure all selected students have valid payment details."
      );
      return;
    }

    if (selectedStudents.length === 0) {
      toast.warning("No students selected for payment.");
      return;
    }

    setSubmitLoading(true);
    try {
      const payments = selectedStudents
        .filter((student) => student.paymentStatus !== "Paid")
        .map((student) => ({
          studentId: student._id,
          admissionNumber: student.AdmissionNumber,
          studentName: `${student.firstName} ${student.lastName}`,
          classId: selectedClass,
          sectionId: selectedSection,
          className: student.className,
          sectionName: student.sectionName,
          amount: student.feesAmt,
          paymentMode: student.paymentMode || "Cash",
          chequeNumber: student.chequeNumber || "",
          bankName: student.bankName || "",
          status: "Paid",
          academicYear,
          schoolId,
        }));

      if (payments.length === 0) {
        toast.warning("No unpaid students selected to submit.");
        setSubmitLoading(false);
        return;
      }

      const response = await postAPI(
        "/submit-board-exam-fees-payment",
        { payments },
        true
      );
      toast.success("Selected payments submitted successfully.");

      const receiptStudents = selectedStudents
        .filter((student) => student.paymentStatus !== "Paid")
        .map((student, index) => ({
          ...student,
          receiptNumberBef:
            response?.data?.data?.[index]?.receiptNumberBef ||
            `REC-${student._id}-${Date.now()}`,
          admissionFees: student.feesAmt,
          concessionAmount: 0,
          finalAmount: student.feesAmt,
          applicationDate: new Date().toISOString(),
          paymentDate: new Date().toISOString(),
          transactionNumber:
            student.paymentMode === "Online" ? `TXN-${Date.now()}` : "",
        }));

      if (receiptStudents.length > 0) {
        navigate(
          "/school-dashboard/fees-module/fees-receipts/board-exam-fees/receipts",
          {
            state: {
              students: receiptStudents,
              feeTypeName: "Board Exam Fee",
              className: receiptStudents[0].className,
              sectionName: receiptStudents[0].sectionName,
            },
          }
        );

        if (receiptStudents.length > 1) {
          toast.info(
            `${receiptStudents.length} receipts generated. You can view all receipts and download them from the receipt page.`
          );
        }
      }

      await fetchStudents();
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(`${backendMessage}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const hasChequePayment = students.some(
    (student) => student.paymentMode === "Cheque"
  );
  const allPaid = students.every((student) => student.paymentStatus === "Paid");

  const handleViewReceipt = (student) => {
    const receiptData = {
      ...student,
      receiptNumberBef:
        student.receiptNumberBef || `REC-${student._id}-${Date.now()}`,
      admissionFees: student.feesAmt,
      concessionAmount: 0,
      finalAmount: student.feesAmt,
      applicationDate: student.paymentDate || new Date().toISOString(),
      paymentDate: student.paymentDate || new Date().toISOString(),
      transactionNumber:
        student.paymentMode === "Online" ? `TXN-${Date.now()}` : "",
    };

    navigate(
      "/school-dashboard/fees-module/fees-receipts/board-exam-fees/receipts",
      {
        state: {
          student: receiptData,
          feeTypeName: "Board Exam Fee",
          className: student.className,
          sectionName: student.sectionName,
        },
      }
    );
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <h1 className="h3 fw-bold text-dark mb-4">Board Exam Fee Collection</h1>

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="classSelect" className="form-label">
                  Class
                </label>
                <select
                  id="classSelect"
                  className="form-select"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  disabled={classesLoading}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.className}
                    </option>
                  ))}
                </select>
                {/* {classesLoading && <small className="text-muted">Loading classes...</small>}
                {!classesLoading && classes.length === 0 && (
                  <small className="text-danger">No classes available.</small>
                )} */}
              </div>

              <div className="col-md-6">
                <label htmlFor="sectionSelect" className="form-label">
                  Section
                </label>
                <select
                  id="sectionSelect"
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  disabled={!selectedClass || sections.length === 0}
                >
                  <option value="">Select Section</option>
                  {sections.map((sec) => (
                    <option key={sec._id} value={sec._id}>
                      {sec.name}
                    </option>
                  ))}
                </select>
                {/* {selectedClass && sections.length === 0 && (
                  <small className="text-danger">No sections available for this class.</small>
                )} */}
              </div>
            </div>

            {!showTable && (
              <div className="d-flex justify-content-end mt-4">
                <button
                  type="button"
                  onClick={fetchStudents}
                  disabled={
                    !selectedClass || !selectedSection || loading || feesLoading
                  }
                  className={`btn ${
                    !selectedClass || !selectedSection || loading || feesLoading
                      ? "btn-secondary disabled"
                      : "btn-primary"
                  }`}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </>
                  ) : (
                    "Proceed"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {showTable && (
          <div className="card shadow-sm rounded">
            <div className="card-body p-2">
              <div className="table-responsive p-2">
                <table className="table table-hover mb-1 text-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th
                        scope="col"
                        className="text-uppercase small fw-semibold m-2"
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedStudentIds.length === students.length &&
                            students.length > 0
                          }
                          onChange={() => {
                            if (selectedStudentIds.length === students.length) {
                              setSelectedStudentIds([]);
                            } else {
                              setSelectedStudentIds(students.map((s) => s._id));
                            }
                          }}
                          disabled={students.length === 0}
                        />
                      </th>
                      <th
                        scope="col"
                        className="text-uppercase small fw-semibold m-2"
                      >
                        Adm. No.
                      </th>
                      <th
                        scope="col"
                        className="text-uppercase small fw-semibold m-2"
                      >
                        Student Name
                      </th>
                      <th
                        scope="col"
                        className="text-uppercase small fw-semibold m-2"
                      >
                        Class
                      </th>
                      <th
                        scope="col"
                        className="text-uppercase small fw-semibold m-2"
                      >
                        Section
                      </th>
                      <th
                        scope="col"
                        className="text-uppercase small fw-semibold m-2"
                      >
                        Board Exam Fees (₹)
                      </th>
                      <th
                        scope="col"
                        className="text-uppercase small fw-semibold m-2"
                      >
                        Mode of Payment
                      </th>
                      {hasChequePayment && (
                        <>
                          <th
                            scope="col"
                            className="text-uppercase small fw-semibold m-2"
                          >
                            Cheque No.
                          </th>
                          <th
                            scope="col"
                            className="text-uppercase small fw-semibold m-2"
                          >
                            Bank Name
                          </th>
                        </>
                      )}
                      <th
                        scope="col"
                        className="text-uppercase small fw-semibold m-2"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="text-uppercase small fw-semibold m-2"
                      >
                        Pay
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student._id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedStudentIds.includes(student._id)}
                            onChange={() => handleCheckboxChange(student._id)}
                            disabled={student.paymentStatus === "Paid"}
                          />
                        </td>
                        <td>{student.AdmissionNumber || "-"}</td>
                        <td>{`${student.firstName} ${student.lastName}`}</td>
                        <td>{student.className}</td>
                        <td>{student.sectionName}</td>
                        <td>{student.feesAmt || 0}</td>
                        <td>
                          {student.paymentStatus === "Paid" ? (
                            student.paymentMode || "-"
                          ) : (
                            <select
                              className="form-select form-select-sm"
                              value={student.paymentMode || "Cash"}
                              onChange={(e) =>
                                handlePaymentModeChange(
                                  student._id,
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option value="Cash">Cash</option>
                              <option value="Cheque">Cheque</option>
                              <option value="Online">Online</option>
                            </select>
                          )}
                        </td>
                        {hasChequePayment && (
                          <>
                            <td>
                              {student.paymentMode === "Cheque" ? (
                                student.paymentStatus === "Paid" ? (
                                  student.chequeNumber || "-"
                                ) : (
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={student.chequeNumber || ""}
                                    onChange={(e) =>
                                      handleChequeFieldChange(
                                        student._id,
                                        "chequeNumber",
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                )
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>
                              {student.paymentMode === "Cheque" ? (
                                student.paymentStatus === "Paid" ? (
                                  student.bankName || "-"
                                ) : (
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={student.bankName || ""}
                                    onChange={(e) =>
                                      handleChequeFieldChange(
                                        student._id,
                                        "bankName",
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                )
                              ) : (
                                "-"
                              )}
                            </td>
                          </>
                        )}
                        <td>
                          <span
                            className={`badge ${
                              student.paymentStatus === "Paid"
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {student.paymentStatus}
                          </span>
                        </td>
                        <td>
                          {student.paymentStatus !== "Paid" ? (
                            <button
                              type="button"
                              className="btn btn-success btn-sm"
                              onClick={(event) =>
                                handlePaidClick(event, student)
                              }
                              disabled={submitLoading}
                            >
                              {submitLoading ? (
                                <>
                                  <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  Processing...
                                </>
                              ) : (
                                "Pay Now"
                              )}
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-info btn-sm"
                              onClick={() => handleViewReceipt(student)}
                            >
                              View
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {students.length === 0 && (
                  <div className="text-center py-3">No students found.</div>
                )}
              </div>
            </div>

            {!allPaid && (
              <div className="card-footer d-flex justify-content-end">
                <button
                  type="button"
                  onClick={handleSubmitPayments}
                  className="btn btn-primary"
                  disabled={
                    students.length === 0 ||
                    submitLoading ||
                    selectedStudentIds.length === 0
                  }
                >
                  {submitLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardExamFeeRegistration;
