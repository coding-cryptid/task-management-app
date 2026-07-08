import { useState } from 'react';
import type { SubmitEventHandler } from 'react';
import type { TaskFormInput, TaskFormErrors } from '../types/task';
import { validateTask } from '../utils/ValidateTask';

interface TaskFormProps {
  initialValues?: TaskFormInput;
  onSubmit: (input: TaskFormInput) => void;
  submitLabel: string;
}

const defaultValues: TaskFormInput = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: null,
};

export default function TaskForm({ initialValues, onSubmit, submitLabel }: TaskFormProps) {
  const [values, setValues] = useState<TaskFormInput>(initialValues ?? defaultValues);
  const [errors, setErrors] = useState<TaskFormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value === '' ? null : value }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const validationErrors = validateTask(values);
    setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    onSubmit(values);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          value={values.title}
          onChange={handleChange}
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={values.description}
          onChange={handleChange}
        />
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={values.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="col">
          <label className="form-label">Priority</label>
          <select
            name="priority"
            className="form-select"
            value={values.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          name="dueDate"
          className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
          value={values.dueDate ?? ''}
          onChange={handleChange}
        />
        {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        {submitLabel}
      </button>
    </form>
  );
}