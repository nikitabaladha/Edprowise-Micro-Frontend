import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const PreviewModal = ({ show, onClose, previewData, validatedData }) => {
  const validatedMap = validatedData.reduce((acc, item) => {
    acc[item.className] = item.sections.map((section) => section.name);
    return acc;
  }, {});

  const flattenedPreviewData = previewData.flatMap((row, index) => {
    const sectionNames = row.Section ? String(row.Section).split(',').map((s) => s.trim()).filter((s) => s) : [];
    return sectionNames.map((section) => ({
      ...row,
      Section: section,
      originalIndex: index + 1,
    }));
  });

  return (
    <>
      <style>
        {`
          .custom-modal .modal-dialog {
            max-width: 90vw; 
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
          }
          .custom-modal .table thead th {
            position: sticky; 
            top: 0;
            background: #fff;
            z-index: 1; 
          }
          @media (max-width: 576px) {
            .custom-modal .modal-dialog {
              max-width: 95vw; 
            }
            .custom-modal .modal-body {
              max-height: 70vh; 
            }
            .custom-modal .table-responsive {
              max-height: 60vh; 
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
          {flattenedPreviewData.length === 0 ? (
            <p>No data to display. Please check the file and try again.</p>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Row</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Shift</th>
                    <th>Valid</th>
                  </tr>
                </thead>
                <tbody>
                  {flattenedPreviewData.map((row, index) => {
                    const isValid =
                      validatedMap[row.Class] &&
                      validatedMap[row.Class].includes(row.Section);
                    return (
                      <tr key={`${row.originalIndex}-${row.Section}`}>
                        <td>{row.originalIndex}</td>
                        <td>{row.Class || '-'}</td>
                        <td>{row.Section || '-'}</td>
                        <td>{row.Shift || '-'}</td>
                        <td style={{ color: isValid ? 'green' : 'red' }}>
                          {isValid ? 'Yes' : 'No'}
                        </td>
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

export default PreviewModal;