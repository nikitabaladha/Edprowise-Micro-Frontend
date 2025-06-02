import React from "react";
import { Modal, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
// import { toast } from 'react-toastify';

const RegistrationPreviewModal = ({
  show,
  onClose,
  previewData,
  validatedData,
  classes,
  shifts,
  feeTypesByClass,
}) => {
  const headers = [
    "Row",
    "firstName",
    "middleName",
    "lastName",
    "dateOfBirth",
    "age",
    "nationality",
    "gender",
    "className",
    "shift",
    "fatherName",
    "fatherContactNo",
    "motherName",
    "motherContactNo",
    "currentAddress",
    "country",
    "state",
    "city",
    "pincode",
    "previousSchoolName",
    "addressOfpreviousSchool",
    "previousSchoolBoard",
    "studentCategory",
    "howReachUs",
    "aadharPassportNumber",
    "agreementChecked",
    "selectedFeeType",
    "registrationFee",
    "concessionAmount",
    "finalAmount",
    "name",
    "paymentMode",
    "chequeNumber",
    "bankName",
    "Valid",
  ];

  const isRowValid = (row, index) => {
    const firstName = row.firstName?.toString().trim() || "";
    const lastName = row.lastName?.toString().trim() || "";
    const className = row.className?.toString().trim() || "";
    const shiftName = row.shift?.toString().trim() || "";
    const feeTypeName = row.selectedFeeType?.toString().trim() || "";
    const registrationFee = Number(row.registrationFee) || 0;
    const finalAmount = Number(row.finalAmount) || 0;

    const classObj = classes.find(
      (c) => c.className.toLowerCase() === className.toLowerCase()
    );
    const shiftObj = shifts.find(
      (s) => s.masterDefineShiftName.toLowerCase() === shiftName.toLowerCase()
    );

    const feeType =
      classObj &&
      feeTypesByClass[classObj._id]?.find(
        (ft) => ft.name.toLowerCase() === feeTypeName.toLowerCase()
      );

    if (!classObj || !shiftObj || !feeType) {
      const errors = [];
      if (!classObj) errors.push(`Invalid class "${className}"`);
      if (!shiftObj) errors.push(`Invalid shift "${shiftName}"`);
      if (!feeType) errors.push(`Invalid fee type "${feeTypeName}"`);
      return { valid: false, errors };
    }

    const match = validatedData.find((vd) => {
      const isMatch =
        (vd.firstName || "").toString().trim() === firstName &&
        (vd.lastName || "").toString().trim() === lastName &&
        vd.masterDefineClass === classObj._id &&
        vd.masterDefineShift === shiftObj._id &&
        Number(vd.registrationFee || 0) === registrationFee &&
        Number(vd.finalAmount || 0) === finalAmount;
      return isMatch;
    });

    return {
      valid: !!match,
      errors: match ? [] : ["Row data does not match validated data"],
    };
  };

  const getDisplayValue = (row, header) => {
    if (header === "className") {
      const classObj = classes.find((c) => c._id === row.masterDefineClass);
      return classObj ? classObj.className : row.className || "-";
    }
    if (header === "shift") {
      const shiftObj = shifts.find((s) => s._id === row.masterDefineShift);
      return shiftObj ? shiftObj.masterDefineShiftName : row.shift || "-";
    }
    if (header === "agreementChecked") {
      return row[header]?.toString().toLowerCase() === "true" ? "Yes" : "No";
    }
    return row[header] !== undefined && row[header] !== "" ? row[header] : "-";
  };

  return (
    <>
      <style>
        {`
          .custom-modal .modal-dialog {
            max-width: 95vw;
            margin: auto;
          }
          .custom-modal .modal-content {
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .custom-modal .modal-header {
            background-color: #f8f9fa;
            border-bottom: 1px solid #dee2e6;
          }
          .custom-modal .modal-body {
            max-height: 70vh;
            overflow-y: auto;
            padding: 1.5rem;
          }
          .custom-modal .table-responsive {
            max-height: 60vh;
            overflow-y: auto;
            overflow-x: auto;
          }
          .custom-modal .table {
            margin-bottom: 0;
            border-collapse: separate;
            border-spacing: 0;
          }
          .custom-modal .table thead th {
            position: sticky;
            top: 0;
            background: #e9ecef;
            z-index: 1;
            padding: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            text-align: center;
            vertical-align: middle;
            border-right: 1px solid #dee2e6;
            min-width: 100px;
          }
          .custom-modal .table tbody tr:nth-child(odd) {
            background-color: #f8f9fa;
          }
          .custom-modal .table tbody tr:hover {
            background-color: #e2e6ea;
          }
          .custom-modal .table tbody td {
            padding: 8px;
            font-size: 0.85rem;
            text-align: center;
            vertical-align: middle;
            border-right: 1px solid #dee2e6;
          }
          // .invalid-row {
          //   background-color: #fff3f3 !important;
          // }
          // .valid-row {
          //   background-color: #f0fff4 !important;
          // }
          @media (max-width: 576px) {
            .custom-modal .modal-dialog {
              max-width: 98vw;
            }
            .custom-modal .modal-body {
              max-height: 80vh;
              padding: 1rem;
            }
            .custom-modal .table-responsive {
              max-height: 70vh;
            }
            .custom-modal .table thead th,
            .custom-modal .table tbody td {
              font-size: 0.8rem;
              padding: 6px;
              min-width: 80px;
            }
          }
        `}
      </style>
      <Modal
        show={show}
        onHide={onClose}
        size="xl"
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Admission Excel Data Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewData.length === 0 ? (
            <p className="text-muted">
              No data to display. Please check the file and try again.
            </p>
          ) : (
            <div className="table-responsive">
              <Table bordered hover>
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => {
                    const { valid, errors } = isRowValid(row, index);
                    return (
                      <tr
                        key={index}
                        className={valid ? "valid-row" : "invalid-row"}
                      >
                        <td>{index + 1}</td>
                        {headers.slice(1, -1).map((header, colIndex) => (
                          <td key={colIndex}>{getDisplayValue(row, header)}</td>
                        ))}
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              {valid
                                ? "Row is valid for import"
                                : errors.join("; ")}
                            </Tooltip>
                          }
                        >
                          <td
                            style={{
                              color: valid ? "green" : "red",
                              fontWeight: "bold",
                            }}
                          >
                            {valid ? "Yes" : "No"}
                          </td>
                        </OverlayTrigger>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegistrationPreviewModal;
