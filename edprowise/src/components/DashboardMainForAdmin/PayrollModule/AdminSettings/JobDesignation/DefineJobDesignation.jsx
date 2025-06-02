import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../../ConfirmationDialog.jsx";
import getAPI from "../../../../../api/getAPI.jsx";

const DefineJobDesignation = () => {
  const [jobDesignation, setJobDesignation] = useState([
    { id: 1, name: "Teacher", isEditing: false },
    { id: 2, name: "Assistence", isEditing: false },
  ]);

  const [newComponent, setNewComponent] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddRow = () => {
    const newEntry = {
      id: Date.now(),
      name: "", // blank until user types
      isEditing: true, // open in edit mode
    };
    setJobDesignation((prev) => [...prev, newEntry]);
  };

  const handleEdit = (id) => {
    setEditId(id);
    setJobDesignation((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? { ...comp, isEditing: true }
          : { ...comp, isEditing: false }
      )
    );
  };

  const handleSave = (id, newName) => {
    setJobDesignation((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, name: newName, isEditing: false } : comp
      )
    );
    setEditId(null);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2 d-flex align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Job Designation
                    </h4>
                    <div>
                      <select
                        id="yearSelect"
                        className="custom-select payroll-table-body border border-dark"
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
                <div className="table-responsive px-lg-7 px-md-5">
                  <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
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
                            />
                          </div>
                        </th>
                        <th> Job Designation</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobDesignation.map((comp, index) => (
                        <tr
                          key={comp.id}
                          className="payroll-table-body text-center"
                        >
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customCheck2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customCheck2"
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>
                            {comp.isEditing ? (
                              <div
                                className="col-md-7"
                                style={{ justifySelf: "center" }}
                              >
                                <input
                                  type="text"
                                  className="form-control payroll-table-body payroll-input-border text-start"
                                  defaultValue={comp.name}
                                  onChange={(e) =>
                                    setJobDesignation((prev) =>
                                      prev.map((item) =>
                                        item.id === comp.id
                                          ? { ...item, name: e.target.value }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </div>
                            ) : (
                              comp.name
                            )}
                          </td>

                          <td>
                            {comp.isEditing ? (
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleSave(comp.id, comp.name)}
                              >
                                Save
                              </button>
                            ) : (
                              <>
                                <div className="d-flex justify-content-center gap-2">
                                  <button
                                    className="btn btn-soft-primary btn-sm"
                                    onClick={() => handleEdit(comp.id)}
                                  >
                                    <iconify-icon
                                      icon="solar:pen-2-broken"
                                      className="align-middle fs-18"
                                    />
                                  </button>

                                  <button
                                    className="btn btn-soft-danger btn-sm"
                                    // onClick={() => handleDelete(comp.id)}
                                  >
                                    <iconify-icon
                                      icon="solar:trash-bin-minimalistic-2-broken"
                                      className="align-middle fs-18"
                                    />
                                  </button>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-3 text-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddRow}
                    >
                      Add Row
                    </button>
                  </div>
                </div>
                <div className="card-footer border-top">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end mb-0">
                      <li className="page-item">
                        <button
                          className="page-link"
                          // onClick={handlePreviousPage}
                          // disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      <li className={`page-item`}>
                        <button
                          className={`page-link pagination-button `}
                          //   onClick={() => handlePageClick(page)}
                        >
                          1
                        </button>
                      </li>

                      <li className="page-item">
                        <button
                          className="page-link"
                          // onClick={handleNextPage}
                          // disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefineJobDesignation;
