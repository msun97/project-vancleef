import { createSlice } from '@reduxjs/toolkit';
import { getKakaoLogin } from './kakaogetThunks';

const initialState = {
    joinData: [],
    authed: false,
    user: null,
    isSignUpComplete: false,
    goTg: null,
};

let no = initialState.joinData.length;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        gotoTarget: (state, action) => {
            state.goTg = action.payload;
        },
        signup: (state, action) => {
            const user = action.payload;
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const member = {
                id: no++,
                userid: user.id_email,
                email: user.email,
                password: user.password,
                username: user.username,
                tel: user.telFirst + user.telSecond + user.telThird,
                reservations: [],
                favorites: [], // 찜 목록 초기화
                myreviews: [], // 내 리뷰 목록 초기화
            };

            storedUsers.push(member);
            localStorage.setItem('users', JSON.stringify(storedUsers));
            state.joinData.push(member);
        },
        login: (state, action) => {
            const { id_email, password } = action.payload;
            const cleanedEmail = id_email.toLowerCase().trim();
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = storedUsers.find((u) => u.userid.toLowerCase() === cleanedEmail);

            if (user) {
                if (user.password === password) {
                    console.log('로그인 성공', user);

                    // favorites 초기화 확인
                    if (!user.favorites) {
                        user.favorites = [];
                    }

                    // myreviews 초기화 확인
                    if (!user.myreviews) {
                        user.myreviews = [];
                    }

                    state.authed = true;
                    state.user = user;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('authed', 'true');
                } else {
                    console.log('비밀번호가 틀립니다');
                    state.authed = false;
                    localStorage.setItem('authed', 'false');
                }
            } else {
                console.log('사용자를 찾을 수 없습니다');
                state.authed = false;
                localStorage.setItem('authed', 'false');
            }
        },
        logout: (state) => {
            state.authed = false;
            state.user = null;
            localStorage.removeItem('authed');
            localStorage.removeItem('currentUser');
        },
        restoreAuthState: (state) => {
            const savedAuthed = localStorage.getItem('authed') === 'true';
            const savedUser = JSON.parse(localStorage.getItem('currentUser'));
            if (savedAuthed && savedUser) {
                // favorites 초기화 확인
                if (!savedUser.favorites) {
                    savedUser.favorites = [];
                }

                // myreviews 초기화 확인
                if (!savedUser.myreviews) {
                    savedUser.myreviews = [];
                }

                state.authed = true;
                state.user = savedUser;
            }
        },
        setSignUpComplete: (state, action) => {
            state.isSignUpComplete = action.payload;
        },
        loginSuccess: (state, action) => {
            const userData = action.payload;
            if (!userData.reservations) {
                userData.reservations = [];
            }
            // 찜 목록이 없으면 초기화
            if (!userData.favorites) {
                userData.favorites = [];
            }
            // 내 리뷰 목록이 없으면 초기화
            if (!userData.myreviews) {
                userData.myreviews = [];
            }
            state.authed = true;
            state.user = userData;
        },
        removeUsername: (state) => {
            if (state.user) {
                state.user.username = '';
            }
        },
        updateUsername: (state, action) => {
            if (state.user) {
                state.user.username = action.payload;
            }
        },
        updatePassword: (state, action) => {
            const { currentPassword, newPassword } = action.payload;
            if (state.user && state.user.password === currentPassword) {
                state.user.password = newPassword;
            } else {
                console.error('현재 비밀번호가 일치하지 않습니다.');
            }
        },
        addReservation: (state, action) => {
            if (state.user) {
                state.user.reservations = state.user.reservations || [];
                state.user.reservations.push(action.payload);
                localStorage.setItem('user__로그인정보', JSON.stringify(state.user));
            }
        },
        addfavorites: (state, action) => {
            // user가 없으면 처리하지 않음
            if (!state.user) return;
            // favorites 초기화 확인
            if (!state.user.favorites) {
                state.user.favorites = [];
            }
            const exists = state.user.favorites.find((item) => item.productid === action.payload.productid);
            if (!exists) {
                state.user.favorites.push(action.payload);

                // users 배열에서도 업데이트
                const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = storedUsers.findIndex((u) => u.id === state.user.id);
                if (userIndex !== -1) {
                    storedUsers[userIndex].favorites = state.user.favorites;
                    localStorage.setItem('users', JSON.stringify(storedUsers));
                }

                // currentUser 업데이트
                localStorage.setItem('currentUser', JSON.stringify(state.user));
            }
        },
        removeFavorite: (state, action) => {
            if (!state.user || !state.user.favorites) return;
            state.user.favorites = state.user.favorites.filter((item) => item.productid !== action.payload.productid);

            // users 배열에서도 업데이트
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = storedUsers.findIndex((u) => u.id === state.user.id);
            if (userIndex !== -1) {
                storedUsers[userIndex].favorites = state.user.favorites;
                localStorage.setItem('users', JSON.stringify(storedUsers));
            }

            // currentUser 업데이트
            localStorage.setItem('currentUser', JSON.stringify(state.user));
        },
        // 내 리뷰 목록 업데이트
        updateMyReviews: (state, action) => {
            if (!state.user) return;

            // myreviews 초기화 확인
            if (!state.user.myreviews) {
                state.user.myreviews = [];
            }

            state.user.myreviews = action.payload;

            // users 배열에서도 업데이트
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = storedUsers.findIndex((u) => u.id === state.user.id);
            if (userIndex !== -1) {
                storedUsers[userIndex].myreviews = state.user.myreviews;
                localStorage.setItem('users', JSON.stringify(storedUsers));
            }

            // currentUser 업데이트
            localStorage.setItem('currentUser', JSON.stringify(state.user));
        },
        // 리뷰 추가
        addMyReview: (state, action) => {
            if (!state.user) return;

            // myreviews 초기화 확인
            if (!state.user.myreviews) {
                state.user.myreviews = [];
            }

            // 이미 해당 상품에 리뷰가 있는지 확인 (productId 기준)
            const existingReviewIndex = state.user.myreviews.findIndex(
                (review) => review.productId === action.payload.productId
            );

            // 사용자 ID와 제품 ID가 모두 일치하는 리뷰가 전체 리뷰 목록에 있는지 확인
            let reviewsExist = false;
            try {
                const allReviews = JSON.parse(localStorage.getItem('reviews')) || [];
                reviewsExist = allReviews.some(
                    (review) => review.id === state.user.id && review.productId === action.payload.productId
                );
            } catch (error) {
                console.error('전체 리뷰 확인 중 오류:', error);
            }

            // 내 리뷰나 전체 리뷰에 이미 존재하면 업데이트, 아니면 새로 추가
            if (existingReviewIndex !== -1 || reviewsExist) {
                if (existingReviewIndex !== -1) {
                    // 기존 리뷰 업데이트
                    state.user.myreviews[existingReviewIndex] = action.payload;
                }
            } else {
                // 새 리뷰 추가
                state.user.myreviews.push(action.payload);
            }

            // users 배열에서도 업데이트
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = storedUsers.findIndex((u) => u.id === state.user.id);
            if (userIndex !== -1) {
                storedUsers[userIndex].myreviews = state.user.myreviews;
                localStorage.setItem('users', JSON.stringify(storedUsers));
            }

            // currentUser 업데이트
            localStorage.setItem('currentUser', JSON.stringify(state.user));
        },
        // 리뷰 삭제
        removeMyReview: (state, action) => {
            if (!state.user || !state.user.myreviews) return;

            // productId로 리뷰 필터링
            state.user.myreviews = state.user.myreviews.filter(
                (review) => review.productId !== action.payload.productId
            );

            // users 배열에서도 업데이트
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = storedUsers.findIndex((u) => u.id === state.user.id);
            if (userIndex !== -1) {
                storedUsers[userIndex].myreviews = state.user.myreviews;
                localStorage.setItem('users', JSON.stringify(storedUsers));
            }

            // currentUser 업데이트
            localStorage.setItem('currentUser', JSON.stringify(state.user));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKakaoLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getKakaoLogin.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.newUser) {
                    const newUser = {
                        id: no++,
                        ...action.payload.newUser,
                        favorites: [],
                        myreviews: [],
                    };
                    state.joinData.push(newUser);
                }
                const user = action.payload.user;
                if (!user.reservations) {
                    user.reservations = [];
                }
                if (!user.favorites) {
                    user.favorites = [];
                }
                if (!user.myreviews) {
                    user.myreviews = [];
                }
                state.authed = true;
                state.user = user;
                console.log('카카오 로그인 성공:', action.payload);
            })
            .addCase(getKakaoLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error('카카오 로그인 실패:', action.payload);
            });
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
