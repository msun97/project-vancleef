import { useState } from 'react';
import Button from '../button';

const ProductInquiryItem = () => {
    // 활성화된 섹션을 추적하는 상태 추가 (null이면 모두 닫힘)
    const [activeSection, setActiveSection] = useState(null);

    // 섹션별 핸들러 함수 생성
    const handleClick = (sectionName) => {
        setActiveSection(activeSection === sectionName ? null : sectionName);
    };
    return (
        <li>
            <div className='flex justify-between items-center border-b border-[#d2d2d2] py-[20px]'>
                <div className='flex items-center gap-6'>
                    <div className='px-[28px] py-1 border'>접수완료</div>
                    <div className='flex items-center gap-2'>
                        <svg width='24' height='24' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M38 22.8784H10C7.79086 22.8784 6 24.6693 6 26.8784V40.8784C6 43.0876 7.79086 44.8784 10 44.8784H38C40.2091 44.8784 42 43.0876 42 40.8784V26.8784C42 24.6693 40.2091 22.8784 38 22.8784Z'
                                stroke='black'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            <path
                                d='M14 22.8784V14.8784C14 12.2263 15.0536 9.68271 16.9289 7.80735C18.8043 5.93199 21.3478 4.87842 24 4.87842C26.6522 4.87842 29.1957 5.93199 31.0711 7.80735C32.9464 9.68271 34 12.2263 34 14.8784V22.8784'
                                stroke='black'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                        <h3 onClick={() => handleClick('inquiry1')} className='text-xl font-extrabold cursor-pointer'>
                            상품배송문의
                        </h3>
                    </div>
                </div>
                <div className='flex items-center gap-[20px]'>
                    <span>2024.03.07</span>
                    <svg
                        width='30'
                        height='30'
                        viewBox='0 0 48 49'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className={`${activeSection === 'inquiry1' ? 'transform rotate-180' : ''}`}
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
            <ul
                className={`w-full bg-gray-10 px-[35px] transition-all duration-300 ${
                    activeSection === 'inquiry1'
                        ? 'py-[30px] max-h-[500px] opacity-100'
                        : 'py-0 max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                <li className='pb-[55px] pl-[20px]'>
                    <div className='flex items-center gap-1'>
                        <span className='font-secondary text-[22px]'>Q</span>
                        <p>상품배송문의</p>
                    </div>
                    <p>1+1 구성인 경우 개별 포장 되어 있나요? 아니면 상자 하나에 2개가 다 담겨 있는지요?</p>
                </li>
                <li className='border-t-1 pb-[55px] pl-[20px] pt-[10px]'>
                    <div className='gap-1'>
                        <span className='font-secondary text-[22px]'>A</span>
                        <p>
                            안녕하세요. V&A Beauty 입니다. 하나의 상자에 제품 2개가 함께 담겨있습니다.
                            <br />
                            고객님의 질문에 조금이나마 도움이 되었길 바라며, <br />
                            추가 문의사항은 1:1 문의 게시판에 남겨주시면 친절히 안내드리겠습니다. <br />
                            감사합니다.
                        </p>
                    </div>
                </li>
            </ul>
        </li>
    );
};

export default ProductInquiryItem;
