import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import { reviewActions } from '../../store/modules/reviewSlice';
import MypostsModal from './MypostsModal';
import { productdata } from '@/assets/api/productdata';
import Button from '../button';

const MyReviews = () => {
    const dispatch = useDispatch(); // 주석 해제
    const isOpen = useSelector((state) => state.modalR.isOpen); // 주석 해제
    const myReviews = useSelector((state) => state.authR.user?.myreviews || []);

    // 선택된 상품 정보를 저장할 상태 추가
    const [selectedProduct, setSelectedProduct] = useState({
        id: null,
        name: '',
        category: '',
    });

    // 카테고리에 맞는 항목 찾기
    const findProductDetails = (productId, reviews) => {
        for (const review of reviews) {
            if (review.productId === productId) {
                // 해당 리뷰의 카테고리를 기반으로 제품 찾기
                const categoryData = productdata.find((item) => item.category === review.category);
                if (categoryData) {
                    const product = categoryData.data.find((p) => p.productid === Number(productId));
                    if (product) {
                        return {
                            title: product.title,
                            image: product.objectimage[0],
                            category: review.category,
                        };
                    }
                }
                // 카테고리 정보가 없어도 리뷰에서 정보 반환
                return {
                    title: '상품명',
                    image: null,
                    category: review.category || 'unknown',
                };
            }
        }
        return null;
    };

    // 리뷰 수정 버튼 클릭 핸들러
    const handleOpenModal = (productId, productName, category) => {
        setSelectedProduct({
            id: productId,
            name: productName || '상품명',
            category: category || 'unknown',
        });

        // 현재 제품 ID와 카테고리 설정 (리뷰 등록 시 필요)
        dispatch(reviewActions.setCurrentProduct(productId));
        // 카테고리 정보 설정
        if (category) {
            dispatch({
                type: 'review/setProductCategory',
                payload: category,
            });
        }

        dispatch(openModal());
    };

    // 리뷰 삭제 핸들러
    const handleDeleteReview = (productId) => {
        if (window.confirm('리뷰를 삭제하시겠습니까?')) {
            // 현재 로그인한 사용자 정보 가져오기
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
            const userId = currentUser.id; // 로그인한 사용자 ID

            dispatch(
                reviewActions.deleteReview({
                    userId, // userNum 대신 userId 사용
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
            <h2 className='text-xl font-bold mb-4'>내 리뷰</h2>
            {myReviews.length > 0 ? (
                <ul>
                    {myReviews.map((review) => {
                        const productDetails = findProductDetails(review.productId, myReviews);

                        return (
                            <li key={review.productId} className='border-b py-4'>
                                <div className='flex'>
                                    <div className='w-[100px] h-[100px] bg-gray-200 flex items-center justify-center'>
                                        <img src={`${productDetails?.image || '이미지 없음'}`} />
                                    </div>
                                    <div className='flex-1 ml-4 '>
                                        <div className='flex justify-between items-center relative gap-4'>
                                            <strong>{productDetails?.title}</strong>
                                            <div>{renderStars(review.rating)}</div>
                                        </div>
                                        <h3 className='text-[14px] font-bold'>{review.title}</h3>
                                        <p className='mt-2'>{review.content}</p>
                                        <div className='text-right text-sm text-gray-500'>
                                            {formatDate(review.date)}
                                        </div>
                                        <div className='flex justify-end space-x-2 mt-2'>
                                            <Button
                                                variant='Tertiary'
                                                className='px-3 py-1 '
                                                onClick={() =>
                                                    handleOpenModal(
                                                        review.productId,
                                                        productDetails?.title,
                                                        review.category || productDetails?.category
                                                    )
                                                }
                                            >
                                                수정
                                            </Button>
                                            <Button
                                                variant='Tertiary'
                                                className='px-3 py-1'
                                                onClick={() => handleDeleteReview(review.productId)}
                                            >
                                                삭제
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className='text-center text-gray-500 py-8 border-gray-200'>작성한 리뷰가 없습니다.</p>
            )}

            {isOpen && (
                <MypostsModal
                    productId={selectedProduct.id}
                    productName={selectedProduct.name}
                    category={selectedProduct.category}
                />
            )}
        </div>
    );
};

export default MyReviews;
