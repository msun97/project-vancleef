import React from 'react';

const ReservationComplete = () => {
    return (
        <div className='border-t-2 mb-[70px] w-full'>
            <h3 className='font-secondary text-[20px] pt-[30px] pb-[40px]'>예약 확인</h3>
            <div className='flex flex-col w-[560px] bg-gray-10 px-5 pb-5 mx-auto'>
                <span className='pt-5 text-[14px] text-gray-60' style={{ letterSpacing: '1.5px' }}>
                    부티크 선택
                </span>
                <div className='flex items-center justify-between gap-4'>
                    <p className='pt-[10px]'>장소</p>
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
                    <p className='pt-[10px]'>장소</p>
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
                        <p className='pt-[10px]'>예약 날짜 시간</p>
                        <p className='pt-[10px] mt-[4px] text-[14px]'>매장 내</p>
                    </div>
                    <button className='text-[13px]'>편집</button>
                </div>
            </div>
        </div>
    );
};

export default ReservationComplete;
