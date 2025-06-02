import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getAPI from "../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";

const ViewClassAndSection = () => {
  const location = useLocation();
  const data = location.state?.classandsection;

  const [className, setClassName] = useState(data?.className || "");
  const [numberOfSections, setNumberOfSections] = useState(
    data?.sections?.length?.toString() || "1"
  );
  const [sections, setSections] = useState(data?.sections || []);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await getAPI(`/master-define-shift/${data.schoolId}`);
        if (!response.hasError) {
          const shiftArray = Array.isArray(response.data?.data)
            ? response.data.data
            : [];
          setShifts(shiftArray);
        } else {
          toast.error(response.message || "Failed to fetch shifts.");
        }
      } catch (err) {
        toast.error("Error fetching shift data.");
        console.error("Shift Fetch Error:", err);
      }
    };

    fetchShifts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="card-header mb-2">
                <h4 className="card-title text-center custom-heading-font">
                  View Class & Section
                </h4>
              </div>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="class" className="form-label">
                      Class
                    </label>
                    <input
                      type="text"
                      id="class"
                      className="form-control"
                      value={className}
                      disabled
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="numberOfSection" className="form-label">
                      Number Of Sections
                    </label>
                    <input
                      type="number"
                      id="numberOfSection"
                      className="form-control"
                      value={numberOfSections}
                      disabled
                    />
                  </div>
                </div>
              </form>

              {sections.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-center">
                    Sections for {className} Class
                  </h5>
                  <form>
                    {sections.map((section, index) => (
                      <div className="row mb-3" key={index}>
                        <div className="col-md-6">
                          <label className="form-label">
                            Section {index + 1} Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={section.name}
                            disabled
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Section Shift</label>
                          <select
                            className="form-control"
                            value={section.shiftId}
                            disabled
                          >
                            <option value="">Select Shift</option>
                            {shifts.map((shift) => (
                              <option key={shift._id} value={shift._id}>
                                {shift.masterDefineShiftName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClassAndSection;
