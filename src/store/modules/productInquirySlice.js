import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = {
    inquiries: JSON.parse(localStorage.getItem('inquiries') || '[]'),
    myInquiries: JSON.parse(localStorage.getItem('myInquiries') || '[]'),
    currentId: null,
    inquiryItem: [],
};

const productInquirySlice = createSlice({
    name: 'productInquiry',
    initialState,
    reducers: {
        handleItem: (state, action) => {
            state.inquiryItem = action.payload;
            localStorage.setItem('inquiryItem', JSON.stringify(state.inquiryItem));
        },

        // 현재 사용자 설정
        setCurrentUser: (state, action) => {
            state.currentId = action.payload;

            // 현재 사용자의 모든 문의 필터링
            if (action.payload) {
                // 로컬스토리지에서 최신 inquiries 가져오기
                const allInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');

                // 현재 사용자가 작성한 문의만 필터링
                state.myInquiries = allInquiries.filter((inquiry) => inquiry.id === action.payload);

                // myInquiries 로컬스토리지에 저장
                localStorage.setItem('myInquiries', JSON.stringify(state.myInquiries));
                console.log('사용자 설정 후 myInquiries:', state.myInquiries);
            }
        },

        // 문의 추가
        addInquiry: (state, action) => {
            // 현재 사용자 정보 가져오기
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
            console.log('현재 사용자 정보:', currentUser);

            // id 확인 (currentUser.id 사용)
            const userId = currentUser.id || action.payload.id;
            console.log('사용할 사용자 ID:', userId);

            // category와 productId 확인
            const { category, productId } = action.payload;

            // 이미 해당 상품에 대한 문의가 있는지 확인
            const existingInquiryIndex = state.inquiries.findIndex(
                (inquiry) => inquiry.id === userId && inquiry.category === category && inquiry.productId === productId
            );

            // 새 문의 객체 생성
            const newInquiry = {
                id: userId, // 사용자 ID를 문의 ID로 사용
                inquiryId: Date.now(), // 고유한 문의 ID 추가
                ...action.payload,
                date: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
                status: '접수완료',
                hasResponse: false,
            };

            console.log('생성된 문의 객체:', newInquiry);

            if (existingInquiryIndex !== -1) {
                // 이미 문의가 있으면 업데이트
                state.inquiries[existingInquiryIndex] = newInquiry;
                console.log('기존 문의 업데이트');
            } else {
                // 새 문의 추가
                state.inquiries.push(newInquiry);
                console.log('새 문의 추가');
            }

            // inquiries 로컬스토리지에 저장
            localStorage.setItem('inquiries', JSON.stringify(state.inquiries));

            // myInquiries 업데이트 (무조건 추가)
            // 내 문의 중에서 해당 상품에 대한 문의가 있는지 확인
            const myInquiryIndex = state.myInquiries.findIndex(
                (inquiry) => inquiry.category === category && inquiry.productId === productId
            );

            if (myInquiryIndex !== -1) {
                // 이미 문의가 있으면 업데이트
                state.myInquiries[myInquiryIndex] = newInquiry;
                console.log('내 문의 업데이트');
            } else {
                // 새 문의 추가
                state.myInquiries.push(newInquiry);
                console.log('내 문의 추가');
            }

            // myInquiries 로컬스토리지에 저장
            localStorage.setItem('myInquiries', JSON.stringify(state.myInquiries));
            console.log('저장 후 myInquiries:', state.myInquiries);

            // currentUser에 myInquiries 추가
            if (currentUser && currentUser.id) {
                if (!currentUser.myInquiries) {
                    currentUser.myInquiries = [];
                }

                // currentUser.myInquiries 업데이트
                const existingInquiry = currentUser.myInquiries.findIndex(
                    (inquiry) => inquiry.category === category && inquiry.productId === productId
                );

                if (existingInquiry !== -1) {
                    currentUser.myInquiries[existingInquiry] = newInquiry;
                } else {
                    currentUser.myInquiries.push(newInquiry);
                }

                // currentUser 업데이트
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }

            // ----------- 추가된 부분: users 로컬스토리지 업데이트 -----------
            // users 목록 가져오기
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            console.log('현재 users 목록:', users);

            // 해당 사용자 찾기
            const userIndex = users.findIndex((user) => user.id === userId || user.userid === userId);

            if (userIndex !== -1) {
                // 사용자가 존재하는 경우
                const user = users[userIndex];

                // user.myInquiries가 없으면 배열 초기화
                if (!user.myInquiries) {
                    user.myInquiries = [];
                }

                // 사용자의 myInquiries 업데이트
                const userInquiryIndex = user.myInquiries.findIndex(
                    (inquiry) =>
                        (inquiry.category === category || inquiry.category === category) &&
                        (inquiry.productId === productId || inquiry.productid === productId)
                );

                if (userInquiryIndex !== -1) {
                    // 기존 문의가 있으면 업데이트
                    user.myInquiries[userInquiryIndex] = newInquiry;
                } else {
                    // 새 문의 추가
                    user.myInquiries.push(newInquiry);
                }

                // users 배열 업데이트
                users[userIndex] = user;

                // users 로컬스토리지에 저장
                localStorage.setItem('users', JSON.stringify(users));
                console.log('users에 myInquiries 업데이트:', user.myInquiries);
            } else {
                console.log('해당 ID의 사용자를 users에서 찾을 수 없습니다:', userId);
            }
            // ----------- 추가된 부분 끝 -----------
        },

        // 문의 업데이트
        updateInquiry: (state, action) => {
            const { inquiryId, ...changes } = action.payload;

            // 전체 문의 업데이트
            const inquiryIndex = state.inquiries.findIndex((item) => item.inquiryId === inquiryId);
            if (inquiryIndex !== -1) {
                state.inquiries[inquiryIndex] = {
                    ...state.inquiries[inquiryIndex],
                    ...changes,
                };
                localStorage.setItem('inquiries', JSON.stringify(state.inquiries));
            }

            // 내 문의 업데이트
            const myInquiryIndex = state.myInquiries.findIndex((item) => item.inquiryId === inquiryId);
            if (myInquiryIndex !== -1) {
                state.myInquiries[myInquiryIndex] = {
                    ...state.myInquiries[myInquiryIndex],
                    ...changes,
                };
                localStorage.setItem('myInquiries', JSON.stringify(state.myInquiries));
            }

            // currentUser의 myInquiries도 업데이트
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.myInquiries) {
                const userInquiryIndex = currentUser.myInquiries.findIndex((item) => item.inquiryId === inquiryId);
                if (userInquiryIndex !== -1) {
                    currentUser.myInquiries[userInquiryIndex] = {
                        ...currentUser.myInquiries[userInquiryIndex],
                        ...changes,
                    };
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
            }

            // ----------- 추가된 부분: users 로컬스토리지 업데이트 -----------
            // 문의 작성자 ID 가져오기 (state.inquiries에서 해당 문의 찾기)
            let userId = null;
            if (inquiryIndex !== -1) {
                userId = state.inquiries[inquiryIndex].id;
            }

            if (userId) {
                // users 목록 가져오기
                const users = JSON.parse(localStorage.getItem('users') || '[]');

                // 해당 사용자 찾기
                const userIndex = users.findIndex((user) => user.id === userId || user.userid === userId);

                if (userIndex !== -1) {
                    const user = users[userIndex];

                    // myInquiries가 있는지 확인
                    if (user.myInquiries && Array.isArray(user.myInquiries)) {
                        // 수정할 문의 찾기
                        const userInquiryIndex = user.myInquiries.findIndex((item) => item.inquiryId === inquiryId);

                        if (userInquiryIndex !== -1) {
                            // 문의 업데이트
                            user.myInquiries[userInquiryIndex] = {
                                ...user.myInquiries[userInquiryIndex],
                                ...changes,
                            };

                            // users 배열 업데이트
                            users[userIndex] = user;

                            // users 로컬스토리지에 저장
                            localStorage.setItem('users', JSON.stringify(users));
                            console.log('users에서 문의 업데이트 완료:', user.myInquiries);
                        }
                    }
                }
            }
            // ----------- 추가된 부분 끝 -----------
        },

        // 문의 삭제
        deleteInquiry: (state, action) => {
            const inquiryId = action.payload;

            // 삭제 전에 문의 작성자 ID를 저장해둡니다.
            let userId = null;
            const inquiryToDelete = state.inquiries.find((inquiry) => inquiry.inquiryId === inquiryId);
            if (inquiryToDelete) {
                userId = inquiryToDelete.id;
            }

            // 전체 문의에서 삭제
            state.inquiries = state.inquiries.filter((inquiry) => inquiry.inquiryId !== inquiryId);
            localStorage.setItem('inquiries', JSON.stringify(state.inquiries));

            // 내 문의에서 삭제
            state.myInquiries = state.myInquiries.filter((inquiry) => inquiry.inquiryId !== inquiryId);
            localStorage.setItem('myInquiries', JSON.stringify(state.myInquiries));

            // currentUser의 myInquiries에서도 삭제
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.myInquiries) {
                currentUser.myInquiries = currentUser.myInquiries.filter((inquiry) => inquiry.inquiryId !== inquiryId);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }

            // ----------- 추가된 부분: users 로컬스토리지 업데이트 -----------
            if (userId) {
                // users 목록 가져오기
                const users = JSON.parse(localStorage.getItem('users') || '[]');

                // 해당 사용자 찾기
                const userIndex = users.findIndex((user) => user.id === userId || user.userid === userId);

                if (userIndex !== -1) {
                    const user = users[userIndex];

                    // myInquiries가 있는지 확인
                    if (user.myInquiries && Array.isArray(user.myInquiries)) {
                        // 문의 삭제
                        user.myInquiries = user.myInquiries.filter((inquiry) => inquiry.inquiryId !== inquiryId);

                        // users 배열 업데이트
                        users[userIndex] = user;

                        // users 로컬스토리지에 저장
                        localStorage.setItem('users', JSON.stringify(users));
                        console.log('users에서 문의 삭제 완료');
                    }
                }
            }
            // ----------- 추가된 부분 끝 -----------
        },

        // 응답 추가
        addResponse: (state, action) => {
            const { inquiryId, response } = action.payload;

            // 응답 추가 전 문의 작성자 ID를 저장해둡니다.
            let userId = null;
            const inquiryToUpdate = state.inquiries.find((inquiry) => inquiry.inquiryId === inquiryId);
            if (inquiryToUpdate) {
                userId = inquiryToUpdate.id;
            }

            // 전체 문의 응답 추가
            const inquiryIndex = state.inquiries.findIndex((item) => item.inquiryId === inquiryId);
            if (inquiryIndex !== -1) {
                state.inquiries[inquiryIndex] = {
                    ...state.inquiries[inquiryIndex],
                    response,
                    hasResponse: true,
                    status: '답변완료',
                };
                localStorage.setItem('inquiries', JSON.stringify(state.inquiries));
            }

            // 내 문의 응답 추가
            const myInquiryIndex = state.myInquiries.findIndex((item) => item.inquiryId === inquiryId);
            if (myInquiryIndex !== -1) {
                state.myInquiries[myInquiryIndex] = {
                    ...state.myInquiries[myInquiryIndex],
                    response,
                    hasResponse: true,
                    status: '답변완료',
                };
                localStorage.setItem('myInquiries', JSON.stringify(state.myInquiries));
            }

            // currentUser의 myInquiries도 업데이트
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.myInquiries) {
                const userInquiryIndex = currentUser.myInquiries.findIndex((item) => item.inquiryId === inquiryId);
                if (userInquiryIndex !== -1) {
                    currentUser.myInquiries[userInquiryIndex] = {
                        ...currentUser.myInquiries[userInquiryIndex],
                        response,
                        hasResponse: true,
                        status: '답변완료',
                    };
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
            }

            // ----------- 추가된 부분: users 로컬스토리지 업데이트 -----------
            if (userId) {
                // users 목록 가져오기
                const users = JSON.parse(localStorage.getItem('users') || '[]');

                // 해당 사용자 찾기
                const userIndex = users.findIndex((user) => user.id === userId || user.userid === userId);

                if (userIndex !== -1) {
                    const user = users[userIndex];

                    // myInquiries가 있는지 확인
                    if (user.myInquiries && Array.isArray(user.myInquiries)) {
                        // 응답 추가할 문의 찾기
                        const userInquiryIndex = user.myInquiries.findIndex((item) => item.inquiryId === inquiryId);

                        if (userInquiryIndex !== -1) {
                            // 응답 추가
                            user.myInquiries[userInquiryIndex] = {
                                ...user.myInquiries[userInquiryIndex],
                                response,
                                hasResponse: true,
                                status: '답변완료',
                            };

                            // users 배열 업데이트
                            users[userIndex] = user;

                            // users 로컬스토리지에 저장
                            localStorage.setItem('users', JSON.stringify(users));
                            console.log('users에 응답 추가 완료');
                        }
                    }
                }
            }
            // ----------- 추가된 부분 끝 -----------
        },

        // 내 문의만 로드
        loadMyInquiries: (state, action) => {
            // currentUser 정보 가져오기
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            console.log('loadMyInquiries에서 확인한 currentUser:', currentUser);

            // id는 action.payload 또는 currentUser.id 사용
            const userId = action.payload || (currentUser ? currentUser.id : null);
            console.log('사용할 사용자 ID:', userId);

            if (!userId) {
                console.log('유효한 사용자 ID가 없습니다.');
                return state.myInquiries;
            }

            // 로컬스토리지에서 최신 inquiries 가져오기
            const allInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
            console.log('전체 문의 개수:', allInquiries.length);

            // 현재 사용자가 작성한 문의만 필터링
            state.myInquiries = allInquiries.filter((inquiry) => inquiry.id === userId);
            console.log('필터링된 내 문의 개수:', state.myInquiries.length);

            // myInquiries 로컬스토리지에 저장
            localStorage.setItem('myInquiries', JSON.stringify(state.myInquiries));

            // currentUser의 myInquiries도 업데이트
            if (currentUser) {
                currentUser.myInquiries = state.myInquiries;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                console.log('currentUser에 myInquiries 업데이트:', state.myInquiries);
            }

            return state.myInquiries;
        },
    },
});

export const productInquiryActions = productInquirySlice.actions;
export default productInquirySlice.reducer;
