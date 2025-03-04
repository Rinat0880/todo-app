import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import EditTaskForm from './components/EditTaskForm';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <main className="container">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<TaskForm />} />
            <Route path="/edit/:id" element={<EditTaskForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;