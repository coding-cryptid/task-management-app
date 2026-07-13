import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Task, TaskFormInput } from '../types/task';
import type { TaskState } from './TaskReducer';
import { taskReducer, initialTaskState } from './TaskReducer';

interface TaskContextValue extends TaskState {
  addTask: (input: TaskFormInput, ownerId: string) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const addTask = (input: TaskFormInput, ownerId: string) => {
    const newTask: Task = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ownerId,
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (task: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: { id } });
  };

  const value: TaskContextValue = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks(): TaskContextValue {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}