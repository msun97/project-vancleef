import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProductInformation = () => {
    const { category, id } = useParams();
    const productdata = useSelector((state) => state.productR.productdata);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        if (productdata && Array.isArray(productdata)) {
            const foundCategory = productdata.find(
                (categoryData) =>
                    categoryData.category === category && categoryData.data && Array.isArray(categoryData.data)
            ); /* find() 메서드는 JavaScript 배열에서 특정 조건을 만족하는 첫 번째 요소를 찾는 데 사용 */

            if (foundCategory) {
                const foundProduct = foundCategory.data.find((item) => item.productid === parseInt(id));
                setProduct(foundProduct);
            } else {
                console.error('해당 카테고리를 찾을 수 없습니다.');
            }
        } else {
            console.error('데이터 구조가 예상과 다릅니다:', productdata);
        }
        setIsLoading(false);
    }, [category, id, productdata]);

    console.log(product, 'prdouctinform');
    return (
        <>
            <div className="w-full h-full mt-60">
                <ul className="w-full h-full font-bold flex-col justify-center  text-xl p-330 leading-20">
                    <div className="text-[26px]" id="상세정보">
                        상품필수정보
                    </div>
                    <li className="border-y border-black flex gap-10  items-center">
                        <div className="w-30">종류</div>
                        <span className="font-light text-xs text-[#757575]">{product?.title}</span>
                    </li>
                    <li className=" border-b border-black flex gap-10  items-center">
                        <div className="w-30">제품번호</div>
                        <span className="font-light text-xs text-[#757575]">{product?.productnumber}</span>
                    </li>
                    <li className=" border-b border-black flex gap-10  items-center">
                        <div className="w-30">스톤</div>
                        <span className="font-light text-xs text-[#757575]">{product?.stone}</span>
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
