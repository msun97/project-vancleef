import React from 'react';
import { useSelector } from 'react-redux';

const ReservationComplete = () => {
    const { reservation } = useSelector((state) => state.reservationR);
    const { location, purpose, details } = reservation;

    // 방문 목적 텍스트 생성 함수
    const getPurposeText = () => {
        if (purpose.productConsultation) {
            return `반클리프 아펠 제품 상담 - ${purpose.selectedOption}`;
        } else if (purpose.repairService) {
            return `수리 서비스 - ${purpose.selectedOption}`;
        }
        return '방문 목적이 선택되지 않았습니다.';
    };

    return (
        <div className='border-t-2 mb-[70px] w-full'>
            <h3 className='font-secondary text-[20px] pt-[30px] pb-[20px]'>예약 확인</h3>
            <div className='flex flex-col w-[560px] bg-gray-10 px-5 pb-5 mx-auto'>
                <span className='pt-5 text-[14px] text-gray-60' style={{ letterSpacing: '1.5px' }}>
                    부티크 선택
                </span>
                <div className='flex items-center justify-between gap-4'>
                    <p className='pt-[10px]'>{location.boutique}</p>
                    <button className='text-[13px]'>편집</button>
                </div>
            </div>
            <div className='flex flex-col w-[560px] bg-gray-10 px-5 pb-5 mx-auto'>
                <span
                    className='pt-5 text-[14px] text-gray-60 border-t border-gray-30'
                    style={{ letterSpacing: '1.5px' }}
                >
                    방문 목적
                </span>
                <div className='flex items-center justify-between gap-4'>
                    <p className='pt-[10px]'>{getPurposeText()}</p>
                    <button className='text-[13px]'>편집</button>
                </div>
            </div>
            <div className='flex flex-col w-[560px] bg-gray-10 px-5 pb-5 mx-auto'>
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
                    <button className='text-[13px]'>편집</button>
                </div>
            </div>
        </div>
    );
};

export default ReservationComplete;
