import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../button';
import { reviewActions } from '../../store/modules/reviewSlice';

const ReviewItem = ({ review, productId, userId }) => {
    const dispatch = useDispatch();

    // 별점 렌더링 함수
    const renderStars = (rating) => {
        // rating이 undefined인 경우 0으로 처리
        const ratingValue = rating || 0;
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= ratingValue) {
                // 채워진 별
                stars.push(
                    <svg
                        key={i}
                        width='14'
                        height='14'
                        viewBox='0 0 48 49'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M24 4.875L30.18 17.395L44 19.415L34 29.155L36.36 42.915L24 36.415L11.64 42.915L14 29.155L4 19.415L17.82 17.395L24 4.875Z'
                            fill='#FFDA07'
                        />
                    </svg>
                );
            } else {
                // 빈 별
                stars.push(
                    <svg
                        key={i}
                        width='14'
                        height='14'
                        viewBox='0 0 48 49'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M24 4.875L30.18 17.395L44 19.415L34 29.155L36.36 42.915L24 36.415L11.64 42.915L14 29.155L4 19.415L17.82 17.395L24 4.875Z'
                            stroke='#1C1C1E'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                );
            }
        }

        return stars;
    };

    // 도움됐어요 버튼 클릭 핸들러
    const handleHelpfulClick = () => {
        if (!review || !review.id) return;

        dispatch(
            reviewActions.toggleHelpful({
                productId: productId,
                reviewId: review.id,
            })
        );
    };

    // 날짜 포맷 함수
    const formatDate = (dateString) => {
        if (!dateString) return '';

        try {
            const date = new Date(dateString);
            return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(
                date.getDate()
            ).padStart(2, '0')}`;
        } catch (error) {
            console.error('날짜 형식 오류:', error);
            return '';
        }
    };

    // 리뷰가 없으면 렌더링하지 않음
    if (!review) {
        console.warn('리뷰 데이터가 없습니다.');
        return null;
    }

    // currentUser 정보 가져오기
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const currentUserId = currentUser.id;

    // 리뷰 작성자인지 확인 (내 리뷰인지)
    // 다양한 형태의 ID 비교 (문자열과 숫자 모두 처리)
    const isMyReview = currentUserId !== undefined && String(review.id) === String(currentUserId);

    // 이미지 필드명 호환성 처리 (img 또는 images)
    const images = review.img || review.images || [];

    return (
        <div className='w-full h-[300px] py-[40px] flex gap-[30px] border-b-2'>
            <div className='flex flex-col gap-[34px]'>
                <div className='flex items-center'>{renderStars(review.rating)}</div>
                <div className='bg-gray-10 w-[170px] h-[163px] rounded-tl-[180px] rounded-tr-[180px] flex justify-center items-baseline'>
                    <img
                        src='/images/product-sample2(close).png'
                        alt='제품 기본 이미지'
                        className='w-[162px] h-[162px]'
                    />
                </div>
            </div>
            <div className='w-full relative flex flex-col gap-[15px] text-xl'>
                <div className='absolute top-0 right-0 flex flex-col items-end justify-between h-full'>
                    <span className='text-sm text-gray-500'>{formatDate(review.date || review.createdAt)}</span>
                    {/* 내 리뷰일 경우 표시 */}
                    {isMyReview && (
                        <span className='text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-1'>내 리뷰</span>
                    )}
                </div>

                {/* 리뷰 제목 */}
                {review.title && <h3 className='text-[19px] font-semibold'>{review.title}</h3>}

                <p className='pt-[2px] text-[17px]'>{review.content}</p>

                {/* 이미지 표시 - img 또는 images 필드 모두 처리 */}
                {images && images.length > 0 && (
                    <ul className='flex gap-[6px] mt-2'>
                        {images.map((image, index) => (
                            <li key={index}>
                                <img
                                    src={image}
                                    alt={`리뷰이미지${index + 1}`}
                                    className='h-[94px] object-cover rounded-md'
                                />
                            </li>
                        ))}
                    </ul>
                )}

                <div className='flex items-center gap-[17px] mt-auto'>
                    <div className='flex items-center gap-[2px]'>
                        <button onClick={handleHelpfulClick}>
                            <svg
                                width='20'
                                height='20'
                                viewBox='0 0 48 49'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M14 44.8784H8C6.93913 44.8784 5.92172 44.457 5.17157 43.7068C4.42143 42.9567 4 41.9393 4 40.8784V26.8784C4 25.8176 4.42143 24.8001 5.17157 24.05C5.92172 23.2998 6.93913 22.8784 8 22.8784H14M28 18.8784V10.8784C28 9.28712 27.3679 7.761 26.2426 6.63578C25.1174 5.51056 23.5913 4.87842 22 4.87842L14 22.8784V44.8784H36.56C37.5247 44.8893 38.4608 44.5512 39.1958 43.9264C39.9309 43.3016 40.4154 42.4322 40.56 41.4784L43.32 23.4784C43.407 22.9051 43.3683 22.3198 43.2067 21.7629C43.045 21.2061 42.7642 20.691 42.3837 20.2534C42.0032 19.8159 41.5322 19.4663 41.0031 19.2289C40.4741 18.9914 39.8998 18.8719 39.32 18.8784H28Z'
                                    stroke={review.isHelpful ? '#000' : 'gray'}
                                    strokeWidth='4'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    fill={review.isHelpful ? '#e0e0e0' : 'none'}
                                />
                            </svg>
                        </button>
                        <span className='text-label-s text-gray-50'>{review.helpfulCount || 0}</span>
                    </div>
                    <Button
                        onClick={handleHelpfulClick}
                        className={`font-secondary text-label-s py-[4px] px-[15px] text-center w-[97px] h-[25px] whitespace-nowrap ${
                            review.isHelpful ? 'bg-black text-white' : ''
                        }`}
                    >
                        도움됐어요
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
