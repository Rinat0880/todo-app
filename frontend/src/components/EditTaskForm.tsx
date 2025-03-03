import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Task, TaskCreate } from '../types/Task';
import { getTask, updateTask } from '../services/axios';

const EditTaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskCreate>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!id) return;
        const taskId = parseInt(id);
        const task = await getTask(taskId);

        let formattedTask = { ...task };
        if (task.due_date) {
          const dueDate = new Date(task.due_date);
          formattedTask.due_date = dueDate.toISOString().slice(0, 16);
        }
        
        reset(formattedTask);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch task');
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, reset]);

  const onSubmit = async (data: TaskCreate) => {
    try {
      if (!id) return;
      await updateTask(parseInt(id), data);
      navigate('/');
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-form">
      <h2>Edit Task</h2>
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

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              {...register('status')}
            />
            Completed
          </label>
        </div>

        <button type="submit" className="submit-button">Update Task</button>
        <button type="button" className="cancel-button" onClick={() => navigate('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTaskForm;