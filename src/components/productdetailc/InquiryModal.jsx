const InquiryModal = () => {
    return (
        <div className='fixed bg-[rgba(0,0,0,0.5)] w-full h-full top-0 left-0' style={{ zIndex: 9999 }}>
            <div className='relative h-full'>
                <div className='absolute top-0 right-0 w-[450px] bg-white h-full'>
                    <div className='flex flex-col items-center px-[60px] py-[50px] text-center relative'>
                        <button>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 48 49'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='absolute top-[47px] right-[68px]'
                            >
                                <path
                                    d='M10.8281 9.55029L8.67188 11.7065L21.8438 24.8784L8.67188 38.0503L10.8281 40.2065L24 27.0347L37.1719 40.2065L39.3281 38.0503L26.1562 24.8784L39.3281 11.7065L37.1719 9.55029L24 22.7222L10.8281 9.55029Z'
                                    fill='#1C1C1E'
                                />
                            </svg>
                        </button>

                        <h2 className='text-[18px] font-bold'>문의사항 있으신가요?</h2>
                        <p className='mt-[50px] text-[16px]'>
                            반클리프 아펠의 담당 직원이 월요일부터 목요일 오전 10시 30분부터 오후 7시 30분까지,
                            금요일부터 일요일 오전 10시 30분부터 오후 8시까지 문의에 대한 답변을 드리겠습니다.
                        </p>
                        <div className='flex gap-2 mt-[18px]'>
                            <div>전화기 이모티콘</div>
                            <div>전화: (+82) 1877-4128</div>
                        </div>
                        <div className='bg-gray-20 w-[330px] h-[122px] mt-[50px] p-[21px]'>
                            <ul className='flex flex-col gap-2'>
                                <li className='flex items-center gap-1.5'>
                                    <svg
                                        width='18'
                                        height='18'
                                        viewBox='0 0 48 49'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M40 12.8784L18 34.8784L8 24.8784'
                                            stroke='#1C1C1E'
                                            stroke-width='2'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                    </svg>
                                    <p className='text-[15px]'>주얼리 및 워치 전문가가 안내해드립니다.</p>
                                </li>
                                <li className='flex items-center gap-1.5'>
                                    <svg
                                        width='18'
                                        height='18'
                                        viewBox='0 0 48 49'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M40 12.8784L18 34.8784L8 24.8784'
                                            stroke='#1C1C1E'
                                            stroke-width='2'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                    </svg>
                                    <p className='text-[15px]'>맞춤 상담</p>
                                </li>
                                <li className='flex items-center gap-1.5'>
                                    <svg
                                        width='18'
                                        height='18'
                                        viewBox='0 0 48 49'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M40 12.8784L18 34.8784L8 24.8784'
                                            stroke='#1C1C1E'
                                            stroke-width='2'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                    </svg>
                                    <p className='text-[15px]'>컬렉션 자세히 보기</p>
                                </li>
                            </ul>
                        </div>
                        <div className='w-full border-t mt-8 pt-8 flex flex-col gap-1.5 items-center'>
                            <div className='flex items-center gap-2'>
                                <span className='text-[15px]'>이메일</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='text-[15px]'>FAQ</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <svg
                                    width='15'
                                    height='15'
                                    viewBox='0 0 48 49'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M8.20135 36.5035C8.31385 36.0929 8.06729 35.522 7.83197 35.1104C7.75903 34.9875 7.67954 34.8686 7.59385 34.7542C5.57566 31.6935 4.49997 28.1078 4.5001 24.4417C4.46635 13.9182 13.1926 5.37854 23.9832 5.37854C33.3939 5.37854 41.2501 11.8979 43.0848 20.552C43.3601 21.835 43.4993 23.1435 43.5001 24.4557C43.5001 34.9942 35.1104 43.6679 24.3198 43.6679C22.6032 43.6679 20.2885 43.2367 19.0257 42.8832C17.7629 42.5298 16.502 42.061 16.1767 41.9354C15.8436 41.8075 15.49 41.7417 15.1332 41.7413C14.7442 41.74 14.3589 41.8175 14.0007 41.9692L7.64072 44.2642C7.50174 44.3242 7.35443 44.3628 7.20385 44.3785C7.08474 44.3782 6.96689 44.3542 6.8571 44.308C6.74732 44.2618 6.64779 44.1943 6.56427 44.1094C6.48074 44.0244 6.41489 43.9238 6.37051 43.8133C6.32613 43.7027 6.30411 43.5845 6.30572 43.4654C6.31354 43.3609 6.3324 43.2575 6.36197 43.157L8.20135 36.5035Z'
                                        stroke='#1C1C1E'
                                        stroke-width='2'
                                        stroke-miterlimit='10'
                                        stroke-linecap='round'
                                    />
                                    <path
                                        d='M15 27.8783C16.6569 27.8783 18 26.5352 18 24.8783C18 23.2214 16.6569 21.8783 15 21.8783C13.3431 21.8783 12 23.2214 12 24.8783C12 26.5352 13.3431 27.8783 15 27.8783Z'
                                        fill='#1C1C1E'
                                    />
                                    <path
                                        d='M24 27.8783C25.6569 27.8783 27 26.5352 27 24.8783C27 23.2214 25.6569 21.8783 24 21.8783C22.3431 21.8783 21 23.2214 21 24.8783C21 26.5352 22.3431 27.8783 24 27.8783Z'
                                        fill='#1C1C1E'
                                    />
                                    <path
                                        d='M33 27.8783C34.6569 27.8783 36 26.5352 36 24.8783C36 23.2214 34.6569 21.8783 33 21.8783C31.3431 21.8783 30 23.2214 30 24.8783C30 26.5352 31.3431 27.8783 33 27.8783Z'
                                        fill='#1C1C1E'
                                    />
                                </svg>
                                <span className='text-[15px]'>채팅</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InquiryModal;
