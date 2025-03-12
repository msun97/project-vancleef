import { configureStore } from '@reduxjs/toolkit';
import authR from './modules/authSlice';
import paginationR from './modules/paginationSlice';
import productInquiryR from './modules/productInquirySlice';
import cartR from './modules/cartSlice';
import modalR from './modules/modalSlice';
import reviewR from './modules/reviewSlice';
import productR from './modules/productSlice';

export const store = configureStore({
    reducer: {
        authR,
        paginationR,
        productInquiryR,
        reviewR,
        cartR,
        modalR,
        productR,
    },
});
