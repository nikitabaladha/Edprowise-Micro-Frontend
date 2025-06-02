import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Modal, Button } from "react-bootstrap";
// import putAPI from "../../../../../api/putAPI";

const EmailVerificationModal = ({
  isOpen,
  onClose,
  otpData,
  onOtpChange,
  onVerify,
  onResend,
  timer,
  emailVerificationState,
  sending,
  verifyingOTP,
}) => {
  if (!isOpen) return null;

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
                          Verify Email
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
                            Enter OTP sent to <strong>{otpData.email}</strong>
                          </label>
                          <input
                            type="text"
                            id="otp"
                            className="form-control"
                            value={otpData.otp}
                            onChange={onOtpChange}
                            placeholder="Enter 6-digit OTP"
                            maxLength="6"
                            disabled={sending}
                          />
                        </div>
                      </div>

                      <div className="text-end">
                        {emailVerificationState === "pending" && timer > 0 && (
                          <span className="me-2 form-label">
                            OTP valid till {timer}s
                          </span>
                        )}
                        {emailVerificationState === "pending" &&
                          timer === 0 && (
                            <button
                              type="button"
                              className="btn btn-outline-secondary me-2"
                              onClick={onResend}
                              disabled={sending}
                            >
                              {sending ? "Sending..." : "Resend OTP"}
                            </button>
                          )}
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={onVerify}
                          disabled={
                            !otpData.otp || otpData.otp.length !== 6 || sending
                          }
                        >
                          {verifyingOTP ? "Verifying..." : "Verify"}
                        </button>
                        <Button
                          variant="secondary"
                          onClick={onClose}
                          className="ms-2"
                        >
                          Close
                        </Button>
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

export default EmailVerificationModal;
