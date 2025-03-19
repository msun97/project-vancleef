import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import { reviewActions } from '../../store/modules/reviewSlice';
import MypostsModal from './MypostsModal';
import { productdata } from '@/assets/api/productdata';

const MyReviews = () => {
  // 내 리뷰 목록
  const myReviews = useSelector((state) => state.authR.user?.myreviews || []);
  const dispatch = useDispatch();

  // 리뷰 수정 시 선택된 상품 상태
  const [selectedProduct, setSelectedProduct] = useState({ id: null, name: '' });
  // 사용자 식별자 (리뷰 삭제 시 사용)
  const userNum = useSelector((state) => state.authR.user?.id);

  // 제품 이미지 가져오기 함수
  // review 객체 내에 category와 productId가 포함되어 있어야 합니다.
  const getProductImage = (review) => {
    const category = review.category;
    const productId = review.productId;
    const categoryData = productdata.find((item) => item.category === category);
    if (!categoryData) return '/images/product-sample2(close).png';

    const product = categoryData.data.find((item) => item.productid === parseInt(productId));
    if (!product || !product.objectimage || product.objectimage.length === 0) {
      return '/images/product-sample2(close).png';
    }
    return product.objectimage[0];
  };

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
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(
      date.getDate()
    ).padStart(2, '0')}`;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4"></h2>
      {myReviews.length > 0 ? (
        <ul>
          {myReviews.map((review) => (
            <li key={review.id} className="border-b py-4">
              <div className="flex">
                {/* 제품 이미지 표시 */}
                <div className="w-[100px] h-[100px] bg-gray-500">
                  <img
                    src={getProductImage(review)}
                    alt="제품 이미지"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[14px] font-bold">{review.title}</h3>
                    <div>{renderStars(review.rating)}</div>
                  </div>
                  <p className="mt-2">{review.content}</p>
                  <div className="text-right text-sm text-gray-500">{formatDate(review.date)}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-8 border-gray-200">작성한 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default MyReviews;
