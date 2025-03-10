import { useState } from 'react';
import Button from '../button';
import LocationResultItem from './LocationResultItem';

const LocationResultList = () => {
    const [activeId, setActiveId] = useState(null);

    const locationData = [
        { id: 1, location: '경기 - 현대 판교' },
        { id: 2, location: '서울 - 현대 본점' },
        { id: 3, location: '서울 - 현대 코엑스' },
        { id: 4, location: '서울 - 청담 메종' },
        { id: 5, location: '서울 - 롯데 에비뉴엘 월드타워' },
        { id: 6, location: '서울 - 신세계 본점' },
        { id: 7, location: '서울 - 신세계 강남' },
        { id: 8, location: '서울 - 갤러리아' },
        { id: 9, location: '서울 - 신세계 센텀 시티' },
        { id: 10, location: '서울 - 신세계 아트&사이언스' },
        { id: 11, location: '대구 - 신세계' },
    ];
    return (
        <div className='border-t-2'>
            <h3 className='font-secondary text-[32px] pt-[30px] pb-[40px]'>1. 부티크 선택</h3>
            <div className='flex flex-col gap-[40px] px-[330px]'>
                <div className='flex flex-col gap-[22px]'>
                    <div className='flex flex-col gap-[13px]'>
                        <h4 className='font-bold text-[18px]'>지역 *</h4>
                        <div className='relative inline-block'>
                            <select name='' id='' className='border py-[20px] px-[30px] w-full'>
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
                    <div className='flex flex-col gap-[13px]'>
                        <h4 className='font-bold text-[18px]'>도시 *</h4>
                        <div className='relative inline-block'>
                            <select name='' id='' className='border py-[20px] px-[30px] w-full'>
                                <option value=''></option>
                                <option value='서울'>서울</option>
                                <option value='대구'>대구</option>
                                <option value='대전'>대전</option>
                                <option value='성남'>성남</option>
                                <option value='부산'>부산</option>
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
                    <span className='text-[30px]'>대한민국 검색 결과 11</span>
                    {locationData.map((item) => (
                        <LocationResultItem
                            key={item.id}
                            id={item.id}
                            activeId={activeId}
                            setActiveId={setActiveId}
                            data={item}
                        />
                    ))}
                    <Button variant='secondary' className='w-[178px] h-[50px] mx-auto mt-[25px] mb-[70px]'>
                        LOAD MORE
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LocationResultList;
