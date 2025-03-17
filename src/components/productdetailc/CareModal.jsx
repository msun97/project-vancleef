import { useEffect } from 'react';

const CareModal = ({ handleModal, modalType }) => {
    // 모달이 마운트될 때 body에 overflow: hidden 추가하고
    // 언마운트될 때 제거하는 효과
    useEffect(() => {
        // 원래 body의 overflow 스타일 저장
        const originalStyle = window.getComputedStyle(document.body).overflow;
        // body에 overflow: hidden 적용
        document.body.style.overflow = 'hidden';

        // 컴포넌트가 언마운트될 때 원래 스타일로 되돌림
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);
    return (
        <div className='fixed bg-[rgba(0,0,0,0.5)] w-full h-full top-0 left-0' style={{ zIndex: 9999 }}>
            <div className='relative h-full'>
                <div className='absolute top-0 right-0 w-[450px] bg-white h-full overflow-y-scroll'>
                    <div className='flex flex-col items-center px-[60px] py-[50px] text-start relative'>
                        <button onClick={() => handleModal(modalType)}>
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

                        <h2 className='text-[18px] font-bold'>케어 서비스</h2>
                        <img
                            src='https://www.vancleefarpels.com/content/dam/vancleefarpels/pdp/services-panel/van-cleef-arpels-services-panel-jewelry.jpg.transform.vca-w330-1x.jpg'
                            alt='케어 서비스'
                            className='mt-[50px]'
                        />
                        <p className='mt-[30px] text-[15px]'>
                            반클리프 아펠의 작품은 섬세하고도 탁월한 소재로 제작됩니다. 메종에서는 시간이 지나도 주얼리
                            작품의 아름다움을 유지할 수 있도록 다양한 서비스를 제공합니다.
                        </p>
                        <div className='w-full border-t mt-8 pt-8 flex flex-col gap-1.5 items-start'>
                            <h3 className='text-[18px] font-bold tracking-normal'>서비스 요청</h3>
                            <p className='text-[15px]'>
                                서비스가 필요하실 경우 가장 가까운 부티크를 방문하시어 서비스를 받기 위한 제품을
                                맡기시는 것을 권장드립니다. 반클리프 아펠에서 무상으로 제공하는 자택 픽업 서비스를 통해
                                워크샵으로 제품을 보내는 방법을 이용하실 수도 있습니다. 더 자세한 정보는 케어 & 서비스
                                페이지를 확인해주시기 바랍니다.
                            </p>
                        </div>
                        <div className='w-full border-t mt-8 pt-8 flex flex-col gap-1.5 items-start'>
                            <h3 className='text-[18px] font-bold tracking-normal'>조정</h3>
                            <p className='text-[15px]'>
                                최상의 편안함을 선사할 수 있도록 작품을 완벽하게 조정해 드립니다. 이 서비스는 작품 구매
                                후 12개월 이내에 무료로 제공됩니다.
                                <br /> *일부 작품은 조정이 불가능합니다.
                            </p>
                        </div>
                        <div className='w-full border-t mt-8 pt-8 flex flex-col gap-1.5 items-start'>
                            <h3 className='text-[18px] font-bold tracking-normal'>새로운 광택 서비스</h3>
                            <p className='text-[15px]'>
                                섬세한 클렌징 서비스를 통해 본연의 광채를 드러내고 표면의 스크래치를 제거하여 새롭게
                                반짝이는 모습을 감상할 수 있습니다.
                            </p>
                        </div>
                        <div className='w-full border-t mt-8 pt-8 flex flex-col gap-1.5 items-start'>
                            <h3 className='text-[18px] font-bold tracking-normal'>평생 수리</h3>
                            <p className='text-[15px]'>
                                반클리프 아펠의 전문 주얼러가 지닌 노하우를 바탕으로 고객의 요청에 따라 작품의 하나 또는
                                여러 개의 부품을 복원해드립니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareModal;
