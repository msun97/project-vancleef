import { useEffect, useRef, useState } from 'react';
import Button from '../button';

// 단순히 위치만 보여주는 지도 모달
const MapModal = ({ isOpen, onClose, locationData }) => {
    const mapRef = useRef(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [kakaoMapObject, setKakaoMapObject] = useState(null);

    // 카카오맵 스크립트 로드 (한 번만 실행)
    useEffect(() => {
        // 이미 전역에 카카오맵이 있으면 로드하지 않음
        if (window.kakao && window.kakao.maps) {
            setIsMapLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=e1bd847fea79c1138b1471eb5a697207&autoload=false&libraries=services`;

        script.onload = () => {
            window.kakao.maps.load(() => {
                setIsMapLoaded(true);
            });
        };

        script.onerror = (error) => {
            console.error('카카오맵 스크립트 로드 실패:', error);
            setErrorMessage('지도 스크립트를 로드하는데 실패했습니다.');
        };

        document.head.appendChild(script);
    }, []);

    // 지도 초기화
    useEffect(() => {
        if (!isOpen || !isMapLoaded || !locationData || !mapRef.current) return;

        try {
            // 지도 컨테이너
            const container = mapRef.current;
   

            // 주소-좌표 변환 객체 생성
            const geocoder = new window.kakao.maps.services.Geocoder();

            // 주소 -> 좌표 변환
            geocoder.addressSearch(locationData.address, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                
                    const position = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                    // 지도 옵션
                    const options = {
                        center: position, // 주소의 좌표를 중심으로
                        level: 3, // 확대 레벨
                    };

                    // 지도 객체 생성
                    const map = new window.kakao.maps.Map(container, options);
                    setKakaoMapObject(map);

                    // 마커 생성
                    const marker = new window.kakao.maps.Marker({
                        position: position,
                        map: map,
                    });

                    // 인포윈도우
                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;font-size:12px;">${locationData.boutique}</div>`,
                    });
                    infowindow.open(map, marker);

                    // 지도 크기 재조정
                    setTimeout(() => {
                        map.relayout();
                    }, 100);
                } else {
                    console.error('주소 검색 실패:', status);
                    setErrorMessage('주소를 찾을 수 없습니다.');
                }
            });
        } catch (error) {
            console.error('지도 초기화 오류:', error);
            setErrorMessage('지도를 로드하는 중 오류가 발생했습니다.');
        }
    }, [isMapLoaded, locationData, isOpen]);

    // 카카오맵 웹에서 열기
    const openKakaoMap = () => {
        if (!locationData) return;

        try {
            const geocoder = new window.kakao.maps.services.Geocoder();

            geocoder.addressSearch(locationData.address, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const position = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                    window.open(
                        `https://map.kakao.com/link/map/${
                            locationData.boutique
                        },${position.getLat()},${position.getLng()}`
                    );
                } else {
                    setErrorMessage('주소를 찾을 수 없습니다.');
                }
            });
        } catch (error) {
            console.error('카카오맵 열기 오류:', error);
            setErrorMessage('카카오맵을 여는 중 오류가 발생했습니다.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 w-11/12 max-w-2xl max-h-[90vh] flex flex-col'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold'>위치 정보</h2>
                    <button onClick={onClose} className='text-gray-500'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
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
                    <p className='font-medium'>{locationData?.boutique}</p>
                    <p className='text-gray-600'>{locationData?.address}</p>
                </div>

                {errorMessage && (
                    <div className='bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4'>
                        {errorMessage}
                    </div>
                )}

                <div
                    ref={mapRef}
                    id='kakao-map'
                    className='w-full h-96 bg-gray-100 rounded mb-4'
                    style={{ display: errorMessage ? 'none' : 'block' }}
                ></div>

                <div className='flex gap-2 mt-auto'>
                    <Button className='w-1/2' variant='secondary' onClick={onClose}>
                        닫기
                    </Button>
                    <Button className='w-1/2' onClick={openKakaoMap} disabled={!!errorMessage}>
                        카카오맵으로 열기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MapModal;
