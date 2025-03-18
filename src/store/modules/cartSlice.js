import { createSlice } from '@reduxjs/toolkit';

// localStorage에 저장된 currentUser의 cart 데이터가 있다면 불러오고, 없으면 빈 배열 사용
const persistedCart = JSON.parse(localStorage.getItem('currentUser'))?.cart || [];

const initialState = {
  cart: persistedCart,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter(item => item.productnumber !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
    toggleCartItem: (state, action) => {
      state.cart = state.cart.map(item =>
        item.productnumber === action.payload.productnumber
          ? { ...item, isagree: action.payload.isagree }
          : item
      );
    },
  },
});

export const { addCart, removeCart, clearCart, updateCart, toggleCartItem } = cartSlice.actions;
export default cartSlice.reducer;
