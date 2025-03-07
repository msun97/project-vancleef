import { useState } from 'react';

const ProductInquiryItem = () => {
    // 활성화된 섹션을 추적하는 상태 추가 (null이면 모두 닫힘)
    const [activeSection, setActiveSection] = useState(null);

    // 섹션별 핸들러 함수 생성
    const handleClick = (sectionName) => {
        setActiveSection(activeSection === sectionName ? null : sectionName);
    };
    return (
        <li>
            <div
                onClick={() => handleClick('inquiry1')}
                className='flex justify-between items-center border-b border-[#d2d2d2] py-[20px]'
            >
                <h3 className='text-[25px] font-extrabold'>상품배송문의</h3>
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
            <ul
                className={`w-full bg-gray-10 px-[35px] transition-all duration-300 ${
                    activeSection === 'inquiry1'
                        ? 'py-[30px] max-h-[500px] opacity-100'
                        : 'py-0 max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                <li>- 소비자분쟁해결 기준(공정거래위원회 고시)에 따라 피해를 보상받을 수 있습니다.</li>
                <li>- A/S는 판매자에게 문의하시기 바랍니다.</li>
            </ul>
        </li>
    );
};

export default ProductInquiryItem;
