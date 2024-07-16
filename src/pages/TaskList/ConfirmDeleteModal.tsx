import React from "react";

interface ConfirmDeleteModalProps {
	onClose: () => void;
	onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
	onClose,
	onConfirm,
}) => {
	return (
		<div
			className="modal fade"
			id="confirmDeleteModal"
			aria-labelledby="confirmDeleteModalLabel"
			aria-hidden="true"
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
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={onClose}
						></button>
					</div>
					<div className="modal-body">Ви впевнені, що хочете видалити цю задачу?</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal"
							onClick={onClose}
						>
							Close
						</button>
						<button type="button" className="btn btn-danger" onClick={onConfirm}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDeleteModal;
