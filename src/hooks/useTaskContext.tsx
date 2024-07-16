import React, { createContext, useContext, useState, ReactNode } from "react";

interface Task {
	status: boolean;
	name: string;
	description: string;
	document: string;
}

interface TaskContextType {
	tasks: Task[];
	addTask: (task: Task) => void;
	updateTask: (index: number, task: Task) => void;
	deleteTask: (index: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [tasks, setTasks] = useState<Task[]>([]);

	const addTask = (task: Task) => {
		setTasks([...tasks, task]);
	};

	const updateTask = (index: number, task: Task) => {
		const newTasks = [...tasks];
		newTasks[index] = task;
		setTasks(newTasks);
	};

	const deleteTask = (index: number) => {
		const newTasks = tasks.filter((_, i) => i !== index);
		setTasks(newTasks);
	};

	return (
		<TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
			{children}
		</TaskContext.Provider>
	);
};

export const useTaskContext = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error("useTaskContext must be used within a TaskProvider");
	}
	return context;
};
