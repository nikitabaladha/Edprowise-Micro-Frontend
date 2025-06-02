import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI.jsx";
import { useLocation } from "react-router-dom";

const ViewFeeStructure = () => {
  const location = useLocation();
  const existingStructure = location.state?.structure;
  const [schoolId, setSchoolId] = useState("");
  const [classData, setClassData] = useState([]);
  const [feesTypesList, setFeesTypesList] = useState([]);

  const [forms, setForms] = useState([]);

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
        const feesTypeRes = await getAPI(`/getall-fess-type/${schoolId}`);
        if (!feesTypeRes.hasError && Array.isArray(feesTypeRes.data.data)) {
          setFeesTypesList(feesTypeRes.data.data);
        } else {
          toast.error("Failed to fetch fees types.");
        }
      } catch (error) {
        toast.error("Error fetching fees types.");
      }
    };

    fetchData();
  }, [schoolId]);

  useEffect(() => {
    if (existingStructure && classData.length > 0 && feesTypesList.length > 0) {
      const initialForm = {
        selectedClassId: existingStructure.classId,
        selectedSections: existingStructure.sectionIds,
        numInstallments: existingStructure.installments.length.toString(),
        installments: existingStructure.installments.map((inst) => ({
          name: inst.name,
          dueDate: inst.dueDate.split("T")[0],
          feesDetails: inst.fees.map((fee) => ({
            feesType: fee.feesTypeId,
            amount: fee.amount.toString(),
          })),
        })),
      };
      setForms([initialForm]);
    }
  }, [existingStructure, classData, feesTypesList]);

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
    setForms(newForms);
  };

  const handleNumInstallmentsChange = (index, value) => {
    if (/^0\d+/.test(value)) return;

    const newForms = [...forms];
    newForms[index].numInstallments = value;
    setForms(newForms);

    const num = parseInt(value);
    if (isNaN(num)) return;

    if (num > newForms[index].installments.length) {
      const newInstallments = [...newForms[index].installments];
      for (let i = newInstallments.length; i < num; i++) {
        newInstallments.push({
          name: `Installment ${i + 1}`,
          dueDate: "",
          feesDetails: [{ feesType: "", amount: "" }],
        });
      }
      updateForm(index, { installments: newInstallments });
    }
  };

  const getClassById = (id) => classData.find((cls) => cls._id === id);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <h4 className="card-title text-center">Update Fees Structure</h4>
              <form>
                {forms.map((form, index) => {
                  const selectedClass = getClassById(form.selectedClassId);
                  return (
                    <div key={index} className="border rounded p-3 my-3">
                      <h5>Fee Structure</h5>
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
                            disabled
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
                                  disabled
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
                            min="1"
                            disabled
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
                                    required
                                    disabled
                                  />
                                </div>
                                <div className="col-md-6">
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
                                    required
                                    disabled
                                  />
                                </div>
                              </div>

                              {inst.feesDetails.map((fee, feeIndex) => (
                                <div className="row mb-2" key={feeIndex}>
                                  <div className="col-md-5">
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
                                      disabled
                                    >
                                      <option value="">Select Fee Type</option>
                                      {feesTypesList.map((type) => (
                                        <option key={type._id} value={type._id}>
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
                                      min="0"
                                      disabled
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFeeStructure;
