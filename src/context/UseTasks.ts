import { useContext } from 'react';
import { TaskContext } from './context';
import type { TaskContextValue } from './context';

export function useTasks(): TaskContextValue {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}