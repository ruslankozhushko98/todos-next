import { configureStore } from '@reduxjs/toolkit';

import { categoriesApi } from './categories/api';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(categoriesApi.middleware),
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
