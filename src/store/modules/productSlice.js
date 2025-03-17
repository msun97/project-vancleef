import { createSlice } from '@reduxjs/toolkit';
import { productdata } from '../../assets/api/productdata';

const initialState = {
    productdata: productdata, //원본데이터
    filteredProducts: [],
    filteredCategory: null, // 필터링된 상품 목록을 저장할 상태 추가3
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload;
        },
        setFilteredCategory: (state, action) => {
            state.filteredCategory = {
                id: action.payload.id,
                name: action.payload.name,
            };
        },
    },
});
export const { setFilteredProducts, setFilteredCategory } = productSlice.actions;
//액션생성자
export default productSlice.reducer;
