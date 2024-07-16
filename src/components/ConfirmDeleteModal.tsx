import React from "react";

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ onClose, onDelete }) => {
  return (
    <div
      className="modal fade"
      aria-labelledby="confirmDeleteModalLabel"
      aria-hidden="true"
      style={{ display: "block", opacity: 1 }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="confirmDeleteModalLabel">
              Підтвердіть видалення
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">Ви впевнені, що хочете видалити цю задачу?</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
