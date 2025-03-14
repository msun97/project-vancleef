import React, { useEffect, useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const ProductDescription = ({ productdata }) => {
  const [isLiked, setIsLiked] = useState(false);
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      {/* text */}
      <div>
        <a href="">
          <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2 ">
            {productdata.title}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleLike();
              }}
              className="text-3xl"
            >
              {isLiked ? (
                <IoIosHeart className="text-red-500" /> // 좋아요 상태: 빨간 하트
              ) : (
                <IoIosHeartEmpty className="text-black" /> // 기본 상태: 빈 하트 (검정)
              )}
            </button>
          </strong>
        </a>
      </div>

      <div className="flex gap-2 pt-2.5">
        {/*    {product.map((item, index) => {
                    return <strong key={item.id}>{product.price}</strong>;
                })} */}
        <strong>
          {" "}
          {productdata.price
            .toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })
            .replace("₩", "₩ ")}
        </strong>

        {/*   <strong>
                    <span className="line-through text-[#6D6D6D]">
                        <strong className="text-[#6D6D6D]">₩2,000,000</strong>
                    </span>
                </strong>
                <strong className="text-[#e4a690]">20%</strong> */}
      </div>

      <div className="flex gap-2 pt-2.5 items-center h-8">
        <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
          NEW
        </div>
        <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
          BEST
        </div>
        <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
          기획
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
