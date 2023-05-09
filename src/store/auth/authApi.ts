import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@supabase/supabase-js';

export const authApi = createApi({
  reducerPath: 'api/auth',
  baseQuery: fetchBaseQuery({
    baseUrl: String(process.env.BASE_URL),
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    fetchMe: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: (result) =>
        result
          ? [{ type: 'User' as never, id: result.id }]
          : [{ type: 'User' as never, id: 'USER' }],
    }),
  }),
});

export const { useFetchMeQuery } = authApi;
