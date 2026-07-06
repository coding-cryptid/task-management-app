export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string; 
  dueDate: string | null;
  ownerId: string; 
}

export type TaskFormInput = Omit<Task, 'id' | 'createdAt' | 'ownerId'>;
export type TaskUpdateInput = Partial<Omit<Task, 'id'>> & { id: string };