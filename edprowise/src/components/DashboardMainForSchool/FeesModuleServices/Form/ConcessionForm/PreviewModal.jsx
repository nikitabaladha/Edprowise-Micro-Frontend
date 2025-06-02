import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const PreviewModal = ({
  show,
  onClose,
  previewData,
  validatedData,
  classes,
}) => {
  const headers = [
    "Row",
    "AdmissionNumber",
    "firstName",
    "middleName",
    "lastName",
    "className",
    "section",
    "concessionType",
    "installmentName",
    "selectedFeeType",
    "totalFees",
    "concessionPercentage",
    "concessionAmount",
    "balancePayable",
    "Valid",
  ];

  const getClassName = (classId) => {
    const cls = classes.find((item) => item._id === classId);
    return cls?.className || "N/A";
  };

  const isRowValid = (row) => {
    const admissionNumber = row.AdmissionNumber?.toString().trim();
    const className = row.className?.toString().trim();
    const sectionName = row.section?.toString().trim();
    const installmentName = row.installmentName?.toString().trim();

    const classObj = classes.find(
      (c) => c.className.toLowerCase() === className?.toLowerCase()
    );
    const sectionObj = classObj?.sections?.find(
      (s) => s.name.toLowerCase() === sectionName?.toLowerCase()
    );

    const isValid = validatedData.some((vd) => {
      const detail = vd.concessionDetails.find(
        (d) => d.installmentName === installmentName
      );
      const matches =
        vd.AdmissionNumber === admissionNumber &&
        vd.masterDefineClass === classObj?._id &&
        vd.section === sectionObj?._id &&
        detail &&
        detail.installmentName === installmentName &&
        detail.totalFees === Number(row.totalFees) &&
        detail.concessionPercentage === Number(row.concessionPercentage) &&
        detail.concessionAmount === Number(row.concessionAmount) &&
        detail.balancePayable === Number(row.balancePayable);
      console.log(
        `Row Validation - AdmissionNumber: ${admissionNumber}, Class: ${className}, Installment: ${installmentName}, Matches: ${matches}`
      );
      console.log(
        `ClassObj: ${classObj?._id}, SectionObj: ${sectionObj?._id}, Detail:`,
        detail
      );
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
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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
            border: 1px solid #dee2e6;
            border-radius: 4px;
          }
          .custom-modal .table {
            margin-bottom: 0;
            white-space: nowrap;
            font-size: 0.9rem;
          }
          .custom-modal .table thead th {
            position: sticky;
            top: 0;
            background: #e9ecef;
            z-index: 1;
            padding: 8px;
            font-weight: 600;
            text-align: center;
            vertical-align: middle;
            border-bottom: 2px solid #dee2e6;
          }
          .custom-modal .table tbody td {
            padding: 8px;
            text-align: center;
            vertical-align: middle;
            border-top: 1px solid #dee2e6;
          }
          .custom-modal .table tbody tr:hover {
            background-color: #f1f3f5;
          }
          .valid-cell {
            color: green;
            font-weight: bold;
          }
          .invalid-cell {
            color: red;
            font-weight: bold;
          }
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
          <Modal.Title>Concession Form Data Preview</Modal.Title>
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
