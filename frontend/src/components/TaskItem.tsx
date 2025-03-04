import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../types/Task';
import { updateTask } from '../services/axios';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onComplete: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onComplete }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  // Форматирование даты
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleString();
  };

  const handleCompleteTask = async () => {
    try {
      setIsUpdating(true);
      const updatedTask = { 
        ...task, 
        status: true 
      };

      const { id, created_at, ...taskToUpdate } = updatedTask;

      const completedTask = await updateTask(task.id, taskToUpdate);

      onComplete(completedTask);
    } catch (err) {
      console.error('Failed to complete task', err);
    } finally {
      setIsUpdating(false);
    }
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
        <button 
          onClick={() => onDelete(task.id)} 
          className="delete-button"
        >
          Delete
        </button>
        {!task.status && (
          <button 
            onClick={handleCompleteTask} 
            className="complete-button"
            disabled={isUpdating}
          >
            {isUpdating ? 'Completing...' : 'Complete Task'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;