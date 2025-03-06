import { useState } from 'react';

const ProductNotice = () => {
    // 활성화된 섹션을 추적하는 상태 추가 (null이면 모두 닫힘)
    const [activeSection, setActiveSection] = useState(null);

    // 섹션별 핸들러 함수 생성
    const handleClick = (sectionName) => {
        setActiveSection(activeSection === sectionName ? null : sectionName);
    };

    return (
        <div className='pt-[80px] px-[330px] flex flex-col'>
            <h2 className='font-secondary text-[44px] font-extrabold'>상품고시</h2>
            <div className='w-full'>
                <div
                    onClick={() => handleClick('info')}
                    className='flex justify-between items-center border-b border-[#d2d2d2] py-[20px]'
                >
                    <h3 className='text-[25px] font-extrabold'>상품 정보 제공 고시</h3>
                    <svg width='30' height='30' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M12 18.875L24 30.875L36 18.875'
                            stroke='black'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </div>
                <ul
                    className={`w-full bg-gray-10 px-[35px] transition-all duration-300 ${
                        activeSection === 'info'
                            ? 'py-[30px] max-h-[500px] opacity-100'
                            : 'py-0 max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                    <li>- 소비자분쟁해결 기준(공정거래위원회 고시)에 따라 피해를 보상받을 수 있습니다.</li>
                    <li>- A/S는 판매자에게 문의하시기 바랍니다.</li>
                </ul>
                <div
                    onClick={() => handleClick('delivery')}
                    className='flex justify-between items-center border-b border-[#d2d2d2] py-[20px]'
                >
                    <h3 className='text-[25px] font-extrabold'>배송정보</h3>
                    <svg width='30' height='30' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M12 18.875L24 30.875L36 18.875'
                            stroke='black'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </div>
                <ul
                    className={`w-full bg-gray-10 px-[35px] transition-all duration-300 flex flex-col gap-[25px] ${
                        activeSection === 'delivery'
                            ? 'py-[30px] max-h-[500px] opacity-100'
                            : 'py-0 max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                    <li>
                        <strong>배송지역</strong>
                        <p>- 전국 가능 (군부대 일부 지역은 제외)</p>
                    </li>
                    <li>
                        <strong>배송비</strong>
                        <p>- 50,000원 이상 배송비 무료</p>
                        <p>- 기본 배송비 3,000원</p>
                    </li>
                    <li>
                        <strong>배송기간</strong>
                        <p>- 전국 가능 (군부대 일부 지역은 제외)</p>
                    </li>
                </ul>
                <div
                    onClick={() => handleClick('refund')}
                    className='w-full flex justify-between items-center border-b border-[#d2d2d2] py-[20px]'
                >
                    <h3 className='text-[25px] font-extrabold'>교환/환불</h3>
                    <svg width='30' height='30' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M12 18.875L24 30.875L36 18.875'
                            stroke='black'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </div>
                <ul
                    className={`w-full bg-gray-10 px-[35px] transition-all duration-300 flex flex-col gap-[25px] ${
                        activeSection === 'refund'
                            ? 'py-[30px] max-h-[700px] opacity-100'
                            : 'py-0 max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                    <li>
                        <strong>반품/교환 택배비</strong>
                        <p>- 교환 배송비 : 6,000원 / 반품 배송비 : 6,000원</p>
                        <p>
                            - 상품 불량 및 오배송 등의 이유로 교환/반품하실 경우 <br /> 교환/반품 배송비는 무상으로 진행
                        </p>
                        <p>
                            - 단순 변심 및 고객님의 사정으로 교환/반품하실 경우 <br /> 교환/반품 배송비는 유상으로 진행
                        </p>
                    </li>
                    <li>
                        <strong>반품/교환 가능 사유</strong>
                        <p>
                            - 제품 수령 후 상품이 주문 내용과 다르거나 <br /> 제품이 고객에게 인도될 당시 상품이 훼손된
                            경우
                        </p>
                        <p>
                            - 전자상거래 등에서의 소비자 보호에 관한 법률에 <br /> 규정되어 있는 소비자 청약철회 가능
                            범위에 해당하는 경우
                        </p>
                    </li>
                    <li>
                        <strong>반품/교환 불가능 사유 </strong>
                        <p>- 고객에게 책임이 있는 사유로 상품이 훼손된 경우</p>
                        <p>- 고객의 사용 또는 일부 소비로 상품 가치가 감소한 경우</p>
                        <p>- 구매 상품의 구성품 일부가 훼손되거나 누락된 경우</p>
                        <p>- 증정 사은품이 훼손되거나 누락된 경우</p>
                        <p>- 제품 배송일로부터 7일이 경과한 경우</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductNotice;
