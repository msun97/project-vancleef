import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import { reviewActions } from '../../store/modules/reviewSlice';
import MypostsModal from './MypostsModal';

const MyReviews = () => {
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

    // 리뷰를 작성한 상품 목록 생성
    const reviewedProducts = Object.keys(userReviews).map((productId) => ({
        id: productId,
        review: userReviews[productId],
    }));

    // 리뷰 수정 버튼 클릭 핸들러
    const handleOpenModal = (productId, productName) => {
        setSelectedProduct({
            id: productId,
            name: productName || '상품명',
        });
        dispatch(openModal());
    };

    // 리뷰 삭제 핸들러
    const handleDeleteReview = (productId) => {
        if (window.confirm('리뷰를 삭제하시겠습니까?')) {
            dispatch(
                reviewActions.deleteReview({
                    userNum,
                    productId,
                })
            );
        }
    };

    // 별점 렌더링 함수
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`text-lg ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                </span>
            );
        }
        return stars;
    };

    // 날짜 포맷 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(
            2,
            '0'
        )}`;
    };

    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>내가 작성한 리뷰</h2>

            {reviewedProducts.length > 0 ? (
                <div className='space-y-4'>
                    {reviewedProducts.map((product) => (
                        <div key={product.id} className='border border-gray-200 rounded-md p-4'>
                            <div className='flex justify-between items-start mb-2'>
                                <div>
                                    <p className='text-sm text-gray-500'>상품 ID: {product.id}</p>
                                    <h3 className='font-medium text-lg'>{product.review.productName || '상품명'}</h3>
                                </div>
                                <div className='flex flex-col items-end'>
                                    <div className='flex mb-1'>{renderStars(product.review.rating)}</div>
                                    <p className='text-sm text-gray-500'>
                                        작성일: {formatDate(product.review.createdAt)}
                                    </p>
                                </div>
                            </div>

                            <div className='mt-3'>
                                <h4 className='font-medium'>{product.review.title}</h4>
                                <p className='text-gray-800 mt-1'>{product.review.content}</p>
                            </div>

                            {/* 리뷰 이미지가 있는 경우 표시 */}
                            {product.review.images && product.review.images.length > 0 && (
                                <div className='mt-3 flex flex-wrap gap-2'>
                                    {product.review.images.map((image, index) => (
                                        <div key={index} className='relative w-20 h-20'>
                                            <img
                                                src={image}
                                                alt={`리뷰 이미지 ${index + 1}`}
                                                className='w-full h-full object-cover rounded'
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className='mt-4 flex justify-end space-x-2'>
                                <button
                                    onClick={() => handleOpenModal(product.id, product.review.productName)}
                                    className='px-3 py-1 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded'
                                >
                                    수정
                                </button>
                                <button
                                    onClick={() => handleDeleteReview(product.id)}
                                    className='px-3 py-1 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded'
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-center text-gray-500 py-8 border-t border-b border-gray-200'>
                    작성한 리뷰가 없습니다.
                </div>
            )}

            {/* 모달 렌더링 */}
            {isOpen && <MypostsModal productId={selectedProduct.id} productName={selectedProduct.name} />}
        </div>
    );
};

export default MyReviews;
