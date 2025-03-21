import { createSlice } from '@reduxjs/toolkit';

// localStorage에서 좋아요 목록 가져오기
const loadFavoritesFromStorage = () => {
    try {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error('Failed to load favorites from localStorage:', error);
        return [];
    }
};

const initialState = {
    favorites: loadFavoritesFromStorage(), // localStorage에서 불러온 찜 목록
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        // 찜 목록에 상품 추가
        addFavorite: (state, action) => {
            // 중복 방지 확인
            const exists = state.favorites.some((item) => item.productnumber === action.payload.productnumber);

            if (!exists) {
                state.favorites.push(action.payload);
                // localStorage에 저장
                localStorage.setItem('favorites', JSON.stringify(state.favorites));
            }
        },

        // 찜 목록에서 상품 삭제
        removeFavorite: (state, action) => {
            const productnumber = action.payload.productnumber;
            state.favorites = state.favorites.filter((item) => item.productnumber !== productnumber);

            // localStorage에 저장
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
