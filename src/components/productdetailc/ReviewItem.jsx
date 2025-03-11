import Button from '../button';

const ReviewItem = () => {
    return (
        <div className='w-full h-[300px] py-[40px] flex gap-[30px] border-b-2'>
            <div className='flex flex-col gap-[34px]'>
                <div className='flex items-center'>
                    <svg width='14' height='14' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M24 4.875L30.18 17.395L44 19.415L34 29.155L36.36 42.915L24 36.415L11.64 42.915L14 29.155L4 19.415L17.82 17.395L24 4.875Z'
                            fill='#FFDA07'
                        />
                    </svg>
                    <svg width='14' height='14' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M24 4.875L30.18 17.395L44 19.415L34 29.155L36.36 42.915L24 36.415L11.64 42.915L14 29.155L4 19.415L17.82 17.395L24 4.875Z'
                            fill='#FFDA07'
                        />
                    </svg>
                    <svg width='14' height='14' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M24 4.875L30.18 17.395L44 19.415L34 29.155L36.36 42.915L24 36.415L11.64 42.915L14 29.155L4 19.415L17.82 17.395L24 4.875Z'
                            fill='#FFDA07'
                        />
                    </svg>
                    <svg width='14' height='14' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M24 4.875L30.18 17.395L44 19.415L34 29.155L36.36 42.915L24 36.415L11.64 42.915L14 29.155L4 19.415L17.82 17.395L24 4.875Z'
                            fill='#FFDA07'
                        />
                    </svg>
                    <svg width='14' height='14' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M24 4.875L30.18 17.395L44 19.415L34 29.155L36.36 42.915L24 36.415L11.64 42.915L14 29.155L4 19.415L17.82 17.395L24 4.875Z'
                            stroke='#1C1C1E'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </div>
                <div className='bg-gray-10 w-[170px] h-[163px] rounded-tl-[180px] rounded-tr-[180px] flex justify-center items-baseline'>
                    <img src='/images/product-sample2(close).png' alt='제품이미지' className='w-[162px] h-[162px]' />
                </div>
            </div>
            <div className='w-full relative flex flex-col gap-[15px] text-xl'>
                <span className='absolute top-0 right-0 text-[17px]'>example@email.com</span>
                <h3 className='font-bold'>제목: 우리 와이프 시계 사줬어요.</h3>
                <p className='pt-[2px] text-[17px]'>아주 마음에 든답니다. 장인의 정신이 느껴진다고 하네요.</p>
                <ul className='flex gap-[6px]'>
                    <li>
                        <img src='/images/carrot1.png' alt='당근예시1' className='h-[94px]' />
                    </li>
                    <li>
                        <img src='/images/carrot2.png' alt='당근예시2' className='h-[94px]' />
                    </li>
                </ul>
                <div className='flex items-center gap-[17px]'>
                    <div className='flex items-center gap-[2px]'>
                        <button>
                            <svg
                                width='20'
                                height='20'
                                viewBox='0 0 48 49'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M14 44.8784H8C6.93913 44.8784 5.92172 44.457 5.17157 43.7068C4.42143 42.9567 4 41.9393 4 40.8784V26.8784C4 25.8176 4.42143 24.8001 5.17157 24.05C5.92172 23.2998 6.93913 22.8784 8 22.8784H14M28 18.8784V10.8784C28 9.28712 27.3679 7.761 26.2426 6.63578C25.1174 5.51056 23.5913 4.87842 22 4.87842L14 22.8784V44.8784H36.56C37.5247 44.8893 38.4608 44.5512 39.1958 43.9264C39.9309 43.3016 40.4154 42.4322 40.56 41.4784L43.32 23.4784C43.407 22.9051 43.3683 22.3198 43.2067 21.7629C43.045 21.2061 42.7642 20.691 42.3837 20.2534C42.0032 19.8159 41.5322 19.4663 41.0031 19.2289C40.4741 18.9914 39.8998 18.8719 39.32 18.8784H28Z'
                                    stroke='gray'
                                    strokeWidth='4'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </button>
                        <span className='text-label-s text-gray-50'>20</span>
                    </div>
                    <Button className='font-secondary text-label-s py-[4px] px-[15px] text-center w-[97px] h-[25px] whitespace-nowrap'>
                        도움됐어요
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
