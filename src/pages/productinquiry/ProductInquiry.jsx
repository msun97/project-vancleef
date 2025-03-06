import React from 'react';

const flexIC = 'flex items-center';

const ProductInquiry = () => {
    return (
        <div className='wrap p-330 pt-20'>
            <h2 className='font-secondary font-bold text-heading-m border-b-2'>상품 문의 쓰기</h2>
            <div className={`${flexIC} p-4 border-b-2 gap-7`}>
                <div>
                    <img src='' alt='제품이미지-샘플' className='w-16 h-16' />
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
                        <select
                            className={`border border-gray-40 py-3 px-1.5 after:content-[''] after:block after:absolute`}
                        >
                            <option value='상품'>상품</option>
                            <option value='배송'>배송</option>
                            <option value='반품/환불'>반품/환불</option>
                            <option value='교환/변경'>교환/변경</option>
                            <option value='기타'>기타</option>
                        </select>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default ProductInquiry;
