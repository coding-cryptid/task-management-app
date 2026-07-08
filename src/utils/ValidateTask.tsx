import type { TaskFormInput, TaskFormErrors } from '../types/task';

export function validateTask(input: TaskFormInput): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (!input.title.trim()) {
    errors.title = 'Title is required.';
  }

  if (input.dueDate) {
    const due = new Date(input.dueDate);
    if (isNaN(due.getTime())) {
      errors.dueDate = 'Please enter a valid date.';
    }
  }

  return errors;
}