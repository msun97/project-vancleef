import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
  cart: [], // 장바구니 항목을 담을 빈 배열로 초기화
};

export const cartSlice = createSlice({
  name: "cart", // slice의 이름 추가
  initialState,
  reducers: {
    addCart: (state, action) => {
      // 새 항목을 장바구니에 추가
      state.cart.push(action.payload);
    },
    removeCart: (state, action) => {
      // ID를 기준으로 장바구니에서 항목 제거
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      // 장바구니 비우기
      state.cart = [];
    },
  },
});

// 상태를 변경하는 액션을 export
export const { addCart, removeCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
