import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';
import TaskCreate from './pages/TaskCreate';
import TaskDetails from './pages/TaskDetails';
import TaskEdit from './pages/TaskEdit';
import AuthButton from './components/AuthButton';
import ProtectedRoute from './components/ProtectedRoute';
import '/styles.css';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <nav className="d-flex justify-content-end p-3 border-bottom">
          <AuthButton />
        </nav>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tasks/new" element={<ProtectedRoute><TaskCreate /></ProtectedRoute>} />
          <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
          <Route path="/tasks/:id/edit" element={<ProtectedRoute><TaskEdit /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;