import { httpClient } from '@/libs/config/httpClient';
import { SaveCategoryData } from '@/libs/utils/types';
import { Category } from '@/models';

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
}

export const categoriesService = CategoriesService.getInstance;
