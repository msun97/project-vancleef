import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../button';

const MapModal = ({ isOpen, onClose }) => {
    const mapRef = useRef(null);
    const { location } = useSelector((state) => state.reservationR.reservation);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // 카카오맵 스크립트 로드
    useEffect(() => {
        if (!isOpen) return;

        const loadKakaoMap = () => {
            // 이미 스크립트가 로드되어 있는지 확인
            if (window.kakao && window.kakao.maps) {
                setIsMapLoaded(true);
                return;
            }

            const script = document.createElement('script');
            script.async = true;
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
                import.meta.env.VITE_KAKAO_JAVASCRIPT_KEYTWO
            }&autoload=false&libraries=services`;

            script.onload = () => {
                window.kakao.maps.load(() => {
                    setIsMapLoaded(true);
                });
            };

            document.head.appendChild(script);
        };

        loadKakaoMap();

        // 컴포넌트 언마운트 시 스크립트 제거하지 않음 (전역으로 유지)
    }, [isOpen]);

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

    // 지도 초기화 및 길찾기 표시
    useEffect(() => {
        if (!isMapLoaded || !isOpen || !currentPosition || !window.kakao || !window.kakao.maps) return;

        try {
            const container = mapRef.current;
            const options = {
                center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
                level: 3,
            };

            const map = new window.kakao.maps.Map(container, options);

            // 주소-좌표 변환 객체 생성
            const geocoder = new window.kakao.maps.services.Geocoder();

            // 부티크 주소 -> 좌표 변환
            geocoder.addressSearch(location.address, function (result, status) {
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
                        content: `<div style="padding:5px;font-size:12px;">${location.boutique}</div>`,
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
                } else {
                    setErrorMessage('주소를 찾을 수 없습니다.');
                }
            });
        } catch (error) {
            console.error('지도 초기화 오류:', error);
            setErrorMessage('지도를 로드하는 중 오류가 발생했습니다.');
        }
    }, [isMapLoaded, currentPosition, location, isOpen]);

    // 모달이 열리면 현재 위치 가져오기
    useEffect(() => {
        if (isOpen) {
            getCurrentPosition();
        }
    }, [isOpen]);

    // 카카오맵 길찾기 앱/웹 열기
    const openKakaoMapNavigation = () => {
        if (!currentPosition || !window.kakao || !window.kakao.maps) return;

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(location.address, function (result, status) {
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
                            location.boutique
                        },${boutiqueLatLng.getLat()},${boutiqueLatLng.getLng()}`
                    );
                }
            }
        });
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
                            도착: {location.boutique}, {location.address}
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
