import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("currentUser"))?.cart || [], // 로그인한 유저의 장바구니 불러오기
};

// 📌 localStorage 업데이트 함수
const updateLocalStorage = (cart) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    const updatedUser = { ...currentUser, cart };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // users 배열에서도 해당 사용자의 cart 업데이트
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload; // ✅ Redux cart 상태를 업데이트
    },
    addCart: (state, action) => {
      state.cart = [...state.cart, action.payload]; // 불변성 유지
      updateLocalStorage(state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      updateLocalStorage(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      updateLocalStorage([]);
    },
    toggleCartItem: (state, action) => {
      const itemExists = state.cart.some(
        (item) => item.id === action.payload.id
      );
      state.cart = itemExists
        ? state.cart.filter((item) => item.id !== action.payload.id) // 제거
        : [...state.cart, action.payload]; // 추가
      updateLocalStorage(state.cart);
    },
  },
});

export const { addCart, removeFromCart, clearCart, toggleCartItem, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;
