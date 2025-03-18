import React, { useEffect } from 'react';
import CheckBox from '../checkbox';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import { useDispatch, useSelector } from 'react-redux';

const MypageCartlist = ({ selectedItems, onSelect }) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartR.cart);
  const dispatch = useDispatch();

  // cart 상태가 변경될 때마다 localStorage의 currentUser의 cart 배열 업데이트
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      currentUser.cart = cart;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [cart]);

  // 체크박스 상태 변경 처리 (이벤트 객체에서 checked 값을 추출)
  const handleCheckboxChange = (item, event) => {
    const isChecked = event.target.checked;
    onSelect(item.productid, isChecked);
  };

  return (
    <div className="flex flex-col space-y-4">
      {cart.length > 0 ? (
        cart.map((item) => (
          <div
            key={item.productid}
            className="flex flex-wrap items-start space-x-4 pt-[25px] pb-[25px] justify-between"
          >
            <CheckBox
              id={`agreement-${item.productid}`}
              checked={selectedItems.includes(item.productid)}
              onChange={(e) => handleCheckboxChange(item, e)}
              className="w-5 h-5"
            />
            <div>
              <img
                src={Array.isArray(item.objectimage) ? item.objectimage[0] : item.objectimage}
                alt="상품 이미지"
                className="w-[100px] h-[100px] object-cover bg-[#F1F1F1]"
              />
            </div>
            <div className="font-regular">{item.title}</div>
            <div className="font-regular">{item.quantity || 1}</div>
            <div className="font-regular">
              {item.price
                ? `${item.price.toLocaleString()}원`
                : '가격 정보 없음'}
            </div>
            <div className="font-regular items-center">무료배송</div>
            <div className="flex-col items-center space-y-[6px]">
              <Button
                onClick={() => navigate('/purchase')}
                variant="secondary"
                className="font-bold w-[89px] h-[29px] border border-[#D9D9D9] flex items-center justify-center"
              >
                바로주문
              </Button>
              <Button
                variant="secondary"
                className="font-bold w-[89px] h-[29px] border border-[#D9D9D9] flex items-center justify-center"
              >
                찜
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="flex justify-center items-center text-[12px] h-[40px] pt-[55px] pb-[55px]">
          장바구니에 상품이 없습니다.
        </p>
      )}
    </div>
  );
};

export default MypageCartlist;
