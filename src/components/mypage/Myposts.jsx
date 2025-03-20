import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import MypostsModal from './MypostsModal';

const AvailableReviews = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modalR.isOpen);
  const user = useSelector((state) => state.authR.user);
  
  // 디버깅: user 상태 확인
  console.log('user:', user);
  
  const userId = user?.id; // 또는 user.userid
  
  const userReviews = useSelector((state) =>
    userId ? (state.reviewR.userReviews[userId] || {}) : {}
  );

  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    name: '',
  });

  useEffect(() => {
    if (!userId) return; // userId 없으면 실행하지 않음

    try {
      const storedPurchases = localStorage.getItem('purchaseHistory');
      if (storedPurchases) {
        const purchases = JSON.parse(storedPurchases);
        const userPurchases = purchases.filter(
          (purchase) => purchase.userId === userId
        );
        setPurchaseHistory(userPurchases);
      }
    } catch (error) {
      console.error('구매 내역 불러오기 오류:', error);
      if (process.env.NODE_ENV === 'development') {
        const defaultPurchases = [
          {
            id: 'product1',
            userId: userId,
            name: '프러포즈 펜던트, 스몰 모델',
            price: 'KRW 5,400,000',
            date: new Date().toISOString(),
          },
          {
            id: 'product2',
            userId: userId,
            name: '클래식 시계, 미디엄 모델',
            price: 'KRW 3,200,000',
            date: new Date().toISOString(),
          },
        ];
        localStorage.setItem('purchaseHistory', JSON.stringify(defaultPurchases));
        setPurchaseHistory(defaultPurchases);
      }
    }
  }, [userId]);

  const availableProducts = purchaseHistory.filter(
    (product) => !userReviews[product.id]
  );

  const handleOpenModal = (productId, productName) => {
    setSelectedProduct({
      id: productId,
      name: productName,
    });
    dispatch(openModal());
  };

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>작성 가능한 리뷰</h2>
      
      {user === null ? ( // user가 null이면 로그인 상태가 아니라는 의미
        <div className='text-center text-gray-500 py-8'>로그인 해주세요.</div>
      ) : userId ? (
        availableProducts.length > 0 ? (
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
          <div className='text-[12px] text-center text-gray-500 py-8 border-t border-b border-gray-200'>
            현재 작성 가능한 리뷰가 없습니다.
          </div>
        )
      ) : (
        <div className='text-center text-gray-500 py-8'>로딩 중...</div>
      )}

      {isOpen && (
        <MypostsModal
          productId={selectedProduct.id}
          productName={selectedProduct.name}
        />
      )}
    </div>
  );
};

export default AvailableReviews;
