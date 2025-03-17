import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = {
    inquiries: JSON.parse(localStorage.getItem('allInquiries') || '[]'),
    myInquiries: JSON.parse(localStorage.getItem('myInquiries') || '[]'),
    currentUsernum: null,
};

const productInquirySlice = createSlice({
    name: 'productInquiry',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUsernum = action.payload;

            // 사용자가 변경되면 해당 사용자의 문의만 필터링
            if (action.payload) {
                state.myInquiries = state.inquiries.filter((inquiry) => inquiry.usernum === action.payload);
                localStorage.setItem('myInquiries', JSON.stringify(state.myInquiries));
            }
        },

        // 문의 추가 (전체 문의 및 내 문의)
        addInquiry: (state, action) => {
            const newInquiry = {
                id: Date.now(),
                ...action.payload,
                status: '접수완료',
            };

            // 전체 문의에 추가
            state.inquiries.push(newInquiry);
            localStorage.setItem('allInquiries', JSON.stringify(state.inquiries));

            // 로그인한 사용자와 inquiry의 usernum이 일치하는 경우 내 문의에도 추가
            if (action.payload.usernum && action.payload.usernum === state.currentUsernum) {
                state.myInquiries.push(newInquiry);
                localStorage.setItem('myInquiries', JSON.stringify(state.myInquiries));
            }
        },

        // 문의 업데이트 (전체 문의 및 내 문의)
        updateInquiry: (state, action) => {
            const { id, ...changes } = action.payload;

            // 전체 문의 업데이트
            const inquiryIndex = state.inquiries.findIndex((item) => item.id === id);
            if (inquiryIndex !== -1) {
                state.inquiries[inquiryIndex] = {
                    ...state.inquiries[inquiryIndex],
                    ...changes,
                };
                localStorage.setItem('allInquiries', JSON.stringify(state.inquiries));
            }

            // 내 문의 업데이트
            const myInquiryIndex = state.myInquiries.findIndex((item) => item.id === id);
            if (myInquiryIndex !== -1) {
                state.myInquiries[myInquiryIndex] = {
                    ...state.myInquiries[myInquiryIndex],
                    ...changes,
                };
                localStorage.setItem('myInquiries', JSON.stringify(state.myInquiries));
            }
        },

        // 문의 삭제 (전체 문의 및 내 문의)
        deleteInquiry: (state, action) => {
            const id = action.payload;

            // 전체 문의에서 삭제
            state.inquiries = state.inquiries.filter((inquiry) => inquiry.id !== id);
            localStorage.setItem('allInquiries', JSON.stringify(state.inquiries));

            // 내 문의에서 삭제
            state.myInquiries = state.myInquiries.filter((inquiry) => inquiry.id !== id);
            localStorage.setItem('myInquiries', JSON.stringify(state.myInquiries));
        },

        // 응답 추가 (전체 문의 및 내 문의)
        addResponse: (state, action) => {
            const { id, response } = action.payload;

            // 전체 문의 응답 추가
            const inquiryIndex = state.inquiries.findIndex((item) => item.id === id);
            if (inquiryIndex !== -1) {
                state.inquiries[inquiryIndex] = {
                    ...state.inquiries[inquiryIndex],
                    response,
                    hasResponse: true,
                    status: '답변완료',
                };
                localStorage.setItem('allInquiries', JSON.stringify(state.inquiries));
            }

            // 내 문의 응답 추가
            const myInquiryIndex = state.myInquiries.findIndex((item) => item.id === id);
            if (myInquiryIndex !== -1) {
                state.myInquiries[myInquiryIndex] = {
                    ...state.myInquiries[myInquiryIndex],
                    response,
                    hasResponse: true,
                    status: '답변완료',
                };
                localStorage.setItem('myInquiries', JSON.stringify(state.myInquiries));
            }
        },

        // 내 문의만 로드
        loadMyInquiries: (state, action) => {
            const usernum = action.payload;
            // localStorage의 allInquiries에서 현재 유저의 문의만 필터링
            const allInquiries = JSON.parse(localStorage.getItem('allInquiries') || '[]');
            state.myInquiries = allInquiries.filter((inquiry) => inquiry.usernum === usernum);
            localStorage.setItem('myInquiries', JSON.stringify(state.myInquiries));
        },
    },
});

export const productInquiryActions = productInquirySlice.actions;
export default productInquirySlice.reducer;
