import { createSlice } from '@reduxjs/toolkit';

const MAX_VIEWED_PRODUCTS = 10; // 최대 저장 개수 설정

const initialState = {
  productIds: [],
};

export const viewedProductsSlice = createSlice({
  name: 'viewedProducts',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productId = action.payload;

      if (!state.productIds.includes(productId)) {
        state.productIds = [productId, ...state.productIds.filter((id) => id !== productId)].slice(0, MAX_VIEWED_PRODUCTS);
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.productIds = state.productIds.filter((id) => id !== productId);
    },
    clearProducts: (state) => {
      state.productIds = [];
    },
  },
});

export const { addProduct, removeProduct, clearProducts } = viewedProductsSlice.actions;
export default viewedProductsSlice.reducer;