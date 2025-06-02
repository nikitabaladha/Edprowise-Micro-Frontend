import React from "react";
import { Modal, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

const AdmissionPreviewModal = ({
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
    "registrationNumber",
    "firstName",
    "middleName",
    "lastName",
    "dateOfBirth",
    "age",
    "nationality",
    "gender",
    "bloodGroup",
    "className",
    "Shift",
    "section",
    "currentAddress",
    "country",
    "state",
    "city",
    "pincode",
    "parentContactNumber",
    "motherTongue",
    "previousSchoolName",
    "addressOfPreviousSchool",
    "previousSchoolBoard",
    "aadharPassportNumber",
    "studentCategory",
    "siblingInfoChecked",
    "relationType",
    "siblingName",
    "parentalStatus",
    "fatherName",
    "fatherContactNo",
    "fatherQualification",
    "fatherProfession",
    "motherName",
    "motherContactNo",
    "motherQualification",
    "motherProfession",
    "agreementChecked",
    "selectedFeeType",
    "admissionFees",
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
    const shiftName = row.Shift?.toString().trim() || "";
    const sectionName = row.section?.toString().trim() || "";
    const feeTypeName = row.selectedFeeType?.toString().trim() || "";
    const admissionFees = Number(row.admissionFees) || 0;
    const finalAmount = Number(row.finalAmount) || 0;

    const classObj = classes.find(
      (c) => c.className.toLowerCase() === className.toLowerCase()
    );
    const shiftObj = shifts.find(
      (s) => s.masterDefineShiftName.toLowerCase() === shiftName.toLowerCase()
    );
    const sectionObj = classObj?.sections.find(
      (s) =>
        s.name.toLowerCase() === sectionName.toLowerCase() &&
        s.shiftId === shiftObj?._id
    );
    const feeType =
      classObj &&
      sectionObj &&
      feeTypesByClass[`${classObj._id}_${sectionObj._id}`]?.find(
        (ft) => ft.name.toLowerCase() === feeTypeName.toLowerCase()
      );

    const errors = [];

    if (!classObj) errors.push(`Invalid class "${className}"`);
    if (!shiftObj) errors.push(`Invalid shift "${shiftName}"`);
    if (!sectionObj) errors.push(`Invalid section "${sectionName}"`);
    if (!feeType) errors.push(`Invalid fee type "${feeTypeName}"`);

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    const match = validatedData.find((vd) => {
      const isMatch =
        (vd.firstName || "").toString().trim() === firstName &&
        (vd.lastName || "").toString().trim() === lastName &&
        vd.masterDefineClass === classObj._id &&
        vd.masterDefineShift === shiftObj._id &&
        vd.section === sectionObj._id &&
        vd.selectedFeeType === feeType.id &&
        Number(vd.admissionFees || 0) === admissionFees &&
        Number(vd.finalAmount || 0) === finalAmount;
      if (!isMatch) {
        toast.error(`Row ${index + 1} validation failed:`, {
          firstName: { preview: firstName, validated: vd.firstName },
          lastName: { preview: lastName, validated: vd.lastName },
          masterDefineClass: {
            preview: classObj._id,
            validated: vd.masterDefineClass,
          },
          masterDefineShift: {
            preview: shiftObj._id,
            validated: vd.masterDefineShift,
          },
          section: { preview: sectionObj._id, validated: vd.section },
          selectedFeeType: {
            preview: feeType.id,
            validated: vd.selectedFeeType,
          },
          admissionFees: {
            preview: admissionFees,
            validated: Number(vd.admissionFees || 0),
          },
          finalAmount: {
            preview: finalAmount,
            validated: Number(vd.finalAmount || 0),
          },
        });
      }
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
    if (header === "Shift") {
      const shiftObj = shifts.find((s) => s._id === row.masterDefineShift);
      return shiftObj ? shiftObj.masterDefineShiftName : row.Shift || "-";
    }
    if (header === "section") {
      const classObj = classes.find((c) => c._id === row.masterDefineClass);
      const sectionObj = classObj?.sections.find((s) => s._id === row.section);
      return sectionObj ? sectionObj.name : row.section || "-";
    }
    if (header === "siblingInfoChecked" || header === "agreementChecked") {
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

export default AdmissionPreviewModal;
