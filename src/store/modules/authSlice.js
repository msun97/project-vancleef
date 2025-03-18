import { createSlice } from '@reduxjs/toolkit';
import { getKakaoLogin } from './kakaogetThunks';

const initialState = {
    joinData: JSON.parse(localStorage.getItem('users')) || [],
    authed: JSON.parse(localStorage.getItem('authed')) || false,
    user: JSON.parse(localStorage.getItem('currentUser')) || null,
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
                reviews: [], // 리뷰 목록 초기화
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
            localStorage.removeItem('myreviews');
            localStorage.removeItem('myInquiries');
            // localStorage.removeItem('myreservations');
        },
        restoreAuthState: (state) => {
            const savedAuthed = localStorage.getItem('authed') === 'true';
            const savedUser = JSON.parse(localStorage.getItem('currentUser'));
            if (savedAuthed && savedUser) {
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
            if (!userData.favorites) {
                userData.favorites = [];
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
            if (!state.user) return;
            if (!state.user.favorites) {
                state.user.favorites = [];
            }
            const exists = state.user.favorites.find((item) => item.productid === action.payload.productid);
            if (!exists) {
                state.user.favorites.push(action.payload);
                localStorage.setItem('currentUser', JSON.stringify(state.user));
            }
        },
        removeFavorite: (state, action) => {
            if (!state.user || !state.user.favorites) return;
            state.user.favorites = state.user.favorites.filter((item) => item.productid !== action.payload.productid);
        },
        // addreviews
        addreviews: (state, action) => {
            if (!state.user) return;
            if (!state.user.reviews) {
                state.user.reviews = [];
            }
            const exists = state.user.reviews.find((item) => item.reviewid === action.payload.reviewid);
            if (!exists) {
                state.user.reviews.push(action.payload);
                localStorage.setItem('currentUser', JSON.stringify(state.user));
            }
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
                    state.joinData.push({ id: no++, ...action.payload.newUser });
                }
                const user = action.payload.user;
                if (!user.reservations) {
                    user.reservations = [];
                }
                if (!user.favorites) {
                    user.favorites = [];
                }
                // 리뷰 배열도 없으면 초기화 (추가)
                if (!user.reviews) {
                    user.reviews = [];
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
