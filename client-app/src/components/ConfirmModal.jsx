import Modal from "./Modal";

function ConfirmModal({ show, title, message, confirmText = "Confirm", variant = "primary", onConfirm, onClose }) {
  return (
    <Modal
      show={show}
      title={title}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-outline-secondary btn-pill px-4" onClick={onClose}>
            Go Back
          </button>
          <button className={`btn btn-${variant} btn-pill px-4`} onClick={onConfirm}>
            {confirmText}
          </button>
        </>
      }
    >
      <div className="d-flex align-items-start gap-3 py-2">
        <i className="ti ti-alert-triangle text-orange fs-2"></i>
        <p className="mb-0 text-secondary">{message}</p>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
