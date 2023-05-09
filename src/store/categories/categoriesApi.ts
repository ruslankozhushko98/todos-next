import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Category, Todo } from '@/models';

export const categoriesApi = createApi({
  reducerPath: 'api/categories',
  baseQuery: fetchBaseQuery({
    baseUrl: String(process.env.BASE_URL),
  }),
  tagTypes: ['Categories'],
  endpoints: builder => ({
    fetchCategories: builder.query<Array<Category>, void>({
      query: () => '/categories',
      providesTags: (result) =>
        result
          ? result.map(item => ({ type: 'Categories', id: item.id }))
          : [{ type: 'Categories', id: 'LIST' }],
    }),

    fetchCategoryDetails: builder.query<Category | null, number>({
      query: categoryId => `/categories/${categoryId}`,
    }),

    fetchTodoDetails: builder.query<Todo | null, number>({
      query: todoId => `/todos/${todoId}`,
    }),
  }),
});
