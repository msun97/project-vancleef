import React from "react";
import ProductImg from "./ProductImg";
import ProductDescription from "./ProductDescription";

const ProductListItem = ({ className }) => {
  return (
    <li className={className}>
      <div className="py-2.5 text-left text-[#1c1c1c]">
        <ProductImg
          src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
          imgWidth={500} // width 대신 imgWidth 사용
          alt="스위트 버터플라이 펜던트"
          title="스위트 버터플라이 펜던트"
          className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1] object-contain" // 둥글기 값 조정
        />

        <ProductDescription />
      </div>
    </li>
  );
};

export default ProductListItem;
