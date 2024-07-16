import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
interface ConfirmDeleteModalProps {
	onClose: () => void;
	onDelete: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
	onClose,
	onDelete,
}) => {
	return (
		<Modal
			show={true}
			onHide={onClose}
			backdrop="static"
			keyboard={false}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Підтвердіть видалення
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Ви впевнені, що хочете видалити цю задачу?</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					Відмінити
				</Button>
				<Button variant="danger" onClick={onDelete}>
					Підтверджую видалення
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmDeleteModal;
