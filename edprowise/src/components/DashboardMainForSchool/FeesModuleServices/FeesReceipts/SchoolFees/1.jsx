import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI.jsx";

const ConcessionFormSelector = () => {
  const [schoolId, setSchoolId] = useState("");
  const [existingStudents, setExistingStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [formData, setFormData] = useState({ AdmissionNumber: "" });
  const [selectedAdmissionNumber, setSelectedAdmissionNumber] = useState("");
  const [concessionData, setConcessionData] = useState(null);
  const [selectedInstallments, setSelectedInstallments] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails?.schoolId) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(userDetails.schoolId);
  }, []);

  useEffect(() => {
    if (!schoolId) return;

    const fetchInitialData = async () => {
      try {
        const studentsRes = await getAPI(`/get-admission-form/${schoolId}`);
        if (!studentsRes.hasError) {
          setExistingStudents(
            Array.isArray(studentsRes.data.data) ? studentsRes.data.data : []
          );
        }

        const classesRes = await getAPI(
          `/get-class-and-section/${schoolId}`,
          {},
          true
        );
        setClasses(classesRes?.data?.data || []);

        const feeTypesRes = await getAPI(`/getall-fess-type/${schoolId}`);
        if (!feeTypesRes.hasError) {
          setFeeTypes(feeTypesRes.data.data || []);
        }
      } catch (error) {
        toast.error("Error initializing data");
        console.error("Initialization error:", error);
      }
    };

    fetchInitialData();
  }, [schoolId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdmissionSubmit = async (e) => {
    e.preventDefault();
    const student = existingStudents.find(
      (s) => s.AdmissionNumber === formData.AdmissionNumber
    );
    if (!student) {
      toast.error("Invalid admission number.");
      return;
    }

    setSelectedAdmissionNumber(formData.AdmissionNumber);
    try {
      const response = await getAPI(
        `/get-concession-formbyADMID?classId=${student.masterDefineClass}&sectionIds=${student.section}&schoolId=${schoolId}&admissionNumber=${formData.AdmissionNumber}`
      );
      if (!response?.data?.data || !Array.isArray(response.data.data)) {
        toast.error("No concession data found for this admission number.");
        setConcessionData(null);
        return;
      }
      setConcessionData(response.data.data);
      // Set the first academic year with paid installments as default
      const paidYear = response.data.data.find((year) =>
        year.feeInstallments.some((inst) => inst.paidAmount > 0)
      );
      setSelectedAcademicYear(paidYear?.academicYear || "");
    } catch (error) {
      toast.error("Error fetching concession data");
      console.error("Concession fetch error:", error);
      setConcessionData(null);
    }
  };

  const handleInstallmentSelect = (installment, feeTypeId) => {
    const installmentKey = `${installment.installmentName}-${feeTypeId}`;
    setSelectedInstallments((prev) =>
      prev.includes(installmentKey)
        ? prev.filter((item) => item !== installmentKey)
        : [...prev, installmentKey]
    );
  };

  const handleProceed = () => {
    if (!selectedInstallments.length) {
      toast.error("Please select at least one installment and fee type.");
      return;
    }

    const selectedStudent = existingStudents.find(
      (student) => student.AdmissionNumber === selectedAdmissionNumber
    );
    const classInfo = classes.find(
      (cls) => cls._id === selectedStudent.masterDefineClass
    );
    const sectionInfo = classInfo?.sections.find(
      (sec) => sec._id === selectedStudent.section
    );

    const receiptDetails = concessionData
      .filter((data) =>
        data.feeInstallments.some((inst) =>
          selectedInstallments.includes(
            `${inst.installmentName}-${inst.feesTypeId._id}`
          )
        )
      )
      .map((data) => {
        const installments = data.feeInstallments
          .filter(
            (inst) =>
              selectedInstallments.includes(
                `${inst.installmentName}-${inst.feesTypeId._id}`
              ) && inst.paidAmount > 0
          )
          .map((inst) => ({
            number: inst.installmentName,
            feeItems: [
              {
                type:
                  feeTypes.find((ft) => ft._id === inst.feesTypeId._id)
                    ?.feesTypeName || "Unknown",
                amount: inst.amount,
                concession: inst.concessionAmount,
                fineAmount: inst.fineAmount,
                payable: inst.amount - inst.concessionAmount + inst.fineAmount,
                paid: inst.paidAmount,
                balance: inst.balanceAmount,
              },
            ],
          }));

        return {
          receiptNumber: selectedStudent.receiptNumber,
          studentName: `${selectedStudent.firstName} ${selectedStudent.lastName}`,
          studentAdmissionNumber: selectedStudent.AdmissionNumber,
          date: new Date(selectedStudent.paymentDate).toLocaleDateString(),
          academicYear: data.academicYear,
          className: classInfo?.className || "Unknown",
          section: sectionInfo?.name || "Unknown",
          paymentMode: selectedStudent.paymentMode,
          transactionNumber: selectedStudent.transactionNumber,
          bankName: selectedStudent.bankName || "",
          collectorName: "School Administrator",
          installments,
        };
      })
      .filter((receipt) => receipt.installments.length > 0);

    if (!receiptDetails.length) {
      toast.error("No paid installments selected.");
      return;
    }

    navigate(
      "/school-dashboard/fees-module/fees-receipts/school-fees/student-receipts",
      { state: receiptDetails }
    );
  };

  const handleBack = () => {
    setSelectedAdmissionNumber("");
    setConcessionData(null);
    setSelectedInstallments([]);
    setFormData({ AdmissionNumber: "" });
    setSelectedAcademicYear("");
  };

  // Filter academic years with paid installments
  const paidAcademicYears = concessionData
    ? concessionData
        .filter((year) =>
          year.feeInstallments.some((inst) => inst.paidAmount > 0)
        )
        .map((year) => year.academicYear)
    : [];

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-4"></div>
                  <div className="col-4 text-center">
                    <h4 className="card-title custom-heading-font mb-0">
                      School Fees Receipts
                    </h4>
                  </div>
                </div>
              </div>

              {!selectedAdmissionNumber ? (
                <form onSubmit={handleAdmissionSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="AdmissionNumber" className="form-label">
                          Admission No
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            id="AdmissionNumber"
                            name="AdmissionNumber"
                            className="form-control"
                            list="AdmissionNumbers"
                            value={formData.AdmissionNumber}
                            onChange={handleChange}
                            required
                            placeholder="Search or select admission number"
                          />
                          <datalist id="AdmissionNumbers">
                            {existingStudents.map((student, index) => (
                              <option
                                key={index}
                                value={student.AdmissionNumber}
                              >
                                {student.AdmissionNumber} - {student.firstName}{" "}
                                {student.lastName}
                              </option>
                            ))}
                          </datalist>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mt-3 d-flex justify-content-between">
                        <button
                          type="submit"
                          className="btn btn-primary custom-submit-button"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="row align-items-center mb-3">
                    <div className="col-12 text-end mt-2">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleBack}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                  {concessionData && paidAcademicYears.length > 0 ? (
                    <>
                      <h5 className="mb-3">
                        Paid Installments for{" "}
                        {
                          existingStudents.find(
                            (s) => s.AdmissionNumber === selectedAdmissionNumber
                          )?.firstName
                        }{" "}
                        {
                          existingStudents.find(
                            (s) => s.AdmissionNumber === selectedAdmissionNumber
                          )?.lastName
                        }
                      </h5>
                      <div className="mb-3 col-md-2">
                        <label htmlFor="academicYear" className="form-label">
                          Select Academic Year
                        </label>
                        <select
                          id="academicYear"
                          className="form-select"
                          value={selectedAcademicYear}
                          onChange={(e) =>
                            setSelectedAcademicYear(e.target.value)
                          }
                        >
                          {paidAcademicYears.map((year, index) => (
                            <option key={index} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedAcademicYear && (
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead className="table-primary">
                              <tr>
                                <th className="text-center">Select</th>
                                <th className="text-center">Installment</th>
                                <th className="text-center">Fee Type</th>
                                <th className="text-center">Amount (₹)</th>
                                <th className="text-center">Concession (₹)</th>
                                <th className="text-center">Fine (₹)</th>
                                <th className="text-center">Paid (₹)</th>
                                <th className="text-center">Balance (₹)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {concessionData
                                .find(
                                  (data) =>
                                    data.academicYear === selectedAcademicYear
                                )
                                ?.feeInstallments.filter(
                                  (inst) => inst.paidAmount > 0
                                )
                                .map((inst) => (
                                  <tr
                                    key={`${inst.installmentName}-${inst.feesTypeId._id}`}
                                  >
                                    <td className="text-center">
                                      <input
                                        type="checkbox"
                                        checked={selectedInstallments.includes(
                                          `${inst.installmentName}-${inst.feesTypeId._id}`
                                        )}
                                        onChange={() =>
                                          handleInstallmentSelect(
                                            inst,
                                            inst.feesTypeId._id
                                          )
                                        }
                                      />
                                    </td>
                                    <td className="text-center">
                                      {inst.installmentName}
                                    </td>
                                    <td className="text-center">
                                      {feeTypes.find(
                                        (ft) => ft._id === inst.feesTypeId._id
                                      )?.feesTypeName || "Unknown"}
                                    </td>
                                    <td className="text-center">
                                      {inst.amount}
                                    </td>
                                    <td className="text-center">
                                      {inst.concessionAmount}
                                    </td>
                                    <td className="text-center">
                                      {inst.fineAmount}
                                    </td>
                                    <td className="text-center">
                                      {inst.paidAmount}
                                    </td>
                                    <td className="text-center">
                                      {inst.balanceAmount}
                                    </td>
                                  </tr>
                                )) || (
                                <tr>
                                  <td
                                    colSpan="8"
                                    className="text-center text-muted"
                                  >
                                    No paid installments for this academic year.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                      <div className="mt-3 text-end">
                        <button
                          type="button"
                          className="btn btn-primary custom-submit-button"
                          onClick={handleProceed}
                        >
                          Proceed to Receipt
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted">
                      No paid installments found for this admission number.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcessionFormSelector;
