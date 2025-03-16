import { createSlice } from '@reduxjs/toolkit';

// 로컬 스토리지에서 리뷰 데이터 불러오기
const loadReviewsFromLocalStorage = () => {
    try {
        // 모든 리뷰 데이터
        const storedAllReviews = localStorage.getItem('allReviews');
        // 사용자별 리뷰 데이터
        const storedUserReviews = localStorage.getItem('userReviews');

        return {
            allReviews: storedAllReviews ? JSON.parse(storedAllReviews) : {},
            userReviews: storedUserReviews ? JSON.parse(storedUserReviews) : {},
        };
    } catch (error) {
        console.error('로컬 스토리지에서 리뷰를 불러오는 중 오류 발생:', error);
        return { allReviews: {}, userReviews: {} };
    }
};

// 로컬 스토리지에 리뷰 데이터 저장
const saveReviewsToLocalStorage = (allReviews, userReviews) => {
    try {
        localStorage.setItem('allReviews', JSON.stringify(allReviews));
        localStorage.setItem('userReviews', JSON.stringify(userReviews));
    } catch (error) {
        console.error('로컬 스토리지에 리뷰를 저장하는 중 오류 발생:', error);
    }
};

// 특정 상품의 총 리뷰 개수 계산
const countTotalReviewsForProduct = (allReviews, productId) => {
    return allReviews[productId] ? allReviews[productId].length : 0;
};

// 초기 데이터 로드
const loadedData = loadReviewsFromLocalStorage();

const initialState = {
    // { productId: [reviews] } 형태로 구조화
    allReviews: loadedData.allReviews,
    // { userNum: { productId: review } } 형태로 구조화
    userReviews: loadedData.userReviews,
    // 현재 선택된 상품 ID
    currentProductId: null,
    // 현재 상품의 리뷰 목록 (필터링된)
    currentProductReviews: [],
    // 현재 상품의 리뷰 총 개수
    totalReviews: 0,
    // 정렬 방식
    sortBy: 'latest', // 'latest' or 'best'
    selectedReview: null,
};

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        // 현재 상품 ID 설정
        setCurrentProduct: (state, action) => {
            state.currentProductId = action.payload;

            // 현재 상품의 리뷰 목록 업데이트
            state.currentProductReviews = state.allReviews[action.payload] || [];

            // 총 리뷰 개수 업데이트
            state.totalReviews = countTotalReviewsForProduct(state.allReviews, action.payload);

            // 정렬 적용
            if (state.sortBy === 'latest') {
                state.currentProductReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } else if (state.sortBy === 'best') {
                state.currentProductReviews.sort((a, b) => b.helpfulCount - a.helpfulCount);
            }
        },

        // 새로운 리뷰 추가
        addReview: (state, action) => {
            const { userNum, productId, reviewData } = action.payload;

            // 각 사용자는 상품당 하나의 리뷰만 작성 가능
            // 이미 해당 상품에 리뷰를 작성했는지 확인
            if (state.userReviews[userNum] && state.userReviews[userNum][productId]) {
                // 이미 리뷰가 존재하면 업데이트
                const existingReviewId = state.userReviews[userNum][productId].id;

                // allReviews에서 해당 리뷰 찾아서 업데이트
                if (state.allReviews[productId]) {
                    const reviewIndex = state.allReviews[productId].findIndex(
                        (review) => review.id === existingReviewId
                    );

                    if (reviewIndex !== -1) {
                        const updatedReview = {
                            ...state.allReviews[productId][reviewIndex],
                            title: reviewData.title,
                            content: reviewData.content,
                            rating: reviewData.rating,
                            images: reviewData.images,
                            updatedAt: new Date().toISOString(),
                        };

                        state.allReviews[productId][reviewIndex] = updatedReview;
                        state.userReviews[userNum][productId] = updatedReview;
                    }
                }
            } else {
                // 새 리뷰 생성
                const newReview = {
                    id: Date.now().toString(), // 고유 ID 생성
                    userNum: userNum,
                    productId: productId,
                    title: reviewData.title || '',
                    content: reviewData.content,
                    rating: reviewData.rating,
                    images: reviewData.images || [],
                    createdAt: new Date().toISOString(),
                    helpfulCount: 0,
                    isHelpful: false,
                };

                // allReviews에 추가
                if (!state.allReviews[productId]) {
                    state.allReviews[productId] = [];
                }
                state.allReviews[productId].unshift(newReview);

                // userReviews에 추가
                if (!state.userReviews[userNum]) {
                    state.userReviews[userNum] = {};
                }
                state.userReviews[userNum][productId] = newReview;

                // 현재 상품 보기 중이라면 현재 리뷰 목록 업데이트
                if (state.currentProductId === productId) {
                    state.currentProductReviews = state.allReviews[productId];
                    state.totalReviews = state.currentProductReviews.length;
                }
            }

            // 로컬 스토리지에 저장
            saveReviewsToLocalStorage(state.allReviews, state.userReviews);
        },

        // 리뷰 삭제
        deleteReview: (state, action) => {
            const { userNum, productId } = action.payload;

            if (state.userReviews[userNum] && state.userReviews[userNum][productId]) {
                const reviewId = state.userReviews[userNum][productId].id;

                // allReviews에서 삭제
                if (state.allReviews[productId]) {
                    state.allReviews[productId] = state.allReviews[productId].filter(
                        (review) => review.id !== reviewId
                    );

                    // 만약 해당 상품의 리뷰가 없어지면 해당 키 삭제
                    if (state.allReviews[productId].length === 0) {
                        delete state.allReviews[productId];
                    }
                }

                // userReviews에서 삭제
                delete state.userReviews[userNum][productId];

                // 만약 해당 사용자의 리뷰가 없어지면 해당 키 삭제
                if (Object.keys(state.userReviews[userNum]).length === 0) {
                    delete state.userReviews[userNum];
                }

                // 현재 상품 보기 중이라면 현재 리뷰 목록 업데이트
                if (state.currentProductId === productId) {
                    state.currentProductReviews = state.allReviews[productId] || [];
                    state.totalReviews = state.currentProductReviews.length;
                }

                // 로컬 스토리지에 저장
                saveReviewsToLocalStorage(state.allReviews, state.userReviews);
            }
        },

        // 리뷰 정렬 방식 변경 (최신순 / 베스트순)
        setSortBy: (state, action) => {
            state.sortBy = action.payload;

            // 현재 상품 리뷰에 정렬 적용
            if (state.currentProductReviews.length > 0) {
                if (action.payload === 'latest') {
                    state.currentProductReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                } else if (action.payload === 'best') {
                    state.currentProductReviews.sort((a, b) => b.helpfulCount - a.helpfulCount);
                }
            }
        },

        // 도움됐어요 버튼 클릭
        toggleHelpful: (state, action) => {
            const { productId, reviewId, userNum } = action.payload;

            if (state.allReviews[productId]) {
                const reviewIndex = state.allReviews[productId].findIndex((review) => review.id === reviewId);

                if (reviewIndex !== -1) {
                    const review = state.allReviews[productId][reviewIndex];

                    if (review.isHelpful) {
                        review.helpfulCount -= 1;
                        review.isHelpful = false;
                    } else {
                        review.helpfulCount += 1;
                        review.isHelpful = true;
                    }

                    // 만약 이것이 사용자 자신의 리뷰라면 userReviews도 업데이트
                    if (
                        state.userReviews[userNum] &&
                        state.userReviews[userNum][productId] &&
                        state.userReviews[userNum][productId].id === reviewId
                    ) {
                        state.userReviews[userNum][productId] = { ...review };
                    }

                    // 현재 보고 있는 상품의 리뷰라면 currentProductReviews 업데이트
                    if (state.currentProductId === productId) {
                        state.currentProductReviews[reviewIndex] = { ...review };
                    }

                    // 로컬 스토리지에 저장
                    saveReviewsToLocalStorage(state.allReviews, state.userReviews);
                }
            }
        },

        // 특정 리뷰 선택 (수정 시 사용)
        selectReview: (state, action) => {
            state.selectedReview = action.payload;
        },

        // 사용자의 모든 리뷰 가져오기
        loadUserReviews: (state, action) => {
            const userNum = action.payload;
            return state.userReviews[userNum] || {};
        },
    },
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice.reducer;
