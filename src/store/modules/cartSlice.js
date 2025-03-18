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
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
    toggleCartItem: (state, action) => {
      // action.payload에 { id, isagree } 또는 { productid, isagree }로 전달할 수 있음
      // 여기서는 id로 비교하는 예시로 작성 (필요에 따라 수정 가능)
			//체크박스용(test)
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, isagree: action.payload.isagree } : item
      );
    },
  },
});

// 상태를 변경하는 액션을 export
export const { addCart, removeCart, clearCart, toggleCartItem } = cartSlice.actions;

export default cartSlice.reducer;
