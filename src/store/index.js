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
    },
});

// 초기 로컬스토리지에 저장된 cart 데이터를 스토어 초기 상태로 반영하는 작업을 할 수 있음 (선택사항)
// 예를 들어, store.subscribe()를 이용하여 변경 시 로컬스토리지 저장
/* store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cartR.cart));
}); */