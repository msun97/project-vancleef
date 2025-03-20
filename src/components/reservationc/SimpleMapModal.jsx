import { useRef } from 'react';
import Button from '../button';

// iframe을 사용한 카카오맵 임베드 컴포넌트 (크기 2배)
const SimpleMapModal = ({ isOpen, onClose, placeName = '반클리프앤아펠 서울' }) => {
    const encodedPlace = encodeURIComponent(placeName);
    const mapUrl = `https://map.kakao.com/link/search/${encodedPlace}`;

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50'>
            {/* 모달 컨테이너 크기 증가: max-w-2xl -> max-w-5xl, 너비 조정 */}
            <div className='bg-white rounded-lg p-6 w-[95%] max-w-5xl max-h-[95vh] flex flex-col'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-2xl font-semibold'>위치 정보</h2> {/* 제목 크기도 키움 */}
                    <button onClick={onClose} className='text-gray-500'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='28' /* 아이콘 크기 증가 */
                            height='28'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        >
                            <line x1='18' y1='6' x2='6' y2='18'></line>
                            <line x1='6' y1='6' x2='18' y2='18'></line>
                        </svg>
                    </button>
                </div>

                <div className='mb-4'>
                    <p className='text-lg font-medium'>{placeName}</p> {/* 텍스트 크기 증가 */}
                </div>

                {/* iframe 컨테이너 높이 증가: h-96 -> h-[500px] */}
                <div className='w-full h-[500px] rounded mb-6 overflow-hidden'>
                    <iframe
                        title='카카오맵'
                        width='100%'
                        height='100%'
                        frameBorder='0'
                        src={mapUrl}
                        allowFullScreen
                    ></iframe>
                </div>

                {/* 버튼 크기 및 패딩 증가 */}
                <div className='flex gap-4 mt-auto'>
                    <Button className='w-1/2 text-lg py-3' variant='secondary' onClick={onClose}>
                        닫기
                    </Button>
                    <Button className='w-1/2 text-lg py-3' onClick={() => window.open(mapUrl, '_blank')}>
                        카카오맵으로 열기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SimpleMapModal;
