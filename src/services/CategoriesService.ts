import { httpClient } from '@/libs/config/httpClient';
import { SaveCategoryData, SaveTodoData } from '@/libs/utils/types';
import { Category, Todo } from '@/models';

class CategoriesService {
  private static _instance: CategoriesService;

  constructor() {
    if (CategoriesService._instance) {
      throw new Error('Error: cannot create an instance of CategoriesService because that instance exists already!');
    }
  }

  static get getInstance () {
    if (!CategoriesService._instance) {
      CategoriesService._instance = new CategoriesService();
    }

    return CategoriesService._instance;
  }

  public fetchCategories = async (): Promise<Array<Category>> => {
    const { data } = await httpClient.get('/api/categories');
    return data;
  };

  public fetchCategoryDetails = async (categoryId: number): Promise<Category | null> => {
    const { data } = await httpClient.get(`/api/categories/${categoryId}`);
    return data;
  };

  public createCategory = async (categoryData: SaveCategoryData): Promise<Category | null> => {
    const { data } = await httpClient.post('/api/categories', categoryData);
    return data;
  };

  public editCategory = async (categoryData: Category): Promise<Category | null> => {
    const { data } = await httpClient.put(`/api/categories/${categoryData.id}`, categoryData);
    return data;
  };

  public removeTodo = async (todoId: number): Promise<Todo | null> => {
    const { data } = await httpClient.delete(`/api/todos/${todoId}`);
    return data;
  };

  public createTodo = async (todoData: SaveTodoData): Promise<Todo | null> => {
    const { data } = await httpClient.post('/api/todos', todoData);
    return data;
  };

  public editTodo = async (todoData: Todo): Promise<Todo | null> => {
    const { data } = await httpClient.put(`/api/todos/${todoData.id}`, todoData);
    return data;
  };
}

export const categoriesService = CategoriesService.getInstance;
