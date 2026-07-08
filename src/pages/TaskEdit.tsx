import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import type { TaskFormInput } from '../types/task';

export default function TaskEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTasks();

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return <p>Task not found.</p>;
  }

  const handleSubmit = (input: TaskFormInput) => {
    updateTask({ ...task, ...input });
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div className="container mt-4">
      <h1>Edit Task</h1>
      <TaskForm
        initialValues={{
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
        }}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  );
}