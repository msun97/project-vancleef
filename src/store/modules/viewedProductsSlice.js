// viewedProductsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

const viewedProductsSlice = createSlice({
    name: 'viewedProducts',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const newProduct = action.payload;
            // 이미 목록에 있는 상품인지 확인
            const isProductAlreadyViewed = state.products.some((product) => product.productid === newProduct.productid);

            if (!isProductAlreadyViewed) {
                // 새 상품을 목록의 맨 앞에 추가
                state.products = [newProduct, ...state.products];
            }
        },
        // 다른 리듀서 로직...
    },
});

export const viewedProductsActions = viewedProductsSlice.actions;
export default viewedProductsSlice.reducer;
