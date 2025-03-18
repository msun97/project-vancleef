import { createSlice } from '@reduxjs/toolkit';

// 깊은 복사 함수
const deepCopy = (obj) => {
    try {
        return JSON.parse(JSON.stringify(obj));
    } catch (error) {
        console.error('깊은 복사 중 오류:', error);
        return obj;
    }
};

// 로컬 스토리지에 리뷰 데이터 저장
const saveReviewsToLocalStorage = (reviews, myreviews) => {
    try {
        localStorage.setItem('reviews', JSON.stringify(reviews));
        localStorage.setItem('myreviews', JSON.stringify(myreviews));

        // currentUser 객체의 myreviews도 업데이트
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            currentUser.myreviews = deepCopy(myreviews);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    } catch (error) {
        console.error('로컬 스토리지에 리뷰를 저장하는 중 오류 발생:', error);
    }
};

// 특정 상품의 총 리뷰 개수 계산
const countTotalReviewsForProduct = (reviews, productId) => {
    return reviews.filter((review) => String(review.productId) === String(productId)).length;
};

// 초기 데이터 로드
const loadInitialReviewData = () => {
    try {
        // 모든 리뷰 데이터 로드
        const storedReviews = localStorage.getItem('reviews');
        const reviews = storedReviews ? JSON.parse(storedReviews) : [];

        // 로그인 상태 확인
        const isLoggedIn = localStorage.getItem('authed') === 'true';
        let myreviews = [];

        if (isLoggedIn) {
            // 로그인 상태면 현재 사용자의 myreviews 로드
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.myreviews) {
                myreviews = deepCopy(currentUser.myreviews);
                // 현재 사용자의 myreviews를 localStorage에 저장
                localStorage.setItem('myreviews', JSON.stringify(myreviews));
            }
        } else {
            // 로그인 상태가 아니면 myreviews 초기화
            localStorage.setItem('myreviews', JSON.stringify([]));
        }

        return {
            reviews: deepCopy(reviews),
            myreviews: deepCopy(myreviews),
        };
    } catch (error) {
        console.error('리뷰 데이터 초기화 중 오류:', error);
        return { reviews: [], myreviews: [] };
    }
};

// 초기 데이터 로드
const loadedData = loadInitialReviewData();

// 초기 상태 설정
const initialState = {
    reviews: loadedData.reviews,
    myreviews: loadedData.myreviews,
    currentProductId: null,
    currentProductReviews: [],
    totalReviews: 0,
    sortBy: 'latest',
};

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        // 현재 상품 ID 설정
        setCurrentProduct: (state, action) => {
            const productId = action.payload;
            state.currentProductId = productId;

            // 현재 상품의 리뷰 목록 업데이트 - 문자열과 숫자 모두 처리하기 위해 String으로 변환
            state.currentProductReviews = state.reviews.filter(
                (review) => String(review.productId) === String(productId)
            );

            // 총 리뷰 개수 업데이트
            state.totalReviews = countTotalReviewsForProduct(state.reviews, productId);

            // 정렬 적용
            if (state.sortBy === 'latest') {
                state.currentProductReviews.sort(
                    (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
                );
            } else if (state.sortBy === 'best') {
                state.currentProductReviews.sort((a, b) => (b.helpfulCount || 0) - (a.helpfulCount || 0));
            }
        },

        // 새로운 리뷰 추가
        addReview: (state, action) => {
            const { productId, reviewData } = action.payload;

            // 현재 로그인한 사용자 정보 가져오기
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
            const userId = currentUser.id; // 로그인한 사용자 ID

            if (!userId) {
                console.error('로그인된 사용자 정보를 찾을 수 없습니다.');
                return;
            }

            console.log('리뷰 추가 시작:', { userId, productId, reviewData });

            // 새 리뷰 객체 생성
            const newReview = {
                id: userId, // 현재 로그인한 사용자 ID
                productId: productId, // 상품 ID
                title: reviewData.title || '',
                content: reviewData.content,
                rating: reviewData.rating,
                img: reviewData.images || [],
                date: new Date().toISOString(),
                helpfulCount: 0,
                isHelpful: false,
            };

            // 기존 리뷰가 있는지 확인
            const existingMyReviewIndex = state.myreviews.findIndex(
                (review) => String(review.productId) === String(productId)
            );

            // 기존 리뷰가 있으면 업데이트, 없으면 새로 추가
            if (existingMyReviewIndex !== -1) {
                state.myreviews[existingMyReviewIndex] = deepCopy(newReview);
            } else {
                state.myreviews.push(deepCopy(newReview));
            }

            // reviews 배열에서도 동일하게 처리
            const existingReviewIndex = state.reviews.findIndex(
                (review) => String(review.id) === String(userId) && String(review.productId) === String(productId)
            );

            if (existingReviewIndex !== -1) {
                state.reviews[existingReviewIndex] = deepCopy(newReview);
            } else {
                state.reviews.push(deepCopy(newReview));
            }

            // 현재 상품 보기 중이라면 현재 리뷰 목록 업데이트
            if (String(state.currentProductId) === String(productId)) {
                state.currentProductReviews = state.reviews.filter(
                    (review) => String(review.productId) === String(productId)
                );
                state.totalReviews = state.currentProductReviews.length;
            }

            // 로컬 스토리지에 저장
            try {
                localStorage.setItem('reviews', JSON.stringify(state.reviews));
                localStorage.setItem('myreviews', JSON.stringify(state.myreviews));

                // currentUser 객체의 myreviews도 업데이트
                if (currentUser) {
                    currentUser.myreviews = deepCopy(state.myreviews);
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }

                // users 배열 업데이트
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex((user) => String(user.id) === String(userId));

                if (userIndex !== -1) {
                    users[userIndex].myreviews = deepCopy(state.myreviews);
                    localStorage.setItem('users', JSON.stringify(users));
                }

                console.log('리뷰 저장 성공:', newReview);
            } catch (error) {
                console.error('로컬 스토리지에 리뷰를 저장하는 중 오류 발생:', error);
            }
        },

        // 리뷰 삭제
        deleteReview: (state, action) => {
            const { productId } = action.payload;

            // myreviews에서 삭제
            state.myreviews = state.myreviews.filter((review) => String(review.productId) !== String(productId));

            // reviews에서 해당 사용자의 리뷰 찾아서 삭제
            const userId = JSON.parse(localStorage.getItem('currentUser'))?.id;
            if (userId) {
                state.reviews = state.reviews.filter(
                    (review) =>
                        !(String(review.id) === String(userId) && String(review.productId) === String(productId))
                );
            }

            // 현재 상품 보기 중이라면 현재 리뷰 목록 업데이트
            if (String(state.currentProductId) === String(productId)) {
                state.currentProductReviews = state.reviews.filter(
                    (review) => String(review.productId) === String(productId)
                );
                state.totalReviews = state.currentProductReviews.length;
            }

            // 로컬 스토리지에 저장
            saveReviewsToLocalStorage(state.reviews, state.myreviews);

            // 사용자 정보에서 myreviews 업데이트
            try {
                // 현재 사용자 정보 업데이트
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    // users 배열에서 현재 사용자 찾아서 업데이트
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    const userIndex = users.findIndex((user) => String(user.id) === String(userId));

                    if (userIndex !== -1) {
                        users[userIndex].myreviews = deepCopy(state.myreviews);
                        localStorage.setItem('users', JSON.stringify(users));
                    }
                }
            } catch (error) {
                console.error('사용자 정보에서 리뷰 데이터 삭제 중 오류:', error);
            }
        },

        // 리뷰 정렬 방식 변경 (최신순 / 베스트순)
        setSortBy: (state, action) => {
            state.sortBy = action.payload;

            // 현재 상품 리뷰에 정렬 적용
            if (state.currentProductReviews.length > 0) {
                if (action.payload === 'latest') {
                    state.currentProductReviews.sort(
                        (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
                    );
                } else if (action.payload === 'best') {
                    state.currentProductReviews.sort((a, b) => (b.helpfulCount || 0) - (a.helpfulCount || 0));
                }
            }
        },

        // 도움됐어요 버튼 클릭
        toggleHelpful: (state, action) => {
            const { productId, reviewId } = action.payload;

            // reviews에서 해당 리뷰 찾기
            const reviewIndex = state.reviews.findIndex(
                (review) => String(review.id) === String(reviewId) && String(review.productId) === String(productId)
            );

            if (reviewIndex !== -1) {
                const review = state.reviews[reviewIndex];

                // 도움됐어요 토글
                if (review.isHelpful) {
                    review.helpfulCount = (review.helpfulCount || 1) - 1;
                    review.isHelpful = false;
                } else {
                    review.helpfulCount = (review.helpfulCount || 0) + 1;
                    review.isHelpful = true;
                }

                // 만약 이것이 사용자 자신의 리뷰라면 myreviews도 업데이트
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser && String(currentUser.id) === String(reviewId)) {
                    const myReviewIndex = state.myreviews.findIndex(
                        (review) => String(review.productId) === String(productId)
                    );

                    if (myReviewIndex !== -1) {
                        state.myreviews[myReviewIndex] = { ...review };
                    }
                }

                // 현재 보고 있는 상품의 리뷰라면 currentProductReviews 업데이트
                if (String(state.currentProductId) === String(productId)) {
                    const currentReviewIndex = state.currentProductReviews.findIndex(
                        (review) => String(review.id) === String(reviewId)
                    );

                    if (currentReviewIndex !== -1) {
                        state.currentProductReviews[currentReviewIndex] = { ...review };
                    }
                }

                // 로컬 스토리지에 저장
                saveReviewsToLocalStorage(state.reviews, state.myreviews);

                // 사용자 정보 업데이트
                if (currentUser && String(currentUser.id) === String(reviewId)) {
                    // users 배열에서 현재 사용자 찾아서 업데이트
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    const userIndex = users.findIndex((user) => String(user.id) === String(currentUser.id));

                    if (userIndex !== -1) {
                        users[userIndex].myreviews = deepCopy(state.myreviews);
                        localStorage.setItem('users', JSON.stringify(users));
                    }
                }
            }
        },

        // 사용자의 모든 리뷰 가져오기
        loadUserReviews: (state) => {
            try {
                // localStorage에서 currentUser 가져오기
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));

                if (currentUser && currentUser.id) {
                    // users 배열에서 현재 사용자 정보 가져오기
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    const userIndex = users.findIndex((user) => String(user.id) === String(currentUser.id));

                    if (userIndex !== -1) {
                        // 사용자를 찾았을 때
                        if (!users[userIndex].myreviews) {
                            users[userIndex].myreviews = [];
                        }

                        // 깊은 복사로 객체 참조 문제 해결
                        state.myreviews = deepCopy(users[userIndex].myreviews);

                        // currentUser와 localStorage 업데이트
                        localStorage.setItem('myreviews', JSON.stringify(state.myreviews));

                        // users 배열 업데이트 (필요한 경우에만)
                        if (JSON.stringify(users[userIndex].myreviews) !== JSON.stringify(state.myreviews)) {
                            users[userIndex].myreviews = deepCopy(state.myreviews);
                            localStorage.setItem('users', JSON.stringify(users));
                        }
                    } else {
                        // 사용자를 찾지 못했을 때
                        state.myreviews = [];
                        localStorage.setItem('myreviews', JSON.stringify([]));
                    }
                } else {
                    // 로그인 상태가 아닐 때
                    state.myreviews = [];
                    localStorage.setItem('myreviews', JSON.stringify([]));
                }
            } catch (error) {
                console.error('사용자 리뷰 로드 중 오류:', error);
                state.myreviews = [];
                localStorage.setItem('myreviews', JSON.stringify([]));
            }

            return state.myreviews;
        },
    },
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice.reducer;
