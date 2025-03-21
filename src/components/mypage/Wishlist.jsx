import React from 'react';
import Line from './Line';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/modules/authSlice';
import { productdata } from '@/assets/api/productdata';

const { removeFavorite } = authActions;

const MypageItemList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.authR.user?.favorites || []);

  const handleDelete = (item) => {
    dispatch(removeFavorite(item));
  };

  if (favorites.length === 0) {
    return (
      <div className="p-[50px] text-center text-[12px]">
        좋아요 상품이 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className="mt-5">
        {favorites.map((item) => (
          <div key={item.productnumber} className="flex justify-between items-center w-full pt-[19px] pb-[19px]">
            <div className="flex items-start space-x-4">
              <img
                src={item.objectimage[0] || 'https://via.placeholder.com/80'}
                alt="상품 이미지"
                className="w-[100px] h-[100px] object-cover border border-gray-200"
              />
              <div>
                <div className="font-regular text-[13px]">{item.title}</div>
                <div className="text-sm text-gray-500 text-[12px]">{item.subtitle}</div>
              </div>
            </div>
            <div className="text-right flex flex-col justify-between h-[100px]">
              <div className="font-regular">
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
      </div>
    </>
  );
};

export default MypageItemList;
