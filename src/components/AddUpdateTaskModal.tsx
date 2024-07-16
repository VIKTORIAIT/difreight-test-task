import React, { useState, ChangeEvent, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Task } from "../types/task.interface";
import { getFileUrl } from "../helpers/getFileUrl";

interface AddUpdateTaskModalProps {
	title: string;
	onClose: () => void;
	onSubmit: (task: Task) => void;
	task?: Task;
}

type FormData = Omit<Task, "id"> & {
	id: Task["id"] | null;
};
const initialFormData: FormData = {
	id: null,
	name: "",
	description: "",
	document: null,
	status: false,
};

const AddUpdateTaskModal: React.FC<AddUpdateTaskModalProps> = ({
	title,
	task,
	onClose,
	onSubmit,
}) => {
	const [formData, setFormData] = useState<FormData>(initialFormData);

	const setPartialFromData = (data: Partial<FormData>) => {
		setFormData((prev) => ({ ...prev, ...data }));
	};

	useEffect(() => {
		if (!task) return;
		setFormData(task);
	}, [task]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) return;

		const file = e.target.files[0];
		setPartialFromData({ document: file });
	};

	const handleRemoveDocument = () => {
		setPartialFromData({ document: null });
	};

	const handleSubmit = () => {
		const { id, name, description, ...restFormData } = formData;
		if (!name || !description) {
			return alert(`Назва та опис завдання є обов'язковими полями для заповнення`);
		}
		const taskId = id || new Date().getTime();

		onSubmit({ ...restFormData, id: taskId, name, description });
		setFormData(initialFormData);
		onClose();
	};

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
				<Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<div className="mb-3">
						<label htmlFor="taskName" className="form-label">
							Назва задачі
						</label>
						<input
							type="text"
							className="form-control"
							id="taskName"
							value={formData.name}
							onChange={(e) => setPartialFromData({ name: e.target.value })}
						/>
						<div id="taskNameHelp" className="form-text">
							Поле є обов'язковим до заповнення
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="taskDescription" className="form-label">
							Опис задачі
						</label>
						<input
							type="text"
							className="form-control"
							id="taskDescription"
							value={formData.description}
							onChange={(e) => setPartialFromData({ description: e.target.value })}
						/>
						<div id="taskDescriptionHelp" className="form-text">
							Поле є обов'язковим до заповнення
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="taskDocument" className="form-label">
							Документ
						</label>
						{formData.document && (
							<div className="mb-2">
								<img
									src={getFileUrl(formData.document)}
									alt="Document Preview"
									className="img-fluid mb-2"
									style={{ maxHeight: "200px" }}
								/>
								<button
									type="button"
									className="btn btn-outline-danger btn-sm"
									onClick={handleRemoveDocument}
								>
									Remove Document
								</button>
							</div>
						)}
						{!formData.document && (
							<input
								type="file"
								className="form-control"
								id="taskDocument"
								onChange={handleFileChange}
							/>
						)}
					</div>
					<div className="mb-3 form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="taskStatus"
							checked={formData.status}
							onChange={(e) => setPartialFromData({ status: e.target.checked })}
						/>
						<label className="form-check-label" htmlFor="taskStatus">
							Виконано
						</label>
					</div>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className="btn btn-secondary" onClick={onClose}>
					Закрити
				</Button>
				<Button className="btn btn-primary" onClick={handleSubmit}>
					Зберегти зміни
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddUpdateTaskModal;
