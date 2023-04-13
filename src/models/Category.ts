import { Todo } from './Todo';

export interface Category {
  id: number;
  title: string;
  description?: string;
  user_id: string;
  todos: Array<Todo>;
  progress: number;
  created_at?: string;
}
