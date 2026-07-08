import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import type { TaskFormInput } from '../types/task';

export default function TaskCreate() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = (input: TaskFormInput) => {
    // PLACEHOLDER. REMEMBER TO REMOVE AFTER AUTH0 INTEGRATION!
    addTask(input, 'temp-user');
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h1>Create Task</h1>
      <TaskForm onSubmit={handleSubmit} submitLabel="Create Task" />
    </div>
  );
}