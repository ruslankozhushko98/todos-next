import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { categoriesApi } from './categories/categoriesApi';
import { authApi } from './auth/authApi';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      authApi.middleware,
    ),

  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
