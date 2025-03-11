import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = {
    inquiries: JSON.parse(localStorage.getItem('productInquiries') || '[]'),
};

const productInquirySlice = createSlice({
    name: 'productInquiry',
    initialState,
    reducers: {
        // 문의 추가
        addInquiry: (state, action) => {
            const newInquiry = {
                id: Date.now(),
                ...action.payload,
                status: '접수완료',
            };

            state.inquiries.push(newInquiry);

            // 로컬 스토리지에 저장
            localStorage.setItem('productInquiries', JSON.stringify(state.inquiries));
        },

        // 문의 업데이트
        updateInquiry: (state, action) => {
            const { id, ...changes } = action.payload;
            const inquiryIndex = state.inquiries.findIndex((item) => item.id === id);

            if (inquiryIndex !== -1) {
                // 스프레드 연산자를 사용한 업데이트
                state.inquiries[inquiryIndex] = {
                    ...state.inquiries[inquiryIndex],
                    ...changes,
                };
                localStorage.setItem('productInquiries', JSON.stringify(state.inquiries));
            }
        },

        // 문의 삭제
        deleteInquiry: (state, action) => {
            const id = action.payload;
            state.inquiries = state.inquiries.filter((inquiry) => inquiry.id !== id);
            localStorage.setItem('productInquiries', JSON.stringify(state.inquiries));
        },

        // 응답 추가
        addResponse: (state, action) => {
            const { id, response } = action.payload;
            const inquiryIndex = state.inquiries.findIndex((item) => item.id === id);

            if (inquiryIndex !== -1) {
                // 스프레드 연산자를 사용한 업데이트
                state.inquiries[inquiryIndex] = {
                    ...state.inquiries[inquiryIndex],
                    response,
                    hasResponse: true,
                    status: '답변완료',
                };
                localStorage.setItem('productInquiries', JSON.stringify(state.inquiries));
            }
        },
    },
});

export const productInquiryActions = productInquirySlice.actions;
export default productInquirySlice.reducer;
