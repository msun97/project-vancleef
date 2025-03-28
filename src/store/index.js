import { configureStore } from '@reduxjs/toolkit';
import authR from './modules/authSlice';
import paginationR from './modules/paginationSlice';
import productInquiryR from './modules/productInquirySlice';
import cartR from './modules/cartSlice';
import modalR from './modules/modalSlice';
import reviewR from './modules/reviewSlice';
import reservationR from './modules/reservationSlice';
import productR from './modules/productSlice';
import inquiryR from './modules/ccinquirySlice';
import favoritesR from './modules/favoritesSlice';
import searchR from './modules/searchSlice';
import viewedProductsR from './modules/viewedProductsSlice';
import purchaseR from './modules/purchaseSlice';

export const store = configureStore({
  reducer: {
    authR,
    paginationR,
    productInquiryR,
    reviewR,
    cartR,
    modalR,
    reservationR,
    productR,
    inquiryR,
    favoritesR,
    searchR,
    viewedProductsR,
    purchaseR,
  },
});
