import { useState } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { Task } from "../types/task.interface";
import TaskTableRow from "../components/TaskTableRow";
import AddUpdateTaskModal from "../components/AddUpdateTaskModal";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const TaskList = () => {
	const { tasks, deleteTask, updateTask, addTask } = useTaskContext();
	const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
	const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);
	const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

	const handleStatusChange = (task: Task) => {
		updateTask({ ...task, status: !task.status });
	};

	const handleConfirmDelete = () => {
		if (!taskToDelete) return;
		deleteTask(taskToDelete.id);
		setTaskToDelete(null);
	};

	return (
		<div className="container-md" style={{ padding: 30 }}>
			<h1 style={{ marginBottom: 50, marginTop: 10 }}>Менеджер задач</h1>
			<Button
				variant="primary"
				size="lg"
				style={{ width: "100%", marginBottom: 40 }}
				onClick={() => setIsCreateTaskModalOpen(true)}
			>
				Додати задачу
			</Button>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th scope="col">Статус виконання</th>
						<th scope="col">Назва задачі</th>
						<th scope="col">Опис задачі</th>
						<th scope="col">Документ</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{!tasks.length ? (
						<tr>
							<td colSpan={5}>
								<span>Список завдань наразі пустий</span>
							</td>
						</tr>
					) : (
						tasks.map((task) => (
							<TaskTableRow
								key={task.id}
								task={task}
								handleStatusChange={handleStatusChange}
								setTaskToDelete={setTaskToDelete}
								setTaskToUpdate={setTaskToUpdate}
							/>
						))
					)}
				</tbody>
			</Table>

			{taskToUpdate && (
				<AddUpdateTaskModal
					title="Оновити задачу"
					task={taskToUpdate}
					onClose={() => setTaskToUpdate(null)}
					onSubmit={updateTask}
				/>
			)}

			{taskToDelete && (
				<ConfirmDeleteModal
					onDelete={handleConfirmDelete}
					onClose={() => setTaskToDelete(null)}
				/>
			)}
			{isCreateTaskModalOpen && (
				<AddUpdateTaskModal
					title="Створити нову задачу"
					onClose={() => setIsCreateTaskModalOpen(false)}
					onSubmit={addTask}
				/>
			)}
		</div>
	);
};

export default TaskList;
