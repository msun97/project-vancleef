import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [], // 찜 목록
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        // 찜 목록에 상품 추가
        addFavorite: (state, action) => {
            state.favorites.push(action.payload);
        },
        // 찜 목록에서 상품 삭제
        removeFavorite: (state, action) => {
            const productnumber = action.payload.productnumber;
            state.favorites = state.favorites.filter((item) => item.productnumber !== productnumber);
            //filter() 메서드는 배열에서 특정 조건을 만족하는 요소들만을 새로운 배열로 반환하는 함수
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
