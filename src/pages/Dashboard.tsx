import { Link } from 'react-router-dom';
import { useTasks } from '../context/UseTasks';
import TaskCard from '../components/TaskCard';

export default function Dashboard() {
  const { tasks, deleteTask, loading, error } = useTasks();

  return (
    <div className="dashboard container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Task Dashboard</h1>
        <Link to="/tasks/new" className="btn btn-primary">
          Add New Task
        </Link>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && tasks.length === 0 && (
        <p className="text-muted">You do not have any tasks yet.</p>
      )}

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={deleteTask} />
      ))}
    </div>
  );
}