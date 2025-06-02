import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const PreviewModal = ({
  show,
  onClose,
  previewData,
  validatedData,
  students,
  classes,
  feeTypesByClass,
}) => {
  const headers = [
    "Row",
    "AdmissionNumber",
    "firstName",
    "middleName",
    "lastName",
    "dateOfBirth",
    "nationality",
    "fatherName",
    "motherName",
    "dateOfIssue",
    "dateOfAdmission",
    "className",
    "percentageObtainInLastExam",
    "qualifiedPromotionInHigherClass",
    "whetherFaildInAnyClass",
    "anyOutstandingDues",
    "moralBehaviour",
    "dateOfLastAttendanceAtSchool",
    "reasonForLeaving",
    "anyRemarks",
    "selectedFeeType",
    "TCfees",
    "concessionAmount",
    "finalAmount",
    "name",
    "paymentMode",
    "chequeNumber",
    "bankName",
    "agreementChecked",
    "Valid",
  ];

  const isRowValid = (row) => {
    const admissionNumber = row.AdmissionNumber?.toString().trim();
    const className = row.className?.toString().trim();
    const feeTypeName = row.selectedFeeType?.toString().trim();

    const classObj = classes.find(
      (c) => c.className.toLowerCase() === className?.toLowerCase()
    );
    const feeType =
      classObj &&
      feeTypesByClass[classObj._id]?.find(
        (ft) => ft.name.toLowerCase() === feeTypeName?.toLowerCase()
      );

    const isValid = validatedData.some((vd) => {
      const matches =
        vd.AdmissionNumber === admissionNumber &&
        vd.masterDefineClass === classObj?._id &&
        Number(vd.TCfees) === Number(row.TCfees) &&
        Number(vd.finalAmount) === Number(row.finalAmount);
      return matches;
    });

    console.log(`Row ${admissionNumber} isValid: ${isValid}`);
    return isValid;
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
            border-radius: 8px;
          }
          .custom-modal .modal-body {
            max-height: 60vh;
            overflow-y: auto;
            padding: 1rem;
          }
          .custom-modal .table-responsive {
            max-height: 50vh;
            overflow-y: auto;
            overflow-x: auto;
          }
          .custom-modal .table {
            margin-bottom: 0;
            white-space: nowrap;
          }
          .custom-modal .table thead th {
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 1;
            padding: 6px;
            font-size: 0.85rem;
            text-align: center;
            vertical-align: middle;
          }
          .custom-modal .table tbody td {
            padding: 6px;
            font-size: 0.85rem;
            text-align: center;
            vertical-align: middle;
          }
          @media (max-width: 576px) {
            .custom-modal .modal-dialog {
              max-width: 98vw;
            }
            .custom-modal .modal-body {
              max-height: 70vh;
            }
            .custom-modal .table-responsive {
              max-height: 60vh;
            }
            .custom-modal .table thead th,
            .custom-modal .table tbody td {
              font-size: 0.75rem;
              padding: 4px;
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
          <Modal.Title>Excel Data Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewData.length === 0 ? (
            <p>No data to display. Please check the file and try again.</p>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {headers.slice(1, -1).map((header, colIndex) => (
                        <td key={colIndex}>
                          {row[header] !== undefined && row[header] !== ""
                            ? row[header]
                            : "-"}
                        </td>
                      ))}
                      <td style={{ color: isRowValid(row) ? "green" : "red" }}>
                        {isRowValid(row) ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}
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

export default PreviewModal;
