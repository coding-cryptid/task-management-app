import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';
import TaskCreate from './pages/TaskCreate';
import TaskDetails from './pages/TaskDetails';
import TaskEdit from './pages/TaskEdit';
import '/styles.css';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks/new" element={<TaskCreate />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/tasks/:id/edit" element={<TaskEdit />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;