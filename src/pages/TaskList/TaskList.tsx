import React, { useState } from "react";
import CreateNewTaskModal from "./CreateNewTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import { useTaskContext } from "../../hooks/useTaskContext";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface TaskListProps {
	status: boolean;
	name: string;
	description: string;
	document?: string;
}

const TaskList = () => {
	const { tasks, deleteTask, updateTask, addTask } = useTaskContext();
	const [taskIndexToUpdate, setTaskIndexToUpdate] = useState<number | null>(null);
	const [taskIndexToDelete, setTaskIndexToDelete] = useState<number | null>(null);

	const handleStatusChange = (index: number) => {
		const task = tasks[index];
		updateTask(index, { ...task, status: !task.status });
	};

	const handleConfirmDelete = () => {
		if (taskIndexToDelete !== null) {
			deleteTask(taskIndexToDelete);
			setTaskIndexToDelete(null);
		}
	};

	return (
		<div className="container-md" style={{ padding: 30 }}>
			<h1 style={{ marginBottom: 50, marginTop: 10 }}>Менеджер задач</h1>
			<button
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
				style={{ width: "100%", marginBottom: 40 }}
			>
				Додати задачу
			</button>
			<CreateNewTaskModal />

			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Статус виконання</th>
						<th scope="col">Назва задачі</th>
						<th scope="col">Опис задачі</th>
						<th scope="col">Документ</th>
						<th scope="col"></th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{!tasks.length ? (
						<tr>
							<td>
								<span>Список завдань наразі пустий</span>
							</td>
						</tr>
					) : (
						tasks.map((task: TaskListProps, index) => (
							<tr key={`${task.name + index}`}>
								<th scope="col">
									<input
										type="checkbox"
										checked={task.status}
										onChange={() => handleStatusChange(index)}
									/>
								</th>
								<td>{task.name}</td>
								<td>{task.description}</td>
								<td>{task?.document || "-"}</td>
								<td>
									<button
										type="button"
										className="btn btn-warning"
										data-bs-toggle="modal"
										data-bs-target="#updateModal"
										style={{ marginRight: 10 }}
										onClick={() => setTaskIndexToUpdate(index)}
									>
										Edit
									</button>
									<button
										type="button"
										className="btn btn-danger"
										data-bs-toggle="modal"
										data-bs-target="#confirmDeleteModal"
										onClick={() => setTaskIndexToDelete(index)}
									>
										X
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			<UpdateTaskModal
				taskIndex={taskIndexToUpdate}
				onClose={() => setTaskIndexToUpdate(null)}
			/>
			<ConfirmDeleteModal
				onConfirm={handleConfirmDelete}
				onClose={() => setTaskIndexToDelete(null)}
			/>
		</div>
	);
};

export default TaskList;
