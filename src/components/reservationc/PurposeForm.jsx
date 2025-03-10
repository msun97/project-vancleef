import Button from '../button';
import CheckBox from '../checkbox';

const PurposeForm = () => {
    return (
        <div className='border-t-2 w-full'>
            <h3 className='font-secondary text-[32px] pt-[30px] pb-[40px]'>2. 방문 목적</h3>
            <div className='flex flex-col gap-[20px] px-[330px] font-bold text-[18px] w-full'>
                <p>어떤 도움이 필요하신가요? *</p>
                <div className='flex items-center gap-[50px] w-full mt-[5px] mb-[7px]'>
                    <div className='flex items-center gap-[12px]'>
                        <CheckBox className='w-[25px] h-[25px]' />
                        <span>반클리프 아펠 제품 상담</span>
                    </div>
                    <div className='flex items-center gap-[12px]'>
                        <CheckBox className='w-[25px] h-[25px]' />
                        <span>수리 서비스</span>
                    </div>
                </div>
                <div className='relative inline-block'>
                    <select name='' id='' className='border py-[14px] px-[17px] w-full'>
                        <option value=''></option>
                        <option value='수리 제품 수령'>수리 제품 수령</option>
                        <option value='수리 제품 수령'>수리 제품 픽업</option>
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

                <Button variant='secondary' className='w-[133px] h-[55px] mx-auto mb-[70px]'>
                    확인
                </Button>
            </div>
        </div>
    );
};

export default PurposeForm;
