import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import TaskCreate from './pages/TaskCreate';
import TaskEdit from './pages/TaskEdit';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks/new" element={<TaskCreate />} />
        <Route path="/tasks/:id/edit" element={<TaskEdit />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </TaskProvider>
  );
};

export default App;