import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TaskCreate } from '../types/Task';
import { createTask } from '../services/axios';

const TaskForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TaskCreate>();
  const navigate = useNavigate();

  const onSubmit = async (data: TaskCreate) => {
    try {
      await createTask(data);
      navigate('/');  // Перенаправляем на список задач после создания
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <span className="error">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (optional):</label>
          <textarea
            id="description"
            {...register('description')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="due_date">Due Date (optional):</label>
          <input
            id="due_date"
            type="datetime-local"
            {...register('due_date')}
          />
        </div>
        
        <button type="submit" className="submit-button">Add Task</button>
        <button type="button" className="cancel-button" onClick={() => navigate('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskForm;