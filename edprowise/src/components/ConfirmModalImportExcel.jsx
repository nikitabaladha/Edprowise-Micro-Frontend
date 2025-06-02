import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmModal = ({ show, onCancel, onConfirm, onViewExcelSheet }) => {
  return (
    <Modal
      show={show}
      onHide={onCancel}
      centered
      dialogClassName="modal-dialog-centered"
      backdrop="static"
    >
      <div className="bg-light p-4 rounded shadow confirmation-dialog">
        <div className="d-flex justify-content-center mb-3">
          <div
            className="bg-warning rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '60px', height: '60px' }}
          >
            <span className="text-white fs-1 fw-bold">!</span>
          </div>
        </div>
        <h2 className="text-center mb-3">Are you sure?</h2>
        <p className="text-center mb-2">
          Add as per your choice. Do you want to proceed with importing the data?
        </p>
        <p className="text-center text-danger mb-4">
          * Please validate the data by viewing the Excel sheet before proceeding.
        </p>
        <div className="d-flex justify-content-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onConfirm}
          >
            Yes, proceed!
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onCancel}
          >
            No, cancel!
          </Button>
          <Button
            variant="info"
            size="sm"
            onClick={onViewExcelSheet}
          >
            View Excel Sheet
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
