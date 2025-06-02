import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ImportModal = ({
  show,
  onClose,
  handleFileChange,
  handleImportClick,
  handleDownloadDemo,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Import Registration Forms</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="excelFile" className="form-label">
            Upload Excel File
          </label>
          <input
            type="file"
            className="form-control"
            id="excelFile"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
        </div>
        <Button variant="secondary" onClick={handleDownloadDemo}>
          Download Demo Excel Sheet
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleImportClick}>
          Import
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportModal;
