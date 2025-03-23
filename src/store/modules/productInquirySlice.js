import { createSlice } from '@reduxjs/toolkit';

// 로컬 스토리지에서 초기 상태 로드
const loadInquiriesFromStorage = () => {
    try {
        // 로컬 스토리지에서 저장된 inquiries 가져오기
        const savedInquiries = localStorage.getItem('inquiries');
        return savedInquiries ? JSON.parse(savedInquiries) : [];
    } catch (error) {
        return [];
    }
};

// 로컬 스토리지에서 사용자 문의 로드
const loadUserInquiriesFromStorage = () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser && Array.isArray(currentUser.myInquiries) ? currentUser.myInquiries : [];
    } catch (error) {
        return [];
    }
};

// 로컬 스토리지에 inquiries 저장
const saveInquiriesToStorage = (inquiries) => {
    try {
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
    } catch (error) {
    }
};

// 초기 상태 구성
const initialState = {
    // 로컬 스토리지에서 데이터 로드 또는 빈 배열로 초기화
    inquiries: loadInquiriesFromStorage(),
    myInquiries: [], // myInquiries는 loadMyInquiries 액션에서 설정
    editMode: {
        isEditing: false,
        editData: null,
    },
};

const productInquirySlice = createSlice({
    name: 'productInquiry',
    initialState,
    reducers: {
        // 문의 추가
        // addInquiry 리듀서만 수정한 부분
        addInquiry: (state, action) => {

            // 새로운 문의 객체 생성 (inquiryId 보장)
            const newInquiry = {
                ...action.payload,
                inquiryId: action.payload.inquiryId || Date.now(),
            };

            // inquiries 배열에 추가
            state.inquiries.push(newInquiry);

            // 먼저 현재 사용자 ID 확인 (여러 필드명 고려)
            const currentUserId = newInquiry.id || newInquiry.usernum || newInquiry.userId;

            // 항상 myInquiries에도 추가 - 사용자 ID 검사는 하지 않음
            // (내 문의를 작성하는 것이므로 무조건 myInquiries에 추가)
            state.myInquiries.push(newInquiry);

            // 로컬스토리지에 전체 inquiries 저장
            try {
                localStorage.setItem('inquiries', JSON.stringify(state.inquiries));
            } catch (error) {
            }

            // 로컬스토리지의 currentUser에도 저장
            try {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    if (!Array.isArray(currentUser.myInquiries)) {
                        currentUser.myInquiries = [];
                    }

                    // 새 문의 추가
                    currentUser.myInquiries.push(newInquiry);
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                } else {
                }
            } catch (error) {
            }
        },

        // 문의 업데이트
        updateInquiry: (state, action) => {
            const { inquiryId } = action.payload;

            // inquiries 배열 업데이트
            const inquiryIndex = state.inquiries.findIndex((inquiry) => inquiry.inquiryId === inquiryId);
            if (inquiryIndex !== -1) {
                state.inquiries[inquiryIndex] = action.payload;

                // 로컬 스토리지에 업데이트된 inquiries 저장
                saveInquiriesToStorage(state.inquiries);
            }

            // myInquiries 배열 업데이트
            const myInquiryIndex = state.myInquiries.findIndex((inquiry) => inquiry.inquiryId === inquiryId);
            if (myInquiryIndex !== -1) {
                state.myInquiries[myInquiryIndex] = action.payload;
            }

            // 로컬스토리지 업데이트
            try {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser && Array.isArray(currentUser.myInquiries)) {
                    const localIndex = currentUser.myInquiries.findIndex((inquiry) => inquiry.inquiryId === inquiryId);
                    if (localIndex !== -1) {
                        currentUser.myInquiries[localIndex] = action.payload;
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    }
                }
            } catch (error) {
            }
        },

        // 문의 삭제
        deleteInquiry: (state, action) => {
            const inquiryId = action.payload;

            // Redux state에서 제거
            state.inquiries = state.inquiries.filter((inquiry) => inquiry.inquiryId !== inquiryId);
            state.myInquiries = state.myInquiries.filter((inquiry) => inquiry.inquiryId !== inquiryId);

            // 로컬 스토리지의 inquiries 업데이트
            saveInquiriesToStorage(state.inquiries);

            // 로컬스토리지 currentUser 업데이트
            try {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser && Array.isArray(currentUser.myInquiries)) {
                    currentUser.myInquiries = currentUser.myInquiries.filter(
                        (inquiry) => inquiry.inquiryId !== inquiryId
                    );
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
            } catch (error) {
            }
        },

        // 내 문의 불러오기
        loadMyInquiries: (state, action) => {
            const userId = action.payload;

            // 유효성 검사
            if (!userId) {
                state.myInquiries = [];
                return;
            }

            // 다양한 ID 필드를 고려해서 문의 필터링
            let filteredInquiries = state.inquiries.filter(
                (inquiry) => inquiry.id === userId || inquiry.usernum === userId || inquiry.userId === userId
            );

            // 로컬스토리지에서 추가 문의 로드
            try {
                // 1. 전체 inquiries에서 필터링
                const savedInquiries = loadInquiriesFromStorage();
                const storageInquiries = savedInquiries.filter(
                    (inquiry) => inquiry.id === userId || inquiry.usernum === userId || inquiry.userId === userId
                );

                // 2. currentUser.myInquiries에서 필터링
                const userInquiries = loadUserInquiriesFromStorage().filter(
                    (inquiry) => inquiry.id === userId || inquiry.usernum === userId || inquiry.userId === userId
                );

                // 중복 제거를 위해 Map 사용
                const inquiryMap = new Map();

                // state.inquiries에서 가져온 항목 추가
                filteredInquiries.forEach((inquiry) => {
                    const key = inquiry.inquiryId || inquiry.id;
                    if (key) inquiryMap.set(key, inquiry);
                });

                // 로컬 스토리지의 inquiries에서 가져온 항목 추가
                storageInquiries.forEach((inquiry) => {
                    const key = inquiry.inquiryId || inquiry.id;
                    if (key) inquiryMap.set(key, inquiry);
                });

                // currentUser.myInquiries에서 가져온 항목 추가
                userInquiries.forEach((inquiry) => {
                    const key = inquiry.inquiryId || inquiry.id;
                    if (key) inquiryMap.set(key, inquiry);
                });

                // Map에서 배열로 변환
                const combinedInquiries = Array.from(inquiryMap.values());

                // 날짜순 정렬
                combinedInquiries.sort((a, b) => {
                    const dateA = new Date(a.date || 0);
                    const dateB = new Date(b.date || 0);
                    return dateB - dateA;
                });

                state.myInquiries = combinedInquiries;
            } catch (error) {
                state.myInquiries = filteredInquiries;
            }
        },

        // 수정 모드 활성화
        setEditMode: (state, action) => {
            state.editMode = {
                isEditing: true,
                editData: action.payload.inquiryData,
            };
        },

        // 수정 모드 해제
        resetEditMode: (state) => {
            state.editMode = {
                isEditing: false,
                editData: null,
            };
        },

        // 이전 코드와의 호환성을 위한 함수 유지
        handleItem: (state, action) => {
            // App.jsx 경로 변경으로 인해 필요없어진 기능이지만 기존 호출을 위해 유지
        },
    },
});

export const productInquiryActions = productInquirySlice.actions;
export default productInquirySlice.reducer;
