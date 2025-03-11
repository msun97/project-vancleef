import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    postData: [],
    postsPerPage: 10,
    currPage: 1,
    totalPage: 1,
};

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        addData: (state, action) => {
            state.postData = action.payload;
            state.currPage = 1;
            // 데이터가 추가되면 전체 페이지 수 업데이트
            state.totalPage = Math.ceil(state.postData.length / state.postsPerPage);
        },
        totalData: (state) => {
            state.totalPage = Math.ceil(state.postData.length / state.postsPerPage);
        },
        nextPage: (state) => {
            if (state.currPage < state.totalPage) {
                state.currPage++;
            }
        },
        prevPage: (state) => {
            if (state.currPage > 1) {
                state.currPage--;
            }
        },
        firstPage: (state) => {
            state.currPage = 1;
        },
        lastPage: (state) => {
            state.currPage = state.totalPage;
        },
        currentPage: (state, action) => {
            state.currPage = action.payload;
        },
        updatePostsPerPage: (state, action) => {
            state.postsPerPage = action.payload;
            // 페이지당 포스트 수가 변경되면 현재 페이지를 1로 재설정
            state.currPage = 1;
            // 전체 페이지 수 업데이트
            state.totalPage = Math.ceil(state.postData.length / state.postsPerPage);
        },
    },
});

export const paginationActions = paginationSlice.actions;
export default paginationSlice.reducer;
