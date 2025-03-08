import { useState } from 'react';
import Button from '../button';
import CheckBox from '../checkbox';
import TimePicker from './TimePicker';

const ReservationDetailForm = () => {
    const nowDate = new Date();
    const formattedDate = nowDate.toISOString().split('T')[0];

    const [dateValue, setDateValue] = useState(formattedDate);
    return (
        <div className='border-t-2 w-full'>
            <h3 className='font-secondary text-[32px] pt-[30px] pb-[40px]'>3. 예약 상세정보</h3>
            <div className='flex flex-col gap-[20px] px-[168px] font-bold text-[18px] w-full'>
                <p>날짜 *</p>
                <div className='border flex items-center'>
                    <div className='relative border-r'>
                        <input
                            type='date'
                            value={formattedDate}
                            onChange={(e) => setDateValue(e.target.value)}
                            className='opacity-0 absolute inset-0 w-full h-full cursor-pointer'
                        />
                        <div className='p-3 flex items-center justify-center'>
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
                                <rect width='18' height='18' x='3' y='4' rx='2' ry='2' />
                                <line x1='16' x2='16' y1='2' y2='6' />
                                <line x1='8' x2='8' y1='2' y2='6' />
                                <line x1='3' x2='21' y1='10' y2='10' />
                            </svg>
                        </div>
                    </div>

                    {/* 날짜 표시 부분 */}
                    <div className='flex-1 px-3'>{dateValue}</div>
                </div>
                <p>이용 가능 시간 *</p>
                <TimePicker />
                <p>선호 언어</p>
                <div className='relative inline-block'>
                    <select name='' id='' className='border py-[14px] px-[17px] w-full'>
                        <option value=''></option>
                        <option value='한국어'>한국어</option>
                        <option value='영어'>영어</option>
                    </select>
                    <div className='absolute top-0 right-0 h-full flex items-center pr-3 pointer-events-none'>
                        <svg width='24' height='24' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
                <p>부티끄에 남기는 메시지</p>
                <textarea
                    name=''
                    id=''
                    placeholder='추가로 전달하고자 하는 요청 사항'
                    className='border text-content-s py-[11px] px-[17px] w-full h-[400px] placeholder-gray-30 font-normal'
                ></textarea>

                <Button variant='secondary' className='w-[133px] h-[55px] mx-auto'>
                    확인
                </Button>
            </div>
        </div>
    );
};

export default ReservationDetailForm;
