import { useState, useRef, useEffect } from 'react';

const TimePicker = () => {
    const [selectedTime, setSelectedTime] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 시간 옵션 생성 (오전 11:00부터 오후 5:30까지 30분 간격)
    const timeOptions = [
        { label: '오전 11:00', value: '11:00' },
        { label: '오전 11:30', value: '11:30' },
        { label: '오후 12:00', value: '12:00' },
        { label: '오후 12:30', value: '12:30' },
        { label: '오후 1:00', value: '13:00' },
        { label: '오후 1:30', value: '13:30' },
        { label: '오후 2:00', value: '14:00' },
        { label: '오후 2:30', value: '14:30' },
        { label: '오후 3:00', value: '15:00' },
        { label: '오후 3:30', value: '15:30' },
        { label: '오후 4:00', value: '16:00' },
        { label: '오후 4:30', value: '16:30' },
        { label: '오후 5:00', value: '17:00' },
        { label: '오후 5:30', value: '17:30' },
    ];

    // 외부 클릭 감지하여 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTimeSelect = (time) => {
        setSelectedTime(time.label);
        setIsOpen(false);
    };

    return (
        <div className='relative' ref={dropdownRef}>
            {/* 시간 선택 입력 필드 */}
            <div className='border flex items-center'>
                <div className='relative border-r'>
                    <button
                        className='p-3 flex items-center justify-center'
                        onClick={() => setIsOpen(!isOpen)}
                        type='button'
                    >
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
                            <circle cx='12' cy='12' r='10'></circle>
                            <polyline points='12 6 12 12 16 14'></polyline>
                        </svg>
                    </button>
                </div>

                <div className='flex-1 px-3'>{selectedTime || '시간을 선택하세요'}</div>
            </div>

            {/* 시간 선택 드롭다운 */}
            {isOpen && (
                <div className='absolute mt-1 w-full bg-white border border-gray-300 shadow-lg rounded z-10'>
                    <div className='grid grid-cols-5 gap-2 p-2'>
                        {timeOptions.map((time, index) => (
                            <button
                                key={index}
                                className='text-center py-2 px-1 rounded hover:bg-gray-100 hover:text-white text-sm font-normal'
                                onClick={() => handleTimeSelect(time)}
                            >
                                {time.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimePicker;
