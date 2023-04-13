export interface Todo {
  id: number;
  title: string;
  description?: string;
  isDone: boolean;
  category_id: number;
  created_at?: string;
}
