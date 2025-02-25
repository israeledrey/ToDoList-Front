import React from 'react';
import { useTasksContext } from "../providers/TasksContext";

export default function TasksTable() {
  const { tasksList } = useTasksContext();

  if (!tasksList || tasksList.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <ul>
      {tasksList.map(task => (
        <li key={task.id}>{task.name}</li>
      ))}
    </ul>
  );
}