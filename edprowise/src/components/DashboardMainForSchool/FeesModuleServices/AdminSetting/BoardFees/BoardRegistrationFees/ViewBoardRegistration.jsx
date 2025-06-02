import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI.jsx";
import { useLocation } from "react-router-dom";

const ViewBoardRegistrationFees = () => {
  const location = useLocation();
  const existingFees = location.state?.fees;
  const [schoolId, setSchoolId] = useState("");
  const [classData, setClassData] = useState([]);
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

  const getClassById = (id) => classData.find((cls) => cls._id === id);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <h4 className="card-title text-center">
                View Board Registration Fees
              </h4>
              <form>
                <div className="border rounded p-3 my-3">
                  <div className="row">
                    <div className="col-md-4">
                      <label>Class</label>
                      <select
                        className="form-control"
                        value={entry.selectedClassId}
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
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBoardRegistrationFees;
