import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/UseTasks';

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, deleteTask } = useTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="container mt-4">
        <p>Task not found.</p>
        <Link to="/" className="btn btn-secondary">Back to Dashboard</Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h1 className="task-title">{task.title}</h1>
      <p className="text-muted task-description">{task.description}</p>

      <ul className="list-unstyled">
        <li><strong>Status:</strong> {task.status}</li>
        <li><strong>Priority:</strong> {task.priority}</li>
        <li><strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}</li>
        <li>
          <strong>Due:</strong>{' '}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
        </li>
      </ul>

      <div className="d-flex gap-2">
        <Link to={`/tasks/${task.id}/edit`} className="btn btn-primary">
          Edit Task
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Task
        </button>
        <Link to="/" className="btn btn-link ps-0">Back to Dashboard</Link>
      </div>
    </div>
  );
}
