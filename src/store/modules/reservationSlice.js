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

// 로컬 스토리지에서 현재 예약 데이터 불러오기
const loadReservationFromLocalStorage = () => {
    try {
        const storedReservation = localStorage.getItem('reservation');
        return storedReservation ? JSON.parse(storedReservation) : null;
    } catch (error) {
        console.error('로컬 스토리지에서 예약 정보를 불러오는 중 오류 발생:', error);
        return null;
    }
};

// 로컬 스토리지에 예약 데이터 저장
const saveReservationToLocalStorage = (reservation) => {
    try {
        localStorage.setItem('reservation', JSON.stringify(reservation));
    } catch (error) {
        console.error('로컬 스토리지에 예약 정보를 저장하는 중 오류 발생:', error);
    }
};

// 예약 완료 및 사용자별 예약 저장
const saveCompletedReservation = (reservation, userId = null) => {
    try {
        // 예약에 고유 ID 추가
        const reservationWithId = {
            ...reservation,
            reservationId: Date.now().toString(), // 고유 ID 생성
            userId: userId,
        };

        // 1. 모든 예약 목록에 저장
        const allReservations = loadReservationsFromLocalStorage();
        allReservations.push(reservationWithId);
        localStorage.setItem('reservations', JSON.stringify(allReservations));

        // 2. 로그인한 사용자인 경우 사용자 정보에도 예약 추가
        if (userId) {
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

                // 현재 로그인한 사용자 정보도 업데이트
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser && currentUser.userid === userId) {
                    if (!currentUser.myreservations) {
                        currentUser.myreservations = [];
                    }
                    currentUser.myreservations.push(reservationWithId);
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
            }
        }

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
        // 부티크 위치 정보 설정
        setLocation: (state, action) => {
            state.reservation.location = {
                ...state.reservation.location,
                ...action.payload,
            };
            saveReservationToLocalStorage(state.reservation);
        },

        // 방문 목적 설정
        setPurpose: (state, action) => {
            state.reservation.purpose = {
                ...state.reservation.purpose,
                ...action.payload,
            };
            saveReservationToLocalStorage(state.reservation);
        },

        // 예약 상세 정보 설정
        setReservationDetails: (state, action) => {
            state.reservation.details = {
                ...state.reservation.details,
                ...action.payload,
            };
            saveReservationToLocalStorage(state.reservation);
        },

        // 개인 정보 설정
        setPersonalInfo: (state, action) => {
            state.reservation.personalInfo = {
                ...state.reservation.personalInfo,
                ...action.payload,
            };
            saveReservationToLocalStorage(state.reservation);
        },

        // URL 파라미터로 받은 카테고리와 상품 ID 설정
        setCategoryAndProductId: (state, action) => {
            const { category, id } = action.payload;
            state.reservation.category = category || '';
            state.reservation.productId = id || '';
            saveReservationToLocalStorage(state.reservation);
        },

        // 현재 예약 단계 설정
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },

        // 예약 상태 변경
        setReservationStatus: (state, action) => {
            state.reservation.status = action.payload;

            // 예약이 완료되면 생성 시간 추가
            if (action.payload === 'pending' && !state.reservation.createdAt) {
                state.reservation.createdAt = new Date().toISOString();
            }

            saveReservationToLocalStorage(state.reservation);
        },

        // 예약 완료 및 저장 (사용자 정보 포함)
        completeReservation: (state, action) => {
            const userId = action.payload; // 로그인한 사용자의 ID (비로그인 시 null)

            // 현재 예약 상태 업데이트
            state.reservation.status = 'pending';
            state.reservation.createdAt = new Date().toISOString();

            // 예약 완료 처리 및 저장
            const savedReservation = saveCompletedReservation(state.reservation, userId);

            if (savedReservation) {
                // 저장된 예약 정보로 갱신
                state.reservation = savedReservation;
                state.allReservations = loadReservationsFromLocalStorage();
                saveReservationToLocalStorage(state.reservation);
            }
        },

        // 전체 예약 정보 설정 (초기화 또는 불러오기 시)
        setReservation: (state, action) => {
            state.reservation = action.payload;
            saveReservationToLocalStorage(state.reservation);
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
