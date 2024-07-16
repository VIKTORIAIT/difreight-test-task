import { FC } from "react";
import Button from "react-bootstrap/Button";

import { Task } from "../types/task.interface";

interface TaskTableRowProps {
	task: Task;
	handleStatusChange: (task: Task) => void;
	setTaskToUpdate: (task: Task) => void;
	setTaskToDelete: (task: Task) => void;
}

const TaskTableRow: FC<TaskTableRowProps> = ({
	task,
	handleStatusChange,
	setTaskToUpdate,
	setTaskToDelete,
}) => (
	<tr>
		<th scope="col">
			<input
				type="checkbox"
				checked={task.status}
				onChange={() => handleStatusChange(task)}
			/>
		</th>
		<td>{task.name}</td>
		<td>{task.description}</td>
		<td>{task?.document?.name || "-"}</td>
		<td>
			<Button
				variant="warning"
				size="sm"
				style={{ marginRight: 10 }}
				onClick={() => setTaskToUpdate(task)}
			>
				Edit
			</Button>
			<Button
				variant="danger"
				size="sm"
				style={{ width: 32 }}
				onClick={() => setTaskToDelete(task)}
			>
				X
			</Button>
		</td>
	</tr>
);

export default TaskTableRow;
