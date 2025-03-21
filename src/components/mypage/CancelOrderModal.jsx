import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/modules/modalSlice';
import Button from '../button';
import CheckBox from '../checkbox';
import InfoTable from './InfoTable';
import Line from './Line';

function CancelOrderModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modalR.isOpen);
  const [purchaseData, setPurchaseData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      if (currentUser.completePurchase) {
        setPurchaseData(currentUser.completePurchase);
      }
    }
  }, []);

  // 신청 버튼 클릭 시, completePurchase의 deliverItem 배열을 즉시 비워서 로컬스토리지와 컴포넌트 상태를 업데이트함
	const handleCancelSubmit = () => {
		const storedUser = localStorage.getItem('currentUser');
		if (storedUser) {
			const currentUser = JSON.parse(storedUser);
			if (currentUser.completePurchase) {
				// completePurchase 전체를 제거하여 주문번호, 주문가격, 주문상품 모두 삭제
				delete currentUser.completePurchase;
				localStorage.setItem('currentUser', JSON.stringify(currentUser));
				setPurchaseData(null);
				alert('취소 신청이 완료되었습니다.');
				dispatch(closeModal());
			}
		}
	};
	

  if (!isOpen) {
    return null; // 모달이 닫혀있으면 렌더링하지 않음
  }

  return (
    <div className="fixed min-w-[788px] min-h-[735px] inset-0 z-50 flex items-center justify-center bg-black/5">
      <div className="bg-white border-1 relative pt-[10px]">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center pl-[55px] pr-[55px] pt-[55px]">
          <h2 className="text-[24px] font-semibold border-b w-full">취소신청</h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {/* 닫기 아이콘 또는 텍스트 */}
          </button>
        </div>
        <div className="pl-[55px] pr-[55px] mt-[20px] space-x-[20px] mb-[55px]">
          <p>
            카드 및 체크카드 : PG사 승인 취소 시 바로환불 / 신청 후 3일 이내 지정된 계좌로 입금
            <br />
            부분 취소 접수 시 배송 희망일 예약이 취소될 수 있습니다.
          </p>
        </div>
        {/* 모달 바디 */}
        <div className="pl-[55px] pr-[55px] space-y-[20px]">
          {/* 정보입력 */}
          <InfoTable />
          {/* 취소신청 상품 정보 */}
          <div className="">
            <p className="text-[24px] font-semibold border-b w-full">취소신청 상품 정보</p>
            <div className="flex items-center text-[12px] h-[55px] pr-[18px]">
              <div className="flex gap-[192px] pr-3 pl-3">
                <span>상품명</span>
                <span>수량</span>
                <span>구매가격</span>
                <span></span>
              </div>
            </div>
            <Line color="#C6C6C6" marginTop="" />
          </div>
          {/* currentUser.completePurchase의 상품 정보 */}
          {purchaseData && purchaseData.deliverItem && purchaseData.deliverItem.map((group, groupIdx) =>
            group.map((item, idx) => (
              <div key={`${groupIdx}-${idx}`} className="flex justify-between pr-3 pl-3 items-center">
                <div className="flex flex-row h-[55px] justify-center items-center gap-10">
                  <span className="font-medium max-w-[170px]">{item.title}</span>
                  <span className="text-gray-500 text-sm ml-4">{item.quantity || 1}</span>
                </div>
                <p className="font-semibold w-[280px]">
                  KRW{' '}
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
              </div>
            ))
          )}
        </div>
        {/* 모달 푸터 */}
        <div className="flex justify-center space-x-[21px] p-[55px]">
          <Button
            onClick={() => dispatch(closeModal())}
            variant="secondary"
            className="w-[290px] h-[55px]"
          >
            취소
          </Button>
          <Button
            onClick={handleCancelSubmit}
            variant="primary"
            className="w-[290px] h-[55px]"
          >
            신청
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CancelOrderModal;
