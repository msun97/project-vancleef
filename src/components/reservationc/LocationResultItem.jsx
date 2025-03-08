import Button from '../button';

const LocationResultItem = () => {
    return (
        <div className='relative mt-[40px] pt-[30px] border-t-2 text-content-xxl'>
            <p>경기 - 현대 판교</p>
            <p>
                현대백화점 판교점 1층 판교역로 146번길 20
                <br />
                성남, 13529
            </p>
            <div className='absolute top-[35px] right-0 flex flex-col items-center gap-[35px]'>
                <div className='text-[40px] leading-none'>+</div>
                <svg width='40' height='40' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
            </div>
            <Button className='mx-auto h-[55px] w-[324px] mt-[35px]' variant='secondary'>
                부티끄 선택하기
            </Button>
        </div>
    );
};

export default LocationResultItem;
