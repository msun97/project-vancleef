import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import MypostsModal from './MypostsModal';

function MyPosts() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modalR.isOpen);
    const userNum = useSelector((state) => state.authR);

    // 사용자의 리뷰 목록 가져오기
    const userReviews = useSelector((state) => state.reviewR.userReviews[userNum] || {});

    // 현재 선택한 상품 ID와 이름 상태
    const [selectedProduct, setSelectedProduct] = useState({
        id: null,
        name: '',
    });

    // 가상의 상품 정보 데이터베이스 (실제로는 API에서 가져와야 함)
    // 이 부분은 실제 구현 시 상품 데이터를 가져오는 API로 대체해야 합니다
    const productDatabase = {
        product1: {
            orderNumber: '201503040001',
            name: '프러포즈 펜던트, 스몰 모델',
            price: 'KRW 5,400,000',
        },
        product2: {
            orderNumber: '201503040002',
            name: '클래식 시계, 미디엄 모델',
            price: 'KRW 3,200,000',
        },
        product3: {
            orderNumber: '201503040003',
            name: '실크 스카프, 레드 컬러',
            price: 'KRW 480,000',
        },
    };

    // 리뷰를 작성한 상품 목록 생성
    const reviewedProducts = Object.keys(userReviews).map((productId) => ({
        id: productId,
        orderNumber: productDatabase[productId]?.orderNumber || '주문번호 없음',
        name: productDatabase[productId]?.name || '상품명 없음',
        price: productDatabase[productId]?.price || '가격 정보 없음',
        review: userReviews[productId],
    }));

    // 리뷰보기 버튼 클릭 시 모달 열기
    const handleOpenModal = (productId, productName) => {
        setSelectedProduct({
            id: productId,
            name: productName,
        });
        dispatch(openModal());
    };

    return (
        <div className='mx-auto max-w-[1200px] pt-[20px] pb-[20px] pl-[13px]'>
            <h2 className='text-2xl font-bold mb-6'>내가 작성한 리뷰</h2>

            {/* 리뷰 작성한 상품 목록 */}
            <div className='border-t border-gray-200'>
                {reviewedProducts.length > 0 ? (
                    reviewedProducts.map((product) => (
                        <div
                            key={product.id}
                            className='flex flex-row justify-between items-center py-4 border-b border-gray-200'
                        >
                            <span className='text-sm'>{product.orderNumber}</span>
                            <span className='text-sm flex-grow mx-4'>{product.name}</span>
                            <span className='text-sm mr-4'>{product.price}</span>
                            <div className='flex items-center'>
                                <span className='mr-3 text-sm'>별점: {product.review.rating}점</span>
                                <button
                                    onClick={() => handleOpenModal(product.id, product.name)}
                                    className='text-green-600 hover:text-green-800 text-sm underline'
                                >
                                    리뷰 수정
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center text-gray-500 py-8'>아직 작성한 리뷰가 없습니다.</div>
                )}
            </div>

            {/* 모달 렌더링 */}
            {isOpen && <MypostsModal productId={selectedProduct.id} productName={selectedProduct.name} />}
        </div>
    );
}

export default MyPosts;
