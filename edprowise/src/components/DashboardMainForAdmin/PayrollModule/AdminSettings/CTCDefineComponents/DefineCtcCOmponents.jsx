import React, { useState } from "react";
import { Link } from "react-router-dom";

const DefineCtcComponents = () => {
  const [rows, setRows] = useState([
    { id: 1, CTCComponentsName: "" },
    { id: 2, CTCComponentsName: "" },
    { id: 3, CTCComponentsName: "" },
  ]);

  // Handle input change
  const handleInputChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].CTCComponentsName = value;
    setRows(updatedRows);
  };

  // Add a new row
  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, CTCComponentsName: "" }]);
  };

  const deleteRow = (index) => {
    if (rows.length > 3) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Define CTC Components
                  </h4>
                  <div>
                    <select
                      id="yearSelect"
                      className="custom-select payroll-table-body"
                      aria-label="Select Year"
                    >
                      <option selected>2025-26</option>
                      <option>2026-27</option>
                      <option>2027-28</option>
                      <option>2028-29</option>
                      <option>2029-30</option>
                    </select>
                  </div>
                </div>
              </div>
              <form>
                <div className="table-responsive px-lg-6 px-md-5">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
                    <thead className="bg-light-subtle">
                      <tr className="payroll-table-header">
                        <th style={{ width: 20 }}>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheck1"
                            ></label>
                          </div>
                        </th>
                        <th>Define CTC Components</th>
                        <th className="text-start">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={row.id} className="payroll-table-body">
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`customCheck${row.id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`customCheck${row.id}`}
                              ></label>
                            </div>
                          </td>
                          <td>
                            <input
                              type="text"
                              id={`CTCComponentsName${row.id}`}
                              name="CTCComponentsName"
                              className="form-control payroll-table-body payroll-input-border"
                              value={row.CTCComponentsName}
                              onChange={(e) =>
                                handleInputChange(index, e.target.value)
                              }
                              required
                              placeholder="Enter CTC Component Name"
                            />
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              {rows.length > 3 && (
                                <Link
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteRow(index);
                                  }}
                                  className="btn btn-soft-danger btn-sm"
                                >
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addRow}
                  >
                    Add Row
                  </button>
                </div>

                <div className="mt-3 text-end">
                  <button type="submit" className="btn btn-primary">
                    submit
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

export default DefineCtcComponents;
