import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI.jsx";
import postAPI from "../../../../../api/postAPI.jsx";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const ADDFeesStructure = () => {
  const [schoolId, setSchoolId] = useState("");
  const [classData, setClassData] = useState([]);
  const [feesTypesList, setFeesTypesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [forms, setForms] = useState([
    {
      selectedClassId: "",
      selectedSections: [],
      numInstallments: "",
      installments: [],
    },
  ]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  useEffect(() => {
    if (!schoolId) return;

    const fetchData = async () => {
      try {
        const classRes = await getAPI(
          `/get-class-and-section/${schoolId}`,
          {},
          true
        );
        setClassData(classRes?.data?.data || []);
      } catch (error) {
        toast.error("Error fetching class and section data.");
      }

      try {
        const feesTypeRes = await getAPI(`/getall-fees-type/${schoolId}`);
        if (!feesTypeRes.hasError && Array.isArray(feesTypeRes.data.data)) {
          const SchoolFees = feesTypeRes.data.data.filter(
            (fee) => fee.groupOfFees === "School Fees"
          );
          setFeesTypesList(SchoolFees);
        } else {
          toast.error("Failed to fetch fees types.");
        }
      } catch (error) {
        toast.error("Error fetching fees types.");
      }
    };

    fetchData();
  }, [schoolId]);

  const updateForm = (index, updatedFields) => {
    const newForms = [...forms];
    newForms[index] = { ...newForms[index], ...updatedFields };
    setForms(newForms);
  };

  const handleInstallmentChange = (
    formIndex,
    installmentIndex,
    field,
    value
  ) => {
    const newForms = [...forms];
    newForms[formIndex].installments[installmentIndex][field] = value;

    if (field === "dueDate" && installmentIndex === 0) {
      const firstDueDate = new Date(value);
      if (!isNaN(firstDueDate.getTime())) {
        for (let i = 1; i < newForms[formIndex].installments.length; i++) {
          const newDate = new Date(firstDueDate);
          newDate.setMonth(newDate.getMonth() + i);
          newForms[formIndex].installments[i].dueDate = newDate
            .toISOString()
            .split("T")[0];
        }
      }
    }

    setForms(newForms);
  };

  const handleAddInstallmentField = (formIndex, instIndex) => {
    const newForms = [...forms];
    const newFeeDetail = { feesType: "", amount: "" };

    newForms[formIndex].installments[instIndex].feesDetails.push(newFeeDetail);

    if (instIndex === 0) {
      for (let i = 1; i < newForms[formIndex].installments.length; i++) {
        newForms[formIndex].installments[i].feesDetails.push({
          ...newFeeDetail,
        });
      }
    }

    setForms(newForms);
  };

  const handleRemoveInstallmentField = (formIndex, instIndex, feeIndex) => {
    const newForms = [...forms];

    newForms[formIndex].installments[instIndex].feesDetails.splice(feeIndex, 1);

    if (instIndex === 0) {
      for (let i = 1; i < newForms[formIndex].installments.length; i++) {
        if (newForms[formIndex].installments[i].feesDetails.length > feeIndex) {
          newForms[formIndex].installments[i].feesDetails.splice(feeIndex, 1);
        }
      }
    }

    setForms(newForms);
  };

  const handleInstallmentFeeChange = (
    formIndex,
    instIndex,
    feeIndex,
    field,
    value
  ) => {
    const newForms = [...forms];
    newForms[formIndex].installments[instIndex].feesDetails[feeIndex][field] =
      value;

    if (instIndex === 0) {
      for (let i = 1; i < newForms[formIndex].installments.length; i++) {
        if (newForms[formIndex].installments[i].feesDetails[feeIndex]) {
          newForms[formIndex].installments[i].feesDetails[feeIndex][field] =
            value;
        }
      }
    }

    setForms(newForms);
  };

  const handleNumInstallmentsChange = (index, value) => {
    if (/^0\d+/.test(value)) return;

    const newForms = [...forms];
    newForms[index].numInstallments = value;
    setForms(newForms);

    const num = parseInt(value);
    if (isNaN(num) || num <= 0) return;

    const firstInstallmentFees = newForms[index].installments[0]
      ?.feesDetails || [{ feesType: "", amount: "" }];

    const firstDueDate = newForms[index].installments[0]?.dueDate
      ? new Date(newForms[index].installments[0].dueDate)
      : null;

    const newInstallments = Array.from({ length: num }, (_, i) => ({
      name: `Installment ${i + 1}`,
      dueDate: firstDueDate
        ? new Date(new Date(firstDueDate).setMonth(firstDueDate.getMonth() + i))
            .toISOString()
            .split("T")[0]
        : "",
      feesDetails: firstInstallmentFees.map((fee) => ({ ...fee })),
    }));

    updateForm(index, { installments: newInstallments });
  };

  const handleSubmitAll = async (e) => {
    e.preventDefault();
    setLoading(true);
    const academicYear = localStorage.getItem("selectedAcademicYear");

    const combos = forms.map(
      (f) => `${f.selectedClassId}-${f.selectedSections.sort().join(",")}`
    );
    const seen = new Set();
    for (let i = 0; i < combos.length; i++) {
      if (seen.has(combos[i])) {
        toast.error(
          `Duplicate class and section(s) found in form ${
            i + 1
          }. Please correct it.`
        );
        setLoading(false);
        return;
      }
      seen.add(combos[i]);
    }

    let allSuccess = true;

    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];
      const payload = {
        academicYear: academicYear,
        classId: form.selectedClassId,
        sectionIds: form.selectedSections,
        installments: form.installments.map((inst) => ({
          name: inst.name,
          dueDate: new Date(inst.dueDate),
          fees: inst.feesDetails.map((fd) => ({
            feesTypeId: fd.feesType,
            amount: Number(fd.amount),
          })),
        })),
      };

      try {
        const response = await postAPI(
          "/create-fees-structure",
          payload,
          {},
          true
        );
        if (response.hasError) {
          allSuccess = false;
          toast.error(
            `Form ${i + 1}: ${
              response.message || "Failed to create fee structure."
            }`
          );
        } else {
          toast.success(
            `Form ${i + 1}: ${
              response.message || "Fee structure created successfully."
            }`
          );
        }
      } catch (err) {
        allSuccess = false;
        toast.error(
          `Form ${i + 1}: ${err?.response?.data?.message || "Server error."}`
        );
      }
    }

    setLoading(false);
    if (allSuccess) {
      navigate(-1);
    }
  };

  const getClassById = (id) => classData.find((cls) => cls._id === id);

  const handleAddNewForm = () => {
    setForms([
      ...forms,
      {
        selectedClassId: "",
        selectedSections: [],
        numInstallments: "",
        installments: [],
      },
    ]);
  };

  const handleRemoveForm = (index) => {
    if (forms.length <= 1) return;
    const newForms = forms.filter((_, i) => i !== index);
    setForms(newForms);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <h4 className="card-title text-center">Add Fees Structure</h4>
              <form onSubmit={handleSubmitAll}>
                {forms.map((form, index) => {
                  const selectedClass = getClassById(form.selectedClassId);
                  return (
                    <div
                      key={index}
                      className="border rounded p-3 my-3 position-relative"
                    >
                      <h5>Form {index + 1}</h5>
                      {forms.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute"
                          style={{ top: "10px", right: "10px" }}
                          onClick={() => handleRemoveForm(index)}
                          title="Remove Form"
                        >
                          {/* <FaTrash  /> */}Remove
                        </button>
                      )}
                      <div className="row">
                        <div className="col-md-4">
                          <label>Class</label>
                          <select
                            className="form-control"
                            value={form.selectedClassId}
                            onChange={(e) =>
                              updateForm(index, {
                                selectedClassId: e.target.value,
                                selectedSections: [],
                              })
                            }
                            required
                          >
                            <option value="">Select Class</option>
                            {classData.map((cls) => (
                              <option key={cls._id} value={cls._id}>
                                {cls.className}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label>Sections</label>
                          <div className="d-flex flex-wrap">
                            {selectedClass?.sections.map((section) => (
                              <div
                                key={section._id}
                                className="form-check me-2"
                              >
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  value={section._id}
                                  checked={form.selectedSections.includes(
                                    section._id
                                  )}
                                  onChange={(e) => {
                                    const { checked, value } = e.target;
                                    const updatedSections = checked
                                      ? [...form.selectedSections, value]
                                      : form.selectedSections.filter(
                                          (id) => id !== value
                                        );
                                    updateForm(index, {
                                      selectedSections: updatedSections,
                                    });
                                  }}
                                />
                                <label className="form-check-label">
                                  {section.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label>No. of Installments</label>
                          <input
                            type="number"
                            className="form-control"
                            value={form.numInstallments}
                            onChange={(e) =>
                              handleNumInstallmentsChange(index, e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      {form.installments.length > 0 && (
                        <div className="mt-4">
                          {form.installments.map((inst, instIndex) => (
                            <div
                              key={instIndex}
                              className="border rounded p-3 mb-3"
                            >
                              <div className="row mb-2">
                                <div className="col-md-6">
                                  <label>Installment Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={inst.name}
                                    onChange={(e) =>
                                      handleInstallmentChange(
                                        index,
                                        instIndex,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-5">
                                  <label>Due Date</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    value={inst.dueDate}
                                    onChange={(e) =>
                                      handleInstallmentChange(
                                        index,
                                        instIndex,
                                        "dueDate",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              {inst.feesDetails.map((fee, feeIndex) => (
                                <div className="row mb-2" key={feeIndex}>
                                  <div className="col-md-6">
                                    <label>Fee Type</label>
                                    <select
                                      className="form-control"
                                      value={fee.feesType}
                                      onChange={(e) =>
                                        handleInstallmentFeeChange(
                                          index,
                                          instIndex,
                                          feeIndex,
                                          "feesType",
                                          e.target.value
                                        )
                                      }
                                      required
                                    >
                                      <option value="">Select Fee Type</option>
                                      {feesTypesList
                                        .filter((type) => {
                                          return (
                                            fee.feesType === type._id ||
                                            !inst.feesDetails.some(
                                              (f, idx) =>
                                                idx !== feeIndex &&
                                                f.feesType === type._id
                                            )
                                          );
                                        })
                                        .map((type) => (
                                          <option
                                            key={type._id}
                                            value={type._id}
                                          >
                                            {type.feesTypeName}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                  <div className="col-md-5">
                                    <label>Amount</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={fee.amount}
                                      onChange={(e) =>
                                        handleInstallmentFeeChange(
                                          index,
                                          instIndex,
                                          feeIndex,
                                          "amount",
                                          e.target.value
                                        )
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="col-md-1 d-flex align-items-end">
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm ms-auto d-block"
                                      onClick={() =>
                                        handleRemoveInstallmentField(
                                          index,
                                          instIndex,
                                          feeIndex
                                        )
                                      }
                                      disabled={inst.feesDetails.length <= 1}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                              <div className="text-end mt-2">
                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm"
                                  onClick={() =>
                                    handleAddInstallmentField(index, instIndex)
                                  }
                                >
                                  Add Fee Type
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddNewForm}
                  >
                    Add New Form
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADDFeesStructure;
