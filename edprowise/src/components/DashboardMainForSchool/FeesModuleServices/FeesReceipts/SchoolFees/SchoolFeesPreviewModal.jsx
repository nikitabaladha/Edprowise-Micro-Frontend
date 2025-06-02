import { Modal, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";

const SchoolFeesPreviewModal = ({
  show,
  onClose,
  previewData,
  validatedData,
  classes,
  feeTypes,
  sectionsByClass,
}) => {
  const headers = [
    "Row",
    "AdmissionNumber",
    "name",
    "className",
    "section",
    "paymentMode",
    "chequeNumber",
    "bankName",
    "academicYear",
    "installmentNumber",
    "feeTypeName",
    "paidAmount",
    "paymentDate", // Add paymentDate
    "Valid",
  ];

  const isRowValid = (row) => {
    const admissionNumber = row.AdmissionNumber?.toString().trim();
    const className = row.className?.toString().trim();
    const sectionName = row.section?.toString().trim();
    const feeTypeName = row.feeTypeName?.toString().trim();
    const academicYear = row.academicYear?.toString().trim();
    const installmentNumber = row.installmentNumber?.toString().trim();
    const paymentDate = row.paymentDate?.toString().trim();

    return validatedData.some((vd) => {
      const classObj = classes.find(
        (c) => c.className.toLowerCase() === className?.toLowerCase()
      );
      const sectionObj = classObj?.sections.find(
        (s) => s.name.toLowerCase() === sectionName?.toLowerCase()
      );
      const feeType = feeTypes.find(
        (ft) => ft.feesTypeName.toLowerCase() === feeTypeName?.toLowerCase()
      );

      return (
        vd.AdmissionNumber === admissionNumber &&
        vd.masterDefineClass === classObj?._id &&
        vd.section === sectionObj?._id &&
        vd.feesTypeId === feeType?._id &&
        vd.academicYear === academicYear &&
        vd.installmentNumber === installmentNumber &&
        Number(vd.paidAmount) === Number(row.paidAmount) &&
        new Date(vd.paymentDate).toISOString().split("T")[0] === paymentDate // Validate paymentDate
      );
    });
  };

  const getDisplayValue = (row, header) => {
    if (header === "className") {
      const classObj = classes.find((c) => c._id === row.masterDefineClass);
      return classObj ? classObj.className : row.className || "-";
    }
    if (header === "section") {
      const classObj = classes.find((c) => c._id === row.masterDefineClass);
      const sectionObj = classObj?.sections.find((s) => s._id === row.section);
      return sectionObj ? sectionObj.name : row.section || "-";
    }
    if (header === "feeTypeName") {
      const feeType = feeTypes.find((ft) => ft._id === row.feesTypeId);
      return feeType ? feeType.feesTypeName : row.feeTypeName || "-";
    }
    if (header === "paymentDate") {
      return row.paymentDate || "-";
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
          <Modal.Title>School Fees Excel Data Preview</Modal.Title>
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
                    const valid = isRowValid(row);
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
                                : "Row contains errors; check validation messages"}
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

export default SchoolFeesPreviewModal;
