import { createSlice } from '@reduxjs/toolkit';
import { getKakaoLogin } from './kakaogetThunks';

const initialState = {
    joinData: [],
    authed: false,
    user: '',
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

        login: (state, action) => {
            const { id_email, password } = action.payload;
            const cleanedEmail = id_email.toLowerCase().trim();
            const storedUser = localStorage.getItem('user_' + cleanedEmail);

            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.password === password) {
                    console.log('로그인 성공', user);
                    // 예약정보 필드 기본값 할당 (없다면)
                    if (!user.reservations) {
                        user.reservations = [];
                    }
                    // UI 컴포넌트에서는 Redux의 useSelector를 통해 state.auth.user.reservations를 조회하여 예약정보를 렌더링합니다.
                    // 예약정보 추가 액션은 예를 들어 예약 완료 후 dispatch하여 처리할 수 있습니다.

                    state.authed = true;
                    state.user = user;
                    localStorage.setItem('authed', 'true');
                    localStorage.setItem('user__로그인정보', JSON.stringify(user));
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
        },

        signup: (state, action) => {
            const user = action.payload;
            state.joinData.push({ id: no++, ...user });
            localStorage.setItem('userIdCounter', no);

            // 예약정보 필드를 기본값으로 추가
            const member = {
                usernum: no,
                userid: user.id_email,
                email: user.email,
                password: user.password,
                username: user.username,
                tel: user.telFirst + user.telSecond + user.telThird,
                reservations: [], // 예약정보 초기화
            };
            localStorage.setItem('user_' + user.id_email, JSON.stringify(member));
        },

        setSignUpComplete: (state, action) => {
            state.isSignUpComplete = action.payload;
        },

        loginSuccess: (state, action) => {
            const userData = action.payload;
            if (!userData.reservations) {
                userData.reservations = [];
            }
            state.authed = true;
            state.user = userData;
        },

        restoreAuthState: (state) => {
            const savedAuthed = localStorage.getItem('authed') === 'true';
            if (savedAuthed) {
                const savedUser = JSON.parse(localStorage.getItem('user'));
                state.authed = true;
                state.user = savedUser;
            }
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

        // 예약정보 추가 액션
        addReservation: (state, action) => {
            if (state.user) {
                state.user.reservations = state.user.reservations || [];
                state.user.reservations.push(action.payload);
                localStorage.setItem('user__로그인정보', JSON.stringify(state.user));
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
                // 카카오 로그인 성공 시에도 예약정보 기본값 할당
                const user = action.payload.user;
                if (!user.reservations) {
                    user.reservations = [];
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
