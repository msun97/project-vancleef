import { configureStore } from '@reduxjs/toolkit';
import authR from './modules/authSlice';
import paginationR from './modules/paginationSlice';
import modalR from './modules/modalSlice';
import productInquiryR from './modules/productInquirySlice';

export const store = configureStore({
  reducer: {
    authR,
		modalR,
		paginationR,
		productInquiryR,
  },
});
