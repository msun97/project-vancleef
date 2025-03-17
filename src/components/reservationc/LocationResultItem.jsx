import { useDispatch, useSelector } from 'react-redux';
import Button from '../button';
import { reservationActions } from '../../store/modules/reservationSlice';

const LocationResultItem = ({ id, activeId, setActiveId, data }) => {
    const dispatch = useDispatch();
    const { location } = useSelector((state) => state.reservationR.reservation);
    const isActive = id === activeId;

    // 플러스/마이너스 버튼 클릭 핸들러 - 부티크 상세 정보 토글
    const handlePlus = () => {
        setActiveId(isActive ? null : id);
    };

    // 부티크 선택 버튼 클릭 핸들러 - 확인 버튼 역할
    const handleSelectBoutique = () => {
        // Create location data object
        const locationData = {
            boutiqueId: id,
            boutique: data?.location || '경기 - 현대 판교',
            address: data?.address || '현대백화점 판교점 1층 판교역로 146번길 20',
            city: data?.city || '성남',
            zipcode: data?.zipcode || '13529',
            country: location.country || '대한민국', // Preserve existing country selection
        };

        // Redux 상태 업데이트 - 선택된 부티크 정보 저장
        dispatch(reservationActions.setLocation(locationData));

        // 이 단계에서만 확인 버튼을 누른 경우 localStorage에 저장
        localStorage.setItem('locationInfo', JSON.stringify(locationData));

        // 다음 단계로 이동
        dispatch(reservationActions.setCurrentStep(2));
    };

    return (
        <div className='relative mt-[40px] border-t-2 text-[18px] w-full'>
            <div className='pt-[30px] pb-[35px]'>
                <p>{data?.location || '경기 - 현대 판교'}</p>
                <p>
                    {data?.address || '현대백화점 판교점 1층 판교역로 146번길 20'}
                    <br />
                    {data?.city || '성남'}, {data?.zipcode || '13529'}
                </p>
            </div>
            <div
                className={`w-full mb-8 overflow-hidden transition-all duration-300 ${
                    isActive ? 'max-h-96' : 'max-h-0'
                }`}
            >
                <div className='flex items-center gap-5 text-[14px] mt-1 mb-[24px]'>
                    <div>전화기</div>
                    <div>+82 2 1877 4128</div>
                </div>
                <div className='flex items-start gap-5 text-[14px] w-full'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='14'
                        height='14'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <circle cx='12' cy='12' r='10'></circle>
                        <polyline points='12 6 12 12 16 14'></polyline>
                    </svg>
                    <div className='flex flex-col gap-[8px] w-full'>
                        <div className='flex items-center justify-between w-2/3'>
                            <div>월요일</div>
                            <div>오전 10:30 - 오후 8:00</div>
                        </div>
                        <div className='flex items-center justify-between w-2/3'>
                            <div>화요일</div>
                            <div>오전 10:30 - 오후 8:00</div>
                        </div>
                        <div className='flex items-center justify-between w-2/3'>
                            <div>수요일</div>
                            <div>오전 10:30 - 오후 8:00</div>
                        </div>
                        <div className='flex items-center justify-between w-2/3'>
                            <div>목요일</div>
                            <div>오전 10:30 - 오후 8:00</div>
                        </div>
                        <div className='flex items-center justify-between w-2/3'>
                            <div>금요일</div>
                            <div>오전 10:30 - 오후 8:00</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute top-[35px] right-0 flex flex-col items-center gap-[35px]'>
                <button onClick={handlePlus} className='text-[18px] leading-none'>
                    {isActive ? '-' : '+'}
                </button>
                <button>
                    <svg width='18' height='18' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M2 12.8784V44.8784L16 36.8784L32 44.8784L46 36.8784V4.87842L32 12.8784L16 4.87842L2 12.8784Z'
                            stroke='#1C1C1E'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M16 4.87842V36.8784'
                            stroke='#1C1C1E'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M32 12.8784V44.8784'
                            stroke='#1C1C1E'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </button>
            </div>
            <Button
                className='mx-auto h-[55px] w-[324px]'
                variant='secondary'
                onClick={handleSelectBoutique}
                disabled={location.boutiqueId === id} // 이미 선택된 부티크인 경우 버튼 비활성화
            >
                {location.boutiqueId === id ? '선택된 부티끄' : '부티끄 선택하기'}
            </Button>
        </div>
    );
};

export default LocationResultItem;
