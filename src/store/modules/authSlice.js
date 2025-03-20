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

// 현재 사용자의 myreservations 가져오기
const loadMyReservations = () => {
    try {
        return JSON.parse(localStorage.getItem('myreservations')) || [];
    } catch (error) {
        console.error('myreservations를 불러오는 중 오류 발생:', error);
        return [];
    }
};

// 사용자와 사용자의
const syncUserReservations = (user) => {
    if (!user) return null;

    // myreservations 가져오기
    const myReservations = loadMyReservations();

    // 사용자 객체에 myreservations 동기화
    const updatedUser = {
        ...user,
        myreservations: myReservations,
    };

    // users 스토리지에서 해당 사용자 업데이트
    try {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = storedUsers.findIndex((u) => u.userid === user.userid);

        if (userIndex !== -1) {
            storedUsers[userIndex] = {
                ...storedUsers[userIndex],
                myreservations: myReservations,
            };
            localStorage.setItem('users', JSON.stringify(storedUsers));
        }
    } catch (error) {
        console.error('users 업데이트 중 오류 발생:', error);
    }

    // 현재 사용자 업데이트
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    return updatedUser;
};

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
                birth: user.birth,
                gender: user.gender,
                reservations: [],
                favorites: [],
                reviews: [],
                product: [],
                cart: [],
                ccInquiries: [],
                viewedProduct: [],
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

                    // 사용자 myreservations 동기화
                    const myReservations = loadMyReservations().filter(
                        (reservation) => reservation.userId === user.userid
                    );
                    localStorage.setItem('myreservations', JSON.stringify(myReservations));

                    // 사용자 객체 업데이트 (myreservations 추가)
                    const updatedUser = {
                        ...user,
                        myreservations: myReservations,
                    };

                    state.authed = true;
                    state.user = updatedUser;
                    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
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
            localStorage.removeItem('myreservations'); // 로그아웃 시 myreservations 삭제
        },
        restoreAuthState: (state) => {
            const savedAuthed = localStorage.getItem('authed') === 'true';
            let savedUser = JSON.parse(localStorage.getItem('currentUser'));

            if (savedAuthed && savedUser) {
                // myreservations와 동기화
                savedUser = syncUserReservations(savedUser);

                state.authed = true;
                state.user = savedUser;
            }
        },
        setSignUpComplete: (state, action) => {
            state.isSignUpComplete = action.payload;
        },
        loginSuccess: (state, action) => {
            const userData = action.payload;
            // myreservations로 이름 변경
            if (!userData.myreservations) {
                userData.myreservations = [];
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
        // Replace the updatePassword function in your authSlice.js with this improved version
        updatePassword: (state, action) => {
            const { currentPassword, newPassword, userId } = action.payload;

            if (state.user && state.user.password === currentPassword) {
                // Update password in state
                state.user.password = newPassword;

                // Update user ID if it has changed
                if (userId && userId !== state.user.userid) {
                    state.user.userid = userId;
                }

                // Update current user in localStorage
                localStorage.setItem('currentUser', JSON.stringify(state.user));

                // Update user in joinData state
                state.joinData = state.joinData.map((user) =>
                    user.userid === state.user.userid || (userId && user.userid === state.user.userid)
                        ? {
                              ...user,
                              password: newPassword,
                              userid: userId || user.userid,
                          }
                        : user
                );

                // Update users in localStorage
                localStorage.setItem('users', JSON.stringify(state.joinData));

                console.log('사용자 정보가 성공적으로 변경되었습니다.');
            } else {
                console.error('현재 비밀번호가 일치하지 않습니다.');
            }
        },
        addReservation: (state, action) => {
            if (state.user) {
                // myreservations로 이름 변경
                state.user.myreservations = state.user.myreservations || [];
                state.user.myreservations.push(action.payload);

                // 로컬 스토리지 업데이트
                localStorage.setItem('currentUser', JSON.stringify(state.user));

                // myreservations 업데이트
                const myReservations = loadMyReservations();
                myReservations.push(action.payload);
                localStorage.setItem('myreservations', JSON.stringify(myReservations));

                // users 업데이트
                syncUserReservations(state.user);
            }
        },
        addfavorites: (state, action) => {
            if (!state.user) return;
            if (!state.user.favorites) {
                state.user.favorites = [];
            }

            const exists = state.user.favorites.find((item) => item.productid === action.payload.productid);
            if (!exists) {
                // currentUser(user)에 추가
                state.user.favorites.push(action.payload);

                // users 배열에도 업데이트
                state.joinData = state.joinData.map((item) =>
                    item.userid === state.user.userid
                        ? {
                              ...item,
                              favorites: item.favorites ? [...item.favorites, action.payload] : [action.payload],
                          }
                        : item
                );

                // localStorage 업데이트
                localStorage.setItem('currentUser', JSON.stringify(state.user));
                localStorage.setItem('users', JSON.stringify(state.joinData));
            }
        },
        removeFavorite: (state, action) => {
            if (!state.user || !state.user.favorites) return;

            // currentUser에서 제거
            state.user.favorites = state.user.favorites.filter((item) => item.productid !== action.payload.productid);

            // users 배열에서도 제거
            state.joinData = state.joinData.map((item) =>
                item.userid === state.user.userid
                    ? {
                          ...item,
                          favorites: item.favorites
                              ? item.favorites.filter((favItem) => favItem.productid !== action.payload.productid)
                              : [],
                      }
                    : item
            );

            // localStorage 업데이트
            localStorage.setItem('currentUser', JSON.stringify(state.user));
            localStorage.setItem('users', JSON.stringify(state.joinData));
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
        addccInquiry: (state, action) => {
            if (!state.user) return;
            if (!state.user.ccInquiries) {
                state.user.ccInquiries = [];
            }
            state.joinData = state.joinData.map((item) =>
                item.userid === state.user.userid
                    ? { ...item, ccInquiries: item.ccInquiries ? item.ccInquiries : [] }
                    : item
            );
            const no = state.user.ccInquiries.length + 1;
            const addData = { ...action.payload, id: no };
            state.user.ccInquiries = [...state.user.ccInquiries, addData];
            state.joinData = state.joinData.map((item) =>
                item.userid === state.user.userid ? { ...item, ccInquiries: [...item.ccInquiries, addData] } : item
            );
            localStorage.setItem('currentUser', JSON.stringify(state.user));
            localStorage.setItem('users', JSON.stringify(state.joinData));
        },
        isPurchaseNext: (state, action) => {
            if (!state.user) return;
            state.user = {
                ...state.user,
                isPurchaseNext: action.payload,
            };
            state.joinData = state.joinData.map((item) =>
                item.userid === state.user.userid ? { ...item, isPurchaseNext: action.payload } : item
            );
            localStorage.setItem('currentUser', JSON.stringify(state.user));
            localStorage.setItem('users', JSON.stringify(state.joinData));
        },
        whatPurchase: (state, action) => {
            if (!state.user) return;
            state.user = {
                ...state.user,
                whatPurchase: action.payload,
            };
            state.joinData = state.joinData.map((item) =>
                item.userid === state.user.userid ? { ...item, whatPurchase: action.payload } : item
            );
            localStorage.setItem('currentUser', JSON.stringify(state.user));
            localStorage.setItem('users', JSON.stringify(state.joinData));
        },
        completePurchase: (state, action) => {
            if (!state.user) return;
            state.user = {
                ...state.user,
                completePurchase: action.payload,
            };
            state.joinData = state.joinData.map((item) =>
                item.userid === state.user.userid ? { ...item, completePurchase: action.payload } : item
            );
            localStorage.setItem('currentUser', JSON.stringify(state.user));
            localStorage.setItem('users', JSON.stringify(state.joinData));
        },
        updateJoinData: (state, action) => {
            state.joinData = action.payload;
            localStorage.setItem('users', JSON.stringify(state.joinData));
        },
        updateUserInfo: (state, action) => {
            if (state.user) {
                // 모든 필드 업데이트
                const updatedUser = {
                    ...state.user,
                    ...action.payload,
                };

                // 로컬 스토리지의 현재 사용자 업데이트
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));

                // users 배열에서 해당 사용자 찾아 업데이트
                const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
                const userIndex = storedUsers.findIndex((u) => u.userid === updatedUser.userid);

                if (userIndex !== -1) {
                    // 사용자 정보 업데이트
                    storedUsers[userIndex] = {
                        ...storedUsers[userIndex],
                        ...action.payload,
                    };

                    // users 배열 다시 로컬 스토리지에 저장
                    localStorage.setItem('users', JSON.stringify(storedUsers));
                }

                // Redux 상태 업데이트
                state.user = updatedUser;
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
                // myreservations로 이름 변경
                if (!user.myreservations) {
                    user.myreservations = [];
                }
                if (!user.favorites) {
                    user.favorites = [];
                }
                // 리뷰 배열도 없으면 초기화 (추가)
                if (!user.reviews) {
                    user.reviews = [];
                }

                // 로그인 시 myreservations 동기화
                const updatedUser = syncUserReservations(user);

                state.authed = true;
                state.user = updatedUser || user;
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
