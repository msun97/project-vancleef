import CheckBox from '../checkbox';
import Button from '../button';
import { useEffect, useState } from 'react';

const ShoppingcartModal = ({ handleModal, modalType }) => {
    /////////////////////////////////////////
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        // 원래 body의 overflow 스타일 저장
        const originalStyle = window.getComputedStyle(document.body).overflow;
        // body에 overflow: hidden 적용
        document.body.style.overflow = 'hidden';

        // 컴포넌트가 언마운트될 때 원래 스타일로 되돌림
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);
    const [modalClose, SetModalClose] = useState(false);

    const handlecloseclick = () => {
        SetModalClose(!modalClose);
        handleModal(false);
    };
    return (
        <div className="fixed bg-[rgba(0,0,0,0.5)] w-full h-full top-0 left-0" style={{ zIndex: 9999 }}>
            {/* 헤더영역 제외 시키려고 */}
            <div className="flex justify-end w-full h-screen">
                <div className="w-[458px] h-screen px-[50px] py-[50px] bg-white">
                    <div>
                        <div className="flex justify-between">
                            <div className="text-[16px] h-[20px] ">CART : 갯수</div>
                            <button className="h-[20px] cursor-pointer" onClick={handlecloseclick}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.41406 4.33594L4.33594 5.41406L10.9219 12L4.33594 18.5859L5.41406 19.6641L12 13.0781L18.5859 19.6641L19.6641 18.5859L13.0781 12L19.6641 5.41406L18.5859 4.33594L12 10.9219L5.41406 4.33594Z"
                                        fill="#B9B9B9"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="border-b-1 border-gray-600 h-[58px] flex justify-between">
                            <div className="text-[13px] leading-[58px] font-secondary tracking-wide">
                                <CheckBox
                                    id={'all'}
                                    className={'h-[18px] w-[18px] mr-[3px]'}
                                    checked={isChecked}
                                    onChange={setIsChecked}
                                />
                                전체선택
                            </div>
                            <button className="text-[13px] inline-block underline font-secondary tracking-wide">
                                선택삭제
                            </button>
                        </div>
                    </div>
                    {/* top */}
                    <div className="w-full h-[700px] flex flex-col justify-between">
                        <div className="relative flex">
                            <div className="my-[20px] ">
                                <div className="w-[100px] border border-[#dddddd]">
                                    <CheckBox
                                        id={1}
                                        className={'h-[18px] w-[18px] mr-[3px] absolute'}
                                        checked={isChecked}
                                        onChange={setIsChecked}
                                    />
                                    <img
                                        src="https://www.vancleefarpels.com/content/dam/rcq/vca/dp/jL/Eq/Oy/SU/uO/Pz/3h/xK/KL/6g/dpjLEqOySUuOPz3hxKKL6g.png.transform.vca-w820-2x.png"
                                        alt="목업상품"
                                        className="w-[100px] h-[100px] "
                                    />
                                </div>
                            </div>
                            <div className="w-full my-[20px] ml-[10px]">
                                <div className="w-full flex justify-between items-center">
                                    <div className="text-[8px] font-secondary text-gray-50 ">국내/해외택배</div>
                                    <button className="text-label-xs font-secondary color-gray-90">삭제</button>
                                </div>
                                <div className="text-content-xs mt-[9px]">상품명</div>
                                <div className="text-content-xs mt-[2px]">상품금액</div>
                                <div className="text-label-xs text-gray-50 font-secondary mt-[12px]">스톤종류</div>
                                <button className="text-content-xs underline color-gray-90">옵션변경</button>
                            </div>
                        </div>
                        {/* product */}
                        <div>
                            <div className="flex flex-col justify-between border-t border-[#666666]">
                                <div className="flex justify-between pt-[11px] pb-[20px]">
                                    <div className=" text-[13px] tracking-wider">상품합계금액</div>
                                    <div className="text-[13px] tracking-wider">KRW 상품금액</div>
                                </div>
                                <Button className={'w-full h-[55px] text-[17px] tracking-wide'}>주문하기</Button>
                            </div>
                        </div>
                        {/* bottom */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingcartModal;
