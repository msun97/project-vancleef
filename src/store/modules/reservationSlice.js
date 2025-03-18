import { createSlice } from '@reduxjs/toolkit';

// 로컬 스토리지에서 전체 예약 데이터 불러오기
const loadReservationsFromLocalStorage = () => {
    try {
        const storedReservations = localStorage.getItem('reservations');
        return storedReservations ? JSON.parse(storedReservations) : [];
    } catch (error) {
        console.error('로컬 스토리지에서 예약 정보를 불러오는 중 오류 발생:', error);
        return [];
    }
};

// 로컬 스토리지에서 현재 진행 중인 예약 데이터 불러오기 (앱 시작 시)
const loadReservationFromLocalStorage = () => {
    try {
        const storedReservation = localStorage.getItem('reservation');
        return storedReservation ? JSON.parse(storedReservation) : null;
    } catch (error) {
        console.error('로컬 스토리지에서 예약 정보를 불러오는 중 오류 발생:', error);
        return null;
    }
};

// 현재 로그인한 사용자의 ID 가져오기
const getCurrentUserId = () => {
    try {
        const currentUser = localStorage.getItem('currentUser');
        return currentUser ? JSON.parse(currentUser).userid : null;
    } catch (error) {
        console.error('현재 사용자 정보를 불러오는 중 오류 발생:', error);
        return null;
    }
};

// 예약 완료 및 저장 (사용자 정보 포함) - 최종 단계에서만 호출
const saveCompletedReservation = (reservation) => {
    try {
        // 현재 로그인한 사용자 ID 가져오기
        const userId = getCurrentUserId();

        // 예약에 고유 ID 추가
        const reservationWithId = {
            ...reservation,
            reservationId: Date.now().toString(), // 고유 ID 생성
            userId: userId, // 사용자 ID 추가 (비로그인 시 null)
        };

        // 1. 전체 예약 목록에 저장 (reservations)
        const allReservations = loadReservationsFromLocalStorage();
        allReservations.push(reservationWithId);
        localStorage.setItem('reservations', JSON.stringify(allReservations));

        // 2. 로그인한 사용자인 경우 사용자의 예약 목록(myreservations)에도 추가
        if (userId) {
            // myreservations 업데이트
            let myReservations = [];
            try {
                const storedMyReservations = localStorage.getItem('myreservations');
                myReservations = storedMyReservations ? JSON.parse(storedMyReservations) : [];
            } catch (e) {
                console.error('내 예약 정보를 불러오는 중 오류 발생:', e);
                myReservations = [];
            }

            myReservations.push(reservationWithId);
            localStorage.setItem('myreservations', JSON.stringify(myReservations));

            // 3. users 로컬 스토리지에서 해당 사용자의 정보에도 예약 추가
            try {
                const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = storedUsers.findIndex((user) => user.userid === userId);

                if (userIndex !== -1) {
                    // 사용자에게 myreservations 배열이 없으면 생성
                    if (!storedUsers[userIndex].myreservations) {
                        storedUsers[userIndex].myreservations = [];
                    }

                    // 사용자의 예약 목록에 추가
                    storedUsers[userIndex].myreservations.push(reservationWithId);
                    localStorage.setItem('users', JSON.stringify(storedUsers));

                    // 4. 현재 로그인한 사용자 정보도 업데이트
                    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    if (currentUser && currentUser.userid === userId) {
                        if (!currentUser.myreservations) {
                            currentUser.myreservations = [];
                        }
                        currentUser.myreservations.push(reservationWithId);
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    }
                }
            } catch (e) {
                console.error('사용자 정보 업데이트 중 오류 발생:', e);
            }
        }

        // 5. 현재 예약 정보도 로컬 스토리지에 업데이트 (진행 중인 예약 상태 추적용)
        localStorage.setItem('reservation', JSON.stringify(reservationWithId));

        return reservationWithId;
    } catch (error) {
        console.error('예약 정보를 저장하는 중 오류 발생:', error);
        return null;
    }
};

const initialState = {
    reservation: loadReservationFromLocalStorage() || {
        // 1. 부티크 선택
        location: {
            country: '',
            city: '',
            boutique: '',
            boutiqueId: null,
        },
        // 2. 방문 목적
        purpose: {
            productConsultation: false,
            repairService: false,
            selectedOption: '', // 제품 상담 시: 목걸이, 반지, 귀걸이, 팔찌 / 수리 서비스 시: 수리 제품 수령, 수리 제품 픽업
        },
        // 3. 예약 상세정보
        details: {
            date: new Date().toISOString().split('T')[0],
            time: '',
            preferredLanguage: '',
            message: '',
        },
        // 4. 개인 정보
        personalInfo: {
            gender: '', // 남성 or 여성
            firstNameKor: '',
            lastNameKor: '',
            firstNameEng: '',
            lastNameEng: '',
            phone: '',
            email: '',
            country: '',
            privacyAgreement: false,
            marketingAgreement: false,
            ageVerification: false,
        },
        // 카테고리 및 상품 ID (URL 파라미터)
        category: '',
        productId: '',
        // 예약 상태
        status: 'incomplete', // incomplete, pending, confirmed, cancelled
        createdAt: null,
    },
    allReservations: loadReservationsFromLocalStorage(),
    currentStep: 1, // 현재 예약 단계 (1: 부티크 선택, 2: 방문 목적, 3: 예약 상세, 4: 개인 정보, 5: 완료)
    isSubmitting: false,
    error: null,
};

export const reservationSlice = createSlice({
    name: 'reservationR', // 기존 코드에 맞게 이름 변경
    initialState,
    reducers: {
        // 부티크 위치 정보 설정 - 로컬 스토리지 저장 제거
        setLocation: (state, action) => {
            state.reservation.location = {
                ...state.reservation.location,
                ...action.payload,
            };
            // 로컬 스토리지 저장은 최종 단계에서만 수행
        },

        // 방문 목적 설정 - 로컬 스토리지 저장 제거
        setPurpose: (state, action) => {
            state.reservation.purpose = {
                ...state.reservation.purpose,
                ...action.payload,
            };
            // 로컬 스토리지 저장은 최종 단계에서만 수행
        },

        // 예약 상세 정보 설정 - 로컬 스토리지 저장 제거
        setReservationDetails: (state, action) => {
            state.reservation.details = {
                ...state.reservation.details,
                ...action.payload,
            };
            // 로컬 스토리지 저장은 최종 단계에서만 수행
        },

        // 개인 정보 설정 - 로컬 스토리지 저장 제거
        setPersonalInfo: (state, action) => {
            state.reservation.personalInfo = {
                ...state.reservation.personalInfo,
                ...action.payload,
            };
            // 로컬 스토리지 저장은 최종 단계에서만 수행
        },

        // URL 파라미터로 받은 카테고리와 상품 ID 설정 - 로컬 스토리지 저장 제거
        setCategoryAndProductId: (state, action) => {
            const { category, id } = action.payload;
            state.reservation.category = category || '';
            state.reservation.productId = id || '';
            // 로컬 스토리지 저장은 최종 단계에서만 수행
        },

        // 현재 예약 단계 변경 및 진행 상태 저장
        // 단계가 변경될 때만 로컬 스토리지에 저장 (단계 전환 시점)
        setCurrentStep: (state, action) => {
            const newStep = action.payload;
            state.currentStep = newStep;

            // 단계가 변경될 때 현재 상태를 로컬 스토리지에 저장
            // 이를 통해 앱이 종료되고 다시 시작될 때 이어서 입력할 수 있음
            if (newStep !== state.currentStep) {
                localStorage.setItem('reservation', JSON.stringify(state.reservation));
            }
        },

        // 예약 상태 변경
        setReservationStatus: (state, action) => {
            state.reservation.status = action.payload;

            // 예약이 완료되면 생성 시간 추가
            if (action.payload === 'pending' && !state.reservation.createdAt) {
                state.reservation.createdAt = new Date().toISOString();
            }

            // 상태 변경 시에는 로컬 스토리지에 저장 (중요한 상태 변경이므로)
            localStorage.setItem('reservation', JSON.stringify(state.reservation));
        },

        // 예약 완료 및 저장 - 최종 단계에서만 호출
        completeReservation: (state) => {
            // 현재 예약 상태 업데이트
            state.reservation.status = 'pending';
            state.reservation.createdAt = new Date().toISOString();

            // 예약 완료 처리 및 저장 (여기서 최종적으로 로컬 스토리지에 저장)
            const savedReservation = saveCompletedReservation(state.reservation);

            if (savedReservation) {
                // 저장된 예약 정보로 갱신
                state.reservation = savedReservation;
                state.allReservations = loadReservationsFromLocalStorage();
            }
        },

        // 전체 예약 정보 설정 (초기화 또는 불러오기 시)
        setReservation: (state, action) => {
            state.reservation = action.payload;
            // 전체 설정 시에는 로컬 스토리지에 저장 (중요한 상태 변경이므로)
            localStorage.setItem('reservation', JSON.stringify(action.payload));
        },

        // 예약 정보 초기화
        resetReservation: (state) => {
            state.reservation = initialState.reservation;
            state.currentStep = 1;
            state.isSubmitting = false;
            state.error = null;
            localStorage.removeItem('reservation');
        },

        // 제출 상태 설정
        setSubmitting: (state, action) => {
            state.isSubmitting = action.payload;
        },

        // 오류 설정
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const reservationActions = reservationSlice.actions;
export default reservationSlice.reducer;
