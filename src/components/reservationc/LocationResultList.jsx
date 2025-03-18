import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button';
import LocationResultItem from './LocationResultItem';
import { reservationActions } from '../../store/modules/reservationSlice';

const LocationResultList = () => {
    const dispatch = useDispatch();
    const { location } = useSelector((state) => state.reservationR.reservation);

    const [activeId, setActiveId] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const [country, setCountry] = useState(location.country || '');
    const [city, setCity] = useState(location.city || '');

    // 부티크 정보
    const locationData = [
        {
            id: 1,
            location: '경기 - 현대 판교',
            address: '현대백화점 판교점 1층 판교역로 146번길 20',
            city: '성남',
            zipcode: '13529',
        },
        // ... 나머지 부티크 데이터 ...
    ];

    // 컴포넌트 마운트 시 이전에 선택된 부티크 정보 가져오기
    useEffect(() => {
        // Redux 상태에서 부티크 ID 가져오기
        if (location.boutiqueId) {
            setActiveId(location.boutiqueId);
            setCountry(location.country || '');
            setCity(location.city || '');
        }
    }, [location.boutiqueId, location.country, location.city]);

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + 5, locationData.length));
    };

    // 필터링된 데이터
    const filteredData = locationData.filter((item) => {
        if (city && !item.city.includes(city)) {
            return false;
        }
        return true;
    });

    // 현재 표시할 데이터만 필터링
    const visibleData = filteredData.slice(0, visibleCount);

    // 모든 데이터가 표시되는지 확인
    const isAllLoaded = visibleCount >= filteredData.length;

    // 국가 선택 핸들러 - Redux에만 저장
    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setCountry(selectedCountry);

        // Update Redux only (not localStorage)
        dispatch(reservationActions.setLocation({ country: selectedCountry }));
    };

    // 도시 선택 핸들러 - Redux에만 저장
    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        setCity(selectedCity);

        // Update Redux only (not localStorage)
        dispatch(reservationActions.setLocation({ city: selectedCity }));
    };

    return (
        <div className='border-t-2 mb-[70px] w-full'>
            <h3 className='font-secondary text-[20px] pt-[30px] pb-[40px]'>1. 부티크 선택</h3>
            <div className='flex flex-col w-full gap-[40px]'>
                <div className='flex gap-[22px] w-full'>
                    <div className='flex flex-col gap-[13px] w-full'>
                        <h4 className='font-bold text-[18px]'>지역 *</h4>
                        <div className='relative inline-block'>
                            <select
                                className='border py-[20px] px-[30px] w-full'
                                value={country}
                                onChange={handleCountryChange}
                            >
                                <option value=''></option>
                                <option value='대한민국'>대한민국</option>
                            </select>
                            <div className='absolute top-0 right-0 h-full flex items-center pr-3 pointer-events-none'>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 48 49'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M12 18.875L24 30.875L36 18.875'
                                        stroke='black'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[13px] w-full'>
                        <h4 className='font-bold text-[18px]'>도시 *</h4>
                        <div className='relative inline-block'>
                            <select
                                className='border py-[20px] px-[30px] w-full'
                                value={city}
                                onChange={handleCityChange}
                            >
                                <option value=''></option>
                                <option value='서울'>서울</option>
                                <option value='대구'>대구</option>
                                <option value='부산'>부산</option>
                                <option value='성남'>성남</option>
                                <option value='용인'>용인</option>
                            </select>
                            <div className='absolute top-0 right-0 h-full flex items-center pr-3 pointer-events-none'>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 48 49'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M12 18.875L24 30.875L36 18.875'
                                        stroke='black'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span className='text-[18px]'>대한민국 검색 결과 {filteredData.length}</span>
                    {visibleData.map((item) => (
                        <LocationResultItem
                            key={item.id}
                            id={item.id}
                            activeId={activeId}
                            setActiveId={setActiveId}
                            data={item}
                        />
                    ))}
                    {!isAllLoaded && (
                        <Button
                            variant='secondary'
                            className='w-[178px] h-[50px] mx-auto mt-[25px] mb-[70px]'
                            onClick={handleLoadMore}
                        >
                            LOAD MORE
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocationResultList;
