import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Category, Todo } from '@/models';
import { SaveCategoryData } from '@/libs/utils/types';

export const categoriesApi = createApi({
  reducerPath: 'api/categories',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
  }),
  tagTypes: ['Category'],
  endpoints: builder => ({
    fetchCategories: builder.query<Array<Category>, void>({
      query: () => '/categories',
      providesTags: ['Category'],
    }),

    fetchCategoryDetails: builder.query<Category | null, number>({
      query: categoryId => `/categories/${categoryId}`,
    }),

    createCategory: builder.mutation<Category | null, SaveCategoryData>({
      query: (data) => ({
        method: 'POST',
        url: '/categories',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),

    fetchTodoDetails: builder.query<Todo | null, number>({
      query: todoId => `/todos/${todoId}`,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
} = categoriesApi;
