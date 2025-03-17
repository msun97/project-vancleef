import React from 'react';
import Line from './Line';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../../store/modules/authSlice'

const MypageItemList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.currentUser.favorites);

  const handleDelete = (item) => {
    dispatch(removeFavorite(item));
  };

  return (
    <>
      {favorites.map((item) => (
        <div key={item.productid} className="flex justify-between items-center w-full pt-[19px] pb-[19px]">
          <div className="flex items-start space-x-4">
            <img
              src={item.objectimage[0] || 'https://via.placeholder.com/80'}
              alt="상품 이미지"
              className="w-[100px] h-[100px] object-cover bg-gray-10"
            />
            <div>
              <div className="font-bold">{item.title}</div>
              <div className="text-sm text-gray-500">{item.subtitle}</div>
            </div>
          </div>
          <div className="text-right flex flex-col justify-between h-[100px]">
            <div className="font-bold">
              {item.price.toLocaleString('ko-KR', {
                style: 'currency',
                currency: 'KRW',
              })}
            </div>
            <button
              onClick={() => handleDelete(item)}
              className="text-right underline text-sm text-black ml-2"
            >
              삭제
            </button>
          </div>
        </div>
      ))}
      <Line marginTop="" />
    </>
  );
};

export default MypageItemList;
