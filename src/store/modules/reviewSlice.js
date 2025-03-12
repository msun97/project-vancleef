import { createSlice } from '@reduxjs/toolkit';

// 로컬 스토리지에서 리뷰 데이터 불러오기
const loadReviewsFromLocalStorage = () => {
    try {
        const storedReviews = localStorage.getItem('reviews');
        return storedReviews ? JSON.parse(storedReviews) : [];
    } catch (error) {
        console.error('로컬 스토리지에서 리뷰를 불러오는 중 오류 발생:', error);
        return [];
    }
};

// 로컬 스토리지에 리뷰 데이터 저장
const saveReviewsToLocalStorage = (reviews) => {
    try {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    } catch (error) {
        console.error('로컬 스토리지에 리뷰를 저장하는 중 오류 발생:', error);
    }
};

const initialState = {
    reviews: loadReviewsFromLocalStorage(),
    sortBy: 'latest', // 'latest' or 'best'
    totalReviews: loadReviewsFromLocalStorage().length,
    selectedReview: null,
    currentUserEmail: 'example@email.com', // 고정값으로 사용
};

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        // 새로운 리뷰 추가
        addReview: (state, action) => {
            const newReview = {
                id: Date.now().toString(), // 고유 ID 생성
                email: state.currentUserEmail,
                title: action.payload.title || '', // 추가: 제목 필드
                content: action.payload.content,
                rating: action.payload.rating,
                images: action.payload.images || [],
                createdAt: new Date().toISOString(),
                helpfulCount: 0,
                isHelpful: false,
            };

            state.reviews.unshift(newReview); // 최신 리뷰를 맨 앞에 추가
            state.totalReviews = state.reviews.length;

            // 로컬 스토리지에 저장
            saveReviewsToLocalStorage(state.reviews);
        },

        // 리뷰 삭제
        deleteReview: (state, action) => {
            state.reviews = state.reviews.filter((review) => review.id !== action.payload);
            state.totalReviews = state.reviews.length;

            // 로컬 스토리지에 저장
            saveReviewsToLocalStorage(state.reviews);
        },

        // 리뷰 수정
        updateReview: (state, action) => {
            const { id, title, content, rating, images } = action.payload;
            const reviewIndex = state.reviews.findIndex((review) => review.id === id);

            if (reviewIndex !== -1) {
                state.reviews[reviewIndex] = {
                    ...state.reviews[reviewIndex],
                    title, // 추가: 제목 업데이트
                    content,
                    rating,
                    images,
                    updatedAt: new Date().toISOString(),
                };

                // 로컬 스토리지에 저장
                saveReviewsToLocalStorage(state.reviews);
            }
        },

        // 리뷰 정렬 방식 변경 (최신순 / 베스트순)
        setSortBy: (state, action) => {
            state.sortBy = action.payload;

            // 정렬 적용
            if (action.payload === 'latest') {
                state.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } else if (action.payload === 'best') {
                state.reviews.sort((a, b) => b.helpfulCount - a.helpfulCount);
            }
        },

        // 도움됐어요 버튼 클릭
        toggleHelpful: (state, action) => {
            const reviewId = action.payload;
            const reviewIndex = state.reviews.findIndex((review) => review.id === reviewId);

            if (reviewIndex !== -1) {
                const review = state.reviews[reviewIndex];

                if (review.isHelpful) {
                    review.helpfulCount -= 1;
                    review.isHelpful = false;
                } else {
                    review.helpfulCount += 1;
                    review.isHelpful = true;
                }

                // 로컬 스토리지에 저장
                saveReviewsToLocalStorage(state.reviews);
            }
        },

        // 특정 리뷰 선택 (수정 시 사용)
        selectReview: (state, action) => {
            state.selectedReview = action.payload;
        },

        // 현재 사용자 이메일 설정 (사용하지 않음 - 이메일은 고정값으로 유지)
        // setCurrentUserEmail: (state, action) => {
        //   state.currentUserEmail = action.payload;
        // },
    },
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice.reducer;
