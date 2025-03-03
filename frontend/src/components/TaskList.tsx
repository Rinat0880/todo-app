import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/axios';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';
import { Link } from 'react-router-dom';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <Link to="/add" className="add-button">Add New Task</Link>
      {tasks.length === 0 ? (
        <p>No tasks found. Add your first task!</p>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onDelete={() => handleDelete(task.id)} 
          />
        ))
      )}
    </div>
  );
};

export default TaskList;