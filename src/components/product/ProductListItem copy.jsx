import React, { useEffect, useState } from "react";
import ProductImg from "./ProductImg";
import ProductDescription from "./ProductDescription";
import { useSelector } from "react-redux";

const ProductListItem = ({ className }) => {
  const product = useSelector((state) => state.productR.productdata);
  const filteredProducts =
    useSelector((state) => state.productR.filteredProducts) || [];
  const [products, setProducts] = useState(filteredProducts);

  // Redux 상태가 변경될 때마다 업데이트
  useEffect(() => {
    console.log("Redux filteredProducts 상태 변경 감지:", filteredProducts);
    setProducts(filteredProducts);
  }, [filteredProducts]);

  return (
    <div className={`product-item ${className}`}>
      <div className="py-2.5 text-left text-[#1c1c1c]">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            // objectimage가 undefined인지, 배열인지 확인 후 첫 번째 이미지 가져오기
            const firstImage =
              filteredProducts.length > 0 &&
              filteredProducts[0].data.length > 0 &&
              Array.isArray(filteredProducts[0].data[0].objectimage) &&
              filteredProducts[0].data[0].objectimage.length > 0
                ? filteredProducts[0].data[0].objectimage[0]
                : "/images/default.png";
            return (
              <div key={product.productid}>
                {" "}
                {/* 🔹 key 추가 */}
                <ProductImg
                  src={firstImage}
                  imgWidth={500}
                  alt={product.title || "상품명 없음"}
                  title={product.title || "상품명 없음"}
                  className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1] object-contain"
                />
                <ProductDescription productdata={product} />
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">
            선택한 카테고리에 상품이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductListItem;
