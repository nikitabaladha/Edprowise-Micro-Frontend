import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI.jsx";
import putAPI from "../../../../../../api/putAPI.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateBoardRegistrationFees = () => {
  const location = useLocation();
  const existingFees = location.state?.fees;
  const [schoolId, setSchoolId] = useState("");
  const [classData, setClassData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [entry, setEntry] = useState({
    selectedClassId: "",
    selectedSections: [],
    amount: "",
  });

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

  useEffect(() => {
    if (existingFees && classData.length > 0) {
      setEntry({
        selectedClassId: existingFees.classId,
        selectedSections: existingFees.sectionIds,
        amount: existingFees.amount.toString(),
      });
    }
  }, [existingFees, classData]);

  const updateEntry = (updatedFields) => {
    setEntry({ ...entry, ...updatedFields });
  };

  const getClassById = (id) => classData.find((cls) => cls._id === id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const academicYear = localStorage.getItem("selectedAcademicYear");

    if (!existingFees?._id) {
      toast.error("No board registration fees ID found for updating");
      return;
    }

    const payload = {
      academicYear: academicYear,
      classId: entry.selectedClassId,
      sectionIds: entry.selectedSections,
      amount: Number(entry.amount),
    };

    try {
      const response = await putAPI(
        `/update-board-registration-fees/${existingFees._id}`,
        payload,
        {},
        true
      );
      if (response.hasError) {
        toast.error(
          response.message || "Failed to update board registration fees."
        );
      } else {
        toast.success(
          response.message || "Board registration fees updated successfully."
        );
        navigate(-1);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <h4 className="card-title text-center">
                Update Board Registration Fees
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="border rounded p-3 my-3">
                  <div className="row">
                    <div className="col-md-4">
                      <label>Class</label>
                      <select
                        className="form-control"
                        value={entry.selectedClassId}
                        onChange={(e) =>
                          updateEntry({
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
                        {getClassById(entry.selectedClassId)?.sections.map(
                          (section) => (
                            <div key={section._id} className="form-check me-2">
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
                                  updateEntry({
                                    selectedSections: updatedSections,
                                  });
                                }}
                                disabled
                              />
                              <label className="form-check-label">
                                {section.name}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label>Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        value={entry.amount}
                        onChange={(e) =>
                          updateEntry({ amount: e.target.value })
                        }
                        required
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
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

export default UpdateBoardRegistrationFees;
