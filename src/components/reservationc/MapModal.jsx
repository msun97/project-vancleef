import { useEffect, useRef, useState } from 'react';
import Button from '../button';

// props로 location 정보 직접 받기
const MapModal = ({ isOpen, onClose, locationData }) => {
    const mapRef = useRef(null);
    const [currentPosition, setCurrentPosition] = useState(null);
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
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
            import.meta.env.VITE_KAKAO_JAVASCRIPT_KEYTWO
        }&autoload=false&libraries=services`;

        script.onload = () => {
            window.kakao.maps.load(() => {
                setIsMapLoaded(true);
            });
        };

        document.head.appendChild(script);

        // 클린업 함수는 필요 없음 (전역 스크립트 유지)
    }, []);

    // 현재 위치 가져오기
    const getCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setErrorMessage('');
                },
                (error) => {
                    console.error('위치 정보를 가져오는데 실패했습니다:', error);
                    setErrorMessage('위치 정보를 가져오는데 실패했습니다. 위치 접근 권한을 확인해주세요.');
                }
            );
        } else {
            setErrorMessage('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
        }
    };

    // 모달이 열리면 현재 위치 가져오기
    useEffect(() => {
        if (isOpen) {
            getCurrentPosition();
        } else {
            // 모달 닫힐 때 지도 객체 정리
            setKakaoMapObject(null);
        }
    }, [isOpen]);

    // 지도 초기화 (현재 위치와 지도 로드 상태가 변경될 때)
    useEffect(() => {
        if (!isOpen || !isMapLoaded || !currentPosition || !locationData || !mapRef.current) return;

        try {
            // 지도 컨테이너
            const container = mapRef.current;

            // 지도 옵션
            const options = {
                center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
                level: 3,
            };

            // 지도 객체 생성
            const map = new window.kakao.maps.Map(container, options);
            setKakaoMapObject(map);

            // 주소-좌표 변환 객체 생성
            const geocoder = new window.kakao.maps.services.Geocoder();

            // 부티크 주소 -> 좌표 변환
            geocoder.addressSearch(locationData.address, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const boutiquePosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                    // 출발지 마커 생성
                    const startMarker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
                        map: map,
                    });

                    // 출발지 인포윈도우
                    const startInfowindow = new window.kakao.maps.InfoWindow({
                        content: '<div style="padding:5px;font-size:12px;">현재 위치</div>',
                    });
                    startInfowindow.open(map, startMarker);

                    // 도착지 마커 생성
                    const endMarker = new window.kakao.maps.Marker({
                        position: boutiquePosition,
                        map: map,
                    });

                    // 도착지 인포윈도우
                    const endInfowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;font-size:12px;">${locationData.boutique}</div>`,
                    });
                    endInfowindow.open(map, endMarker);

                    // 경로 그리기
                    const linePath = [
                        new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
                        boutiquePosition,
                    ];

                    const polyline = new window.kakao.maps.Polyline({
                        path: linePath,
                        strokeWeight: 5,
                        strokeColor: '#1C1C1E',
                        strokeOpacity: 0.7,
                        strokeStyle: 'solid',
                    });

                    polyline.setMap(map);

                    // 지도 범위 재설정
                    const bounds = new window.kakao.maps.LatLngBounds();
                    bounds.extend(new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng));
                    bounds.extend(boutiquePosition);
                    map.setBounds(bounds);

                    // 지도 크기 재조정
                    setTimeout(() => {
                        map.relayout();
                        map.setBounds(bounds);
                    }, 100);
                } else {
                    setErrorMessage('주소를 찾을 수 없습니다.');
                }
            });
        } catch (error) {
            console.error('지도 초기화 오류:', error);
            setErrorMessage('지도를 로드하는 중 오류가 발생했습니다.');
        }
    }, [isMapLoaded, currentPosition, locationData, isOpen]);

    // 카카오맵 길찾기 앱/웹 열기
    const openKakaoMapNavigation = () => {
        if (!currentPosition || !locationData) return;

        try {
            const geocoder = new window.kakao.maps.services.Geocoder();

            geocoder.addressSearch(locationData.address, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const boutiqueLatLng = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                    // 모바일이면 앱 열기, 아니면 웹에서 열기
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                        navigator.userAgent
                    );

                    if (isMobile) {
                        window.location.href = `kakaomap://route?sp=${currentPosition.lat},${
                            currentPosition.lng
                        }&ep=${boutiqueLatLng.getLat()},${boutiqueLatLng.getLng()}&by=CAR`;
                    } else {
                        window.open(
                            `https://map.kakao.com/link/to/${
                                locationData.boutique
                            },${boutiqueLatLng.getLat()},${boutiqueLatLng.getLng()}`
                        );
                    }
                } else {
                    setErrorMessage('주소를 찾을 수 없습니다.');
                }
            });
        } catch (error) {
            console.error('길찾기 열기 오류:', error);
            setErrorMessage('길찾기를 여는 중 오류가 발생했습니다.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 w-11/12 max-w-2xl max-h-[90vh] flex flex-col'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold'>길찾기</h2>
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
                    <div className='flex items-center mb-2'>
                        <div className='w-2 h-2 rounded-full bg-blue-500 mr-2'></div>
                        <p>출발: 현재 위치</p>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-2 h-2 rounded-full bg-red-500 mr-2'></div>
                        <p>
                            도착: {locationData?.boutique}, {locationData?.address}
                        </p>
                    </div>
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
                    <Button
                        className='w-1/2'
                        onClick={openKakaoMapNavigation}
                        disabled={!currentPosition || !!errorMessage}
                    >
                        카카오맵으로 열기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MapModal;
