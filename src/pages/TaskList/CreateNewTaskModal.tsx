import React, { useState, ChangeEvent, FormEvent } from "react";
import { useTaskContext } from "../../hooks/useTaskContext";

const CreateNewTaskModal: React.FC = () => {
	const { addTask } = useTaskContext();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [document, setDocument] = useState<File | null>(null);
	const [status, setStatus] = useState(false);
	const [documentPreview, setDocumentPreview] = useState<string | null>(null);

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

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!name || !description) {
			alert("Please fill in all required fields.");
			return;
		}
		addTask({
			name,
			description,
			document: document ? document.name : "",
			status: false,
		});
		setName("");
		setDescription("");
		setDocument(null);
		setDocumentPreview(null);
	};

	return (
		<div
			className="modal fade"
			id="exampleModal"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">
							Створити нову задачу
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
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
										required
									/>
								)}
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
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
							Close
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={handleSubmit}
							data-bs-dismiss="modal"
						>
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateNewTaskModal;
