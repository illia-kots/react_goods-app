import { configureStore } from '@reduxjs/toolkit';

import productsSlice from '../features/productsSlice';
import authSlice from '../features/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
