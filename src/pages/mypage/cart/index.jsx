import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Line from '@/components/mypage/Line';
import MypageCartlist from '@/components/mypage/Cart';
import MypageCartSelect from '@/components/mypage/Cart2';
import Button from '@/components/button';
import { purchaseActions } from '@/store/modules/purchaseSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cartR.cart);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (productId, isSelected) => {
    setSelectedItems(prev => {
      if (isSelected) {
        return [...prev, productId];
      } else {
        return prev.filter(id => id !== productId);
      }
    });
  };
  const [selectedItem, setSelectedItem] = useState([]);

  const handleSelectedPurchase = () => {
    if (selectedItem.length === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }
    dispatch(
      purchaseActions.setItem(selectedItem.map(item => item.productnumber)),
    );
    navigate('/purchase');
  };

  const allPurchase = () => {
    dispatch(purchaseActions.setItem(cart.map(item => item.productnumber)));
    navigate('/purchase');
  };
  return (
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

      <MypageCartlist
        setSelectedItem={setSelectedItem}
        onSelect={handleSelect}
        cart={cart}
      />
      <MypageCartSelect selectedItems={selectedItems} />

      <div className="flex flex-row justify-center items-center gap-[10px]">
        <Button
          variant="secondary"
          className="w-[135px] h-[55px]"
          onClick={handleSelectedPurchase}
        >
          선택 상품 주문
        </Button>
        <Button
          variant="secondary"
          className="w-[135px] h-[55px]"
          onClick={allPurchase}
        >
          전체상품 주문
        </Button>
      </div>
    </div>
  );
};

export default Cart;
