import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import CancelOrderModal from './CancelOrderModal';

const OrderList = () => {
  const dispatch = useDispatch();
  const [completePurchase, setCompletePurchase] = useState(null);

  // localStorage에서 completePurchase 객체 읽어오기
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.completePurchase) {
      setCompletePurchase(currentUser.completePurchase);
    }
  }, []);

  // completePurchase가 없으면 메시지 출력
  if (!completePurchase) {
    return (
      <div className="flex justify-center p-[20px] text-[12px]">
        구매완료된 내역이 없습니다.
      </div>
    );
  }

  return (
    <div className="border-b border-gray-300 p-[20px]">
      <div className="flex justify-between items-center text-[12px]">
        {/* 주문번호 */}
     <div>
     	   <div>주문번호:</div> <span>{completePurchase.deliverNumber}</span>
	
     </div>
        {/* 주문상품: deliverItem은 중첩 배열로 되어있으므로 두 번의 map 사용 */}
        <span>
          주문상품:
          {completePurchase.deliverItem &&
            completePurchase.deliverItem.map((group, idx) => (
              <div key={idx}>
                {group.map((item, i) => (
                  <div key={i}>{item.title}</div>
                ))}
              </div>
            ))}
        </span>

        {/* 주문가격 */}
<div>
	        <div>  주문가격:</div>
	        <span>
					KRW{' '}{completePurchase.sumPrice &&
	            completePurchase.sumPrice
	              .toString()
	              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
	        </span>
</div>

        {/* 취소신청 버튼 */}
        <span className="underline cursor-pointer" onClick={() => dispatch(openModal())}>
          취소신청
        </span>
        <CancelOrderModal />
        {/* 거래완료 텍스트 */}
        <span className="underline cursor-pointer">거래완료</span>
      </div>
    </div>
  );
};

export default OrderList;
