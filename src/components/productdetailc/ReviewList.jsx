import Button from '../button';
import Pagination from '../pagination';
import ReviewItem from './ReviewItem';

const ReviewList = () => {
    return (
        <>
            <div className='pt-[200px] px-[330px] w-full'>
                <div className=' flex flex-col gap-[30px]'>
                    {/* <h2 className='font-secondary text-[44px] font-extrabold text-center'>리뷰(총 개수)</h2> */}
                    <div className='w-full flex items-center justify-between'>
                        <h2 className='font-secondary text-[32px] font-bold'>리뷰(총개수)</h2>
                        <div className='relative'>
                            <Button className='w-[290px] h-[55px] font-bold text-xl flex items-center !justify-between p-[30px]'>
                                <span className='whitespace-nowrap'>리뷰 쓰기</span>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 48 49'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M10 24.8784H38'
                                        stroke='white'
                                        strokeWidth='4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M24 10.8784L38 24.8784L24 38.8784'
                                        stroke='white'
                                        strokeWidth='4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    <div className='flex items-center justify-between font-bold text-xl'>
                        <div>총 (총 개수)개</div>
                        <div className='flex items-center gap-[70px]'>
                            <div className='flex items-center gap-[50px] relative'>
                                <button className='hover:opacity-100 transition duration-300 opacity-50'>
                                    베스트순
                                </button>
                                <div className='bg-black h-[8px] w-[1px]'></div>
                                <button className='hover:opacity-100 transition duration-300 opacity-50'>최신순</button>
                            </div>
                            <div className='flex items-center gap-4'>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 48 49'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='hover:opacity-100 transition duration-300 opacity-50 cursor-pointer'
                                >
                                    <path
                                        d='M46 38.875C46 39.9359 45.5786 40.9533 44.8284 41.7034C44.0783 42.4536 43.0609 42.875 42 42.875H6C4.93913 42.875 3.92172 42.4536 3.17157 41.7034C2.42143 40.9533 2 39.9359 2 38.875V16.875C2 15.8141 2.42143 14.7967 3.17157 14.0466C3.92172 13.2964 4.93913 12.875 6 12.875H14L18 6.875H30L34 12.875H42C43.0609 12.875 44.0783 13.2964 44.8284 14.0466C45.5786 14.7967 46 15.8141 46 16.875V38.875Z'
                                        stroke='black'
                                        strokeWidth='4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M24 34.875C28.4183 34.875 32 31.2933 32 26.875C32 22.4567 28.4183 18.875 24 18.875C19.5817 18.875 16 22.4567 16 26.875C16 31.2933 19.5817 34.875 24 34.875Z'
                                        stroke='black'
                                        strokeWidth='4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 48 49'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='hover:opacity-100 transition duration-300 opacity-50 cursor-pointer'
                                >
                                    <path
                                        d='M44 6.875H4L20 25.795V38.875L28 42.875V25.795L44 6.875Z'
                                        stroke='black'
                                        strokeWidth='4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <Pagination className='pt-[60px]' />
            </div>
        </>
    );
};

export default ReviewList;
