import { configureStore } from '@reduxjs/toolkit';
import authR from './modules/authSlice';
import paginationR from './modules/paginationSlice';
import modalR from './modules/modalSlice';

export const store = configureStore({
  reducer: {
    authR,
		modalR,
		paginationR,
  },
});
