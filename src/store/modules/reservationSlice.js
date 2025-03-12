import { createSlice } from '@reduxjs/toolkit';

// 로컬 스토리지에서 예약 데이터 불러오기
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
            repairType: '', // 수리 제품 수령 or 수리 제품 픽업
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
        // 예약 상태
        status: 'incomplete', // incomplete, pending, confirmed, cancelled
        createdAt: null,
    },
    currentStep: 1, // 현재 예약 단계 (1: 부티크 선택, 2: 방문 목적, 3: 예약 상세, 4: 개인 정보)
    isSubmitting: false,
    error: null,
};

export const reservationSlice = createSlice({
    name: 'reservation',
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
