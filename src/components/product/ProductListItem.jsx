import React, { useState } from 'react';
import ProductImg from './ProductImg';
import ProductDescription from './ProductDescription';
import { useSelector } from 'react-redux';

const ProductListItem = ({ className, productdata }) => {
    const product = useSelector((state) => state.productR.productdata); // 전체 상품 데이터
    /*  const filteredCategory = useSelector((state) => state.productR.filteredCategory); // 필터된 카테고리 데이터

    const [selectedCategory, setSelectedCategory] = useState(null);
    const filteredProducts = selectedCategory
        ? product.filter((item) => item.category === filteredCategory.name) // 선택된 카테고리가 있을 경우 해당 카테고리 필터링
        : product.filteredCategory
        ? product.filter((item) => item.category === filteredCategory.name) // filteredCategory.name이 있을 경우 해당 카테고리 필터링
        : product; */ // 필터가 없으면 전체 상품

    return (
        <div className={`product-item ${className}`}>
            <div className="py-2.5 text-left text-[#1c1c1c]">
                {/* products 배열을 map을 사용하여 반복 */}

                <div key={productdata.productid}>
                    <ProductImg
                        src={productdata.objectimage[0]} // 첫 번째 이미지 가져오기
                        imgWidth={500}
                        alt={productdata.title}
                        title={productdata.title}
                        className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1] object-contain"
                    />
                    <ProductDescription productdata={productdata} />
                </div>
            </div>
        </div>
    );
};

export default ProductListItem;
