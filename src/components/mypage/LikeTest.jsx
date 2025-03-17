import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/modules/authSlice";
import { productdata } from "../../assets/api/productdata";

const ProductItemLike = ({ product }) => {
  if (!product) return null; // product가 없으면 렌더링하지 않음

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authR.user);

  const handleAddFavorite = () => {
    if (!user) {
      console.log("로그인이 필요합니다.");
      return;
    }
    dispatch(authActions.addfavorites(product));
  };

  return (
    <div>
      <h3>{product.title}</h3>
      <button onClick={handleAddFavorite}>찜하기</button>
    </div>
  );
};

const LikeTest = () => {
  const productList = productdata[0]?.data || [];

  return (
    <div>
      {productList.map((product) => (
        <ProductItemLike key={product.productid} product={product} />
      ))}
    </div>
  );
};

export default ProductItemLike;
