import { configureStore } from '@reduxjs/toolkit';
import authR from './modules/authSlice';

export const store = configureStore({
  reducer: {
    authR,
  },
});