import { PostgrestSingleResponse } from '@supabase/supabase-js';

import { supabase } from '@/libs/config/supabase';
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

  public fetchCategories = async (): Promise<PostgrestSingleResponse<Array<Category>>> =>{
    const response = await supabase.from('categories')
      .select()
      .order('created_at', {
        ascending: true,
      });

    return response;
  };

  public fetchCategoryDetails = async (categoryId: number): Promise<PostgrestSingleResponse<Category>> => {
    const response = await supabase.from('categories')
      .select('*, todos(*)')
      .eq('id', categoryId)
      .single();

    return response;
  };
}

export const categoriesService = CategoriesService.getInstance;
