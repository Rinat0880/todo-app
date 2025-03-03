import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  // Форматирование даты
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={`task-item ${task.status ? 'completed' : ''}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <p>Due: {formatDate(task.due_date)}</p>
        <p>Status: {task.status ? 'Completed' : 'Not completed'}</p>
      </div>
      <div className="task-actions">
        <Link to={`/edit/${task.id}`} className="edit-button">
          Edit
        </Link>
        <button onClick={() => onDelete(task.id)} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;