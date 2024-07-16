import React, { useState, ChangeEvent, useEffect } from "react";
import { useTaskContext } from "../../hooks/useTaskContext";

interface UpdateTaskModalProps {
	taskIndex: number | null;
	onClose: () => void;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
	taskIndex,
	onClose,
}) => {
	const { tasks, updateTask } = useTaskContext();
	const task =
		taskIndex !== null
			? tasks[taskIndex]
			: { name: "", description: "", document: "", status: false };
	console.log(task, "task");

	const [name, setName] = useState(task.name);
	const [description, setDescription] = useState(task.description);
	const [document, setDocument] = useState<File | null>(task.document as any);
	console.log(document, "document");
	const [status, setStatus] = useState(task.status);
	const [documentPreview, setDocumentPreview] = useState<string | null>(null);

	useEffect(() => {
		if (taskIndex !== null) {
			setName(tasks[taskIndex].name);
			setDescription(tasks[taskIndex].description);
			setDocument(null);
			setStatus(tasks[taskIndex].status);
			setDocumentPreview(null);
		}
	}, [taskIndex, tasks]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setDocument(file);
			if (file.type.startsWith("image/")) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = () => {
					setDocumentPreview(reader.result as string);
				};
			} else {
				setDocumentPreview(null);
			}
		}
	};

	const handleRemoveDocument = () => {
		setDocument(null);
		setDocumentPreview(null);
	};

	const handleSubmit = () => {
		if (taskIndex !== null) {
			const updatedTask = {
				name,
				description,
				document: document ? document.name : task.document,
				status,
			};
			updateTask(taskIndex, updatedTask);
			onClose();
		}
	};

	return (
		<div
			className="modal fade"
			id="updateModal"
			aria-labelledby="updateModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="updateModalLabel">
							Оновити задачу
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={onClose}
						></button>
					</div>
					<div className="modal-body">
						<div className="container-md">
							<form>
								<div className="mb-3">
									<label htmlFor="taskName" className="form-label">
										Назва задачі
									</label>
									<input
										type="text"
										className="form-control"
										id="taskName"
										value={name}
										onChange={(e) => setName(e.target.value)}
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
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
									<div id="taskDescriptionHelp" className="form-text">
										Поле є обов'язковим до заповнення
									</div>
								</div>
								<div className="mb-3">
									<label htmlFor="taskDocument" className="form-label">
										Документ
									</label>
									{document && (
										<div className="mb-2">
											{documentPreview && document.type.startsWith("image/") ? (
												<img
													src={documentPreview}
													alt="Document Preview"
													className="img-fluid mb-2"
													style={{ maxHeight: "200px" }}
												/>
											) : (
												<p>
													<strong>Selected Document:</strong> {document.name}
												</p>
											)}
											<button
												type="button"
												className="btn btn-outline-danger btn-sm"
												onClick={handleRemoveDocument}
											>
												Remove Document
											</button>
										</div>
									)}
									{!document && (
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
										checked={status}
										onChange={(e) => setStatus(e.target.checked)}
									/>
									<label className="form-check-label" htmlFor="taskStatus">
										Виконано
									</label>
								</div>
							</form>
						</div>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal"
							onClick={onClose}
						>
							Close
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => {
								handleSubmit();
							}}
						>
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateTaskModal;
