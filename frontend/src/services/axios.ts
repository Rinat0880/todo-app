import axios from 'axios';
import { Task, TaskCreate } from '../types/Task';

const API_URL = 'http://localhost:8000';

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const getTask = async (id: number): Promise<Task> => {
  const response = await axios.get(`${API_URL}/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: TaskCreate): Promise<Task> => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

export const updateTask = async (id: number, task: TaskCreate): Promise<Task> => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};