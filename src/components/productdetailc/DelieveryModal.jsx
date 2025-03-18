import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const DelieveryModal = ({ handleModal, modalType }) => {
    // 모달 컨테이너에 대한 ref 생성
    const modalRef = useRef(null);

    useEffect(() => {
        // 원래 body의 overflow 스타일 저장
        const originalStyle = window.getComputedStyle(document.body).overflow;
        // body에 overflow: hidden 적용
        document.body.style.overflow = 'hidden';

        // GSAP 애니메이션 설정
        // 모달 시작 위치를 viewport 오른쪽 바깥으로 설정하고, 애니메이션으로 원래 위치로 이동
        if (modalRef.current) {
            // 초기 상태 설정 (viewport 바깥에서 시작)
            gsap.set(modalRef.current, {
                x: '100%', // 오른쪽 바깥에서 시작
                opacity: 0,
            });

            // 애니메이션 실행
            gsap.to(modalRef.current, {
                x: '0%', // 원래 위치로 이동
                opacity: 1,
                duration: 0.5, // 애니메이션 시간 (초)
                ease: 'power3.out', // 이징 함수 (부드러운 마무리)
            });
        }

        // 컴포넌트가 언마운트될 때 원래 스타일로 되돌림
        return () => {
            document.body.style.overflow = originalStyle;

            // 컴포넌트 언마운트 시 애니메이션 역방향 실행 (선택 사항)
            if (modalRef.current) {
                gsap.to(modalRef.current, {
                    x: '100%',
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                });
            }
        };
    }, []);

    // 모달 닫기 함수
    const closeModal = () => {
        // 닫기 애니메이션
        gsap.to(modalRef.current, {
            x: '100%',
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => handleModal(modalType), // 애니메이션 완료 후 모달 처리 함수 호출
        });
    };

    return (
        <div className='fixed bg-[rgba(0,0,0,0.5)] w-full h-full top-0 left-0' style={{ zIndex: 9999 }}>
            <div className='relative h-full'>
                <div ref={modalRef} className='absolute top-0 right-0 w-[450px] bg-white h-full overflow-y-scroll'>
                    <div className='flex flex-col items-center px-[60px] py-[50px] text-start relative'>
                        <button onClick={closeModal}>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 48 49'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='absolute top-[47px] right-[68px]'
                            >
                                <path
                                    d='M10.8281 9.55029L8.67188 11.7065L21.8438 24.8784L8.67188 38.0503L10.8281 40.2065L24 27.0347L37.1719 40.2065L39.3281 38.0503L26.1562 24.8784L39.3281 11.7065L37.1719 9.55029L24 22.7222L10.8281 9.55029Z'
                                    fill='#1C1C1E'
                                />
                            </svg>
                        </button>

                        <h2 className='text-[18px] font-bold'>여행, 배송, 결제</h2>
                        <div className='w-full mt-4 pt-4 flex flex-col gap-1.5 items-start'>
                            <h3 className='text-[18px] font-bold tracking-normal'>여행</h3>
                            <p className='text-[15px]'>
                                유럽, 아랍에미리트에서의 전화 주문 시 비거주자를 위한 VAT 환급 혜택을 받을 수 있습니다.
                                담당 직원에게 연락하셔서 혜택 수령 가능 여부를 확인하세요.
                            </p>
                        </div>
                        <div className='w-full border-t mt-8 pt-8 flex flex-col gap-1.5 items-start'>
                            <h3 className='text-[18px] font-bold tracking-normal'>배송, 반품 & 교환</h3>
                            <p className='text-[15px]'>
                                반클리프 아펠의 모든 온라인 주문에 대해 프리미엄 배송이 무료로 제공됩니다.
                            </p>
                            <p className='text-[15px]'>
                                반품 및 교환은 온라인 주문 후 배송일로부터 30일 이내에 가능합니다. 편리한 시간에 집에서
                                수령하실 수도 있습니다.
                            </p>
                            <p className='text-[15px]'>
                                <u>담당 직원에게 전화로 연락하셔서 서비스를 조정할 수 있습니다.</u>
                            </p>
                            <p className='text-[15px]'>
                                맞춤 제작 또는 인그레이빙을 한 제품, 손상된 제품은 반품이 불가합니다. 메종에서는 반품된
                                제품을 수령한 후 품질 검사를 시행합니다. 해당 절차에 대한 추가 정보를 보내드릴 예정이며,
                                14일 이내에 환불이 이루어질 수 있습니다.
                            </p>
                        </div>
                        <div className='w-full border-t mt-8 pt-8 flex flex-col gap-1.5 items-start'>
                            <h3 className='text-[18px] font-bold tracking-normal'>결제</h3>
                            <p className='text-[15px]'>반클리프 아펠은 다양한 안전 결제 옵션을 제공합니다.</p>
                            <div className='flex gap-2 items-center'>
                                <div className='w-[50px] h-[30px] overflow-hidden'>
                                    <img
                                        src='https://i.namu.wiki/i/DRTBUHA314XYTx-pkzY4XSmQ0Job0j10vQhiETotjLCGUULQemriSC67Yh9UCsYq7Dw7WyvK0GkP9f3jP8r8gA.svg'
                                        alt='카카오페이'
                                        className='w-[50px] h-[30px] object-cover'
                                    />
                                </div>
                                <div className='w-[50px] h-[30px] overflow-hidden'>
                                    <img
                                        src='https://mblogthumb-phinf.pstatic.net/MjAyNDA3MDVfMjUy/MDAxNzIwMTY0MDIxMzIx.hSgfp4jQc9chL4hTHWeGHhPBqRwCwV3xQ-Ex3Or-gHkg.pvAeG3mmXyeVe08nQsIXKOamCZzH3yu8o3XUnkMEOdEg.PNG/image.png?type=w800'
                                        alt='네이버페이'
                                        className='w-[50px] h-[30px] object-cover'
                                    />
                                </div>
                            </div>
                            <p className='text-[15px]'>
                                전화, 이메일, 채팅을 통해 반클리프 아펠 직원에게 연락하여 자세한 내용을 확인할 수
                                있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DelieveryModal;
