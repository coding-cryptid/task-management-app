import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import type { TaskFormInput } from '../types/task';
import { useAppUser } from '../hooks/UseAppUser';

export default function TaskCreate() {
  const { addTask } = useTasks();
  const { appUser } = useAppUser();
  const navigate = useNavigate();

  const handleSubmit = (input: TaskFormInput) => {
    if (!appUser) return;
    addTask(input, appUser.sub);
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h1>Create Task</h1>
      <TaskForm onSubmit={handleSubmit} submitLabel="Create Task" />
    </div>
  );
}