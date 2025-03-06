import React, { useRef } from 'react';

const flexIC = 'flex items-center';

const ProductInquiry = () => {
    const selectRef = useRef(null);

    const handleArrowClick = () => {
        if (selectRef.current) {
            selectRef.current.focus();
            selectRef.current.click();
        }
    };
    return (
        <div className='wrap p-330 pt-20'>
            <h2 className='font-secondary font-bold text-heading-m border-b-2'>상품 문의 쓰기</h2>
            <div className={`${flexIC} p-4 border-b-2 gap-7`}>
                <div>
                    <img src={null} alt='제품이미지-샘플' className='w-16 h-16' />
                </div>
                <div>
                    <h3 className='font-bold text-heading-m'>상품명</h3>
                    <p className='font-bold text-gray-40 text-heading-m'>상품설명</p>
                </div>
            </div>
            <form className={`${flexIC} py-8 px-4 border-b-2 gap-7`}>
                <ul>
                    <li className={`${flexIC}  gap-36`}>
                        <h4>말머리</h4>
                        <div className='relative'>
                            <select ref={selectRef} className='border border-gray-40 p-3 w-80 h-20'>
                                <option value='상품'>상품</option>
                                <option value='배송'>배송</option>
                                <option value='반품/환불'>반품/환불</option>
                                <option value='교환/변경'>교환/변경</option>
                                <option value='기타'>기타</option>
                            </select>
                            <div
                                className='absolute inset-y-0 right-0 flex items-center pr-3'
                                onClick={handleArrowClick}
                            >
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 48 49'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
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
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default ProductInquiry;
