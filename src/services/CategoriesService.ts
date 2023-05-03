import { httpClient } from '@/libs/config/httpClient';
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

  public fetchCategories = async () => {
    try {
      const { data } = await httpClient.get('/categories');
      return data;
    } catch (error) {
      throw new Error(`Error: Unable to fetch categories: ${error}`);
    }
  };

  public fetchCategoryDetails = async (categoryId: number): Promise<Category | null> => {
    try {
      const { data } = await httpClient.get(`/categories/${categoryId}`);
      return data;
    } catch (error) {
      throw new Error(`Error: Unable to fetch category details: ${error}`);
    }
  };
}

export const categoriesService = CategoriesService.getInstance;
