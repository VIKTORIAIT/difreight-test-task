import { FC } from "react";
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
      <input type="checkbox" checked={task.status} onChange={() => handleStatusChange(task)} />
    </th>
    <td>{task.name}</td>
    <td>{task.description}</td>
    <td>{task?.document?.name || "-"}</td>
    <td>
      <button
        type="button"
        className="btn btn-warning"
        style={{ marginRight: 10 }}
        onClick={() => setTaskToUpdate(task)}
      >
        Edit
      </button>
      <button type="button" className="btn btn-danger" onClick={() => setTaskToDelete(task)}>
        X
      </button>
    </td>
  </tr>
);

export default TaskTableRow;
