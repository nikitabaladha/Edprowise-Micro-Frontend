import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getAPI from "../../../../../api/getAPI.jsx";
import putAPI from "../../../../../api/putAPI.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateClassAndSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.classandsection;
  const [loading, setLoading] = useState(false);

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

  const handleGenerateSections = (e) => {
    e.preventDefault();
    const numSections = parseInt(numberOfSections) || 1;
    setSections(
      Array.from({ length: numSections }, (_, i) => ({
        name: data?.sections?.[i]?.name || "",
        shiftId: data?.sections?.[i]?.shiftId || "",
      }))
    );
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!className.trim()) {
      toast.error("Class name is required.");
      return;
    }
    if (sections.some((sec) => !sec.name.trim() || !sec.shiftId)) {
      toast.error("All sections must have a name and shift selected.");
      return;
    }

    try {
      const payload = {
        className,
        sections,
      };

      const response = await putAPI(
        `/update-class-and-section/${data._id}`,
        payload,
        {},
        true
      );

      if (!response.hasError) {
        toast.success("Class and sections updated successfully!");
        navigate(-1);
        setClassName("");
        setNumberOfSections("1");
        setSections([]);
      } else {
        toast.error(response.message || "Failed to update class.");
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        "An error occurred while updating class and sections.";
      toast.error(errorMessage);
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
              <div className="card-header mb-2">
                <h4 className="card-title text-center custom-heading-font">
                  {data ? "Edit Class & Section" : "Add Class & Section"}
                </h4>
              </div>
              <form onSubmit={handleGenerateSections}>
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
                      onChange={(e) => setClassName(e.target.value)}
                      required
                      disabled={!!data}
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
                      onChange={(e) => setNumberOfSections(e.target.value)}
                      required
                      disabled={!!data}
                    />
                  </div>
                </div>
                {!data && (
                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">
                      Generate Class & Section
                    </button>
                  </div>
                )}
              </form>

              {sections.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-center">
                    Sections for {className} Class
                  </h5>
                  <form onSubmit={handleSave}>
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
                            onChange={(e) =>
                              handleSectionChange(index, "name", e.target.value)
                            }
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Section Shift</label>
                          <select
                            className="form-control"
                            value={section.shiftId}
                            onChange={(e) =>
                              handleSectionChange(
                                index,
                                "shiftId",
                                e.target.value
                              )
                            }
                            required
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
                    <div className="text-end">
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateClassAndSection;
