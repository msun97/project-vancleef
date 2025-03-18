import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import MypostsModal from './MypostsModal';

const AvailableReviews = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modalR.isOpen);
    const user = useSelector((state) => state.authR.user);
		const userNum = user?.id;
		
		
// 사용자가 작성한 리뷰 가져오기
const userReviews = useSelector((state) =>
  userNum ? ((state.reviewR.userReviews || {})[userNum] || {}) : {}
);
// 로컬 스토리지에서 구매 내역 가져오기 (실제로는 API 호출로 대체)
const [purchaseHistory, setPurchaseHistory] = useState([]);

// 현재 선택한 상품 ID와 이름 상태
const [selectedProduct, setSelectedProduct] = useState({
  id: null,
  name: '',
});

// 컴포넌트 마운트 시 로컬 스토리지에서 구매 내역 가져오기
useEffect(() => {
  if (!userNum) return; // userNum 없으면 return

  try {
    const storedPurchases = localStorage.getItem('purchaseHistory');
    if (storedPurchases) {
      const purchases = JSON.parse(storedPurchases);
      // 현재 사용자의 구매 내역만 필터링
      const userPurchases = purchases.filter((purchase) => purchase.userNum === userNum);
      setPurchaseHistory(userPurchases);
    }
  } catch (error) {
    console.error('구매 내역을 불러오는 중 오류 발생:', error);
    if (process.env.NODE_ENV === 'development') {
      const defaultPurchases = [
        {
          id: 'product1',
          userNum: userNum,
          name: '프러포즈 펜던트, 스몰 모델',
          price: 'KRW 5,400,000',
          date: new Date().toISOString(),
        },
        {
          id: 'product2',
          userNum: userNum,
          name: '클래식 시계, 미디엄 모델',
          price: 'KRW 3,200,000',
          date: new Date().toISOString(),
        },
      ];
      localStorage.setItem('purchaseHistory', JSON.stringify(defaultPurchases));
      setPurchaseHistory(defaultPurchases);
    }
  }
}, [userNum]);

// 아직 리뷰 안 쓴 상품
const availableProducts = purchaseHistory.filter((product) => !userReviews[product.id]);

// 리뷰 쓰기 버튼 클릭 핸들러
const handleOpenModal = (productId, productName) => {
  setSelectedProduct({
    id: productId,
    name: productName,
  });
  dispatch(openModal());
};

return (
  <div>
    <h2 className='text-xl font-bold mb-4'></h2>

    {availableProducts.length > 0 ? (
      <div className='border-t border-gray-200'>
        {availableProducts.map((product) => (
          <div
            key={product.id}
            className='flex flex-row justify-between items-center py-4 border-b border-gray-200'
          >
            <div className='flex flex-col'>
              <span className='text-sm text-gray-500 mb-1'>상품 ID: {product.id}</span>
              <span className='font-medium'>{product.name}</span>
            </div>
            <div className='flex items-center'>
              <span className='text-sm text-gray-500 mr-4'>{product.price}</span>
              <button
                onClick={() => handleOpenModal(product.id, product.name)}
                className='text-blue-600 hover:text-blue-800 text-sm underline'
              >
                리뷰쓰기
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className='text-center text-gray-500 py-8 border-gray-200'>
        현재 작성 가능한 리뷰가 없습니다.
      </div>
    )}

    {isOpen && <MypostsModal productId={selectedProduct.id} productName={selectedProduct.name} />}
  </div>
);
}

export default AvailableReviews;