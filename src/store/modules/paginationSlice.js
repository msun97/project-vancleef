import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // 기본 페이지네이션 상태
    default: {
        postData: [],
        postsPerPage: 10,
        currPage: 1,
        totalPage: 1,
    },
};

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        // 페이지 등록 (컴포넌트별 페이지네이션 초기화)
        registerPage: (state, action) => {
            const { pageId, postsPerPage } = action.payload;

            // 해당 pageId가 없는 경우에만 초기화
            if (!state[pageId]) {
                state[pageId] = {
                    postData: [],
                    postsPerPage: postsPerPage || 10,
                    currPage: 1,
                    totalPage: 1,
                };
            }
        },

        // 데이터 추가
        addData: (state, action) => {
            const { pageId, data } = action.payload;

            // pageId가 존재하지 않으면 먼저 초기화
            if (!state[pageId]) {
                state[pageId] = {
                    postData: [],
                    postsPerPage: 10,
                    currPage: 1,
                    totalPage: 1,
                };
            }

            state[pageId].postData = data;
            state[pageId].currPage = 1;
            // 전체 페이지 수 업데이트
            state[pageId].totalPage = Math.ceil(state[pageId].postData.length / state[pageId].postsPerPage);
        },

        // 전체 페이지 수 계산
        totalData: (state, action) => {
            const { pageId } = action.payload;
            state[pageId].totalPage = Math.ceil(state[pageId].postData.length / state[pageId].postsPerPage);
        },

        // 다음 페이지
        nextPage: (state, action) => {
            const { pageId } = action.payload;
            if (state[pageId].currPage < state[pageId].totalPage) {
                state[pageId].currPage++;
            }
        },

        // 이전 페이지
        prevPage: (state, action) => {
            const { pageId } = action.payload;
            if (state[pageId].currPage > 1) {
                state[pageId].currPage--;
            }
        },

        // 첫 페이지
        firstPage: (state, action) => {
            const { pageId } = action.payload;
            state[pageId].currPage = 1;
        },

        // 마지막 페이지
        lastPage: (state, action) => {
            const { pageId } = action.payload;
            state[pageId].currPage = state[pageId].totalPage;
        },

        // 특정 페이지로 이동
        currentPage: (state, action) => {
            const { pageId, page } = action.payload;
            state[pageId].currPage = page;
        },

        // 페이지당 항목 수 업데이트
        updatePostsPerPage: (state, action) => {
            const { pageId, postsPerPage } = action.payload;
            state[pageId].postsPerPage = postsPerPage;
            // 페이지당 포스트 수가 변경되면 현재 페이지를 1로 재설정
            state[pageId].currPage = 1;
            // 전체 페이지 수 업데이트
            state[pageId].totalPage = Math.ceil(state[pageId].postData.length / state[pageId].postsPerPage);
        },
    },
});

export const paginationActions = paginationSlice.actions;
export default paginationSlice.reducer;
