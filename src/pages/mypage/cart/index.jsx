import React from 'react';
import Line from '@/components/mypage/Line';
import MypageCartlist from '@/components/mypage/Cart';
import MypageCartSelect from '@/components/mypage/Cart2';
import Button from '@/components/button';

const Cart = () => {
  return (
    <>
      <div className="pt-[120px] absolute top-0 text-[14px]">
        <div className="text-left">
          <h1 className="text-sm font-bold">장바구니</h1>
        </div>
        <Line />
        <div>
          <div className="flex items-center justify-between text-[12px] h-[40px] pr-[18px]">
            <span>상품정보</span>

            <div className="flex gap-[65px]">
              <span>수량</span>
              <span>상품금액</span>
              <span>배송정보</span>
              <span>주문하기</span>
            </div>
          </div>
          <Line color="#C6C6C6" marginTop="" />
        </div>

        <MypageCartlist />
        <MypageCartSelect />

        <div className="flex flex-row justify-center items-center gap-[10px]">
          <Button variant="secondary" className="w-[135px] h-[55px]">
            선택 상품 주문
          </Button>
          <Button variant="secondary" className="w-[135px] h-[55px]">
            전체상품 주문
          </Button>
					
        </div>
      </div>
    </>
  );
};

export default Cart;
