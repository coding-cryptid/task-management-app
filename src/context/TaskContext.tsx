import { useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Task, TaskFormInput } from '../types/task';
import { taskReducer, initialTaskState } from './TaskReducer';
import { TaskContext } from './context';
import type { TaskContextValue } from './context';

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