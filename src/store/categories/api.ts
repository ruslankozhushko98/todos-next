import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Category, Todo } from '@/models';

export const categoriesApi = createApi({
  reducerPath: 'api/categories',
  baseQuery: fetchBaseQuery({
    baseUrl: String(process.env.BASE_URL),
  }),
  endpoints: builder => ({
    fetchCategories: builder.query<Array<Category>, undefined>({
      query: () => '/categories'
    }),

    fetchCategoryDetails: builder.query<Category | null, number>({
      query: categoryId => `/categories/${categoryId}`,
    }),

    fetchTodoDetails: builder.query<Todo | null, number>({
      query: todoId => `/todos/${todoId}`,
    }),
  }),
});
