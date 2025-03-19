import React from 'react';
import Line from './Line';
import { useSelector } from 'react-redux';

const MypageCartSelect = () => {
  const cart = useSelector((state) => state.cartR.cart) || [];

  // 체크된(isagree true) 상품만 필터링
  const selectedCartItems = cart.filter((item) => item.isagree);

  // 통화 포맷 함수
  const formatCurrency = (amount) => {
    return amount.toLocaleString('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    });
  };

  // 총 상품 금액 계산: 각 상품의 price와 quantity를 곱한 값을 모두 더함
  const totalProductAmount = selectedCartItems.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1);
  }, 0);

  // 배송비는 무료이므로 총 결제 예정금액은 총 상품 금액과 동일
  const totalPayment = totalProductAmount;
  const shippingInfo = '무료배송';

  return (
    <>
      <Line marginTop="" />
      <div className="flex items-center text-[12px] h-[40px] pl-[42px] pr-[20px]">
        <span>총 상품 금액</span>
        <span className="flex-1 text-center">배송정보</span>
        <span>총 결제 예정금액</span>
      </div>
      <Line color="#C6C6C6" marginTop="" />
      <div className="flex items-center text-[12px] h-[40px] pt-[55px] pb-[55px] px-[45px]">
        <span>{formatCurrency(totalProductAmount)}</span>
        <span className="flex-1 text-center">{shippingInfo}</span>
        <span>{formatCurrency(totalPayment)}</span>
      </div>
    </>
  );
};

export default MypageCartSelect;
