import { configureStore } from '@reduxjs/toolkit';
import authR from './modules/authSlice';
import modalR from './modules/modalSlice';

export const store = configureStore({
  reducer: {
    authR,
		modalR,
  },
});