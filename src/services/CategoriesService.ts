import { httpClient } from '@/libs/config/httpClient';
import { Category } from '@/models';
import { AxiosResponse } from 'axios';

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

  public fetchCategories = (): Promise<AxiosResponse<Array<Category>>> =>
    httpClient.get('/categories');

  public fetchCategoryDetails = (categoryId: number): Promise<AxiosResponse<Category | null>> =>
    httpClient.get(`/categories/${categoryId}`);
}

export const categoriesService = CategoriesService.getInstance;
