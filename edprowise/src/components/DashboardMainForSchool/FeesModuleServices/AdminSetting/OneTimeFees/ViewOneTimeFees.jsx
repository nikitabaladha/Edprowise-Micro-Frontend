import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI.jsx";
import { useLocation } from "react-router-dom";

const ViewOneTimeFees = () => {
  const location = useLocation();
  const existingStructure = location.state?.structure;
  const [schoolId, setSchoolId] = useState("");
  const [classData, setClassData] = useState([]);
  const [feesTypesList, setFeesTypesList] = useState([]);

  const [forms, setForms] = useState([
    {
      selectedClassId: existingStructure?.classId || "",
      selectedSections: existingStructure?.sectionIds || [],
      feesDetails:
        existingStructure?.oneTimeFees?.length > 0
          ? existingStructure.oneTimeFees.map((fee) => ({
              feesType: fee.feesTypeId,
              amount: fee.amount,
              _id: fee._id,
            }))
          : [{ feesType: "", amount: "" }],
      showFeeDetails: true,
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
      } catch {
        toast.error("Error fetching class and section data.");
      }

      try {
        const feesTypeRes = await getAPI(`/getall-fess-type/${schoolId}`);
        if (!feesTypeRes.hasError && Array.isArray(feesTypeRes.data.data)) {
          const oneTimeFees = feesTypeRes.data.data.filter(
            (fee) => fee.groupOfFees === "One Time Fees"
          );
          setFeesTypesList(oneTimeFees);
        } else {
          toast.error("Failed to fetch fees types.");
        }
      } catch {
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

  const getClassById = (id) => classData.find((cls) => cls._id === id);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <h4 className="card-title text-center">Update One-Time Fees</h4>
              <form>
                {forms.map((form, index) => {
                  const selectedClass = getClassById(form.selectedClassId);
                  return (
                    <div key={index} className="border rounded p-3 my-3">
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
                                showFeeDetails: false,
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
                        <div className="col-md-8">
                          <label>Sections</label>
                          <div className="row">
                            <div className="col-md-9 d-flex flex-wrap">
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
                                        showFeeDetails: false,
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
                        </div>
                      </div>

                      {form.showFeeDetails && (
                        <div className="mt-4">
                          <h6>Fee Details</h6>
                          {form.feesDetails.map((fee, feeIndex) => (
                            <div className="row mb-2" key={feeIndex}>
                              <div className="col-md-5">
                                <label>Fee Type</label>
                                <select
                                  className="form-control"
                                  value={fee.feesType || ""}
                                  disabled
                                >
                                  <option value="">Select Fee Type</option>
                                  {feesTypesList
                                    .filter((type) => {
                                      const selectedFeeTypes =
                                        form.feesDetails.map((f) => f.feesType);
                                      return (
                                        !selectedFeeTypes.includes(type._id) ||
                                        fee.feesType === type._id
                                      );
                                    })
                                    .map((type) => (
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
                                  disabled
                                />
                              </div>
                              <div className="col-md-2 d-flex align-items-end"></div>
                            </div>
                          ))}
                          <div className="text-end"></div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="d-flex justify-content-between mt-4"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOneTimeFees;
