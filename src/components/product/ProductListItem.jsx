import React, { useState } from "react";
import ProductImg from "./ProductImg";
import ProductDescription from "./ProductDescription";
import { useSelector } from "react-redux";

const ProductListItem = ({ className, productdata }) => {
  const product = useSelector((state) => state.productR.productdata); // 전체 상품 데이터
  console.log(productdata);

  return (
    <div className={`product-item ${className}`}>
      <div className="py-2.5 text-left text-[#1c1c1c]">
        {/* products 배열을 map을 사용하여 반복 */}

        <div key={productdata.productid}>
          <ProductImg
            src={productdata.objectimage[0]} // 첫 번째 이미지 가져오기
            width={500}
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
