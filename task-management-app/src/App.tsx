import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm />} />
        <Route path="/tasks/:id/edit" element={<TaskForm />} />
        <Route path="/tasks/:id" element={<TaskForm />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;