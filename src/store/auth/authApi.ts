import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@supabase/supabase-js';

export const authApi = createApi({
  reducerPath: 'api/auth',
  baseQuery: fetchBaseQuery({
    baseUrl: String(process.env.BASE_URL),
  }),
  endpoints: builder => ({
    fetchMe: builder.query<User, undefined>({
      query: () => '/auth/me',
    }),
  }),
});

export const { useFetchMeQuery } = authApi;
