import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Modal, Button } from "react-bootstrap";
import putAPI from "../../../../../api/putAPI.jsx";

const GenerateLeaveReportModal = () => {
  return (
    <>
      <Modal
        show={true}
        onHide={onClose}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Body className="modal-body-scrollable">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body custom-heading-padding">
                    <div className="container">
                      <div className="card-header mb-2">
                        <h4 className="card-title text-center custom-heading-font">
                          Generate Leave Report
                        </h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-2">
                          <label
                            htmlFor="rejectCommentFromBuyer"
                            className="form-label"
                          >
                            Entity
                          </label>
                          <select
                            id="categoryOfEmployees"
                            name="categoryOfEmployees"
                            className="form-control"
                            // value={formData.categoryOfEmployee}
                            // onChange={handleChange}
                            required
                          >
                            <option value="">Select Entity</option>
                            <option value="Teaching Staff">All</option>
                            <option value="Non Teaching Staff">Some</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-2">
                          <label
                            htmlFor="rejectCommentFromBuyer"
                            className="form-label"
                          >
                            Leave Accounting Year
                          </label>
                          <select
                            id="categoryOfEmployees"
                            name="categoryOfEmployees"
                            className="form-control"
                            // value={formData.categoryOfEmployee}
                            // onChange={handleChange}
                            required
                          >
                            <option value="">Select Year</option>
                            <option value="Teaching Staff">2025</option>
                            <option value="Non Teaching Staff">2026</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GenerateLeaveReportModal;
