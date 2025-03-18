import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import { reviewActions } from '../../store/modules/reviewSlice';
import MypostsModal from './MypostsModal';

const MyReviews = () => {
    // const dispatch = useDispatch();
    // const isOpen = useSelector((state) => state.modalR.isOpen);
 const myReviews = useSelector((state) => state.authR.user?.myreviews || []);

  /*   // 현재 선택한 상품 ID와 이름 상태
    const [selectedProduct, setSelectedProduct] = useState({
        id: null,
        name: '',
    });

    // 리뷰를 작성한 상품 목록 생성
    const reviewedProducts = Object.keys(userReviews).map((productId) => ({
        id: productId,
        review: userReviews[productId],
    }));
 */
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

		//눌럿을때 상세페이지로 가게

    return (
			<div>
      <h2 className="text-xl font-bold mb-4"></h2>
      {myReviews.length > 0 ? (
        <ul>
          {myReviews.map((review) => (
            <li key={review.id} className="border-b py-2">
          <div className='flex'>
          	
						  <div className='flex w-[100px] h-[100px]'></div>
						  <div className='flex justify-between '>
	            	  <p>{review.title}</p>
									<div>{renderStars(review.rating)}</div>
              <p>{review.content}</p>
              <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
	            </div>
          </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center text-gray-500 py-8 border-gray-200'>작성한 리뷰가 없습니다.</p>
      )}
    </div>
    );
};

export default MyReviews;
