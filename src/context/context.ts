import { createContext } from 'react';
import type { Task, TaskFormInput } from '../types/task';
import type { TaskState } from './TaskReducer';

export interface TaskContextValue extends TaskState {
  addTask: (input: TaskFormInput, ownerId: string) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextValue | undefined>(undefined);