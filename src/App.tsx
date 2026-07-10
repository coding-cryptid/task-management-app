import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';
import TaskCreate from './pages/TaskCreate';
import TaskDetails from './pages/TaskDetails';
import TaskEdit from './pages/TaskEdit';
import '/styles.css';
import AuthButton from './components/AuthButton';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <nav className="d-flex justify-content-end p-3 border-bottom">
          <AuthButton />
        </nav>
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