import { createSlice } from '@reduxjs/toolkit';

// localStorage에 저장된 currentUser의 cart 데이터가 있다면 불러오고, 없으면 빈 배열 사용
const persistedCart =
  JSON.parse(localStorage.getItem('currentUser'))?.cart || [];

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
      const updatedCart = action.payload
        .map(number => state.cart.filter(item => item.productnumber !== number))
        .flat();

      state.cart = updatedCart; // 불변성 유지

      // 로컬스토리지 업데이트
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user) {
        const currentUser = {
          ...user,
          cart: updatedCart,
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    },
    clearCart: state => {
      state.cart = [];
      const user = JSON.parse(localStorage.getItem('currentUser'));
      const currentUser = {
        ...user,
        cart: [],
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
    toggleCartItem: (state, action) => {
      state.cart = state.cart.map(item =>
        item.productnumber === action.payload.productnumber
          ? { ...item, isagree: action.payload.isagree }
          : item,
      );
    },
  },
});

export const { addCart, removeCart, clearCart, updateCart, toggleCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
