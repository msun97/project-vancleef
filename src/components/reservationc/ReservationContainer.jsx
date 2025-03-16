import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reservationActions } from '../../store/modules/reservationSlice';
import ReservationStep from './ReservationStep';
import LocationResultList from './LocationResultList';
import PurposeForm from './PurposeForm';
import ReservationDetailForm from './ReservationDetailForm';
import PrivateInfoForm from './PrivateInfoForm';
import ReservationComplete from './ReservationComplete';

const ReservationContainer = () => {
    const dispatch = useDispatch();
    const { currentStep, reservation } = useSelector((state) => state.reservationR);

    // 컴포넌트 마운트 시 예약 상태 확인
    useEffect(() => {
        // 로컬 스토리지에 저장된 데이터가 있는지 확인
        const storedReservation = localStorage.getItem('reservation');

        if (storedReservation) {
            const parsedReservation = JSON.parse(storedReservation);

            // 예약 상태에 따라 단계 설정
            if (parsedReservation.status === 'pending' || parsedReservation.status === 'confirmed') {
                dispatch(reservationActions.setCurrentStep(5)); // 예약 완료
            } else {
                // 이미 완료된 단계까지 설정
                let step = 1;

                if (parsedReservation.location && parsedReservation.location.boutiqueId) {
                    step = 2;
                }

                if (
                    parsedReservation.purpose &&
                    (parsedReservation.purpose.productConsultation || parsedReservation.purpose.repairService) &&
                    parsedReservation.purpose.selectedOption
                ) {
                    step = 3;
                }

                if (
                    parsedReservation.details &&
                    parsedReservation.details.time &&
                    parsedReservation.details.preferredLanguage
                ) {
                    step = 4;
                }

                if (
                    parsedReservation.personalInfo &&
                    parsedReservation.personalInfo.gender &&
                    parsedReservation.personalInfo.privacyAgreement
                ) {
                    step = 5;
                }

                dispatch(reservationActions.setCurrentStep(step));
            }
        }
    }, [dispatch]);

    // LocationResultList 컴포넌트를 위한 아이템 선택 핸들러
    const handleLocationSelect = (locationData) => {
        dispatch(reservationActions.setLocation(locationData));
        dispatch(reservationActions.setCurrentStep(2));
    };

    // PurposeForm 컴포넌트를 위한 확인 버튼 핸들러
    const handlePurposeConfirm = (purposeData) => {
        dispatch(reservationActions.setPurpose(purposeData));
        dispatch(reservationActions.setCurrentStep(3));
    };

    // ReservationDetailForm 컴포넌트를 위한 확인 버튼 핸들러
    const handleDetailsConfirm = (detailsData) => {
        dispatch(reservationActions.setReservationDetails(detailsData));
        dispatch(reservationActions.setCurrentStep(4));
    };

    // PrivateInfoForm 컴포넌트를 위한 확인 버튼 핸들러
    const handlePersonalInfoConfirm = (personalInfoData) => {
        dispatch(reservationActions.setPersonalInfo(personalInfoData));
        dispatch(reservationActions.setReservationStatus('pending'));
        dispatch(reservationActions.setCurrentStep(5));
    };

    return (
        <div className='container mx-auto px-4 max-w-screen-lg'>
            {/* 예약 완료된 단계 표시 */}
            <ReservationComplete />

            {/* 현재 진행 중인 단계만 표시 */}
            <ReservationStep stepNumber={1} title='부티크 선택'>
                <LocationResultList onSelect={handleLocationSelect} />
            </ReservationStep>

            <ReservationStep stepNumber={2} title='방문 목적'>
                <PurposeForm onConfirm={handlePurposeConfirm} />
            </ReservationStep>

            <ReservationStep stepNumber={3} title='예약 상세정보'>
                <ReservationDetailForm onConfirm={handleDetailsConfirm} />
            </ReservationStep>

            <ReservationStep stepNumber={4} title='개인 정보'>
                <PrivateInfoForm onConfirm={handlePersonalInfoConfirm} />
            </ReservationStep>
        </div>
    );
};

export default ReservationContainer;
