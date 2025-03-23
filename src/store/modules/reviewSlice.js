import { createSlice } from '@reduxjs/toolkit';

// 로컬 스토리지에서 리뷰 데이터 불러오기
const loadReviewsFromLocalStorage = () => {
    try {
        // 모든 리뷰 데이터
        const storedReviews = localStorage.getItem('reviews');
        // 사용자별 리뷰 데이터
        const storedMyReviews = localStorage.getItem('myreviews');

        return {
            reviews: storedReviews ? JSON.parse(storedReviews) : [],
            myreviews: storedMyReviews ? JSON.parse(storedMyReviews) : [],
        };
    } catch (error) {
        return { reviews: [], myreviews: [] };
    }
};

// 로컬 스토리지에 리뷰 데이터 저장
const saveReviewsToLocalStorage = (reviews, myreviews) => {
    try {
        localStorage.setItem('reviews', JSON.stringify(reviews));
        localStorage.setItem('myreviews', JSON.stringify(myreviews));
    } catch (error) {
    }
};

// 특정 상품의 총 리뷰 개수 계산
const countTotalReviewsForProduct = (reviews, productId) => {
    return reviews.filter((review) => review.productId === productId).length;
};

// 초기 데이터 로드
const loadedData = loadReviewsFromLocalStorage();

// 현재 로그인한 사용자의, myreviews 있으면 가져오기
try {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.myreviews) {
        loadedData.myreviews = currentUser.myreviews;
    }
} catch (error) {
}

const initialState = {
    // 모든 리뷰 목록 (배열 형태)
    reviews: loadedData.reviews,
    // 현재 로그인한 사용자의 리뷰 목록 (배열 형태)
    myreviews: loadedData.myreviews,
    // 현재 선택된 상품 ID, category
    currentProductId: null,
    currentProductCategory: null,
    // 현재 상품의 리뷰 목록 (필터링된)
    currentProductReviews: [],
    // 현재 상품의 리뷰 총 개수
    totalReviews: 0,
    // 정렬 방식
    sortBy: 'latest', // 'latest' or 'best'
};

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        // 현재 상품 ID 설정
        setCurrentProduct: (state, action) => {
            state.currentProductId = action.payload;

            // 현재 상품의 리뷰 목록 업데이트
            state.currentProductReviews = state.reviews.filter((review) => review.productId === action.payload);

            // 총 리뷰 개수 업데이트
            state.totalReviews = countTotalReviewsForProduct(state.reviews, action.payload);

            // 정렬 적용
            if (state.sortBy === 'latest') {
                state.currentProductReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else if (state.sortBy === 'best') {
                state.currentProductReviews.sort((a, b) => b.helpfulCount - a.helpfulCount);
            }
        },

        // 새로운 리뷰 추가
        addReview: (state, action) => {
            const { productId, reviewData, category } = action.payload;
            state.currentProductCategory = category;
            // 현재 로그인한 사용자 정보 가져오기
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
            const userId = currentUser.id; // 로그인한 사용자 ID 또는 임시 ID

            // 이미 해당 상품에 리뷰를 작성했는지 확인
            const existingReviewIndex = state.myreviews.findIndex((review) => review.productId === productId);

            if (existingReviewIndex !== -1) {
                // 이미 리뷰가 존재하면 업데이트
                const existingReview = state.myreviews[existingReviewIndex];

                // myreviews 업데이트
                state.myreviews[existingReviewIndex] = {
                    ...existingReview,
                    title: reviewData.title || '',
                    content: reviewData.content,
                    rating: reviewData.rating,
                    img: reviewData.images || [],
                    date: new Date().toISOString(),
                    category: state.currentProductCategory,
                };

                // reviews에서도 해당 리뷰 찾아서 업데이트
                const reviewIndex = state.reviews.findIndex((review) => review.id === existingReview.id);

                if (reviewIndex !== -1) {
                    state.reviews[reviewIndex] = {
                        ...state.reviews[reviewIndex],
                        title: reviewData.title || '',
                        content: reviewData.content,
                        rating: reviewData.rating,
                        img: reviewData.images || [],
                        date: new Date().toISOString(),
                        category: state.currentProductCategory,
                    };
                }
            } else {
                // 새 리뷰 생성
                const newReview = {
                    id: userId, // 현재 로그인한 사용자 ID
                    productId: productId || '1', // 상품 ID (임시로 '1' 설정)
                    title: reviewData.title || '',
                    content: reviewData.content,
                    rating: reviewData.rating,
                    img: reviewData.images || [],
                    date: new Date().toISOString(),
                    helpfulCount: 0,
                    isHelpful: false,
                    category: state.currentProductCategory,
                };

                // reviews에 추가
                state.reviews.push(newReview);

                // myreviews에 추가
                state.myreviews.push(newReview);

                // 현재 상품 보기 중이라면 현재 리뷰 목록 업데이트
                if (state.currentProductId === productId) {
                    state.currentProductReviews = state.reviews.filter((review) => review.productId === productId);
                    state.totalReviews = state.currentProductReviews.length;
                }
            }

            // 리뷰 중복 검사 - 각 상품에 대해 사용자는 하나의 리뷰만 가능하도록
            // const uniqueReviews = [];
            const productReviewMap = new Map(); // 상품 ID별 최신 리뷰 저장용 Map

            // 모든 리뷰를 순회하며 상품 ID별로 최신 리뷰만 유지
            state.reviews.forEach((review) => {
                const key = `${review.productId}-${review.id}`; // "상품ID-사용자ID" 형태의 키

                // 이미 해당 키가 있으면 날짜 비교 후 최신 것만 유지
                if (productReviewMap.has(key)) {
                    const existingReview = productReviewMap.get(key);
                    const existingDate = new Date(existingReview.date);
                    const newDate = new Date(review.date);

                    if (newDate > existingDate) {
                        productReviewMap.set(key, review);
                    }
                } else {
                    productReviewMap.set(key, review);
                }
            });

            // Map의 값들만 배열로 변환
            state.reviews = Array.from(productReviewMap.values());

            // myreviews도 동일한 방식으로 중복 제거
            const myReviewMap = new Map();
            state.myreviews.forEach((review) => {
                const key = review.productId; // 상품 ID를 키로 사용

                // 이미 해당 키가 있으면 날짜 비교 후 최신 것만 유지
                if (myReviewMap.has(key)) {
                    const existingReview = myReviewMap.get(key);
                    const existingDate = new Date(existingReview.date);
                    const newDate = new Date(review.date);

                    if (newDate > existingDate) {
                        myReviewMap.set(key, review);
                    }
                } else {
                    myReviewMap.set(key, review);
                }
            });

            // Map의 값들만 배열로 변환
            state.myreviews = Array.from(myReviewMap.values());

            // 로컬 스토리지에 저장
            saveReviewsToLocalStorage(state.reviews, state.myreviews);

            // 사용자 정보에 myreviews 추가하기
            try {
                // 현재 사용자 정보 업데이트
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    currentUser.myreviews = state.myreviews;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));

                    // users 배열에서 현재 사용자 찾아서 업데이트
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    const userIndex = users.findIndex((user) => user.id === currentUser.id);

                    if (userIndex !== -1) {
                        users[userIndex].myreviews = state.myreviews;
                        localStorage.setItem('users', JSON.stringify(users));
                    }
                }
            } catch (error) {
            }
        },

        // 리뷰 삭제
        deleteReview: (state, action) => {
            const { productId } = action.payload;

            // myreviews에서 삭제
            state.myreviews = state.myreviews.filter((review) => review.productId !== productId);

            // reviews에서 해당 사용자의 리뷰 찾아서 삭제
            const userId = JSON.parse(localStorage.getItem('currentUser'))?.id;
            if (userId) {
                state.reviews = state.reviews.filter(
                    (review) => !(review.id === userId && review.productId === productId)
                );
            }

            // 현재 상품 보기 중이라면 현재 리뷰 목록 업데이트
            if (state.currentProductId === productId) {
                state.currentProductReviews = state.reviews.filter((review) => review.productId === productId);
                state.totalReviews = state.currentProductReviews.length;
            }

            // 리뷰 중복 검사 - 각 상품에 대해 사용자는 하나의 리뷰만 가능하도록
            const productReviewMap = new Map(); // 상품 ID별 최신 리뷰 저장용 Map

            // 모든 리뷰를 순회하며 상품 ID별로 최신 리뷰만 유지
            state.reviews.forEach((review) => {
                const key = `${review.productId}-${review.id}`; // "상품ID-사용자ID" 형태의 키

                // 이미 해당 키가 있으면 날짜 비교 후 최신 것만 유지
                if (productReviewMap.has(key)) {
                    const existingReview = productReviewMap.get(key);
                    const existingDate = new Date(existingReview.date);
                    const newDate = new Date(review.date);

                    if (newDate > existingDate) {
                        productReviewMap.set(key, review);
                    }
                } else {
                    productReviewMap.set(key, review);
                }
            });

            // Map의 값들만 배열로 변환
            state.reviews = Array.from(productReviewMap.values());

            // myreviews도 동일한 방식으로 중복 제거
            const myReviewMap = new Map();
            state.myreviews.forEach((review) => {
                const key = review.productId; // 상품 ID를 키로 사용

                // 이미 해당 키가 있으면 날짜 비교 후 최신 것만 유지
                if (myReviewMap.has(key)) {
                    const existingReview = myReviewMap.get(key);
                    const existingDate = new Date(existingReview.date);
                    const newDate = new Date(review.date);

                    if (newDate > existingDate) {
                        myReviewMap.set(key, review);
                    }
                } else {
                    myReviewMap.set(key, review);
                }
            });

            // Map의 값들만 배열로 변환
            state.myreviews = Array.from(myReviewMap.values());

            // 로컬 스토리지에 저장
            saveReviewsToLocalStorage(state.reviews, state.myreviews);

            // 사용자 정보에서 myreviews 업데이트
            try {
                // 현재 사용자 정보 업데이트
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    currentUser.myreviews = state.myreviews;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));

                    // users 배열에서 현재 사용자 찾아서 업데이트
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    const userIndex = users.findIndex((user) => user.id === currentUser.id);

                    if (userIndex !== -1) {
                        users[userIndex].myreviews = state.myreviews;
                        localStorage.setItem('users', JSON.stringify(users));
                    }
                }
            } catch (error) {
            }
        },

        // 리뷰 정렬 방식 변경 (최신순 / 베스트순)
        setSortBy: (state, action) => {
            state.sortBy = action.payload;

            // 현재 상품 리뷰에 정렬 적용
            if (state.currentProductReviews.length > 0) {
                if (action.payload === 'latest') {
                    state.currentProductReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
                } else if (action.payload === 'best') {
                    state.currentProductReviews.sort((a, b) => b.helpfulCount - a.helpfulCount);
                }
            }
        },

        // 도움됐어요 버튼 클릭
        toggleHelpful: (state, action) => {
            const { productId, reviewId } = action.payload;

            // reviews에서 해당 리뷰 찾기
            const reviewIndex = state.reviews.findIndex(
                (review) => review.id === reviewId && review.productId === productId
            );

            if (reviewIndex !== -1) {
                const review = state.reviews[reviewIndex];

                // 도움됐어요 토글
                if (review.isHelpful) {
                    review.helpfulCount -= 1;
                    review.isHelpful = false;
                } else {
                    review.helpfulCount += 1;
                    review.isHelpful = true;
                }

                // 만약 이것이 사용자 자신의 리뷰라면 myreviews도 업데이트
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser && currentUser.id === reviewId) {
                    const myReviewIndex = state.myreviews.findIndex((review) => review.productId === productId);

                    if (myReviewIndex !== -1) {
                        state.myreviews[myReviewIndex] = { ...review };
                    }
                }

                // 현재 보고 있는 상품의 리뷰라면 currentProductReviews 업데이트
                if (state.currentProductId === productId) {
                    const currentReviewIndex = state.currentProductReviews.findIndex(
                        (review) => review.id === reviewId
                    );

                    if (currentReviewIndex !== -1) {
                        state.currentProductReviews[currentReviewIndex] = { ...review };
                    }
                }

                // 리뷰 중복 검사 - 각 상품에 대해 사용자는 하나의 리뷰만 가능하도록
                const productReviewMap = new Map(); // 상품 ID별 최신 리뷰 저장용 Map

                // 모든 리뷰를 순회하며 상품 ID별로 최신 리뷰만 유지
                state.reviews.forEach((review) => {
                    const key = `${review.productId}-${review.id}`; // "상품ID-사용자ID" 형태의 키

                    // 이미 해당 키가 있으면 날짜 비교 후 최신 것만 유지
                    if (productReviewMap.has(key)) {
                        const existingReview = productReviewMap.get(key);
                        const existingDate = new Date(existingReview.date);
                        const newDate = new Date(review.date);

                        if (newDate > existingDate) {
                            productReviewMap.set(key, review);
                        }
                    } else {
                        productReviewMap.set(key, review);
                    }
                });

                // Map의 값들만 배열로 변환
                state.reviews = Array.from(productReviewMap.values());

                // myreviews도 동일한 방식으로 중복 제거
                const myReviewMap = new Map();
                state.myreviews.forEach((review) => {
                    const key = review.productId; // 상품 ID를 키로 사용

                    // 이미 해당 키가 있으면 날짜 비교 후 최신 것만 유지
                    if (myReviewMap.has(key)) {
                        const existingReview = myReviewMap.get(key);
                        const existingDate = new Date(existingReview.date);
                        const newDate = new Date(review.date);

                        if (newDate > existingDate) {
                            myReviewMap.set(key, review);
                        }
                    } else {
                        myReviewMap.set(key, review);
                    }
                });

                // Map의 값들만 배열로 변환
                state.myreviews = Array.from(myReviewMap.values());

                // 로컬 스토리지에 저장
                saveReviewsToLocalStorage(state.reviews, state.myreviews);

                // 사용자 정보 업데이트
                if (currentUser && currentUser.id === reviewId) {
                    currentUser.myreviews = state.myreviews;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));

                    // users 배열에서 현재 사용자 찾아서 업데이트
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    const userIndex = users.findIndex((user) => user.id === currentUser.id);

                    if (userIndex !== -1) {
                        users[userIndex].myreviews = state.myreviews;
                        localStorage.setItem('users', JSON.stringify(users));
                    }
                }
            }
        },

        // 사용자의 모든 리뷰 가져오기
        loadUserReviews: (state) => {
            // localStorage에서 currentUser 가져오기
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.myreviews) {
                state.myreviews = currentUser.myreviews;

                // users 배열에서 현재 사용자가 있는지 확인하고 업데이트
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex((user) => user.id === currentUser.id);

                if (
                    userIndex !== -1 &&
                    (!users[userIndex].myreviews || users[userIndex].myreviews.length !== currentUser.myreviews.length)
                ) {
                    users[userIndex].myreviews = currentUser.myreviews;
                    localStorage.setItem('users', JSON.stringify(users));
                }
            }
            return state.myreviews;
        },
        resetReviews: (state) => {
            state.reviews = [];
            state.myreviews = [];
            state.currentProductId = null;
            state.currentProductCategory = null;
            state.currentProductReviews = [];
            state.totalReviews = 0;
            state.sortBy = 'latest';
        },
    },
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice.reducer;
