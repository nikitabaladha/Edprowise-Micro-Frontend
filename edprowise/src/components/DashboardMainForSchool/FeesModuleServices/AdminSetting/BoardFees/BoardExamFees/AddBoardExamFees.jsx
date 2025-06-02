import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI.jsx";
import postAPI from "../../../../../../api/postAPI.jsx";
import { useNavigate } from "react-router-dom";

const AddBoardExamFees = () => {
  const [schoolId, setSchoolId] = useState("");
  const [classData, setClassData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState([
    {
      selectedClassId: "",
      selectedSections: [],
      amount: "",
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
    };

    fetchData();
  }, [schoolId]);

  const updateEntry = (index, updatedFields) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], ...updatedFields };
    setEntries(newEntries);
  };

  const handleRemoveEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleSubmitAll = async (e) => {
    e.preventDefault();
    setLoading(true);
    const academicYear = localStorage.getItem("selectedAcademicYear");

    const combos = entries.map(
      (e) => `${e.selectedClassId}-${e.selectedSections.sort().join(",")}`
    );
    const seen = new Set();
    for (let i = 0; i < combos.length; i++) {
      if (seen.has(combos[i])) {
        toast.error(
          `Duplicate class and section(s) found in entry ${
            i + 1
          }. Please correct it.`
        );
        setLoading(false);
        return;
      }
      seen.add(combos[i]);
    }

    let allSuccess = true;

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const payload = {
        academicYear: academicYear,
        classId: entry.selectedClassId,
        sectionIds: entry.selectedSections,
        amount: Number(entry.amount),
      };

      try {
        const response = await postAPI(
          "/create-board-exam-fees",
          payload,
          {},
          true
        );
        if (response.hasError) {
          allSuccess = false;
          toast.error(
            `Entry ${i + 1}: ${
              response.message || "Failed to create board exam fees."
            }`
          );
        } else {
          toast.success(
            `Entry ${i + 1}: ${
              response.message || "Board exam fees created successfully."
            }`
          );
        }
      } catch (err) {
        allSuccess = false;
        toast.error(
          `Entry ${i + 1}: ${err?.response?.data?.message || "Server error."}`
        );
      }
    }

    setLoading(false);

    if (allSuccess) {
      navigate(-1);
    }
  };

  const getClassById = (id) => classData.find((cls) => cls._id === id);

  const handleAddNewEntry = () => {
    setEntries([
      ...entries,
      {
        selectedClassId: "",
        selectedSections: [],
        amount: "",
      },
    ]);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <h4 className="card-title text-center">Add Board Exam Fees</h4>
              <form onSubmit={handleSubmitAll}>
                {entries.map((entry, index) => {
                  const selectedClass = getClassById(entry.selectedClassId);
                  return (
                    <div key={index} className="border rounded p-3 my-3">
                      <div className="row">
                        <div className="col-md-4">
                          <label>Class</label>
                          <select
                            className="form-control"
                            value={entry.selectedClassId}
                            onChange={(e) =>
                              updateEntry(index, {
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
                                  checked={entry.selectedSections.includes(
                                    section._id
                                  )}
                                  onChange={(e) => {
                                    const { checked, value } = e.target;
                                    const updatedSections = checked
                                      ? [...entry.selectedSections, value]
                                      : entry.selectedSections.filter(
                                          (id) => id !== value
                                        );
                                    updateEntry(index, {
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
                          <label>Amount</label>
                          <input
                            type="number"
                            className="form-control"
                            value={entry.amount}
                            onChange={(e) =>
                              updateEntry(index, { amount: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-end mt-2">
                        {entries.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveEntry(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddNewEntry}
                  >
                    Add New Entry
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

export default AddBoardExamFees;
