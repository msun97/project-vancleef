import { createSlice } from '@reduxjs/toolkit';
import { productdata } from '../../assets/api/productdata';

const initialState = {
    productdata: productdata, //원본데이터
    filteredProducts: [],
    filteredCategory: { id: '', name: '' }, // 필터링된 상품 목록을 저장할 상태 추가
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload;
        },
        resetFilteredProducts: (state) => {
            state.filteredProducts = [];
        },
        setFilteredCategory: (state, action) => {
            state.filteredCategory = action.payload;
        },
    },
});
export const { setFilteredProducts, resetFilteredProducts, setFilteredCategory } = productSlice.actions;

export default productSlice.reducer;
