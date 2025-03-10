import { configureStore } from '@reduxjs/toolkit';
import authR from './modules/authSlice';
import paginationR from './modules/paginationSlice';

export const store = configureStore({
    reducer: {
        authR,
        paginationR,
    },
});
