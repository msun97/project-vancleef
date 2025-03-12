import React from 'react';

const ProductInformation = () => {
    return (
        <>
            <div className="w-full h-full mt-60">
                <ul className="w-full h-full font-bold flex-col justify-center  text-xl p-330 leading-20">
                    <div className="text-[26px]" id="상세정보">
                        상품필수정보
                    </div>
                    <li className="border-y border-black flex gap-10  items-center">
                        <div className="w-30">종류</div>
                        <span className="font-light text-xs text-[#757575]">프리볼 펜던트, 스몰 모델</span>
                    </li>
                    <li className=" border-b border-black flex gap-10  items-center">
                        <div className="w-30">제품번호</div>
                        <span className="font-light text-xs text-[#757575]">VCARPFBM00</span>
                    </li>
                    <li className=" border-b border-black flex gap-10  items-center">
                        <div className="w-30">스톤</div>
                        <span className="font-light text-xs text-[#757575]">다이아몬드: 스톤 1개, 0.08캐럿</span>
                    </li>
                    <li className=" border-b border-black flex gap-10  items-center">
                        <div className="w-30">클래스프</div>
                        <span className="font-light text-xs text-[#757575]">18K 로즈 골드 클래스프</span>
                    </li>
                    <li className=" border-b border-black flex gap-10  items-center">
                        <div className="w-30">사이즈</div>
                        <span className="font-light text-xs text-[#757575]">체인 길이: 42 cm</span>
                    </li>
                    <li className=" border-b border-black flex gap-10  items-center">
                        <div className="w-30">순중량</div>
                        <span className="font-light text-xs text-[#757575]">6g</span>
                    </li>
                    <li className=" border-b border-black flex gap-10  items-center">
                        <div className="w-30">제조자</div>
                        <span className="font-light text-xs text-[#757575]">반클리프 아펠</span>
                    </li>

                    <li className=" border-b border-black flex gap-10  items-center">
                        <div className="w-30">수입업체</div>
                        <span className="font-light text-xs text-[#757575]"> ㈜ 리치몬트 코리아</span>{' '}
                    </li>
                    <li className=" border-b border-black flex gap-10  items-center">
                        <div className="w-30">원산지</div>
                        <span className="font-light text-xs text-[#757575]">프랑스</span>{' '}
                    </li>
                    <li className=" border-b border-black flex gap-10  items-center">
                        <div className="w-30">품질보증기준</div>
                        <span className="font-light text-xs text-[#757575]">관련법 및 소비자 분쟁해결 규정에 따름</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ProductInformation;
