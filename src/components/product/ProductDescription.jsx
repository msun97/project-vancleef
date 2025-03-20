import React, { useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/modules/authSlice";

const ProductDescription = ({ productdata }) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();

  const authed = useSelector((state) => state.authR.authed); // authed 값 가져오기

  const toggleLike = () => {
    if (!authed) {
      alert("로그인이 필요합니다.");
      return;
    }

    setIsLiked(!isLiked);

    if (!isLiked) {
      dispatch(authActions.addfavorites(productdata));
    } else {
      dispatch(authActions.removeFavorite(productdata));
    }
  };

  return (
    <div>
      <div>
        <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
          {productdata.title}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleLike();
            }}
            className="text-3xl"
          >
            {isLiked ? (
              <IoIosHeart className="text-red-500" />
            ) : (
              <IoIosHeartEmpty className="text-black" />
            )}
          </button>
        </strong>
      </div>

      <div className="flex gap-2 pt-2.5">
        <strong>
          {productdata.price
            .toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })
            .replace("₩", "₩ ")}
        </strong>
      </div>

      {(productdata.isNew || productdata.isBest || productdata.isPromo) && (
        <div className="flex gap-2 pt-2.5 items-center h-8">
          {productdata.isNew && (
            <div className="font-bold py-1 px-3.5 rounded-lg bg-black text-white">
              NEW
            </div>
          )}
          {productdata.isBest && (
            <div className="py-1 px-3.5 text-white rounded-lg font-bold bg-[#74C365]">
              BEST
            </div>
          )}
          {productdata.isPromo && (
            <div className="outline py-1 px-3.5 rounded-lg font-bold">기획</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
