import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reservationActions } from '../../store/modules/reservationSlice';

const ReservationComplete = () => {
    const dispatch = useDispatch();
    const { reservation, currentStep } = useSelector((state) => state.reservationR);
    const { location, purpose, details } = reservation;

    // 추가: 완료 상태를 관리하는 로컬 상태
    const [showCompletion, setShowCompletion] = useState(reservation.status === 'pending');

    // 현재 스텝이 변경될 때마다 완료 상태 업데이트
    useEffect(() => {
        if (currentStep < 4) {
            setShowCompletion(false);
        } else if (
            reservation.status === 'pending' &&
            currentStep > 3 &&
            location.boutiqueId &&
            (purpose.productConsultation || purpose.repairService) &&
            purpose.selectedOption &&
            details.date &&
            details.time &&
            details.preferredLanguage
        ) {
            setShowCompletion(true);
        }
    }, [currentStep, reservation.status, location, purpose, details]);

    // 방문 목적 텍스트 생성 함수
    const getPurposeText = () => {
        if (purpose.productConsultation) {
            return `반클리프 아펠 제품 상담 - ${purpose.selectedOption}`;
        } else if (purpose.repairService) {
            return `수리 서비스 - ${purpose.selectedOption}`;
        }
        return '방문 목적이 선택되지 않았습니다.';
    };

    // 각 섹션 편집 핸들러
    const handleEditLocation = () => {
        // 편집 시 완료 메시지 숨김
        setShowCompletion(false);
        dispatch(reservationActions.setCurrentStep(1));
    };

    const handleEditPurpose = () => {
        // 편집 시 완료 메시지 숨김
        setShowCompletion(false);
        dispatch(reservationActions.setCurrentStep(2));
    };

    const handleEditDetails = () => {
        // 편집 시 완료 메시지 숨김
        setShowCompletion(false);
        dispatch(reservationActions.setCurrentStep(3));
    };

    return (
        <div className='mb-[70px] w-full'>
            {/* 1단계 이상 완료된 경우에만 '예약 확인' 제목 표시 */}
            {currentStep > 1 && location.boutiqueId && (
                <h3 className='border-t-2 font-secondary text-[20px] pt-[30px] pb-[20px]'>예약 확인</h3>
            )}

            {/* 1단계: 부티크 선택 결과 */}
            {currentStep > 1 && location.boutiqueId && (
                <div className='flex flex-col w-[560px] bg-gray-10 px-5 pb-5 mx-auto '>
                    <span className='pt-5 text-[14px] text-gray-60' style={{ letterSpacing: '1.5px' }}>
                        부티크 선택
                    </span>
                    <div className='flex items-center justify-between gap-4'>
                        <p className='pt-[10px]'>{location.boutique}</p>
                        <button className='text-[13px]' onClick={handleEditLocation}>
                            편집
                        </button>
                    </div>
                </div>
            )}

            {/* 2단계: 방문 목적 결과 */}
            {currentStep > 2 && (purpose.productConsultation || purpose.repairService) && purpose.selectedOption && (
                <div className='flex flex-col w-[560px] bg-gray-10 px-5 pb-5 mx-auto '>
                    <span
                        className='pt-5 text-[14px] text-gray-60 border-t border-gray-30'
                        style={{ letterSpacing: '1.5px' }}
                    >
                        방문 목적
                    </span>
                    <div className='flex items-center justify-between gap-4'>
                        <p className='pt-[10px]'>{getPurposeText()}</p>
                        <button className='text-[13px]' onClick={handleEditPurpose}>
                            편집
                        </button>
                    </div>
                </div>
            )}

            {/* 3단계: 예약 상세정보 결과 */}
            {currentStep > 3 && details.date && details.time && details.preferredLanguage && (
                <div className='flex flex-col w-[560px] bg-gray-10 px-5 pb-5 mx-auto '>
                    <span
                        className='pt-5 text-[14px] text-gray-60 border-t border-gray-30'
                        style={{ letterSpacing: '1.5px' }}
                    >
                        예약 상세 정보
                    </span>
                    <div className='flex items-center justify-between gap-4'>
                        <div className='flex flex-col'>
                            <p className='pt-[10px]'>
                                {details.date} {details.time}
                            </p>
                            <p className='pt-[10px] mt-[4px] text-[14px]'>매장 내</p>
                        </div>
                        <button className='text-[13px]' onClick={handleEditDetails}>
                            편집
                        </button>
                    </div>
                </div>
            )}

            {/* 최종 확인 - 모든 단계가 완료되었을 때만 표시 */}
            {showCompletion && (
                <div className='flex flex-col w-[560px] mx-auto mt-8'>
                    <div className='bg-gray-900 text-white text-center py-3 font-secondary'>예약이 완료되었습니다</div>
                </div>
            )}
        </div>
    );
};

export default ReservationComplete;
