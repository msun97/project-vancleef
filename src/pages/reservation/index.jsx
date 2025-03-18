import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { reservationActions } from '../../store/modules/reservationSlice';
import ReservationComplete from '../../components/reservationc/ReservationComplete';
import ReservationStep from '../../components/reservationc/ReservationStep';
import LocationResultList from '../../components/reservationc/LocationResultList';
import PurposeForm from '../../components/reservationc/PurposeForm';
import ReservationDetailForm from '../../components/reservationc/ReservationDetailForm';
import PrivateInfoForm from '../../components/reservationc/PrivateInfoForm';

const ReservationPage = () => {
    const dispatch = useDispatch();
    const { currentStep } = useSelector((state) => state.reservationR);
    const reservationItem = JSON.parse(localStorage.getItem('reservationItem')) || {};
    const { category, id } = reservationItem;

		

    // 컴포넌트 마운트 시 URL 파라미터 저장 및 예약 상태 확인
    useEffect(() => {
        // URL 파라미터가 있는 경우 저장
        if (category || id) {
            dispatch(reservationActions.setCategoryAndProductId({ category, id }));
        }

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
    }, [dispatch, category, id]);

    return (
        <div className='pt-[80px] px-[545px] w-full'>
            <h2 className='font-secondary font-bold text-[36px] text-center pb-[80px]'>예약 요청</h2>
            {/* 예약 완료된 단계 표시 */}
            <ReservationComplete />

            {/* 현재 진행 중인 단계만 표시 */}
            <ReservationStep stepNumber={1}>
                <LocationResultList />
            </ReservationStep>

            <ReservationStep stepNumber={2}>
                <PurposeForm />
            </ReservationStep>

            <ReservationStep stepNumber={3}>
                <ReservationDetailForm />
            </ReservationStep>

            <ReservationStep stepNumber={4}>
                <PrivateInfoForm />
            </ReservationStep>
        </div>
    );
};

export default ReservationPage;
