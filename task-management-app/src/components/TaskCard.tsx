import { Link } from 'react-router-dom';
import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

function statusColor(status: Task['status']): string {
  switch (status) {
    case 'todo': return 'secondary';
    case 'in-progress': return 'warning';
    case 'completed': return 'success';
  }
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-1">{task.title}</h5>
          <span className={`badge bg-${statusColor(task.status)} me-2`}>
            {task.status}
          </span>
          <span className="badge bg-light text-dark">{task.priority} priority</span>
          {task.dueDate && (
            <p className="text-muted mb-0 mt-1">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="d-flex gap-2">
          <Link to={`/tasks/${task.id}`} className="btn btn-outline-primary btn-sm">
            View
          </Link>
          <Link to={`/tasks/${task.id}/edit`} className="btn btn-outline-secondary btn-sm">
            Edit
          </Link>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}