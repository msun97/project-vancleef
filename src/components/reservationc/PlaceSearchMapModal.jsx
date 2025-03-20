import { useEffect, useRef, useState } from 'react';
import Button from '../button';

// 장소 검색을 사용한 지도 모달
const PlaceSearchMapModal = ({ isOpen, onClose, placeName }) => {
    const mapRef = useRef(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [placeInfo, setPlaceInfo] = useState(null);

    // 카카오맵 스크립트 로드 (한 번만 실행)
    useEffect(() => {
        // 이미 전역에 카카오맵이 있으면 로드하지 않음
        if (window.kakao && window.kakao.maps) {
            setIsMapLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.async = true;
        // 장소 검색 서비스(places) 포함
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=e1bd847fea79c1138be97cfa67a4e249&autoload=false&libraries=services`;

        script.onload = () => {
            console.log('카카오 스크립트 로드됨');
            window.kakao.maps.load(() => {
                console.log('카카오맵 로드됨');
                setIsMapLoaded(true);
            });
        };

        script.onerror = (error) => {
            console.error('카카오맵 스크립트 로드 실패:', error);
            setErrorMessage('지도 스크립트를 로드하는데 실패했습니다.');
        };

        document.head.appendChild(script);
    }, []);

    // 장소 검색 및 지도 초기화
    useEffect(() => {
        if (!isOpen || !isMapLoaded || !placeName || !mapRef.current) return;

        try {
            // 지도 컨테이너
            const container = mapRef.current;

            // 처음에는 서울 중심으로 지도 생성
            const options = {
                center: new window.kakao.maps.LatLng(37.5666805, 126.9784147),
                level: 3,
            };

            // 지도 객체 생성
            const map = new window.kakao.maps.Map(container, options);

            // 장소 검색 객체 생성
            const ps = new window.kakao.maps.services.Places();

            // 키워드로 장소 검색
            console.log('검색할 장소:', placeName);
            ps.keywordSearch(placeName, (data, status, pagination) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    console.log('검색 결과:', data);

                    // 첫 번째 검색 결과 사용
                    const firstPlace = data[0];
                    setPlaceInfo(firstPlace);

                    // 검색된 장소 위치를 중심으로
                    const moveLatLng = new window.kakao.maps.LatLng(firstPlace.y, firstPlace.x);
                    map.setCenter(moveLatLng);

                    // 마커 생성
                    const marker = new window.kakao.maps.Marker({
                        position: moveLatLng,
                        map: map,
                    });

                    // 인포윈도우 생성
                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;font-size:12px;width:150px;text-align:center;font-weight:bold;">${firstPlace.place_name}</div>`,
                    });
                    infowindow.open(map, marker);

                    console.log('지도 마커 생성 완료');
                } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                    console.log('검색 결과 없음');
                    setErrorMessage('검색 결과가 없습니다. 다른 키워드로 시도해보세요.');
                } else {
                    console.error('장소 검색 실패:', status);
                    setErrorMessage('장소 검색 중 오류가 발생했습니다.');
                }
            });
        } catch (error) {
            console.error('지도 초기화 오류:', error);
            setErrorMessage('지도를 로드하는 중 오류가 발생했습니다.');
        }
    }, [isMapLoaded, placeName, isOpen]);

    // 카카오맵으로 열기
    const openKakaoMap = () => {
        if (!placeInfo) return;

        // 장소 ID가 있으면 장소 상세 페이지로 이동
        if (placeInfo.id) {
            window.open(`https://map.kakao.com/link/map/${placeInfo.id}`);
        }
        // 없으면 좌표로 이동
        else {
            window.open(`https://map.kakao.com/link/map/${placeInfo.place_name},${placeInfo.y},${placeInfo.x}`);
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
                    <p className='font-medium'>{placeInfo?.place_name || placeName}</p>
                    {placeInfo && (
                        <>
                            <p className='text-gray-600'>{placeInfo.address_name || placeInfo.road_address_name}</p>
                            {placeInfo.phone && <p className='text-gray-600'>☎ {placeInfo.phone}</p>}
                        </>
                    )}
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
                    <Button className='w-1/2' onClick={openKakaoMap} disabled={!placeInfo}>
                        카카오맵으로 열기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PlaceSearchMapModal;
